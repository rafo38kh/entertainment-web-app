"use client";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";
import { GenresData, MoviesData } from "@/types";

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

  // const { data: moveiesData } = useQuery<MoviesData>({
  //   queryKey: ["movies"],
  //   queryFn: api.getMovies,
  // });
  const { data: moveiesData } = useQuery<MoviesData>({
    queryKey: ["movies"],
    queryFn: api.getMovies,
  });

  console.log("Movies", moveiesData?.results.at(0));

  const movie = moveiesData?.results;

  if (isGenresError)
    return (
      <div>
        <span>{genresError.message}</span>
      </div>
    );

  if (isGenresLoading) return <div>Loading...</div>;

  return (
    <div>
      {/* {genresData?.genres?.map((genre) => (
        <span key={genre?.id}>{genre?.name}</span>
      ))} */}
      <div className="grid grid-cols-5 grid-rows-5">
        {movie?.map((el) => (
          <div key={el.id} className="flex flex-col gap-2">
            <span>{el.title}</span>
            <span>{el.release_date}</span>
            <span>{el.original_language}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
