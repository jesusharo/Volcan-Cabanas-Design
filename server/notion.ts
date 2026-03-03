// Notion Integration - Replit Connector
// WARNING: Never cache the client. Access tokens expire.
import { Client } from '@notionhq/client';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X-Replit-Token not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=notion',
    {
      headers: {
        'Accept': 'application/json',
        'X-Replit-Token': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Notion not connected');
  }
  return accessToken;
}

export async function getUncachableNotionClient() {
  const accessToken = await getAccessToken();
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
  
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results.map((page: any) => {
    const title = getPropertyValue(page, 'Nombre') || 'Sin nombre';
    const galleryImages = getPropertyValue(page, 'Galería') || [];
    const heroImages = getPropertyValue(page, 'Foto_Hero') || [];
    const coverUrl = page.cover?.type === 'file' 
      ? page.cover.file.url 
      : page.cover?.type === 'external' 
        ? page.cover.external.url 
        : '';

    const allImages = [...heroImages, ...galleryImages].filter(Boolean);
    const images = allImages.length > 0 ? allImages : (coverUrl ? [coverUrl] : []);

    return {
      id: page.id,
      title,
      description: getPropertyValue(page, 'Description') || '',
      imageUrl: images[0] || '',
      images,
      capacity: String(getPropertyValue(page, 'Capacidad') || '0'),
      rooms: Number(getPropertyValue(page, 'Habitaciones') || 0),
      bathrooms: Number(getPropertyValue(page, 'Banos') || 0),
      bedsDetail: getPropertyValue(page, 'Camas') || '',
      slug: slugify(title),
      price: Number(getPropertyValue(page, 'Precio_Base') || 0) || undefined,
      tieredPricing: parseTieredPricing(getPropertyValue(page, 'Precios_Escalonados')),
    };
  });
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
  } catch (e) {}
  return [];
}

export async function listDatabases() {
  const notion = await getUncachableNotionClient();
  const response = await notion.search({
    filter: { property: 'object', value: 'database' },
  });
  return response.results.map((db: any) => ({
    id: db.id,
    title: db.title?.map((t: any) => t.plain_text).join('') || 'Sin título',
    properties: Object.keys(db.properties || {}),
  }));
}
