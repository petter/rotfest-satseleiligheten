import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

try {
  redis = Redis.fromEnv();
} catch {
  console.warn("Redis configuration not found, counter will return 0");
}

export async function Counter() {
  let count = 0;

  try {
    if (redis) {
      count = await redis.incr("visits");
    }
  } catch (error) {
    console.error("Failed to increment counter:", error);
  }

  return (
    <p>
      Besøkende: <strong>{count}</strong>
    </p>
  );
}
