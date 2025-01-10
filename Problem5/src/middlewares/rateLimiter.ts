import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
  skipSuccessfulRequests: true, // Count only failed requests
  message: 'Too many login attempts from this IP, please try again after 15 minutes',
}); 