"use client";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import { TVShowData } from "@/types";
type Params = {
  params: {
    id: string;
  };
};

export default function TvShowPage({ params }: Params) {
  const {
    data: tvData,
    error: TVShowError,
    isError: isTVShowError,
    isLoading: isTVShowLoading,
  } = useQuery<TVShowData>({
    queryKey: ["show"],
    queryFn: () => api.getTvShow(params?.id),
  });

  return <div>{tvData?.overview}</div>;
}
