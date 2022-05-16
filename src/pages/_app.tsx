import "bootstrap/dist/css/bootstrap.min.css";
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
        //console.log("toVocab call by", caller);
        if (publicRoute.includes(router.pathname)) router.push("/vocab");
        store.dispatch(setLogin(true));
        setHideContent(false);
    }

    function authCheck() {
        //console.log("localLogin",localLogin,"url",router.pathname)
        if (publicRoute.includes(router.pathname)) return setHideContent(false)
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
    /** 
    function authCheck() {
        if (localLogin) return toVocab();
        if (getLocalToken()) toVocab("getLocalToken");

        if (publicRoute.includes(router.pathname)) setHideContent(false);

        firebase.auth().onIdTokenChanged((user: firebase.user) => {
            if (user) {
                localStorage.setItem("token", user._delegate.stsTokenManager.accessToken);
                localStorage.setItem("expirationTime", user._delegate.stsTokenManager.expirationTime);
                store.dispatch(setUser(user.displayName));
                toVocab("firebase");
            } else {
                store.dispatch(setUser(null));
                if (!publicRoute.includes(router.pathname)) router.push("/login");
            }
        });
    }
    */
    useEffect(() => {
        //router.events.on('routeChangeStart', handleStart)
        /**
         * Not using 'routeChangeStart' so that useSWR in Vocab page could jumping a gun before the component os mounted.
         * fetchHandler and server would handle the authen check.
         */
        authCheck();
    }, [router.pathname]);

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
                {
                    !hideContent && <Component {...pageProps} /> // : <Loading />
                    //<Component {...pageProps} />
                }
            </Provider>
        </SSRProvider>
    );
}

export default MyApp;
