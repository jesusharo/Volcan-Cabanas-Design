import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // 1. Asegurarse de que la petición sea POST
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end('Method Not Allowed');
  }

  try {
    const contentJson = request.body;

    // 2. Validar que el cuerpo de la petición sea un JSON no vacío
    if (!contentJson || typeof contentJson !== 'object' || Object.keys(contentJson).length === 0) {
      return response.status(400).json({ error: 'Request body must be a non-empty JSON object.' });
    }

    // 3. Subir el archivo a Vercel Blob
    const blob = await put('content.json', JSON.stringify(contentJson, null, 2), {
      access: 'public', // Para que el archivo sea accesible públicamente
      contentType: 'application/json',
      addRandomSuffix: false, // Clave para que el nombre sea siempre 'content.json' y se sobreescriba
    });

    return response.status(200).json(blob);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return response.status(500).json({ error: 'Failed to upload content to Vercel Blob.', details: message });
  }
}
