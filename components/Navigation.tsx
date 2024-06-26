"use client";
import { useContext, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { AuthContext } from "@/contexts/AuthContextProvider";

import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

export default function Navigation() {
  const pathname = usePathname();
  const parsedUser = useGetUsersInfo();
  const { isAuth, signInWithGoogle, logOut } = useContext(AuthContext);

  const [isSignOutShowing, setIsSignOutShowing] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);

  const menuItems = [
    {
      href: "/",
      label: "Home",
      svgPath:
        "M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z",
    },
    {
      href: "/movie",
      label: "Movies",
      svgPath:
        "M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z",
    },
    {
      href: "/tvshow",
      label: "TV Shows",
      svgPath:
        "M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z",
    },
    {
      href: "/bookmarks",
      label: "Bookmarks",
      svgPath:
        "M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z",
    },
  ];

  return (
    <div
      className={`w-full bg-semiDarkBlue p-4 flex flex-row items-center justify-between   lg:flex-col lg:h-[calc(100vh_-_2rem)] lg:rounded-lg ${
        isOpenNav ? "w-56" : "lg:w-20"
      }`}
    >
      <Link
        className="flex flex-row justify-center items-center gap-2"
        href="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="20"
          viewBox="0 0 25 20"
          fill="none"
        >
          <path
            d="M20 0L22.5 5H18.75L16.25 0H13.75L16.25 5H12.5L10 0H7.5L10 5H6.25L3.75 0H2.5C1.11875 0 0.0125 1.11875 0.0125 2.5L0 17.5C0 18.8813 1.11875 20 2.5 20H22.5C23.8813 20 25 18.8813 25 17.5V0H20Z"
            fill="#FC4747"
          />
        </svg>
        {isOpenNav && <span>SIGIZMUND</span>}
      </Link>

      <div
        className={`flex flex-row justify-center gap-4 lg:flex-col ${
          isOpenNav ? "items-start" : "items-center"
        }`}
      >
        {menuItems.map((item) => {
          const isActiveLink = (href: string) => {
            if (href === "/") {
              return pathname === "/";
            }
            return pathname.startsWith(href);
          };

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-row items-center justify-center gap-2"
            >
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d={item.svgPath}
                  fill={isActiveLink(item?.href) ? "#cacfd9" : "#5A698F"}
                />
              </svg>
              {isOpenNav && (
                <span
                  className={`${
                    isActiveLink(item?.href)
                      ? "text-[#cacfd9]"
                      : "text-[#5A698F]"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setIsOpenNav((prevState) => !prevState)}
          className="hidden lg:inline-block"
        >
          {isOpenNav ? (
            <div className="flex justify-center items-center gap-4">
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
              <span>Collapse</span>
            </div>
          ) : (
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
          )}
        </button>
        {!isAuth ? (
          <button onClick={signInWithGoogle}>Sign in</button>
        ) : (
          <button
            type="button"
            onClick={() => setIsSignOutShowing((prevState) => !prevState)}
            className="relative"
          >
            {isAuth && (
              <div className={`flex flex-col items-center gap-1 `}>
                <div className="aspect-square rounded-full overflow-hidden w-9 lg:flex">
                  {parsedUser?.profilePhoto && (
                    <Image
                      height={100}
                      width={100}
                      alt="Picture of the author"
                      src={parsedUser?.profilePhoto}
                    />
                  )}
                </div>
                <button
                  onClick={logOut}
                  className="hidden whitespace-nowrap lg:inline-block"
                >
                  Sign out
                </button>
              </div>
            )}
            {isAuth && isSignOutShowing && (
              <button
                onClick={logOut}
                className="bg-black p-4 whitespace-nowrap absolute top-10 right-0 rounded lg:hidden"
              >
                Sign out
              </button>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
