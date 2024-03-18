"use client";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import CardList from "@/components/CardList";
import ScrollGrid from "@/components/ScrollGrid";

import { PopularMovies, MoviesData, TVShowsData } from "@/types";

export default function Home() {
  const initialFilterOptions = {
    adult: false,
    language: "en-US",
    year: 2023,
    genre: null,
    page: 1,
  };

  const {
    data: upcomingMoviesData,
    error: upcomingMoviesError,
    isError: isUpcomingMoviesError,
    isLoading: isUpcomingMoviesLoading,
  } = useQuery<PopularMovies[]>({
    queryKey: ["upcomingMovies"],
    queryFn: api.getUpcomingMovies,
  });

  const {
    data: nowPlayingMoviesData,
    error: nowPlayingMoviesError,
    isError: isNowPlayingMoviesError,
    isLoading: isNowPlayingMoviesLoading,
  } = useQuery<PopularMovies[]>({
    queryKey: ["nowPlayingMovies"],
    queryFn: api.getNowPlayingMovies,
  });

  const {
    data: moveiesData,
    error: moviesError,
    isError: isMoviesError,
    isLoading: isMoviesLoading,
  } = useQuery<MoviesData>({
    queryKey: ["movies", initialFilterOptions],
    queryFn: () => api.getFilteredMovies(initialFilterOptions),
  });

  const {
    data: tvShowData,
    error: tvShowError,
    isError: isTvShowError,
    isLoading: isTvShowLoading,
  } = useQuery<TVShowsData>({
    queryKey: ["tvshows", initialFilterOptions],
    queryFn: () => api.getFilteredShows(initialFilterOptions),
  });

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="pl-4">
          <span className="text-2xl lg:text-4xl">Upcoming</span>

          <ScrollGrid
            type="movie"
            data={upcomingMoviesData ?? []}
            isLoading={isUpcomingMoviesLoading}
          />
        </div>
        <div className="pl-4">
          <span className="text-2xl lg:text-4xl">Now Playing</span>

          <ScrollGrid
            type="movie"
            data={nowPlayingMoviesData ?? []}
            isLoading={isNowPlayingMoviesLoading}
          />
        </div>
      </div>

      <CardList type="movie" data={moveiesData} />
      <CardList type="tvshow" data={tvShowData} />
    </>
  );
}
