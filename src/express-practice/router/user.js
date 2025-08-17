import express from "express";
import userController from "../controller/user.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id/image", userController.getUserImage);
router.put("/:id", authMiddleware.authenticateToken, userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;