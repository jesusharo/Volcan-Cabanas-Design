import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // Solo permitimos POST para subir archivos
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filename = (request.query.filename as string) || `upload-${Date.now()}.jpg`;

    // Subimos el cuerpo de la petición (el archivo) directamente al Blob
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return response.status(200).json(blob);
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message });
  }
}