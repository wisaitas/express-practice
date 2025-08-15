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
    }
}