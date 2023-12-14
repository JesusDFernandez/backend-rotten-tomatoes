import { Router } from "express";
import { getMovieVideo, getMovies, getMovieId, getMoviesGenre, getMovieFilter, getQueryFilter } from "../controllers/movies.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/movies/genres", auth, getMoviesGenre);
router.get("/movies/page/:page", auth, getMovies);
router.get("/movies/:id", auth, getMovieId);
router.get("/movies/video/:id", auth, getMovieVideo);
router.post("/movies/filter", auth, getMovieFilter);
router.post("/search", auth, getQueryFilter);

export default router;