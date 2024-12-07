import axios from 'axios';

const API_KEY= 'live_lmTT17ssQ5FyAfdcpIvAXQwC2cPny4rPkAmyFK7WI0hU0dAYEALkf3p0JEJlJdHv';
const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: { "x-api-key": API_KEY },
});

export const fetchCats = async (limit = 10) => {
  return (await api.get(`images/search?limit=${limit}`)).data;
};

export const fetchBreeds = async () => (await api.get('breeds')).data

export const fetchBreedById = async (breedId) => {
    return await api.get(`breeds/${breedId}`)
}

export const fetchFavorites = async () => (await api.get('favourites')).data;

export const addFavorite = async (image_id, sub_id = 'Konstantinos') => {
  return await api.post("favourites", { image_id, sub_id });
};

export const removeFavorite = async (favoriteId) => {
  return await api.delete(`favourites/${favoriteId}`);
};

export const fetchImagesByBreed = async (breedId) => (await api.get(`images/search?breed_ids=${breedId}`)).data;