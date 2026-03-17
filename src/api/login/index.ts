import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { password } = req.body;

  // Aquí pones la contraseña que le darás al cliente
  // En el futuro, esto debería estar en una variable de entorno (.env)
  const ADMIN_PASSWORD = "volcan_admin_2026"; 

  if (password === ADMIN_PASSWORD) {
    // Aquí podrías generar un token o una cookie
    return res.status(200).json({ success: true, message: 'Bienvenido, Admin' });
  } else {
    return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
  }
}