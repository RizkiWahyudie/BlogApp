import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function usePostDetail(params: string | undefined) {
  const { data, error } = useSWR(`/api/post/${params}`, fetcher);
  return {
    data,
    error,
  };
}
