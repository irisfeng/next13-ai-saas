// /api/reset/route.ts
import { Request, Response } from 'express';
import { resetApiLimit } from '@/lib/api-limit';

export default async function handler(req: Request, res: Response) {
    if (req.method === 'GET') {
        await resetApiLimit();
        res.status(200).json({ message: 'Reset successful' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}