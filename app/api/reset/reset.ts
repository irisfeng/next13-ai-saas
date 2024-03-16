// /api/reset/reset.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { resetApiLimit } from '@/lib/api-limit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await resetApiLimit();
        res.status(200).json({ message: 'Reset successful' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}