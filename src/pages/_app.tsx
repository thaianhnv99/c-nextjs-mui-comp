import '../../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from "next/head";
import {ThemeProvider} from "@mui/material";
import {theme} from "src/utils/theme";
import {Header} from "src/component/common/header";
import {Main} from "src/component/common/main";
import {wrapper} from "src/state/store";
import {Provider} from "react-redux";

function MyApp({Component, pageProps}: AppProps) {
    const {store, props} = wrapper.useWrappedStore(pageProps);
    return (<>
        <Head>
            <title>My page</title>
            <meta name="viewport" content="initial-scale=1, width=device-width"/>
        </Head>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Header/>
                <Main>
                    <Component {...pageProps} />
                </Main>
            </ThemeProvider>
        </Provider>
    </>)
}

export default MyApp;
