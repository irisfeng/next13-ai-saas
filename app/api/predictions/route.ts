import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
// import { checkSubscription } from "@/lib/subscription";
// import { modelParameters } from "@/constants";

// export const runtime = 'edge'
export const dynamic = 'auto'
export const maxDuration = 120


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, model, params } = body;

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

        let modelFullName: string = '';
        if (model === "sd2") {
            modelFullName = "stable-diffusion";
        } else modelFullName = model;



        const response = await replicate.run(
            `stability-ai/${modelFullName}:${params}`,
            // "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
                input: {
                    prompt,
                }
            }
        );
        console.log("选用的模型:", `stability-ai/${model}:${params}`);
        console.log("Response:", response);

        await incrementApiLimit();

        return NextResponse.json(response);
    } catch (error) {
        console.log('[IMAGE_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};