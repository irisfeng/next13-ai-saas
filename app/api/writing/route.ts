import { auth } from "@clerk/nextjs";
import { experimental_AssistantResponse } from 'ai';
import OpenAI from 'openai';
import { NextResponse } from "next/server";

import { MessageContentText } from 'openai/resources/beta/threads/messages/messages';

// import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';

export async function POST(req: Request) {

  try {
    const { userId } = auth();

    const assistantId = process.env.ASSISTANT_ID2 as string;

    if (!assistantId) {
      throw new Error("Assistant ID not found in environment variables");
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();
    if (!freeTrial) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }


    // Parse the request body
    const input: {
      threadId: string | null;
      message: string;
    } = await req.json();

    const myAssistant = await openai.beta.assistants.retrieve(assistantId);

    // Create a thread if needed
    const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;
    console.log("Thread ID:", threadId); // 添加日志

    // Add a message to the thread
    const createdMessage = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: input.message,
    });
    console.log("Message Created:", createdMessage); // 添加日志



    return experimental_AssistantResponse(
      { threadId, messageId: createdMessage.id },
      async ({ threadId, sendMessage }) => {
        // Run the assistant on the thread
        const run = await openai.beta.threads.runs.create(
          threadId,
          {
            assistant_id:
              assistantId ??
              (() => {
                throw new Error('ASSISTANT_ID is not set');
              })(),
            tools: [
              { type: "code_interpreter" },
            ],
          },
        );
        console.log("Run Created:", run); // 添加日志

        async function waitForRun(run: OpenAI.Beta.Threads.Runs.Run) {
          // Poll for status change
          while (run.status === 'queued' || run.status === 'in_progress') {
            // delay for 500ms:
            await new Promise(resolve => setTimeout(resolve, 500));

            run = await openai.beta.threads.runs.retrieve(threadId!, run.id);
          }

          // Check the run status
          if (
            run.status === 'cancelled' ||
            run.status === 'cancelling' ||
            run.status === 'failed' ||
            run.status === 'expired'
          ) {
            throw new Error(run.status);
          }
        }

        await waitForRun(run);

        // Get new thread messages (after our message)
        const responseMessages = (
          await openai.beta.threads.messages.list(threadId, {
            after: createdMessage.id,
            order: 'asc',
          })
        ).data;
        console.log("Response Messages:", responseMessages); // 添加日志


        // Send the messages
        for (const message of responseMessages) {
          sendMessage({
            id: message.id,
            role: 'assistant',
            content: message.content.filter(
              content => content.type === 'text',
            ) as Array<MessageContentText>,
          });
        }

        await incrementApiLimit();

      },
    );
  } catch (error) {
    console.error("API Error:", error);
    // 返回一个错误响应
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

}



