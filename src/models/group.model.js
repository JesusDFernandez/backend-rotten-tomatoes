import mongoose from "mongoose";

const GroupSchema = mongoose.Schema({

    nameGroup: {
        type: String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

},
    {
        timestamps: true,
    }
);

export const Group = mongoose.model("Group", GroupSchema);
