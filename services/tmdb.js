// services/tmdb.js
import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants?.expoConfig?.extra?.tmdbApiKey;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}${url}&api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.log('TMDb fetch error:', error.response?.data || error.message);
    return [];
  }
};

export const getPopularMovies = () => fetchMovies('/movie/popular?language=en-US&page=1');
export const getTopRatedMovies = () => fetchMovies('/movie/top_rated?language=en-US&page=1');
export const getMoviesByGenre = (genreId) => fetchMovies(`/discover/movie?with_genres=${genreId}&language=en-US&page=1`);
export const getAnimeMovies = () =>
  fetchMovies(`/discover/movie?with_genres=16&with_original_language=ja&language=en-US&page=1`);
export const getBlockbusterMovies = () =>
  fetchMovies(`/discover/movie?sort_by=popularity.desc&vote_count.gte=1000&language=en-US&page=1`);
export const getMovieDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  return res.data;
};

export const getMovieTrailerLink = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
  const trailers = res.data.results.filter(v => v.type === 'Trailer' && v.site === 'YouTube');
  return trailers.length > 0 ? `https://www.youtube.com/watch?v=${trailers[0].key}` : null;
};
export const getSimilarMovies = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
  return res.data.results;
};