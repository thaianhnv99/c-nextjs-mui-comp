import { ACCESS_TOKEN_KEY, USER_PROFILE_KEY } from "@/constants";
import { User } from "@/types/user";
import { clientStorage } from "@/utils/storage";

export const setAuthorization = (token: string) =>
  clientStorage?.set(ACCESS_TOKEN_KEY, JSON.stringify(token));

export const getAuthorization = () =>
  clientStorage?.get(ACCESS_TOKEN_KEY) ?? "";

export const getAuthorizationHeader = () => `Bearer ${getAuthorization()}`;

export const setUserProfile = (user: User | null) =>
  clientStorage?.set(USER_PROFILE_KEY, JSON.stringify(user));

export const getUserProfile = () => clientStorage?.get(USER_PROFILE_KEY) ?? "";
