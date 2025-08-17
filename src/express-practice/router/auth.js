import express from "express";
import authController from "../controller/auth.js";

const router = express.Router();

router.post('/login', authController.login);

export default router;