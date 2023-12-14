import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { Chat } from "../models/chat.model.js";


export const getUsers = async (req, res) => {
    try {

        const { id } = req.user;
        const users = await User.find({}, '-password');

        const chats = await Chat.find({ $or: [{ participant_one: id }, { participant_two: id }] }).populate("participant_one").populate("participant_two");

        const removedIds = new Set();

        let newUsers = [];

        removedIds.add(JSON.stringify(id));

        chats.forEach(chat => {
            removedIds.add(JSON.stringify(chat.participant_one._id));
            removedIds.add(JSON.stringify(chat.participant_two._id));
        });

        newUsers = users.filter(user => !removedIds.has(JSON.stringify(user._id)));

        res.json(newUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getUsersTodos = async (req, res) => {
    try {
        const { id } = req.user;
        const users = await User.find({}, '-password');

        const removedIds = new Set();

        let newUsers = [];

        removedIds.add(JSON.stringify(id));

        newUsers = users.filter(user => !removedIds.has(JSON.stringify(user._id)));

        res.json(newUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrada" });

        res.json({
            id: user._id,
            name: user.name,
            username: user.username,
            biography: user?.biography
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getUserId = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrada" });

        res.json({
            id: user._id,
            name: user.name,
            username: user.username,
            biography: user?.biography
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {

        const { fullname, username, password, passwordNew, biography } = req.body;

        const user = await User.findById(req.user.id);

        let passwordHash;

        let message = "Actualizacion exitosa";
        if (password) {

            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) {
                message = "La contraseña es incorrecta";
            }
            if (passwordsMatch) {
                passwordHash = await bcrypt.hash(passwordNew, 10);
            }
        }

        const userUpdated = await User.findOneAndUpdate(
            { _id: req.user.id },
            { fullname, username, password: passwordHash, biography },
            { new: true }
        );
        return res.status(200).json({ message: message });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


