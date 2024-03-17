"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import ScrollGrid from "@/components/ScrollGrid";
import CardLoading from "@/components/CardLoading";
import Pagination from "@/components/Pagination";
import GenresFilter from "@/components/GenresFilter";

import { FilterOptions, TVShowsData, TVData } from "@/types";
import CardList from "@/components/CardList";

export default function TvShowsPage() {
  const initialFilterOptions: FilterOptions = {
    page: 1,
    year: null,
    adult: false,
    genre: null,
    language: "en-US",
  };

  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(initialFilterOptions);

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    data: tvShowData,
    error: tvShowError,
    isError: isTvShowError,
    isLoading: isTvShowLoading,
  } = useQuery<TVShowsData>({
    queryKey: ["tvshows", filterOptions],
    queryFn: () => api.getFilteredShows(filterOptions),
  });

  const {
    data: onTheAirData,
    error: onTheAirDataError,
    isError: isOnTheAirDataError,
    isLoading: isOnTheAirDataLoading,
  } = useQuery<TVData[]>({
    queryKey: ["shows"],
    queryFn: api.getOnTheAir,
  });

  useEffect(() => {
    setFilterOptions((prevState) => ({
      ...prevState,
      page: currentPage,
    }));
  }, [currentPage]);

  return (
    <>
      <GenresFilter
        isFilterOpen={isFilterOpen}
        filterOptions={filterOptions}
        setIsFilterOpen={setIsFilterOpen}
        setFilterOptions={setFilterOptions}
      />
      <div className="pl-4 my-4">
        <span className="text-2xl">On The Air</span>
        <ScrollGrid
          type="tv"
          data={onTheAirData ?? []}
          isLoading={isOnTheAirDataLoading}
        />
      </div>

      {isTvShowLoading ? (
        <CardLoading />
      ) : (
        <CardList type="tvshow" data={tvShowData} />
      )}

      <Pagination
        siblingCount={1}
        onPageChange={setCurrentPage}
        currentPage={filterOptions?.page}
        totalCount={tvShowData?.total_pages}
        pageSize={tvShowData?.results?.length || 20}
      />
    </>
  );
}
