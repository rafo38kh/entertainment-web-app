import { User } from "@/types";

export const useGetUsersInfo = () => {
  const user =
    typeof window !== "undefined"
      ? window?.localStorage?.getItem("user")
      : null;

  const parsedUser = user ? (JSON.parse(user) as User) : null;

  // console.log("parsedUser", parsedUser?.profilePhoto);

  return parsedUser;
};
