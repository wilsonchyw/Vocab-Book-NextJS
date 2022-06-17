import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "components/Loading";
//import Loading from "components/Loading";
import Message from "components/Message";
import { setLogin, setUser } from "components/slices/userSlice";
import "firebase/compat/auth";
import { firebase } from "lib/firebaseInit";
import tokenManager from "lib/tokenManager";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Provider } from "react-redux";
import { store } from "store";
import "styles/custom.css";
import "styles/datePicker.css";
import "styles/globals.css";

const publicRoute = ["/", "/login"];

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [hideContent, setHideContent] = useState<Boolean>(true);
    const localLogin = store.getState().user.isLocalLogin;

    function toVocab(caller = "not provide") {
        if (publicRoute.includes(router.pathname)) router.push("/vocab");
        store.dispatch(setLogin(true));
        setHideContent(false);
    }

    function authCheck() {
        if (publicRoute.includes(router.pathname)) setHideContent(false);
        if (localLogin) return toVocab();
        if (tokenManager.localWithVerify()) toVocab();
        tokenManager.firebase(
            // Resolve callback
            (user: firebase.user) => {
                store.dispatch(setUser(user.displayName));
                toVocab("firebase");
            },
            // Reject callback
            () => {
                store.dispatch(setUser(null));
                if (!publicRoute.includes(router.pathname)) router.push("/login");
            }
        );
    }

    useEffect(() => {
        setHideContent(true);
        authCheck();
    }, [router.pathname]);

    useEffect(() => {
        console.log("hideContent", hideContent, "- Has changed");
    }, [hideContent]);

    return (
        <SSRProvider>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
                <title>Vocabsitory - Learn vocabulary in an efficient way</title>
                <meta name="theme-color" content="#fff" />
                <meta name="description" content="This is a vocabulary book app combined with the forgetting curve to learn new words. Create your vocab book here and make revisions in any device" />
            </Head>
            <Provider store={store}>
                <Message />
                {!hideContent && <Component {...pageProps} /> //: <Loading />
                }
            </Provider>
        </SSRProvider>
    );
}

export default MyApp;
