import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function Counter() {
  const count = await redis.incr("visits");
  return (
    <p>
      Besøkende: <strong>{count}</strong>
    </p>
  );
}
