"use client";
import { useState } from "react";
import Link from "next/link";
import ScrollGridLoading from "./ScrollGridLoading";
import { useMediaQuery } from "@uidotdev/usehooks";

import { motion } from "framer-motion";

import {
  list,
  cardItemVariants,
  scrolGridListVarints,
} from "@/animations/index";

import { MovieData, PopularMovies, TVData } from "@/types";

type ScrollGridProps = {
  isLoading: boolean;
  type: "movie" | "tv";
  data: (MovieData | TVData | PopularMovies)[];
};

function ScrollGrid({ data, type, isLoading }: ScrollGridProps) {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 1024px)");
  const [currentX, setCurrentX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) return <ScrollGridLoading />;

  return (
    <motion.div variants={list} className="py-4 overflow-clip">
      <motion.ul
        animate="animate"
        initial="initial"
        onHoverStart={(e) => {
          setIsHovered(true);
          setCurrentX(e.clientX);
        }}
        onHoverEnd={() => setIsHovered(false)}
        variants={
          // isSmallDevice ? undefined : scrolGridListVarints(isHovered, currentX)
          true ? undefined : scrolGridListVarints(isHovered, currentX)
        }
        className={`flex gap-4 no-scrollbar mt-4 ${
          true ? "overflow-x-scroll" : null
          // isSmallDevice ? "overflow-x-scroll" : null
        }`}
      >
        {data?.map((el) => (
          <motion.li
            key={el?.id}
            variants={cardItemVariants}
            className="border-solid border-2 border-transparent rounded-lg"
            whileHover={{
              scale: 1.05,
              borderColor: "#5A698F",
              transition: { duration: 0.3 },
            }}
          >
            <Link
              href={type === "movie" ? `/movie/${el?.id}` : `/tvshow/${el?.id}`}
            >
              <div
                style={{
                  backgroundImage:
                    el?.backdrop_path &&
                    `url(https://image.tmdb.org/t/p/original${el.backdrop_path})`,
                }}
                className="flex flex-col justify-end bg-no-repeat bg-cover  relative rounded-lg overflow-hidden h-36 w-72 md:h-48 md:w-[22rem]"
              >
                <div className="p-4 pt-12 bg-gradient-to-t from-black to-transparent text-xs text-white/70">
                  <span className="w-full text-white font-medium text-[15px]">
                    {"title" in el ? el?.title : el?.name}
                  </span>
                  <div className="flex justify-between w-full gap-4">
                    <span>
                      {"release_date" in el
                        ? el?.release_date?.slice(0, 4)
                        : el?.first_air_date?.slice(0, 4)}
                    </span>
                    <span className="flex items-center gap-1">
                      {type === "movie" ? (
                        <>
                          <svg
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="white"
                              opacity="0.75"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.1733 0H1.82667C0.817827 0 0 0.817827 0 1.82667V10.1733C0 11.1822 0.817827 12 1.82667 12H10.1733C10.6578 12 11.1224 11.8075 11.465 11.465C11.8075 11.1224 12 10.6578 12 10.1733V1.82667C12 1.3422 11.8075 0.877585 11.465 0.535018C11.1224 0.192452 10.6578 0 10.1733 0ZM2.4 5.4H1.2V4.2H2.4V5.4ZM2.4 6.6H1.2V7.8H2.4V6.6ZM10.8 5.4H9.6V4.2H10.8V5.4ZM10.8 6.6H9.6V7.8H10.8V6.6ZM10.8 1.644V2.4H9.6V1.2H10.356C10.4738 1.2 10.5867 1.24678 10.67 1.33004C10.7532 1.41331 10.8 1.52624 10.8 1.644ZM2.4 1.2H1.644C1.52624 1.2 1.41331 1.24678 1.33004 1.33004C1.24678 1.41331 1.2 1.52624 1.2 1.644V2.4H2.4V1.2ZM1.2 10.356V9.6H2.4V10.8H1.644C1.52624 10.8 1.41331 10.7532 1.33004 10.67C1.24678 10.5867 1.2 10.4738 1.2 10.356ZM10.356 10.8C10.6012 10.8 10.8 10.6012 10.8 10.356V9.6H9.6V10.8H10.356Z"
                            />
                          </svg>
                          Movie
                        </>
                      ) : (
                        <>
                          <svg
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="white"
                              opacity="0.75"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.448 2.68865H12V12H0V2.68865H2.952L1.332 0.72163L2.268 0.0174588L4.2 2.3453L6.132 0L7.068 0.72163L5.448 2.68865ZM1.2 3.85257V10.8361H7.2V3.85257H1.2ZM10.2 8.50824H9V7.34433H10.2V8.50824ZM9 6.18041H10.2V5.01649H9V6.18041Z"
                            />
                          </svg>
                          TV Show
                        </>
                      )}
                    </span>
                    <span>{el.adult ? "18+" : "PG"}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default ScrollGrid;
