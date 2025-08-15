import express from "express";
import userController from "../controller/user.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id/image", userController.getUserImage);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;