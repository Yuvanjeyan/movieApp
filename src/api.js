import axios from 'axios';
const API_KEY = "efcb28cf";
const API_URL = "http://www.omdbapi.com/";

export const SearchMovie = async (searchTerm, type = "", page = 1) => {
    try {
        // const response = await axios.get(`${API_URL}?s=${searchTerm}&type=${type}&apikey=${API_KEY}`);
        // return response.data;
        const response = await axios.get(API_URL, {
            params: {
                s: searchTerm,
                type,
                page,
                apikey: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie data:", error);
        return []
    }
}

export const MovieDetails = async (id) => {
    try {
        // const response = await axios.get(`${API_URL}?i=${id}&apikey=${API_KEY}`);
        // return response.data;    
        const response = await axios.get(API_URL, {
            params: {
                i: id,
                apikey: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return []
    }
}