import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { GenresData, MovieData, MoviesData } from "@/types";

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
    `/movie/popular?language=en-US&page=1`
  );
  return response.data;
};

const api = {
  getGenres,
  getMovies,
};

export default api;
