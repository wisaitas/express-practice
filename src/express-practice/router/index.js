import express from "express";
import userRouter from "./user.js";
import authRouter from "./auth.js";

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;