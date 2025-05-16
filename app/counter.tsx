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
    <div className="retro-counter fixed bottom-0 right-0 m-4">
      <div className="counter-label">Besøkende</div>
      <div className="digital-display">
        {count
          .toString()
          .padStart(6, "0")
          .split("")
          .map((digit, index) => (
            <div key={index} className="digit">
              {digit}
            </div>
          ))}
      </div>
    </div>
  );
}
