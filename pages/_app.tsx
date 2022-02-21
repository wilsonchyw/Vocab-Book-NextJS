import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from "components/Loading";
import Message from "components/Message";
import NavBar from "components/NavBar";
import { setUser } from 'components/slices/userSlice';
import 'firebase/compat/auth';
import { firebase } from "lib/firebaseInit";
import type { AppProps } from 'next/app';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SSRProvider from 'react-bootstrap/SSRProvider';
import { Provider } from 'react-redux';
import { store } from "store";
import '../styles/custom.css';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const [hideContent, setHideContent] = useState<Boolean>(true);


    function authCheck() {
        if (router.pathname === "/login") return setHideContent(false)

        firebase.auth().onIdTokenChanged((user: firebase.user) => {
            if (user) {
                store.dispatch(setUser(user.displayName))
            } else {
                store.dispatch(setUser(null))
                return router.push("/login")
            }
            setHideContent(false)
        });
    }

    useEffect(() => {
        authCheck()
    }, [router.pathname])

    return (
        <SSRProvider>
            <Provider store={store} >
                <Message />
                <NavBar />
                {!hideContent ? <Component {...pageProps} /> : <Loading />}
            </Provider>
        </SSRProvider>
    )
}

export default MyApp

