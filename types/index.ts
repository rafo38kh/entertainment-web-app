export type MoviesData = {
  id: number;
  results: MovieData[];
};

export type MovieData = {
  adult: boolean;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;

  // ...
};

export type GenresData = {
  genres: GenreData[];
};

export type GenreData = {
  id: number;
  name: string;
};
