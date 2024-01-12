import { User } from "@/types";

export const useGetUsersInfo = () => {
  const user =
    typeof window !== "undefined"
      ? window?.localStorage?.getItem("user")
      : null;

  if (user) {
    const parsedUser = JSON.parse(user) as User;

    return { user, parsedUser };
  }

  return {};
};
