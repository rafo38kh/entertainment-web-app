export type User = {
  name: string;
  email: string;
  userID: string;
  isAuth: boolean;
  profilePhoto: string;
};

export type MovieBookmark = {
  docId: string;
  movie: string;
  userID: string;
  movieId: string;
  type: "movie" | "tv";
};

export type GeneralTypes = {
  id: number;
  adult: boolean;
  docId?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  original_language: string;
};

export type MoviesData = {
  id: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
};

export type MovieData = {
  title: string;
  status: string;
  runtime: number;
  homepage: string;
  original_title: string;
  release_date: string;
  genres: GenreData[];
  genre_ids: number[];
} & GeneralTypes;

export type TVShowsData = {
  page: number;
  total_pages: number;
  results: TVShowData[];
  total_results: number;
};

export type TVData = {
  name: string;
  genre_ids: number[];
  total_pages: number;
  total_results: number;
  original_name: string;
  first_air_date: string;
} & GeneralTypes;

export type TVShowData = {
  adult: string;
  episode_run_time: number[];
  first_air_date: string;
  genres: GenreData[];
  homepage: string;
  id: number;
  name: string;
  overview: string;
  popularity: number;
  poster_path: string | undefined;
  original_language: string;
  backdrop_path: string;
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

export type MovieImages = {
  backdrops: {
    aspect_ratio: number;
    height: number;
    iso_639_1: boolean;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
};

export type Languages = {
  iso_639_1: string;
  english_name: string;
  name: string;
}[];

export type TVShowImages = {
  poster_path: string;
} & MovieImages;

export type PopularMovies = Pick<
  MovieData,
  "id" | "adult" | "backdrop_path" | "title" | "release_date"
>;

export type MultiSearchData = Pick<
  PopularMoviesData,
  "id" | "adult" | "poster_path"
> & {
  media_type: "tv" | "movie";
  original_name: string;
  original_language: string;
  name?: string;
  title?: string;
  release_date?: string;
  first_air_date?: string;
};

export type FilterOptions = {
  adult: boolean;
  language: string;
  year: number | null;
  genre: string | null;
  page: number;
};
