"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

import api from "@/lib/api";

import ScrollGrid from "@/components/ScrollGrid";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import {
  FilterOptions,
  PopularMovies,
  GenreData,
  MoviesData,
  Languages,
} from "@/types";
import Pagination from "@/components/Pagination";

export default function page() {
  const parsedUser = useGetUsersInfo();
  const { addBookmarks } = useBookmarks();

  const initialFilterOptions: FilterOptions = {
    page: 1,
    year: 2020,
    adult: false,
    genre: "35",
    language: "en-US",
  };

  const emptyArray = Array.from({ length: 9 }, (_, index) => index + 1);

  console.log("emptyArray", emptyArray);

  const [pagesCount, setPagesCount] = useState(emptyArray);

  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(initialFilterOptions);

  const {
    data: genresData,
    error: genresError,
    isError: isGenresError,
    isLoading: isGenresLoading,
  } = useQuery<GenreData[]>({
    queryKey: ["genres"],
    queryFn: api.getMovieGeneres,
  });

  const { data: moveiesData } = useQuery<MoviesData["results"]>({
    queryKey: ["movies", filterOptions],
    queryFn: () => api.getFilteredMovies(filterOptions),
  });

  const { data: popularMoveiesData } = useQuery<PopularMovies[]>({
    queryKey: ["popularMovies"],
    queryFn: api.getPopularMovies,
  });

  const { data: movieLanguages } = useQuery<Languages[]>({
    queryKey: ["languages"],
    queryFn: api.getMovieLanguages,
  });

  const handlePastPage = () => {
    if (filterOptions?.page === 1) return;
    setFilterOptions((prevState) => ({
      ...prevState,
      page: prevState.page - 1,
    }));
  };
  const handlePreviousPage = () => {
    if (filterOptions?.page === 42089) return;

    setFilterOptions((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };
  const handleChangePage = (page: number) => {
    setFilterOptions((prevState) => ({
      ...prevState,
      page: page,
    }));
  };

  const handleChangeToAdoult = () => {
    setFilterOptions((prevState) => ({
      ...prevState,
      adult: !prevState?.adult,
    }));
  };

  useEffect(() => {
    // console.log("emptyArray", emptyArray);
    // console.log("filterOptions?.page", filterOptions?.page);
    // console.log("emptyArray.length", emptyArray.length);
    console.log("pagesCount", pagesCount);
    // console.log(Math.min(...pagesCount), "min number");

    // const array = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    // const newarray = array.map((el) => el - 1);
    // console.log("newarray", newarray);
    // console.log("array", array);
    if (filterOptions?.page === Math.min(...pagesCount)) return;

    const minNum = Math.min(...pagesCount);

    if (filterOptions?.page === minNum) {
      console.log("equal");
      const newCount = pagesCount.map((el) => el - 8);
      console.log("newCount", newCount);
      setPagesCount(newCount);
    }

    if (filterOptions?.page === Math.min(...pagesCount)) {
      // setPagesCount((prevState) => prevState.map((el) => el - 8));
      const newCount = pagesCount.map((el) => el - 1);
      console.log("newCount", newCount);

      // setPagesCount(newCount);
    }

    if (filterOptions?.page === Math.max(...pagesCount)) {
      setPagesCount((prevState) => prevState.map((el) => el + 8));
    }
  }, [filterOptions?.page]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilterOptions((prevState) => ({
      ...prevState,
      page: currentPage,
    }));
  }, [currentPage]);

  return (
    <div>
      <div>
        <select
          value={filterOptions.genre}
          onChange={(e) =>
            setFilterOptions((prevState) => ({
              ...prevState,
              genre: e.target.value,
            }))
          }
          className="text-slate-900"
        >
          <option value="">All Genres</option>
          {genresData?.map((genre) => (
            <option key={genre.id} value={genre?.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <button className="px-4 " onClick={() => handleChangeToAdoult()}>
          18+
        </button>
      </div>

      <div className="pl-4 my-4">
        <span className="text-2xl">Popular Movies</span>
        <ScrollGrid type="movie" data={popularMoveiesData ?? []} />
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-4 p-4">
        {moveiesData?.map((movie) => (
          <li className="flex flex-col items-start " key={movie?.id}>
            <div className="relative w-full">
              <Image
                className="w-full rounded-lg "
                width={100}
                height={100}
                alt={movie?.backdrop_path || ""}
                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              />
              <button
                className="absolute top-4 right-4 aspect-square rounded-full bg-black/35 flex items-center justify-center p-3"
                type="button"
                onClick={() => {
                  if (movie?.id && parsedUser?.userID) {
                    addBookmarks(movie?.id, parsedUser?.userID, "movie");
                  }
                }}
              >
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                    stroke="#FFF"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </button>
            </div>

            <Link
              href={`/movie/${movie?.id}`}
              className="w-full h-full flex flex-col  gap-2"
            >
              <div className="flex flex-row gap-2 text-xs text-white/70">
                <span>{movie?.release_date.slice(0, 4)}</span>
                <span>{movie?.original_language}</span>
                <span>{movie?.adult && "18+"}</span>
              </div>

              <span className=" text-white font-medium text-[15px] truncate">
                {movie?.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        totalCount={4300}
        siblingCount={1}
        onPageChange={setCurrentPage}
        currentPage={filterOptions?.page}
        pageSize={moveiesData?.length || 20}
      />
    </div>
  );
}
