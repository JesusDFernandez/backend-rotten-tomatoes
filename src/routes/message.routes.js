
import { Router } from "express";
import { MessageController } from "../controllers/message.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/message", auth, MessageController.sendText);

router.get("/message/:id", auth, MessageController.getAll);

router.get("/message/total/:id", auth, MessageController.getTotalMessages);

router.get("/message/last/:id", auth, MessageController.getLastMessage);

export default router;