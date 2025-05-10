// config.js
import dotenv from "dotenv";
dotenv.config();

export const config = {
  appName: process.env.APP_NAME || "User Registration System",

  // Email configuration
  email: {
    host: process.env.EMAIL_HOST || "smtp.example.com",
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true" || false,
    user: process.env.EMAIL_USER || "user@example.com",
    password: process.env.EMAIL_PASSWORD || "password",
    from: process.env.EMAIL_FROM || "noreply@example.com",
  },

  // Redis configuration
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },

  // MongoDB configuration
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/echo",
  },
};
