import ratelimit from "../config/upstash.js";

const rateLimit = async (req, res, next) => {
  if (!ratelimit) return next(); // always allow
  next();
};

export default rateLimit;
