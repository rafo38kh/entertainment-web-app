"use client";

import { Dispatch, SetStateAction } from "react";

import { GenreData, FilterOptions } from "@/types";

type GenresFilterProps = {
  isFilterOpen: boolean;
  genresData: GenreData[] | undefined;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  setFilterOptions: Dispatch<SetStateAction<FilterOptions>>;
};

export default function GenresFilter({
  genresData,
  isFilterOpen,
  setIsFilterOpen,
  setFilterOptions,
}: GenresFilterProps) {
  const handleChangeToAdult = () => {
    setFilterOptions((prevState) => ({
      ...prevState,
      adult: !prevState?.adult,
    }));
  };

  return (
    <>
      <div className="flex flex-row justify-between px-4">
        <span>filters</span>
        <button onClick={() => setIsFilterOpen((prevState) => !prevState)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
            />
          </svg>
        </button>
      </div>

      {isFilterOpen && (
        <div className="px-4">
          <div className="flex flex-row gap-2 overflow-auto flex-wrap">
            {genresData?.map((genre) => (
              <button
                key={genre.id}
                onClick={() =>
                  setFilterOptions((prevState) => ({
                    ...prevState,
                    genre: genre?.id?.toString(),
                  }))
                }
                className="bg-white/90 text-semiDarkBlue font-light px-2 whitespace-nowrap rounded-md"
              >
                {genre.name}
              </button>
            ))}
          </div>
          <button type="button" onClick={handleChangeToAdult}>
            18+
          </button>
        </div>
      )}
    </>
  );
}
