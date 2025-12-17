import { RegionRatelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

let ratelimit = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new RegionRatelimit({
    redis,
    limiter: RegionRatelimit.fixedWindow(10, "20 s"), // ✅ REST supported
  });

  console.log("✅ Upstash RegionRatelimit enabled");
} else {
  console.warn("⚠️ Upstash env missing — rate limiting disabled");
}

export default ratelimit;
