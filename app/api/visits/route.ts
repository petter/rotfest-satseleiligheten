import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

let redis: Redis | null = null;

try {
  redis = Redis.fromEnv();
} catch {
  console.warn(
    "Redis configuration not found, visits subscription will not work"
  );
}

const key = "visits";
export async function GET() {
  if (!redis) {
    return new NextResponse("Redis not configured", { status: 500 });
  }

  const encoder = new TextEncoder();
  const subscriber = redis.subscribe(key);
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial count
      try {
        const count = (await redis.get<number>(key)) || 0;
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ count })}\n\n`)
        );
      } catch (error) {
        console.error("Failed to get initial count:", error);
      }

      // Subscribe to changes

      subscriber.on("message", (event) => {
        const message = event.message as string;
        const count = parseInt(message, 10);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ count })}\n\n`)
        );
      });

      subscriber.on("error", (error) => {
        console.error("Redis subscription error:", error);
        controller.close();
      });
    },
    cancel() {
      subscriber.unsubscribe();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
