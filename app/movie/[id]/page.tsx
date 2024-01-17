"use client";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import { MovieData } from "@/types";
type Params = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Params) {
  const {
    data: movieData,
    error: movieError,
    isError: isMovieError,
    isLoading: isMovieLoading,
  } = useQuery<MovieData>({
    queryKey: ["movie"],
    queryFn: () => api.getMovie(params?.id),
    enabled: !!params?.id,
  });

  console.log(movieData, "movieData");

  return (
    <div>
      <span>{movieData?.original_title}</span>
      <ul className="flex flex-row gap-2">
        {movieData?.genres?.map((el, index) => (
          <li key={index}>{el.name}</li>
        ))}
      </ul>
    </div>
  );
}
