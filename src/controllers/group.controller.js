import { Group } from "../models/group.model.js";
import { Message } from "../models/message.model.js";

async function create(req, res) {
    try {

        const { id } = req.user;
        const { nameGroup, participants } = req.body;

        const newGroup = new Group({
            nameGroup: nameGroup,
            creator: id,
            participants: [...participants, id]
        });

        await newGroup.save();

    } catch (error) {
        res.status(400).json({ msg: "Error al crear el grupo" });
    }
}

async function getAll(req, res) {
    try {
        const { id } = req.user;
        const groups = await Group.find({ participants: id }).populate("creator").populate("participants");

        const arrayGroups = [];
        for await (const group of groups) {
            const response = await Message.findOne({ chatId: group._id }).sort({
                createdAt: -1,
            });

            arrayGroups.push({
                ...group._doc,
                last_message_date: response?.createdAt || group.createdAt,
            });
        }

        arrayGroups.sort((a, b) => { return new Date(b.last_message_date) - new Date(a.last_message_date); });

        res.json(arrayGroups);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }

}

export const GroupController = {
    create,
    getAll
};