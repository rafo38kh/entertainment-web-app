import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

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

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
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

  const [[page, direction], setPage] = useState([0, 0]);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

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
          <AnimatePresence initial={false} custom={direction}>
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
                  <motion.img
                    src={`https://image.tmdb.org/t/p/original${
                      movieImages?.backdrops?.slice(0, 6)[imageIndex]?.file_path
                    }`}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }}
                  />
                )}

                {pathname.includes("/tvshow") && (
                  <Image
                    className="w-full h-full rounded-lg"
                    width={tvShowImages?.backdrops[imageIndex]?.width || 1000}
                    height={tvShowImages?.backdrops[imageIndex]?.height || 1500}
                    alt={tvShowImages?.backdrops[imageIndex]?.file_path || ""}
                    src={`https://image.tmdb.org/t/p/original${
                      tvShowImages?.backdrops?.slice(0, 6)[imageIndex]
                        ?.file_path
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
                  <motion.button
                    whileHover={{ scale: 1.5 }}
                    transition={{ ease: "easeOut", duration: 0.2 }}
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
          </AnimatePresence>
        </div>,
        document.body
      )
    : null;
}
