import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function useUser() {
  const {data, error, isLoading, mutate} = useSWR('/api/user', fetcher);
  return {
    data,
    error,
    isLoading,
    mutate
  }
};