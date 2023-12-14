import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    movieId: {
      type: String,
      required: true
    },
    parentId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    pointStar: {
      type: Number,
      required: true,
    }

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
