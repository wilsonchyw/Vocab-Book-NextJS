import "bootstrap/dist/css/bootstrap.min.css";
//import Loading from "components/Loading";
import Message from "components/Message";
import { setChecking, setLocalLogin,  setUser, setVocabs } from "components/slices/userSlice";
import "firebase/compat/auth";
import { firebase } from "lib/firebaseInit";
import tokenManager from "lib/tokenManager";
import useToken from "lib/useToken";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Provider } from "react-redux";
import { store } from "store";
import "styles/custom.css";
import "styles/datePicker.css";
import "styles/globals.css";

const publicRoute = ["/", "/login"];

function MyApp({ Component, pageProps }: AppProps) {
    const token = useToken();
    const router = useRouter();
    const isLocalLogin = store.getState().user.isLocalLogin;

    function handleLocalUser() {
        store.dispatch(setUser(null));
        store.dispatch(setLocalLogin(true));
        //store.dispatch(setLogin(true));
        store.dispatch(setChecking(false));
    }

    console.log({ token });
    useEffect(() => {
        console.log({ token, isLocalLogin });
        if (token) {
            if (isLocalLogin) {
                tokenManager.firebase(
                    // Resolve callback
                    (user: firebase.user) => {
                        store.dispatch(setVocabs(null));
                        store.dispatch(setUser(user.displayName));
                        store.dispatch(setLocalLogin(false));
                        //store.dispatch(setLogin(true));
                        store.dispatch(setChecking(false));
                    },
                    // Reject callback
                    handleLocalUser
                );
            }
        } else {
            handleLocalUser();
        }
    }, [router.pathname, token, isLocalLogin]);

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
                <Component {...pageProps} />
            </Provider>
        </SSRProvider>
    );
}

export default MyApp;
