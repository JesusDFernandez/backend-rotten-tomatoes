import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { GroupController } from "../controllers/group.controller.js";

const router = Router();

router.post("/group", auth, GroupController.create);
router.get("/group", auth, GroupController.getAll);


export default router;