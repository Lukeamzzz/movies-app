import api from "../api";

// This function allows a user to mark or unmark a movie as a favorite by sending a POST request to the API
export const markAsFavorite = async (
    movieId: number,
    favorite: boolean,
    guestSessionId: string
) => {
    try {
        const body = {
            media_type: 'movie',
            media_id: movieId,
            favorite
        };

        // Send a POST request to mark or unmark a movie as a favorite
        // The request body includes all the necessary data specified by the API
        // The API will process the request for the given 'guestSessionId'
        const { data } = await api.post(`/account/${guestSessionId}/favorite`, body); 
        return data;
    }
    catch (err) {
        throw err;
    }
};