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
    <ul>
      {data?.map((el, index) => (
        <li key={index}>
          <>
            <button
              type="button"
              onClick={() => {
                if (parsedUser?.userID) {
                  addBookmarks(el?.id, parsedUser?.userID);
                }
              }}
            >
              bookmark
            </button>

            <div>
              <span>{el.adult}</span>
              <span>{el.backdrop_path}</span>
              <span>{el.release_date}</span>
              <span>{type === "movie" ? "Movie" : "TV Show"}</span>
            </div>
            <span className="text-green-500">{el.title}</span>
          </>
        </li>
      ))}
    </ul>
  );
}

export default ScrollGrid;
