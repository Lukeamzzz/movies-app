import api from "../api";

const getPopularMovies = async(page: number = 1) => {
    try {
      const res = await api.get(`/movie/popular?language=en-US&page=${page}`);
      return res.data;
    }
    catch (err) {
      console.error('Error fetching popular movies:', err);
      throw err;
    }
};

export default getPopularMovies;