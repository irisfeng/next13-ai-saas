// import cron from "node-cron";
// import prismadb from "@/lib/prismadb";

// // Schedule tasks to be run on the server.
// cron.schedule('0 22 * * * *', async function () {
//     console.log('Cron job started'); // 输出开始执行的日志
//     const usersApiLimit = await prismadb.userApiLimit.findMany();

//     for (let userApiLimit of usersApiLimit) {
//         await prismadb.userApiLimit.update({
//             where: { userId: userApiLimit.userId },
//             data: { count: 0, gpt3Count: 0 },
//         });
//     }
//     console.log('Cron job finished'); // 输出执行完成的日志
// });

import { Request, Response } from 'express';
import { resetApiLimit } from '@/lib/api-limit';

export const config = {
    runtime: 'serverless',
}

export default async function handler(req: Request, res: Response) {
    if (req.method === 'POST') {
        await resetApiLimit();
        res.status(200).json({ message: 'ok' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}


