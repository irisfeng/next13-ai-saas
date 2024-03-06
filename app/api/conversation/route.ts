import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { ChatCompletionMessage } from "openai/resources";

// import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
// import { checkSubscription } from "@/lib/subscription";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    // Extract the `prompt` from the body of the request
    const { messages } = await req.json();

    if (!userId) {
      // return Response.json({error: "Unauthorized"}, { status: 401 });
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      // return Response.json({error: "OpenAI API Key not configured."}, { status: 500 });
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      // return Response.json({error: "Messages are required"}, { status: 400 });
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    if (!freeTrial) {
      // return Response.json({error:"Free trial has expired. Please upgrade to pro."}, { status: 403 });
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      // model: "gpt-4-1106-preview",
      stream: true,
      messages: messages,

    });

    await incrementApiLimit();

    // if (!isPro) {
    //   await incrementApiLimit();
    // }

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // console.log(messages);
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
    // Response.json({error: "Internal Error"}, { status: 500 });
  }
};



