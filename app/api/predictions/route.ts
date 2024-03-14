import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
// import { checkSubscription } from "@/lib/subscription";
import { modelParameters } from "@/constants";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, selectedModel } = body;

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



        const modelVersion: string = modelParameters[selectedModel];
        if (!modelVersion) {
            return new NextResponse("Invalid model", { status: 400 });
        }

        const response = await replicate.run(
            modelVersion,
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