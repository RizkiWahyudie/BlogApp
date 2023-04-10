import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function useDrafts() {
  const { data, error, isLoading, mutate } = useSWR("/api/drafts", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
