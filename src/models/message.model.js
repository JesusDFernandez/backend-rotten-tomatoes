import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
    {
        chatId: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        text: {
            type: String
        }

    },
    {
        timestamps: true,
    }
);

export const Message = mongoose.model("Message", MessageSchema);