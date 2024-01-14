export type User = {
  name: string;
  email: string;
  userID: string;
  isAuth: boolean;
  profilePhoto: string;
};

export type MovieBookmark = {
  docId: string;
  userID: string;
  movieId: number;
};

export type GeneralTypes = {
  id: number;
  adult: boolean;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  original_language: string;
};

export type MoviesData = {
  id: number;
  results: MovieData[];
};

export type MovieData = {
  title: string;
  status: string;
  runtime: number;
  homepage: string;
  original_title: string;
  release_date: string;
  genres: GenreData[];
} & GeneralTypes;

export type TVData = {
  name: string;
  genre_ids: number[];
  original_name: string;
} & GeneralTypes;

export type TVShowData = {
  episode_run_time: number[];
  first_air_date: string;
  genres: GenreData[];
  homepage: string;
  // last_episode_to_air: {
  //   id: number;
  //   name: string;
  //   overview: string;
  //   still_path: string;
  //   season_number: number;
  //   episode_number: number;
  // };
  name: string;
  // origin_country: string[];
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
  }[];
  seasons: {
    id: number;
    episode_count: number;
    name: string;
    overview: string;
    poster_path: string;
  }[];
};

export type GenresData = {
  genres: GenreData[];
};

export type GenreData = {
  id: number;
  name: string;
};

export type PopularMoviesData = {
  id: number;
  adult: boolean;
  poster_path: string;
  release_date?: string;
  original_title: string;
  first_air_date?: string;
};

export type PopularMovies = Pick<
  MovieData,
  "id" | "adult" | "backdrop_path" | "title" | "release_date"
>;
