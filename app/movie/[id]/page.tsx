"use client";

import { useQuery } from "@tanstack/react-query";
import { MovieData } from "@/types";
import api from "@/lib/api";

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
    </div>
  );
}
