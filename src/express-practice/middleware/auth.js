import jwt from "jsonwebtoken";
import { env } from "../env.js";

export const authenticateToken = async (req , res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "[Token] Unauthorized",
            });
        }

        const decoded = jwt.verify(token, env.jwt.secret);
        const userId = decoded.id;

        req.userId = userId;
        next();
    } catch (error) {
        if (error.message === "jwt expired") {
            return res.status(401).json({
                message: "Token expired, please login again",
            });
        }

        return res.status(401).json({
            message: "[Catch] Unauthorized",
        });
    }
}

const authMiddleware = {
    authenticateToken,
}

export default authMiddleware;