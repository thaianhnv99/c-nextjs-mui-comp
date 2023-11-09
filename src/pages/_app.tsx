import "../../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "src/utils/theme";
import { wrapper } from "src/state/store";
import { Provider } from "react-redux";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next/types";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import Protected from "@/layouts/Protected";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);

  const pageContent = getLayout(<Component {...pageProps} />);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Protected>{pageContent}</Protected>
          <ToastContainer />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
