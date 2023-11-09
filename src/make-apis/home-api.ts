import { apiClient } from "@/lib";
import { useQuery } from "react-query";

export const HOME_INFO_KEY = {
  GET_INFO: "get_info",
};
export const getInfo = async () => {
  return await apiClient.get<any>("/api/hello", undefined, { baseURL: "" });
};

export const useHomeInfo = () => {
  return useQuery({
    queryKey: [HOME_INFO_KEY.GET_INFO],
    queryFn: () => getInfo(),
    enabled: true,
    initialData: null,
  });
};
