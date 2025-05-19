import api from "../api";

export const getDirectorByName = async (name: string) => {
    try{
        const { data } = await api.get(`/search/person?query=${encodeURIComponent(name)}&include_adult=false&language=en-US&page=1`);
        return data;
    }
    catch (err){
        console.error("Error fetching director by name:", err);
        throw err;
    }
}