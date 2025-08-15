import mongoose from "mongoose";
import { env } from "../env.js";

const connectDB = async () => {
    try {
        const uri = `mongodb://${env.mongodb.username}:${env.mongodb.password}@${env.mongodb.host}:${env.mongodb.port}/${env.mongodb.database}?authSource=admin`;
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;