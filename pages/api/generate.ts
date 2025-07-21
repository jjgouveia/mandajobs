import { GeminiStream, GeminiStreamPayload } from "../../utils/GeminiStream";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  console.log("Missing env var from Gemini")
  throw new Error("Missing env var from Gemini");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("API route /api/generate called");
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  console.log("Received prompt:", prompt);

  if (!prompt) {
    console.log("No prompt in the request, returning 400");
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: GeminiStreamPayload = {
    model: "gemini-pro", // Use the appropriate Gemini model
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    max_tokens: 200,
  };

  console.log("Calling GeminiStream with payload:", payload);
  const stream = await GeminiStream(payload);
  console.log("GeminiStream returned stream");

  return new Response(
    stream, {
    headers: new Headers({
      'Cache-Control': 'no-cache',
    })
  }
  );
};

export default handler;
