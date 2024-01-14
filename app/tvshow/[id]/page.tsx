"use client";

import { useQuery } from "@tanstack/react-query";
import { TVShowData } from "@/types";
import api from "@/lib/api";

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

  console.log("tvData", tvData);

  return <div>{tvData?.overview}</div>;
}
