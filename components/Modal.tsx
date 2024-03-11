import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

import { usePathname } from "next/navigation";
import Image from "next/image";

import useOutsideClick from "@/hooks/useOutsideClick";

import { MovieImages, TVShowImages } from "@/types";

type ModalProps = {
  maxLegnth: number;
  imageIndex: number;
  isModalOpen: boolean;
  movieImages: MovieImages | undefined;
  tvShowImages: TVShowImages | undefined;
  setImageIndex: Dispatch<SetStateAction<number>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({
  maxLegnth,
  imageIndex,
  isModalOpen,
  setImageIndex,
  setIsModalOpen,
  movieImages,
  tvShowImages,
}: ModalProps) {
  const emptyArray = Array.from({ length: maxLegnth }, () => Math.random());
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  if (!isModalOpen) return null;

  const ref = useOutsideClick(() =>
    setIsModalOpen(false)
  ) as RefObject<HTMLDivElement>;

  const handlePastImage = (index: number) => {
    if (imageIndex === 0) {
      setImageIndex(maxLegnth - 1);
    } else setImageIndex(imageIndex - 1);
  };

  const handlePreviousImage = (index: number) => {
    if (imageIndex === maxLegnth - 1) {
      setImageIndex(0);
    } else setImageIndex(imageIndex + 1);
  };

  return mounted
    ? createPortal(
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80 px-4 lg:px-8">
          <div ref={ref} className="w-full flex flex-col gap-2 items-center">
            <div className="flex flex-row justify-center items-center w-full">
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
              {pathname.includes("/movie") && (
                <Image
                  className="w-full h-full rounded-lg"
                  width={movieImages?.backdrops[imageIndex]?.width || 1000}
                  height={movieImages?.backdrops[imageIndex]?.height || 1500}
                  alt={movieImages?.backdrops[imageIndex]?.file_path || ""}
                  src={`https://image.tmdb.org/t/p/original${
                    movieImages?.backdrops?.slice(0, 6)[imageIndex]?.file_path
                  }`}
                />
              )}

              {pathname.includes("/tvshow") && (
                <Image
                  className="w-full h-full rounded-lg"
                  width={tvShowImages?.backdrops[imageIndex]?.width || 1000}
                  height={tvShowImages?.backdrops[imageIndex]?.height || 1500}
                  alt={tvShowImages?.backdrops[imageIndex]?.file_path || ""}
                  src={`https://image.tmdb.org/t/p/original${
                    tvShowImages?.backdrops?.slice(0, 6)[imageIndex]?.file_path
                  }`}
                />
              )}

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
              {emptyArray?.map((_, index) => (
                <button
                  key={index}
                  className={`p-1  rounded-full ${
                    index === imageIndex
                      ? "bg-movieGreyishBlue"
                      : "bg-movieGreyishBlue/35"
                  }`}
                  onClick={() => setImageIndex(index)}
                />
              ))}
            </ul>
          </div>
        </div>,
        document.body
      )
    : null;
}
