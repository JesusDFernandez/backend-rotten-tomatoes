import { getContent, getContentFilter, getContentGenre, getContentQueryFilter, getContents, getContentVideoId } from "../libs/tmdbApi.js";
import Movie from "../models/movies.model.js";

export const getMovies = async (req, res) => {
    try {

        const data = await getContents("movie", req.params.page);

        res.json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMovieId = async (req, res) => {

    try {

        const details = await Movie.find({ id: req.params.id })

        if (details[0]?._id) {

            res.json(details[0]);

        } else {

            const data = await getContent({ type: "movie", id: req.params.id });

            const newMovie = new Movie({
                id: data.id,
                poster_path: data.poster_path,
                title: data.title,
                overview: data.overview,
                genres: data.genres

            });

            await newMovie.save();

            res.json(data);
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const getMovieVideo = async (req, res) => {
    try {

        const data = await getContentVideoId({ type: "movie", id: req.params.id });

        res.json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getMoviesGenre = async (req, res) => {
    try {

        const data = await getContentGenre("movie");

        res.json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getMovieFilter = async (req, res) => {
    try {

        const data = await getContentFilter(req.body);

        res.json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getQueryFilter = async (req, res) => {
    try {

        const data = await getContentQueryFilter(req.body);
        res.json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

