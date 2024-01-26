import Link from "next/link";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

type Movie = {
  type: "movie" | "tv";
  data: {
    id: number;
    title: string;
    adult: boolean;
    release_date: string;
    backdrop_path: string;
  }[];
};

function ScrollGrid({ data, type }: Movie) {
  const { addBookmarks } = useBookmarks();
  const parsedUser = useGetUsersInfo();

  return (
    <ul className="flex gap-4 overflow-x-scroll no-scrollbar mt-4">
      {data?.map((el, index) => (
        <li key={index}>
          <Link href={`/movie/${el?.id}`}>
            <div
              style={{
                backgroundImage:
                  el?.backdrop_path &&
                  `url(https://image.tmdb.org/t/p/w400${el.backdrop_path})`,
              }}
              className="flex flex-col justify-end bg-no-repeat bg-cover relative rounded-lg overflow-hidden h-36 w-72"
            >
              <button
                className="absolute top-4 right-4 aspect-square rounded-full bg-black/35 flex items-center justify-center p-3"
                type="button"
                onClick={() => {
                  if (parsedUser?.userID) {
                    addBookmarks(el?.id, parsedUser?.userID, type);
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
              <div className="p-4 pt-12 bg-gradient-to-t from-black to-transparent text-xs text-white/70">
                <span className="w-full text-white font-medium text-[15px]">
                  {el.title}
                </span>
                <div className="flex flex-row justify-centerc w-[13rem]  inset-0">
                  <span className="w-full">{el.release_date.slice(0, 4)}</span>
                  {type === "movie" ? (
                    <span className="w-full flex flex-row justify-center items-center gap-1">
                      <svg
                        width="12"
                        height="12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                          fill="#FFF"
                          opacity=".75"
                        />
                      </svg>
                      Movie
                    </span>
                  ) : (
                    <span className="w-full flex flex-row justify-center items-center gap-1">
                      <svg
                        width="12"
                        height="12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                          fill="#FFF"
                          opacity=".75"
                        />
                      </svg>
                      TV Show
                    </span>
                  )}
                  <span className="w-full">{el.adult ? "18+" : "PG"}</span>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ScrollGrid;
