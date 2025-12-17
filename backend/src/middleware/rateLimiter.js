import ratelimit from "../config/upstash.js";

const rateLimit = async (req, res, next) => {
  try {
    // ✅ If Upstash is not ready / disabled, allow request
    if (!ratelimit) {
      return next();
    }

    // ✅ Correct IP handling for Render / proxies
    const key =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      "anonymous";

    const { success } = await ratelimit.limit(key);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next();
  } catch (error) {
    // ❗ Never crash your API because of rate limiting
    console.error("Rate limit error:", error.message);
    next(); // fail-open
  }
};

export default rateLimit;
