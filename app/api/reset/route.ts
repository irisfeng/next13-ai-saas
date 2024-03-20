import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    //console.log('req:', req);
    // console.log('res:', res);
    if (req.method !== 'PUT') {
        return new NextResponse("Method not allowed. Use PUT.", { status: 405 });
    }

    try {
        // 使用 prisma.$transaction 来执行多个更新操作，这样可以提高性能
        const userApiLimits = await prisma.userApiLimit.findMany();
        const updates = userApiLimits.map(userApiLimit => prisma.userApiLimit.update({
            where: { userId: userApiLimit.userId },
            data: { count: 0, gpt3Count: 0 },
        }));

        await prisma.$transaction(updates);

        return new NextResponse("API limit count reset successfully.", { status: 200 });
    } catch (error) {
        console.log("Error reset ApiCount: ", error);
        return new NextResponse("Error reset ApiCount: " + error, { status: 500 });
    }
}