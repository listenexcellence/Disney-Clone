// services/tmdb.js
import axios from 'axios';

const API_KEY =  "b59ba04932b5756b9cf7e718c3064cc9" || process.env.TMDB_API_KEY;
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
export const getMarvelMovies = () =>
  fetchMovies(`/search/movie?query=marvel&language=en-US&page=1`);
