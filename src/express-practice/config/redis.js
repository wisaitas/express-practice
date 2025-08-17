import { createClient } from 'redis';
import { env } from '../env.js';

const client = createClient({
    socket: {
        host: env.redis.host,
        port: env.redis.port,
    },
});

const connectRedis = async () => {
    try {
        await client.connect();
        console.log("Connected to Redis");
    } catch (error) {
        console.log(error);
    }
}

export { connectRedis };
export default client;