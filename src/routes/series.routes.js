import { Router } from "express";
import { getSerieFilter, getSerieId, getSerieVideo, getSeriesGenre } from "../controllers/series.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/series/genres", auth, getSeriesGenre);
router.post("/series/filter", auth, getSerieFilter);
router.get("/series/:id", auth, getSerieId);
router.get("/series/video/:id", auth, getSerieVideo);



export default router;
