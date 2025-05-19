import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// Initialize Redis client only if environment variables are available
let redis: Redis | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN
    });
  } else {
    console.warn("Redis environment variables not found");
  }
} catch (error) {
  console.error("Failed to initialize Redis client:", error);
}

const key = "visits";
export async function GET() {
  if (!redis) {
    // Return a default value if Redis isn't configured
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ count: 0 })}\n\n`)
        );
      }
    });
    
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  }

  const encoder = new TextEncoder();
  
  try {
    const subscriber = redis.subscribe(key);
    const stream = new ReadableStream({
      async start(controller) {
        // Send initial count
        try {
          const count = await redis.get<number>(key);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ count: count || 0 })}\n\n`)
          );
        } catch (error) {
          console.error("Failed to get initial count:", error);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ count: 0 })}\n\n`)
          );
        }

        // Subscribe to changes
        try {
          subscriber.on("message", (event) => {
            try {
              const message = event.message as string;
              const count = parseInt(message, 10);
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ count })}\n\n`)
              );
            } catch (error) {
              console.error("Error processing message:", error);
            }
          });

          subscriber.on("error", (error) => {
            console.error("Redis subscription error:", error);
            controller.close();
          });
        } catch (error) {
          console.error("Error setting up subscriber:", error);
          controller.close();
        }
      },
      cancel() {
        try {
          subscriber.unsubscribe();
        } catch (error) {
          console.error("Error unsubscribing:", error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no" // Prevents buffering on Nginx
      },
    });
  } catch (error) {
    console.error("Error in SSE setup:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
