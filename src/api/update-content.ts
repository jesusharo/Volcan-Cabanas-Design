import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Validamos que el método sea POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // 2. Obtenemos los datos del cuerpo de la petición
    const jsonContent = req.body;

    // 3. Subimos el archivo a Vercel Blob
    const blob = await put('content.json', JSON.stringify(jsonContent), {
      access: 'public',
      addRandomSuffix: false, // Importante: Sobreescribe el archivo existente en lugar de crear uno nuevo
      contentType: 'application/json',
      token: process.env.BLOB_READ_WRITE_TOKEN, // Usa la variable de entorno explícitamente
    });

    // 4. Devolvemos la respuesta con los datos del blob creado
    return res.status(200).json(blob);
  } catch (error) {
    console.error('Error uploading to blob:', error);
    return res.status(500).json({ error: (error as Error).message });
  }
}