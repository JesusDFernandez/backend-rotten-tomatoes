import { Message } from "../models/message.model.js";

async function sendText(data) {

    try {

        const chat_message = new Message({
            chatId: data.room,
            user: data.messages.user._id,
            text: data.messages.text
        });


        await chat_message.save();

    } catch (error) {
        console.error(error);

    }
}


async function getAll(req, res) {

    const { id } = req.params;

    try {
        const messages = await Message.find({ chatId: id }).sort({ createdAt: -1 }).populate("user");

        const total = await Message.find({ chatId: id }).count();

        res.status(200).send({ messages, total });
    } catch (error) {
        res.status(500).send({ msg: "Error del servidor" });
    }
}

async function getTotalMessages(req, res) {
    const { chat_id } = req.params;

    try {
        const response = await Message.find({ chatId: chat_id }).count();
        res.status(200).send(JSON.stringify(response));
    } catch (error) {
        res.status(500).send({ msg: "Error del servidor" });
    }
}

async function getLastMessage(req, res) {
    const { id } = req.params;

    try {
        const response = await Message.findOne({ chatId: id }).sort({ createdAt: -1, });
        res.status(200).json(response || {});
    } catch (error) {
        res.status(500).send({ msg: "Error del servidor" });
    }
}

export const MessageController = {
    sendText,
    getAll,
    getTotalMessages,
    getLastMessage,
};