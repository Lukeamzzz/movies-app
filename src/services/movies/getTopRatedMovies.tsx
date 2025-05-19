import api from "../api";

const getTopRatedMovies = async (page: number = 1) => {
    try {
        const res = await api.get(`/movie/top_rated?language=en-US&page=${page}`);
        return res.data;
    }
    catch (err) {
        console.error('Error fetching top rated movies:', err);
        throw err;
    }
};

export default getTopRatedMovies;