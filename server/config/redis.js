// config/redis.js
import { createClient } from "redis";
import { config } from "./config.js";

// Create Redis client
const redisClient = createClient({
  url: config.redis.url,
});

// Handle Redis connection events
redisClient.on("connect", () => {
  console.log("Connected to Redis server");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();

export default redisClient;
