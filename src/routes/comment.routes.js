import { Router } from "express";
import { createComment, getComment } from "../controllers/comment.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/comments", auth, createComment);
router.get("/comments/", getComment);


export default router;
