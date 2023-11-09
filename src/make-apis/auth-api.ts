import { ACCESS_TOKEN_KEY } from "@/constants";
import { apiClient, queryClient } from "@/lib";
import { Auth, UserInfo } from "@/types/user";
import { clientStorage } from "@/utils/storage";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

type UseLoginOptions = {
  onSuccess: (user: UserInfo) => void;
  onError: (error: any) => void;
};
type UseLogoutOptions = {
  onSuccess: () => void;
};

export const AUTH_API_KEY = {
  LOGOUT_KEY: "logout-key",
  GET_INFO_USER_KEY: "get-info-user-key",
};

export async function login(data: unknown) {
  return await apiClient.post<UserInfo>("/api/auth/login", data);
}

export async function logout() {
  return await apiClient.get("/api/auth/logout");
}

export async function getUserInfo() {
  return await apiClient.get<Auth>("/api/auth/me");
}

export function useLogin(option?: Partial<UseLoginOptions>) {
  const { mutate: submit, ...props } = useMutation({
    mutationFn: login,
    onSuccess(data, variables, context) {
      const user = data.data;
      queryClient.setQueryData(["auth-user"], user);
      clientStorage.set(ACCESS_TOKEN_KEY, user.access_token);
      option?.onSuccess?.(data.data);
    },
    onError(error, variables, context) {
      const errorResponse = error as AxiosError<any>;
      const message = errorResponse?.response?.data["message"];
      toast.error(message);
      option?.onError?.(error);
    },
  });
  return { submit, ...props };
}

export function useLogout(option?: UseLogoutOptions) {
  return useQuery({
    queryKey: [AUTH_API_KEY.LOGOUT_KEY],
    queryFn: logout,
    onSuccess: () => {
      queryClient.clear();
      option?.onSuccess?.();
    },
  });
}

export function useUser() {
  return useQuery({
    queryKey: [AUTH_API_KEY.GET_INFO_USER_KEY],
    queryFn: () => getUserInfo(),
    onError: (error: AxiosError<any>) => {
      const message = error.response?.data["message"];
      toast.error(message);
    },
  });
}
