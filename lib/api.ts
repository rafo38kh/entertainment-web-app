import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import {
  GenresData,
  MovieData,
  MoviesData,
  MultiSearchData,
  PopularMovies,
  TVData,
  TVShowData,
  MovieImages,
  TVShowImages,
  Languages,
  TVShowsData,
} from "@/types";

export const axiosFetch: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

type Filters = {
  page: number;
  year: number | null;
  adult: boolean;
  genre: string | null;
  language: string;
};

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// axiosFetch.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   config.headers[
//     "Authorization"
//   ] = `Bearer ${process.env.NEXT_PUBLIC_API_AUTH}`;

//   return config;
// });

console.log("API Key:", process.env.NEXT_PUBLIC_API_KEY);
console.log("API Auth:", process.env.NEXT_PUBLIC_API_AUTH);

const getGenres = async () => {
  const response = await axiosFetch.get<GenresData>(
    `/genre/movie/list?language=en`
  );
  return response.data;
};

const getMovies = async () => {
  const response = await axiosFetch.get<MoviesData>(
    `/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
  );
  return response.data?.results;
};

const getMovie = async (id: string) => {
  const response = await axiosFetch.get<MovieData>(
    `/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

const getMovieImages = async (id: number | undefined) => {
  const response = await axiosFetch.get<MovieImages>(
    `/movie/${id}/images?api_key=${API_KEY}`
  );
  return response.data;
};

const getTvShows = async () => {
  const response = await axiosFetch.get<{
    results: TVData[];
  }>(
    `/discover/tv?api_key=${API_KEY}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`
  );
  return response.data?.results;
};

const getTvShow = async (id: string) => {
  const response = await axiosFetch.get<TVShowData>(
    `/tv/${id}?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

const getTVShowImages = async (id: number | undefined) => {
  const response = await axiosFetch.get<TVShowImages>(
    `/tv/${id}/images?api_key=${API_KEY}`
  );
  return response.data;
};

const getPopularMovies = async () => {
  const response = await axiosFetch.get<{ results: PopularMovies[] }>(
    `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data?.results;
};

const getUpcomingMovies = async () => {
  const response = await axiosFetch.get<{ results: PopularMovies[] }>(
    `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data?.results;
};

const getNowPlayingMovies = async () => {
  const response = await axiosFetch.get<{ results: PopularMovies[] }>(
    `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data?.results;
};

const getOnTheAir = async () => {
  const response = await axiosFetch.get<{ results: TVData[] }>(
    `/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data?.results || [];
};

const getMovieGeneres = async () => {
  const response = await axiosFetch.get<GenresData>(
    `/genre/movie/list?api_key=${API_KEY}&language=en`
  );
  return response.data?.genres || [];
};

const getMovieLanguages = async () => {
  const response = await axiosFetch.get<Languages[]>(
    `/configuration/languages?api_key=${API_KEY}`
  );
  return response?.data || [];
};

const getMovieTeasers = async (movieType: string, id: number | undefined) => {
  const response = await axiosFetch.get<{
    results: { type: string; key: string }[];
  }>(`/${movieType}/${id}/videos?api_key=${API_KEY}&language=en-US`);
  return response?.data || [];
};

const multiSearch = async (query: string) => {
  const response = await axiosFetch.get<{ results: MultiSearchData[] }>(
    `/search/multi?api_key=${API_KEY}&query=${query}&include_adult=true&language=en-US&page=1`
  );
  return response.data?.results;
};

const getFilteredMovies = async ({
  page,
  year,
  adult,
  genre,
  language,
}: Filters) => {
  try {
    const queryString =
      genre != null
        ? `/discover/movie?api_key=${API_KEY}&include_adult=${adult}&include_video=false&language=${language}&page=${page}&primary_release_year=${year}&sort_by=popularity.desc&with_genres=${genre}`
        : `/discover/movie?api_key=${API_KEY}&include_adult=${adult}&include_video=false&language=${language}&page=${page}&sort_by=popularity.desc&year=${year}`;

    const response = await axiosFetch.get<MoviesData>(queryString);

    return response?.data;
  } catch (error) {
    console.error("Error fetching filtered movies:", error);
    throw error;
  }
};

const getFilteredShows = async ({
  page,
  year,
  adult,
  genre,
  language,
}: Filters) => {
  try {
    const queryString =
      genre != null
        ? `/discover/tv?api_key=${API_KEY}&first_air_date_year=${year}&include_adult=${adult}&include_null_first_air_dates=false&language=${language}&page=${page}&sort_by=popularity.desc&without_genres=${genre}`
        : `/discover/tv?api_key=${API_KEY}&include_adult=${adult}&include_null_first_air_dates=false&language=${language}&page=${page}&sort_by=popularity.desc&year=${year}`;

    const response = await axiosFetch.get<TVShowsData>(queryString);

    return response?.data;
  } catch (error) {
    console.error("Error fetching filtered TVShows:", error);
    throw error;
  }
};

const api = {
  getMovie,
  getGenres,
  getMovies,
  getTvShow,
  getTvShows,
  multiSearch,
  getPopularMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMovieImages,
  getTVShowImages,
  getFilteredMovies,
  getMovieGeneres,
  getMovieLanguages,
  getFilteredShows,
  getOnTheAir,
  getMovieTeasers,
};

export default api;
