// Notion Integration - Replit Connector
// WARNING: Never cache the client. Access tokens expire.
import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import https from 'https';

const ASSETS_DIR = path.join(process.cwd(), 'client', 'public', 'assets', 'notion');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

async function downloadImage(url: string, filename: string): Promise<string> {
  // If the URL is already local or empty, return as is
  if (!url || url.startsWith('/') || url.startsWith('data:')) return url;
  
  // Create a stable filename based on the URL or an ID to avoid duplicates
  // Using a simple hash or extracting from Notion URL
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const ext = path.extname(pathname) || '.jpg';
  // Use the last part of the path + some hash of the whole URL to be safe
  const baseName = path.basename(pathname, ext);
  const safeFilename = `${baseName}_${Buffer.from(url).toString('base64').substring(0, 8)}${ext}`;
  const filePath = path.join(ASSETS_DIR, safeFilename);
  const publicPath = `/assets/notion/${safeFilename}`;

  if (fs.existsSync(filePath)) {
    return publicPath;
  }

  return new Promise((resolve) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        resolve(url); // Fallback to original URL if download fails
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(publicPath);
      });
    }).on('error', () => {
      resolve(url);
    });
  });
}

let connectionSettings: any;

async function getAccessToken() {
  const accessToken = process.env.NOTION_API_KEY;
  if (accessToken) return accessToken;

  try {
    if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
      return connectionSettings.settings.access_token;
    }
    
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY 
      ? 'repl ' + process.env.REPL_IDENTITY 
      : process.env.WEB_REPL_RENEWAL 
      ? 'depl ' + process.env.WEB_REPL_RENEWAL 
      : null;

    if (!xReplitToken) {
      return null;
    }

    const response = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=notion',
      {
        headers: {
          'Accept': 'application/json',
          'X-Replit-Token': xReplitToken
        }
      }
    );
    
    if (!response.ok) return null;
    
    connectionSettings = await response.json().then(data => data.items?.[0]);
    const token = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;
    return token || null;
  } catch (error) {
    console.error("Error getting Notion access token:", error);
    return null;
  }
}

export async function getUncachableNotionClient() {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;
  return new Client({ auth: accessToken });
}

export interface TieredPrice {
  persons: number;
  price: number;
}

export interface NotionCabin {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  imageUrl: string;
  images: string[];
  capacity: string;
  rooms: number;
  bathrooms: number;
  bedsDetail: string;
  slug: string;
  price?: number;
  tieredPricing: TieredPrice[];
}

function getPropertyValue(page: any, name: string): any {
  const prop = page.properties[name];
  if (!prop) return null;
  
  switch (prop.type) {
    case 'title':
      return prop.title?.map((t: any) => t.plain_text).join('') || '';
    case 'rich_text':
      return prop.rich_text?.map((t: any) => t.plain_text).join('') || '';
    case 'number':
      return prop.number ?? 0;
    case 'files':
      return prop.files?.map((f: any) => {
        if (f.type === 'file') return f.file.url;
        if (f.type === 'external') return f.external.url;
        return '';
      }).filter(Boolean) || [];
    case 'url':
      return prop.url || '';
    case 'select':
      return prop.select?.name || '';
    case 'multi_select':
      return prop.multi_select?.map((s: any) => s.name) || [];
    default:
      return null;
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function fetchCabinsFromNotion(databaseId: string): Promise<NotionCabin[]> {
  const notion = await getUncachableNotionClient();
  if (!notion) {
    console.warn("Notion client not available, returning empty cabins");
    return [];
  }
  
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const cabins = await Promise.all(response.results.map(async (page: any) => {
    const title = getPropertyValue(page, 'Nombre') || 'Sin nombre';
    const galleryImages = getPropertyValue(page, 'Galería') || [];
    const heroImages = getPropertyValue(page, 'Foto_Hero') || [];
    const coverUrl = page.cover?.type === 'file' 
      ? page.cover.file.url 
      : page.cover?.type === 'external' 
        ? page.cover.external.url 
        : '';

    const rawImages = [...heroImages, ...galleryImages].filter(Boolean);
    const initialImages = rawImages.length > 0 ? rawImages : (coverUrl ? [coverUrl] : []);
    
    // Download and localize images
    const localizedImages = await Promise.all(initialImages.map(img => downloadImage(img, `img_${page.id}`)));

    return {
      id: page.id,
      title,
      description: getPropertyValue(page, 'Description') || '',
      detailedDescription: getPropertyValue(page, 'Detalles_Completos') || '',
      imageUrl: localizedImages[0] || '',
      images: localizedImages,
      capacity: String(getPropertyValue(page, 'Capacidad') || '0'),
      rooms: Number(getPropertyValue(page, 'Habitaciones') || 0),
      bathrooms: Number(getPropertyValue(page, 'Banos') || 0),
      bedsDetail: getPropertyValue(page, 'Camas') || '',
      slug: slugify(title),
      price: Number(getPropertyValue(page, 'Precio_Base') || 0) || undefined,
      tieredPricing: parseTieredPricing(getPropertyValue(page, 'Precios_Escalonados')),
    };
  }));

  return cabins;
}

function parseTieredPricing(raw: any): TieredPrice[] {
  if (!raw) return [];
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (Array.isArray(parsed)) {
      return parsed
        .map((item: any) => ({
          persons: Number(item.persons || item.personas || 0),
          price: Number(item.price || item.precio || 0),
        }))
        .filter((p: TieredPrice) => p.persons > 0 && p.price > 0)
        .sort((a: TieredPrice, b: TieredPrice) => a.persons - b.persons);
    }
    if (typeof parsed === 'object' && parsed !== null) {
      return Object.entries(parsed)
        .map(([key, value]) => ({
          persons: Number(key),
          price: Number(value),
        }))
        .filter((p: TieredPrice) => p.persons > 0 && p.price > 0)
        .sort((a: TieredPrice, b: TieredPrice) => a.persons - b.persons);
    }
  } catch (e) {}
  return [];
}

export async function listDatabases() {
  const notion = await getUncachableNotionClient();
  if (!notion) return [];
  const response = await notion.search({
    filter: { property: 'object', value: 'database' },
  });
  return response.results.map((db: any) => ({
    id: db.id,
    title: db.title?.map((t: any) => t.plain_text).join('') || 'Sin título',
    properties: Object.keys(db.properties || {}),
  }));
}
