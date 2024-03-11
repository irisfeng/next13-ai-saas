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

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export default async function resetApiCounts(req: Request, res: Response) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const usersApiLimit = await prisma.userApiLimit.findMany();

        for (let userApiLimit of usersApiLimit) {
            await prisma.userApiLimit.update({
                where: { userId: userApiLimit.userId },
                data: { count: 0, gpt3Count: 0 },
            });
        }

        res.status(200).json({ message: 'Counts reset successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while resetting counts' });
    }
}


