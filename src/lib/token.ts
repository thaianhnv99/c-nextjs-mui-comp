/**
 * @deprecated
 * */

import { ACCESS_TOKEN_KEY } from "@/constants";
import { clientStorage } from "@/utils/storage";

export const parseJwt = (token?: string | null): PartialCredentials => {
  if (!token) {
    return {};
  }
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, "base64")
        .toString()
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    return {};
  }
};

/**
 * @deprecated
 * */

export const getAccessTokens = (): AuthenticationResponse => {
  const strAccessToken =
    typeof window !== "undefined" ? clientStorage.get(ACCESS_TOKEN_KEY) : null;
  return { access_token: strAccessToken?.toString() };
};

/**
 * @deprecated
 * */

export const saveAccessToken = (response: AuthenticationResponse): void => {
  const newAccessToken = { ...getAccessTokens(), ...response };
  typeof window !== "undefined" &&
    clientStorage.set(ACCESS_TOKEN_KEY, JSON.stringify(newAccessToken));
};

/**
 * @deprecated
 * */

export const removeCredentials = (): void => {
  clientStorage.remove(ACCESS_TOKEN_KEY);
};

/**
 * @deprecated
 * */

export const isLoggedInState = () => {
  const { access_token } = getAccessTokens();
  const decodeAccessToken = parseJwt(access_token);
  const now = new Date().getTime() / 1000;
  return (
    !!access_token &&
    !!decodeAccessToken?.userId &&
    !!decodeAccessToken?.exp &&
    now < decodeAccessToken?.exp
  );
};

/**
 * @deprecated
 * */

export const getDecodeAccessToken = (): PartialCredentials => {
  const { access_token } = getAccessTokens();
  return access_token ? parseJwt(access_token) : {};
};

/**
 * @deprecated
 * */

export const decodeAccessToken = (access_token: string): PartialCredentials =>
  parseJwt(access_token);
