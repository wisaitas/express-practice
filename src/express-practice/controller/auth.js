import User from "../model/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { env } from "../env.js";
import client from "../config/redis.js";

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username});
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }

        const accessToken = jwt.sign({
            id: user._id,
            username: user.username,
        }, env.jwt.secret, {
            expiresIn: "1m",
        });

        await client.set(`accessToken:${user._id}`, JSON.stringify({
            id: user._id,
            username: user.username,
        }), {
            // EX: 900,
            EX: 60,
        });

        res.status(200).json({
            message: "Login successful",
            accessToken,
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

const authController = {
    login,
}

export default authController;