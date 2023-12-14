import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        title: { type: String },
        overview: { type: String },
        poster_path: { type: String },
        genres: [
            {
                id: { type: Number },
                name: { type: String }
            }

        ]
    }
);

export default mongoose.model("Movie", movieSchema);
