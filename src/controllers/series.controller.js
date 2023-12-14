import { getContent, getContentFilter, getContentGenre, getContents, getContentVideoId } from "../libs/tmdbApi.js";
import Serie from "../models/series.model.js";

export const getMovies = async (req, res) => {
    try {

        const data = await getContents("movie", req.params.page);
        res.json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const getSerieId = async (req, res) => {

    try {

        const details = await Serie.find({ id: req.params.id })

        if (details[0]?._id) {

            res.json(details[0]);

        } else {
            const data = await getContent({ type: "tv", id: req.params.id });


            const newSerie = new Serie({
                id: data.id,
                poster_path: data.poster_path,
                title: data.name,
                overview: data.overview,
                genres: data.genres

            });

            await newSerie.save();

            res.json(data);
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const getSerieVideo = async (req, res) => {
    try {

        const data = await getContentVideoId({ type: "tv", id: req.params.id });

        res.json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getSeriesGenre = async (req, res) => {
    try {

        const data = await getContentGenre("tv");

        res.json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getSerieFilter = async (req, res) => {
    try {

        const data = await getContentFilter(req.body);
        res.json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

