import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        // const isPro = await checkSubscription();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
        }

        const response = await replicate.run(
            "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
            {
                input: {
                    prompt,
                }
            }
        );
        console.log("Response:", response);

        await incrementApiLimit();

        return NextResponse.json(response);
    } catch (error) {
        console.log('[IMAGE_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};