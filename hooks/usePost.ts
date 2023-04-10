import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function usePost() {
  const { data, error, isLoading, mutate } = useSWR("/api/post", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
