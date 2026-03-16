import type { VercelRequest, VercelResponse } from '@vercel/node';
import { list, put } from '@vercel/blob';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const { method } = request;

  try {
    if (method === 'GET') {
      // 1. Buscar el archivo 'content.json' en el Blob
      const { blobs } = await list();
      const contentBlob = blobs.find((blob) => blob.pathname === 'content.json');

      if (!contentBlob) {
        // Si no existe, devolvemos un objeto vacío o un error 404
        return response.status(404).json({ error: 'content.json not found' });
      }

      // 2. Descargar el contenido del JSON
      const contentResponse = await fetch(contentBlob.url);
      const contentData = await contentResponse.json();

      return response.status(200).json(contentData);
    }

    if (method === 'POST') {
      const newContent = request.body;

      if (!newContent) {
        return response.status(400).json({ error: 'Missing request body' });
      }

      // 3. Sobreescribir 'content.json' con el nuevo contenido
      const blob = await put('content.json', JSON.stringify(newContent, null, 2), {
        access: 'public',
        addRandomSuffix: false, // Importante para sobreescribir
        contentType: 'application/json',
      });

      return response.status(200).json(blob);
    }

    response.setHeader('Allow', ['GET', 'POST']);
    return response.status(405).end(`Method ${method} Not Allowed`);
  } catch (error: any) {
    return response.status(500).json({ error: error.message });
  }
}