import { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";
import { emptyArray } from "@/lib/getEmptyArray";

import { GenreData, FilterOptions } from "@/types";

type GenresFilterProps = {
  isFilterOpen: boolean;
  filterOptions: FilterOptions;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  setFilterOptions: Dispatch<SetStateAction<FilterOptions>>;
};

export default function GenresFilter({
  isFilterOpen,
  filterOptions,
  setIsFilterOpen,
  setFilterOptions,
}: GenresFilterProps) {
  const handleChangeToAdult = () => {
    setFilterOptions((prevState) => ({
      ...prevState,
      adult: !prevState?.adult,
    }));
  };

  const {
    data: genresData,
    error: genresError,
    isError: isGenresError,
    isLoading: isGenresLoading,
  } = useQuery<GenreData[]>({
    queryKey: ["genres"],
    queryFn: api.getMovieGeneres,
  });

  if (isGenresError) return <span>{genresError.message}</span>;

  if (isGenresLoading)
    return (
      <div className="px-4">
        <div className="flex flex-row gap-2 overflow-auto flex-wrap">
          {emptyArray(20)?.map((genre) => (
            <span
              key={genre}
              className="bg-white/90 text-semiDarkBlue font-light px-2 whitespace-nowrap rounded-md"
            >
              {null}
            </span>
          ))}
        </div>
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-between px-4">
        <span>Filters</span>
        <div className="flex items-center justify-center gap-4">
          <label
            htmlFor="adult"
            className={`text-semiDarkBlue inline-block font-light hover:cursor-pointer px-2 whitespace-nowrap rounded-md cursor-pointer ${
              filterOptions?.adult ? "bg-white/90" : "bg-white/50"
            }`}
          >
            <input
              id="adult"
              name="adult"
              type="checkbox"
              className="hidden"
              checked={filterOptions?.adult}
              onChange={handleChangeToAdult}
            />
            18+
          </label>
          <button
            disabled={isGenresLoading}
            onClick={() => setIsFilterOpen((prevState) => !prevState)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="p-4">
          <ul className="flex flex-row gap-2 overflow-auto flex-wrap">
            {genresData?.map((genre) => (
              <li key={genre?.id}>
                <button
                  onClick={() =>
                    setFilterOptions((prevState) => ({
                      ...prevState,
                      genre: genre?.id?.toString(),
                    }))
                  }
                  className={`text-semiDarkBlue font-light px-2 whitespace-nowrap rounded-md ${
                    Number(filterOptions?.genre) === genre.id
                      ? "bg-white/90"
                      : "bg-white/50"
                  }`}
                >
                  {genre?.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
