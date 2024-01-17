"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

import Auth from "@/components/Auth";

import { GenresData, PopularMovies } from "@/types";
import ScrollGrid from "@/components/ScrollGrid";

export default function Home() {
  const {
    data: genresData,
    error: genresError,
    isLoading: isGenresLoading,
    isError: isGenresError,
  } = useQuery<GenresData>({
    queryKey: ["genres"],
    queryFn: api.getGenres,
  });

  const { data: popularMoveiesData } = useQuery<PopularMovies[]>({
    queryKey: ["popularMovies"],
    queryFn: api.getPopularMovies,
  });

  const { data: upcomingMoviesData } = useQuery<PopularMovies[]>({
    queryKey: ["upcomingMovies"],
    queryFn: api.getUpcomingMovies,
  });

  if (isGenresLoading) return <div>Loading...</div>;

  if (isGenresError) return <span>{genresError.message}</span>;

  return (
    <div>
      <div className="pl-4">
        <span className="text-2xl">Popular Movies</span>
        <ScrollGrid type="movie" data={popularMoveiesData ?? []} />
      </div>

      <div className="pl-4">
        <span className="text-2xl">Upcoming</span>
        <ScrollGrid type="movie" data={upcomingMoviesData ?? []} />
      </div>

      <Auth />
    </div>
  );
}
