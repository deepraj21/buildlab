import Redis from 'ioredis';
import { configDotenv } from 'dotenv';

configDotenv();

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

redisClient.on('connect', () => {
    console.log('Redis connected');
})

export default redisClient;