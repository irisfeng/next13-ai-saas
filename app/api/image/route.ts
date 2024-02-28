import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from 'ai';

import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "256x256" } = body;

    if (!userId) {
      return Response.json({error: "Unauthorized"}, { status: 401 });
    }

    if (!openai.apiKey) {
      return Response.json({error: "OpenAI API Key not configured."}, { status: 500 });
    }

    if (!prompt) {
      return Response.json({error: "Prompt is required."}, { status: 400 });
    }

    if (!amount) {
      return Response.json({error: "Amount is required"}, { status: 400 });
    }

    if (!resolution) {
      return Response.json({error: "Resolution is required"}, { status: 400 });
    }

    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    // if (!freeTrial && !isPro) {
    //   return Response.json({error: "Free trial has expired. Please upgrade to pro."}, { status: 403 });
    // }

    const image = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    const image_url = image.data;

    // if (!isPro) {
    //   await incrementApiLimit();
    // }

    return Response.json(image.data);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return Response.json({error: "Internal Error"}, { status: 500 });
  }
};
