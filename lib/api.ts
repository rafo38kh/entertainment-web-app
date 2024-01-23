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
} from "@/types";

export const axiosFetch: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

axiosFetch.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers[
    "Authorization"
  ] = `Bearer ${process.env.NEXT_PUBLIC_API_AUTH}`;

  return config;
});

const getGenres = async () => {
  const response = await axiosFetch.get<GenresData>(
    `/genre/movie/list?language=en`
  );
  return response.data;
};

const getMovies = async () => {
  const response = await axiosFetch.get<MoviesData>(
    `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
  );
  return response.data?.results;
};

const getMovie = async (id: string) => {
  const response = await axiosFetch.get<MovieData>(
    `/movie/${id}?language=en-US`
  );
  return response.data;
};

const getMovieImages = async (id: number | undefined) => {
  const response = await axiosFetch.get<MovieImages>(`/movie/${id}/images`);
  return response.data;
};

const getTvShows = async () => {
  const response = await axiosFetch.get<{
    results: TVData[];
  }>(
    `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`
  );
  return response.data?.results;
};

const getTvShow = async (id: string) => {
  const response = await axiosFetch.get<TVShowData>(`/tv/${id}?language=en-US`);
  return response.data;
};

const getTVShowImages = async (id: number | undefined) => {
  const response = await axiosFetch.get<TVShowImages>(`/tv/${id}/images`);
  return response.data;
};

const getPopularMovies = async () => {
  const response = await axiosFetch.get<{ results: PopularMovies[] }>(
    "movie/popular?language=en-US&page=1"
  );
  return response.data?.results;
};

const getUpcomingMovies = async () => {
  const response = await axiosFetch.get<{ results: PopularMovies[] }>(
    "movie/upcoming?language=en-US&page=1"
  );
  return response.data?.results;
};

const getNowPlayingMovies = async () => {
  const response = await axiosFetch.get<{ results: PopularMovies[] }>(
    "movie/now_playing?language=en-US&page=1"
  );
  return response.data?.results;
};

const getMovieGeneres = async () => {
  const response = await axiosFetch.get<GenresData>(
    "/genre/movie/list?language=en"
  );
  return response.data?.genres || [];
};

const getMovieLanguages = async () => {
  const response = await axiosFetch.get<Languages[]>(
    `/configuration/languages`
  );
  return response?.data || [];
};

const multiSearch = async (query: string) => {
  const response = await axiosFetch.get<{ results: MultiSearchData[] }>(
    `search/multi?query=${query}&include_adult=true&language=en-US&page=1`
  );
  return response.data?.results;
};

const getFilteredMovies = async ({
  page = 1,
  year = 2024,
  adult = false,
  genre = "action",
  language = "en-US",
}) => {
  try {
    const queryString = `discover/movie?include_adult=${adult}&include_video=false&language=${language}&page=${page}&primary_release_year=${year}&sort_by=popularity.desc&with_genres=${genre}`;

    const response = await axiosFetch.get<MoviesData>(queryString);

    return response?.data?.results || [];
  } catch (error) {
    console.error("Error fetching filtered movies:", error);
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
};

export default api;
