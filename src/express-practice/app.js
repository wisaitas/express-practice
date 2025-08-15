import express from "express";
import { env } from "./env.js";
import connectDB from "./config/mongodb.js";
import router from "./router/index.js";
import upload from "./middleware/multer.js";
import cors from "cors";

connectDB();

const app = express();

app.use(cors('*'));
app.use(express.json());
app.use(upload.single("image"));

app.use('/api/v1', router)

app.listen(env.server.port, () => {
    console.log(`server is running on port ${env.server.port}`);
})