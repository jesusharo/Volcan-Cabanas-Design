// Notion Integration - Replit Connectors SDK (proxy pattern)
import { ReplitConnectors } from "@replit/connectors-sdk";
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const ASSETS_DIR = path.join(process.cwd(), 'client', 'public', 'assets', 'notion');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

function downloadImage(url: string, cabinId: string, index: number): Promise<string> {
  if (!url || url.startsWith('/') || url.startsWith('data:')) return Promise.resolve(url);
  
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const ext = path.extname(pathname).split('?')[0] || '.jpg';
    const safeId = cabinId.replace(/[^a-z0-9-]/gi, '');
    const safeFilename = `${safeId}_${index}${ext}`;
    const filePath = path.join(ASSETS_DIR, safeFilename);
    const publicPath = `/assets/notion/${safeFilename}`;

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 1000) {
        return Promise.resolve(publicPath);
      }
    }

    const protocol = url.startsWith('https') ? https : http;

    return new Promise((resolve) => {
      protocol.get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            downloadImage(redirectUrl, cabinId, index).then(resolve);
            return;
          }
        }
        if (response.statusCode !== 200) {
          console.warn(`Failed to download image (${response.statusCode}): ${safeFilename}`);
          resolve(url);
          return;
        }
        const file = fs.createWriteStream(filePath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded image: ${safeFilename}`);
          resolve(publicPath);
        });
        file.on('error', () => {
          resolve(url);
        });
      }).on('error', (err) => {
        console.warn(`Error downloading image: ${err.message}`);
        resolve(url);
      });
    });
  } catch (e) {
    return Promise.resolve(url);
  }
}

async function notionRequest(endpoint: string, method: string = "POST", body?: any): Promise<any> {
  const connectors = new ReplitConnectors();
  const options: any = { method };
  if (body) {
    options.body = JSON.stringify(body);
    options.headers = { "Content-Type": "application/json" };
  }
  const response = await connectors.proxy("notion", endpoint, options);
  return response.json();
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
  const data = await notionRequest(`/v1/databases/${databaseId}/query`);
  
  if (!data || !data.results) {
    console.warn("No results from Notion query:", JSON.stringify(data).substring(0, 200));
    return [];
  }

  const cabins = await Promise.all(data.results.map(async (page: any) => {
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
    
    const localizedImages = await Promise.all(
      initialImages.map((img, idx) => downloadImage(img, page.id, idx))
    );

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
  try {
    const data = await notionRequest("/v1/search", "POST", {
      filter: { property: 'object', value: 'database' }
    });
    if (!data || !data.results) return [];
    return data.results.map((db: any) => ({
      id: db.id,
      title: db.title?.map((t: any) => t.plain_text).join('') || 'Sin título',
      properties: Object.keys(db.properties || {}),
    }));
  } catch (e) {
    console.error("Error listing databases:", e);
    return [];
  }
}
