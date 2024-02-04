"use client";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import Auth from "@/components/Auth";
import ScrollGrid from "@/components/ScrollGrid";

import { GenresData, PopularMovies } from "@/types";
import ScrollGridLoading from "@/components/ScrollGridLoading";

export default function Home() {
  const {
    data: genresData,
    error: genresError,
    isError: isGenresError,
    isLoading: isGenresLoading,
  } = useQuery<GenresData>({
    queryKey: ["genres"],
    queryFn: api.getGenres,
  });

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

  if (isGenresError) return <span>{genresError.message}</span>;

  return (
    <div className="flex flex-col gap-8">
      <div className="pl-4">
        <span className="text-2xl">Upcoming</span>
        {isUpcomingMoviesLoading ? (
          <ScrollGridLoading />
        ) : (
          <ScrollGrid type="movie" data={upcomingMoviesData ?? []} />
        )}
      </div>

      <div className="pl-4">
        <span className="text-2xl">Now Playing</span>
        {isNowPlayingMoviesLoading ? (
          <ScrollGridLoading />
        ) : (
          <ScrollGrid type="movie" data={nowPlayingMoviesData ?? []} />
        )}
      </div>

      <Auth />
    </div>
  );
}
