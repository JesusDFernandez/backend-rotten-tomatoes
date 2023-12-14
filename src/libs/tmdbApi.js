import { AUTHORIZATION_API_KEY } from "../config.js";

export async function getContents(type = "movie", page = 1) {

    const URL_MOVIES_PAGE = `https://api.themoviedb.org/3/${type}/popular?&page=${page}&language=es`;

    const options = {
        method: 'GET',
        headers: { accept: 'application/json', Authorization: AUTHORIZATION_API_KEY }
    };

    try {

        const response = await fetch(URL_MOVIES_PAGE, options);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('error:' + error);

    }

}


export async function getContent(filter) {

    const URL_MOVIE_ID = `https://api.themoviedb.org/3/${filter.type}/${filter.id}?language=es`;

    const options = {
        method: 'GET',
        headers: { accept: 'application/json', Authorization: AUTHORIZATION_API_KEY }
    };

    try {

        const response = await fetch(URL_MOVIE_ID, options);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('error:' + error);

    }


}


export async function getContentVideoId(filter) {

    const URL_VIDEO = `https://api.themoviedb.org/3/${filter.type}/${filter.id}/videos?language=es`;

    const options = {
        method: 'GET',
        headers: { accept: 'application/json', Authorization: AUTHORIZATION_API_KEY }
    };

    try {

        const response = await fetch(URL_VIDEO, options);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('error:' + error);

    }

}


export async function getContentFilter(filter) {

    let URL_FILTER = "";

    if (filter.type === "movie") {
        URL_FILTER = `https://api.themoviedb.org/3/discover/movie?primary_release_year=${filter.year}&with_genres=${filter.genres}&with_runtime.gte=${filter.from}&with_runtime.lte=${filter.to}&page=${filter.page}&language=es`;

    }

    if (filter.type === "tv") {

        URL_FILTER = `https://api.themoviedb.org/3/discover/tv?first_air_date_year=${filter.year}&with_genres=${filter.genres}&with_runtime.gte=${filter.from}&with_runtime.lte=${filter.to}&page=${filter.page}&language=es`;

    }

    const options = {
        method: 'GET',
        headers: { accept: 'application/json', Authorization: AUTHORIZATION_API_KEY }
    };

    try {

        const response = await fetch(URL_FILTER, options);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('error:' + error);

    }
}


export async function getContentGenre(type) {

    const URL_GENRE = `https://api.themoviedb.org/3/genre/${type}/list?language=es`;

    const options = {
        method: 'GET',
        headers: { accept: 'application/json', Authorization: AUTHORIZATION_API_KEY }
    };

    try {

        const response = await fetch(URL_GENRE, options);
        const data = await response.json();
        return data

    } catch (error) {
        console.error('error:' + error);

    }
}



export async function getContentQueryFilter(filter) {

    const URL_FILTER = `https://api.themoviedb.org/3/search/multi?&query=${filter.query}&page=${filter.page}&language=es`;

    const options = {
        method: 'GET',
        headers: { accept: 'application/json', Authorization: AUTHORIZATION_API_KEY }
    };

    try {

        const response = await fetch(URL_FILTER, options);
        const data = await response.json();
        return data

    } catch (error) {
        console.error('error:' + error);

    }
}

