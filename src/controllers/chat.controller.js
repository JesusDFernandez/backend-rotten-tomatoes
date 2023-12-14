import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";

async function create(req, res) {
    try {

        const { participant_id_one, participant_id_two } = req.body;

        const foundOne = await Chat.findOne({
            participant_one: participant_id_one,
            participant_two: participant_id_two,
        });

        const foundTwo = await Chat.findOne({
            participant_one: participant_id_two,
            participant_two: participant_id_one,
        });

        if (foundOne || foundTwo) {
            res.status(200).send({ msg: "Ya tienes un chat con este usuario" });
            return;
        }

        const newChat = new Chat({
            participant_one: participant_id_one,
            participant_two: participant_id_two,
        });

        await newChat.save();

        res.json(newChat);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

async function getAll(req, res) {
    try {

        const { id } = req.user;

        const chats = await Chat.find({ $or: [{ participant_one: id }, { participant_two: id }] }).populate("participant_one").populate("participant_two");

        const arrayChats = [];
        for await (const chat of chats) {
            const response = await Message.findOne({ chatId: chat._id }).sort({
                createdAt: -1,
            });

            arrayChats.push({
                ...chat._doc,
                last_message_date: response?.createdAt || chat.createdAt,
            });
        }

        arrayChats.sort((a, b) => { return new Date(b.last_message_date) - new Date(a.last_message_date); });

        res.json(arrayChats);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

async function deleteChat(req, res) {
    const chat_id = req.params.id;

    Chat.findByIdAndDelete(chat_id, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error al eliminar el chat" });
        } else {
            res.status(200).send({ msg: "Chat eliminado" });
        }
    });
}

async function getChat(req, res) {
    const chat_id = req.params.id;

    Chat.findById(chat_id, (error, chatStorage) => {
        if (error) {
            res.status(400).send({ msg: "Error al obtener el chat" });
        } else {
            res.status(200).send(chatStorage);
        }
    })
        .populate("participant_one")
        .populate("participant_two");
}

export const ChatController = {
    create,
    getAll,
    deleteChat,
    getChat,
};