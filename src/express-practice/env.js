export const env = {
    mongodb: {
        username: process.env.MONGODB_USERNAME || "admin",
        password: process.env.MONGODB_PASSWORD || "password",
        host: process.env.MONGODB_HOST || "localhost",
        port: process.env.MONGODB_PORT || 27017,
        database: process.env.MONGODB_DATABASE || "express-practice",
    },
    server: {
        port: process.env.PORT || 8080,
    },
    jwt: {
        secret: process.env.JWT_SECRET || "express-practice",
    },
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
    }
}