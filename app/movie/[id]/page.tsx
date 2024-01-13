"use client";
import { useQuery } from "@tanstack/react-query";
import { MoviesData } from "@/types";
import api from "@/lib/api";

type Params = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Params) {
  const { data: moveiesData } = useQuery<MoviesData>({
    queryKey: ["movies"],
    queryFn: api.getMovies,
  });

  const movies = moveiesData?.results;

  const { data: movie } = useQuery({
    queryKey: ["movie"],
    queryFn: (id) => console.log(id),
  });

  return <div></div>;
}
