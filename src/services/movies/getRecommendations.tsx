import api from "../api";

const getRecommendations = async (movie_id: number) => {
    try {
        const { data } = await api.get(`movie/${movie_id}/recommendations?language=en-US&page=1`);
        return data;
    }
    catch (err){
        console.error("Error fetching recommendations:", err);
        throw err;
    }
};

export default getRecommendations;