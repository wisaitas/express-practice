import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        data: String,
        contentType: String,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true,
    collection: "users"
});

const User = mongoose.model("User", userSchema);

export default User;