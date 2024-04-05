"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import ScrollGrid from "@/components/ScrollGrid";
import Pagination from "@/components/Pagination";
import GenresFilter from "@/components/GenresFilter";
import CardLoading from "@/components/CardLoading";

import { FilterOptions, PopularMovies, MoviesData } from "@/types";
import CardList from "@/components/CardList";

export default function MoviesPage() {
  const initialFilterOptions: FilterOptions = {
    adult: false,
    language: "en-US",
    year: null,
    genre: null,
    page: 1,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(initialFilterOptions);

  const {
    data: moveiesData,
    error: moviesError,
    isError: isMoviesError,
    isLoading: isMoviesLoading,
  } = useQuery<MoviesData>({
    queryKey: ["movies", filterOptions],
    queryFn: () => api.getFilteredMovies(filterOptions),
  });

  const {
    data: popularMoveiesData,
    error: popularMoveiesError,
    isError: isPopularMoveiesError,
    isLoading: isPopularMoveiesLoading,
  } = useQuery<PopularMovies[]>({
    queryKey: ["popularMovies"],
    queryFn: api.getPopularMovies,
  });

  useEffect(() => {
    setFilterOptions((prevState) => ({
      ...prevState,
      page: currentPage,
    }));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  if (isMoviesError) return <span>{moviesError?.message}</span>;

  if (isPopularMoveiesError) return <span>{popularMoveiesError?.message}</span>;

  return (
    <div>
      <GenresFilter
        isFilterOpen={isFilterOpen}
        filterOptions={filterOptions}
        setIsFilterOpen={setIsFilterOpen}
        setFilterOptions={setFilterOptions}
      />
      <div className="pl-4 my-4">
        <span className="text-2xl lg:text-4xl">Popular Movies</span>

        <ScrollGrid
          type="movie"
          data={popularMoveiesData ?? []}
          isLoading={isPopularMoveiesLoading}
        />
      </div>

      {isMoviesLoading ? (
        <CardLoading />
      ) : (
        <CardList type="movie" data={moveiesData} />
      )}
      <Pagination
        siblingCount={1}
        onPageChange={setCurrentPage}
        currentPage={filterOptions?.page}
        totalCount={moveiesData?.total_pages}
        pageSize={moveiesData?.results?.length || 20}
      />
    </div>
  );
}
