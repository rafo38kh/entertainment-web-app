"use client";
import ShowAndMovie from "@/components/ShowAndMovie";

type Params = {
  params: {
    id: string;
  };
};

export default function TvShowPage({ params }: Params) {
  return <ShowAndMovie tvShowId={params.id} />;
}
