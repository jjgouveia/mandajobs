import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface GeminiChatMessage {
  role: "user" | "model";
  content: string;
}

export interface GeminiStreamPayload {
  model: string;
  messages: GeminiChatMessage[];
  temperature: number;
  top_p: number;
  max_tokens: number;
}

export async function GeminiStream(payload: GeminiStreamPayload) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!); // Use your Gemini API key env var
  const model = genAI.getGenerativeModel({ model: payload.model });

  const chat = model.startChat({
    history: payload.messages.slice(0, -1),
    generationConfig: {
      maxOutputTokens: payload.max_tokens,
      temperature: payload.temperature,
      topP: payload.top_p,
    },
  });

  const msg = payload.messages[payload.messages.length - 1].content;

  const res = await chat.sendMessageStream(msg);

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of res.stream) {
        const text = chunk.text();
        if (text) {
          const payload = { text: text };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(payload)}

`)
          );
        }
      }
      controller.close();
    },
  });

  return readableStream;
}
