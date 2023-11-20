import { QueryClient } from "react-query";

// Here is an example.
// Create a const to summarize all the keys used with react-query, to avoid duplicate keys when working with react-query
const getQueryKeys = (baseKey: string) => {
  return {
    all: [baseKey],
    many: (params: Record<string, unknown>) => [baseKey, params],
    one: (id: string) => [baseKey, id],
  };
};

export const queryKeys = {
  auth: {
    authUser: ["get-info-user-key"],
  },
  jobs: getQueryKeys("jobs"),
  organizations: {
    one: getQueryKeys("organizations").one,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
