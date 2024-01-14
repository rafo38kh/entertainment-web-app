"use client";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import { TVData } from "@/types";
import Link from "next/link";

export default function TvShowsPage() {
  const {
    data: tvShowsData,
    error: TVShowsError,
    isError: isTVShowsError,
    isLoading: isTVShowsLoading,
  } = useQuery<TVData[]>({
    queryKey: ["shows"],
    queryFn: api.getTvShows,
  });

  //   const tvShow = tvData.results;

  //   console.log("tvShowsData", tvShowsData);

  return (
    <div className="grid grid-cols-3">
      {tvShowsData?.map((show) => (
        <Link
          href={`/tvshow/${show?.id}`}
          key={show?.id}
          className="flex flex-col gap-2 border"
        >
          <span>{show?.name}</span>
          <span>{show?.original_language}</span>
        </Link>
      ))}
    </div>
  );
}
