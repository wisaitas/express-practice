import User from "../model/user.js";
import bcrypt from "bcrypt";

const createUser = async (req , res) => {
    try {
        const { username, password } = req.body;
        const image = req.file;

        const imageData = {
            data: image.buffer.toString("base64"),
            contentType: image.mimetype,
        }

        const saltRounds = 14;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            password: hashedPassword,
            image: imageData,
        })

        const resp = await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            data: resp,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ deletedAt: null }).select('-password -image');

        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export const getUserImage = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const imageBuffer = Buffer.from(user.image.data, "base64");

        res.set("Content-Type", user.image.contentType);
        res.send(imageBuffer);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const image = req.file;
        
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const imageData = {
            data: image.buffer.toString("base64"),
            contentType: image.mimetype,
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                username: existingUser.username,
                password: existingUser.password,
                image: imageData,
            }, { new: true });

        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await User.findByIdAndUpdate(id, { deletedAt: new Date() });

        res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

const userController = {
    createUser,
    getUsers,
    getUserImage,
    updateUser,
    deleteUser,
}

export default userController;