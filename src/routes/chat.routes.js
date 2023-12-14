import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { ChatController } from "../controllers/chat.controller.js";

const router = Router();


router.post("/chat", auth, ChatController.create);
router.get("/chats", auth, ChatController.getAll);
router.delete("/chat/:id", auth, ChatController.deleteChat);
router.get("/chat/:id", auth, ChatController.getChat);


export default router;
