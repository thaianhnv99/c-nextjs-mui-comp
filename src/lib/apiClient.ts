import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  Method,
} from "axios";
import qs from "qs";
import { getAuthorizationHeader } from "./authorization";
import { sleep } from "@/utils/util";
import { clientStorage } from "@/utils/storage";
import { ACCESS_TOKEN_KEY } from "@/constants";
import Router from "next/router";

function downloadAttachment(response: AxiosResponse, attachment: string) {
  const [, filename] = attachment.split("=");
  const fileLink = document.createElement("a");

  fileLink.href = window.URL.createObjectURL(new Blob([response.data]));
  fileLink.setAttribute("download", decodeURIComponent(filename));

  document.body.appendChild(fileLink);
  fileLink.click();

  document.body.removeChild(fileLink);
}

function getAttachment(responseHeaders: AxiosResponseHeaders) {
  const contentDisposition =
    responseHeaders && responseHeaders["content-disposition"];
  if (!contentDisposition) {
    return null;
  }

  const [matchedAttachedFile] = contentDisposition
    .split(";")
    .filter((str) => str.includes("filename"));
  return matchedAttachedFile;
}

export const setupAxios = () => {
  const instance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    paramsSerializer(params) {
      return qs.stringify(params, {
        arrayFormat: "comma",
        skipNulls: true,
        allowDots: true,
        filter: (prefix, value) =>
          value !== undefined && value !== null && value !== ""
            ? value
            : undefined,
      });
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      const authorization = getAuthorizationHeader();
      if (authorization) {
        config.headers = {
          ...config.headers,
          authorization,
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    async (response) => {
      await sleep(2000);
      return response;
    },
    async (error) => {
      const config = error?.config;
      if (!error?.response) {
        return Promise.reject({
          message: "uncaught error",
        });
      }
      if (error?.response.status === 401 || !config?.sent) {
        // config.sent = true;
        // const token = await refreshToken()
        // if (token) {
        //   config.headers = {
        //     ...config.headers,
        //     authorization: `Bearer ${token?.accessToken}`,
        //   };
        // }
        // return instance(config);
        //redirect to /login
        signOut();
      }

      if (error?.response.status === 404) {
        return Promise.reject({
          code: error?.response.status,
          message: error?.response.statusText,
        });
      }

      return Promise.reject(error);
    }
  );

  const fetch = async <T>({
    method,
    url,
    options,
  }: {
    method: Method;
    url: string;
    options?: AxiosRequestConfig;
  }) => {
    const response = (await instance({
      method,
      url,
      ...options,
      headers: { Authorization: getAuthorizationHeader() },
    })) as AxiosResponse<T>;

    return response;
  };

  const apiClient = {
    get: <T>(url: string, params?: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "get",
        url,
        options: {
          ...options,
          params,
        },
      }),
    post: <T>(url: string, data: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "post",
        url,
        options: {
          ...options,
          data,
        },
      }),
    patch: <T>(url: string, data: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "patch",
        url,
        options: {
          ...options,
          data,
        },
      }),
    put: <T>(url: string, data: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "put",
        url,
        options: {
          ...options,
          data,
        },
      }),
    delete: <T>(url: string, params?: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "delete",
        url,
        options: {
          ...options,
          params,
        },
      }),
  };

  return { apiClient };
};

export const { apiClient } = setupAxios();

const signOut = () => {
  clientStorage?.remove(ACCESS_TOKEN_KEY);
  Router.push(`/auth/login?redirect=${Router.asPath}`);
};
