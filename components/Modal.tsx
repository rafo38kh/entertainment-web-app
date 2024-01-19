import React, { Dispatch, RefObject, SetStateAction } from "react";

import Image from "next/image";

import useOutsideClick from "@/hooks/useOutsideClick";

import { MovieImages } from "@/types";

type ModalProps = {
  maxLegnth: number;
  imageIndex: number;
  movieImages: MovieImages | undefined;
  setImageIndex: Dispatch<SetStateAction<number>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({
  maxLegnth,
  imageIndex,
  setImageIndex,
  setIsModalOpen,
  movieImages,
}: ModalProps) {
  const emptyArray = Array.from({ length: 6 }, () => Math.random());

  const ref = useOutsideClick(() =>
    setIsModalOpen(false)
  ) as RefObject<HTMLDivElement>;

  const handlePastImage = (index: number) => {
    if (imageIndex === 0) {
      setImageIndex(maxLegnth);
    } else setImageIndex(imageIndex - 1);
  };

  const handlePreviousImage = (index: number) => {
    if (imageIndex === maxLegnth) {
      setImageIndex(0);
    } else setImageIndex(imageIndex + 1);
  };

  return (
    <div className="w-full h-full bg-black/60 absolute top-0 left-0 p-4 flex justify-center items-center">
      <div ref={ref} className="w-full flex flex-col gap-2 items-center">
        <div className="flex flex-row justify-center items-center">
          <button onClick={() => handlePastImage(imageIndex)}>
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
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
          <Image
            className="w-full"
            width={movieImages?.backdrops[imageIndex]?.width}
            height={movieImages?.backdrops[imageIndex]?.height}
            alt={movieImages?.backdrops[imageIndex]?.file_path || ""}
            src={`https://image.tmdb.org/t/p/w400${
              movieImages?.backdrops?.slice(0, 6)[imageIndex]?.file_path
            }`}
          />
          <button onClick={() => handlePreviousImage(imageIndex)}>
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
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-row gap-2">
          {emptyArray?.map((el, index) => (
            <button
              className={`p-1  rounded-full ${
                index === imageIndex
                  ? "bg-movieGreyishBlue"
                  : "bg-movieGreyishBlue/35"
              }`}
              onClick={() => setImageIndex(index)}
            ></button>
          ))}
        </ul>
      </div>
    </div>
  );
}
