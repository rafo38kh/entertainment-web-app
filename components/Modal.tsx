import {
  Dispatch,
  useState,
  useEffect,
  RefObject,
  SetStateAction,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

import useOutsideClick from "@/hooks/useOutsideClick";

import { hoverEffect } from "@/animations";

import { MovieImages, TVShowImages } from "@/types";

type ModalProps = {
  maxLegnth: number;
  imageIndex: number;
  isModalOpen: boolean;
  images: MovieImages | TVShowImages | undefined;
  setImageIndex: Dispatch<SetStateAction<number>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({
  images,
  maxLegnth,
  imageIndex,
  isModalOpen,
  setImageIndex,
  setIsModalOpen,
}: ModalProps) {
  const emptyArray = Array.from({ length: maxLegnth }, () => Math.random());

  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState(0);

  const variants = {
    initial: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => {
      return {
        x: direction > 0 ? -1000 : 1000,
        opacity: 0,
        transition: {
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        },
      };
    },
  };

  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // const ref = useOutsideClick(() =>
  //   setIsModalOpen(false)
  // ) as RefObject<HTMLDivElement>;

  const handlePreviousImage = (index: number) => {
    setDirection(-1);
    if (index === 0) {
      setImageIndex(maxLegnth - 1);
    } else setImageIndex(index - 1);
  };

  const handleNextImage = (index: number) => {
    setDirection(1);
    if (index === maxLegnth - 1) {
      setImageIndex(0);
    } else setImageIndex(index + 1);
  };

  useEffect(() => {
    if (window) {
      window?.document?.body.classList.add("overflow-hidden");
    }
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      const handleClickOutsideModal = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsModalOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutsideModal);
      return () => {
        document.removeEventListener("mousedown", handleClickOutsideModal);
      };
    }
  }, [isModalOpen, setIsModalOpen]);

  return mounted
    ? createPortal(
        <div
          ref={ref}
          className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80 px-8"
        >
          {isModalOpen && (
            <AnimatePresence initial={false} custom={direction}>
              <div className="w-full flex flex-col gap-2 items-center">
                <div className="flex flex-row justify-center lg:gap-8 items-center w-full ">
                  <motion.button
                    whileHover={hoverEffect.whileHover}
                    transition={hoverEffect.transition}
                    onClick={() => handlePreviousImage(imageIndex)}
                    className="rounded-full bg-black/35"
                  >
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
                  </motion.button>
                  {pathname.includes("/movie") && (
                    <motion.img
                      variants={variants}
                      animate="animate"
                      initial="initial"
                      exit="exit"
                      key={imageIndex}
                      custom={direction}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                      width={images?.backdrops[imageIndex]?.width || 100}
                      height={images?.backdrops[imageIndex]?.height || 1500}
                      className="w-full h-full rounded-lg max-w-[80rem]"
                      alt={`https://image.tmdb.org/t/p/original${
                        images?.backdrops?.slice(0, 6)[imageIndex]?.file_path
                      }`}
                      src={`https://image.tmdb.org/t/p/original${
                        images?.backdrops?.slice(0, 6)[imageIndex]?.file_path
                      }`}
                    />
                  )}
                  {pathname.includes("/tvshow") && (
                    <motion.img
                      variants={variants}
                      animate="animate"
                      initial="initial"
                      exit="exit"
                      key={imageIndex}
                      custom={direction}
                      className="w-full h-full rounded-lg"
                      width={images?.backdrops[imageIndex]?.width || 1000}
                      height={images?.backdrops[imageIndex]?.height || 1500}
                      alt={images?.backdrops[imageIndex]?.file_path || ""}
                      src={`https://image.tmdb.org/t/p/original${
                        images?.backdrops?.slice(0, 6)[imageIndex]?.file_path
                      }`}
                    />
                  )}
                  <motion.button
                    whileHover={hoverEffect.whileHover}
                    transition={hoverEffect.transition}
                    onClick={() => handleNextImage(imageIndex)}
                    className="lg:p-2 rounded-full bg-black/35"
                  >
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
                  </motion.button>
                </div>
                <ul className="flex gap-3">
                  {emptyArray?.map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={hoverEffect.whileHover}
                      transition={hoverEffect.transition}
                      className={`p-2 rounded-full ${
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
          )}
        </div>,
        document.body
      )
    : null;
}
