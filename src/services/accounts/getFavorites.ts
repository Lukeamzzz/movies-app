import api from "../api";

export const getFavorites = async ( guestSessionId: string, page: number ) => {
    try {
        // Send a GET request to obtain the list of favorite movies for the given 'guestSessionId'
        const { data } = await api.get(`/account/${guestSessionId}/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`)
        return data;
    }
    catch (err) {
        throw err;
    }
};