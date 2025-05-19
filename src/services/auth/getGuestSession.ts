import api from "../api";

export const getGuestSession = async() => {
    try {
        const { data } = await api.get('/authentication/guest_session/new'); // This url is from the TMDB API documentation
        return data;
    }
    catch (err){
        throw err;
    }
};