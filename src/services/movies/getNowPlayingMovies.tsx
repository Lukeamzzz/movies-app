import api from "../api";

const getNowPlayingMovies = async (page: number = 1) => {
    try {
        const res = await api.get(`/movie/now_playing?language=en-US&page=${page}`);
        return res.data;
    }
    catch (err){
        console.error('Error fetching now playing movies:', err);
        throw err;
    }
};

export default getNowPlayingMovies;