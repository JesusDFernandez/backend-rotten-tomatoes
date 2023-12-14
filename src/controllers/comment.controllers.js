import Comment from "../models/comment.model.js";


export const getComment = async (req, res) => {
  try {
    const { movieId, parentId } = req.query;

    const comments = await Comment.find({ movieId, parentId }).populate("userId").sort({ createdAt: -1 });

    let cantPositivaCritico = 0;
    let cantNegativaCritico = 0;
    let totalPointCritico = 0;

    let cantPositivaAudiencia = 0;
    let cantNegativaAudiencia = 0;
    let totalPointAudiencia = 0;

    comments.map((comment) => {

      if (comment.userId.isCritical) {

        if (comment.pointStar >= 3) {

          cantPositivaCritico++;

        } else {
          cantNegativaCritico++;
        }
        totalPointCritico += comment.pointStar;
      } else {
        if (comment.pointStar >= 3) {

          cantPositivaAudiencia++;

        } else {
          cantNegativaAudiencia++;
        }
        totalPointAudiencia += comment.pointStar;

      }

    })

    const porcentajeCritico = isNaN((cantPositivaCritico / (cantPositivaCritico + cantNegativaCritico)) * 100) ? 0 : (cantPositivaCritico / (cantPositivaCritico + cantNegativaCritico)) * 100;
    const porcentajeAudiencia = isNaN((cantPositivaAudiencia / (cantPositivaAudiencia + cantNegativaAudiencia)) * 100) ? 0 : (cantPositivaAudiencia / (cantPositivaAudiencia + cantNegativaAudiencia)) * 100;

    res.json({
      comments,
      stat: {
        totalPointCritico,
        totalPointAudiencia,
        porcentajeCritico,
        cantPositivaCritico,
        cantNegativaCritico,
        porcentajeAudiencia,
        cantPositivaAudiencia,
        cantNegativaAudiencia
      }
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {

    const { movieId, parentId, text, pointStar } = req.body;

    const newComment = new Comment({
      userId: req.user.id,
      movieId,
      parentId,
      text,
      pointStar,
    });

    await newComment.save();

    res.json(newComment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment)
      return res.status(404).json({ message: "Comentario no encontrada" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const commentUpdated = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      { text },
      { new: true }
    );
    return res.json(commentUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
