// hooks/useAuthUser.js
import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: true // Important for auth sync
  });

  return {
    isLoading: isLoading || isFetching,
    isError,
    error,
    authUser: data?.user,
    refetchAuth: refetch
  };
};

export default useAuthUser;