import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from "components/Loading";
import Message from "components/Message";
import { setUser } from 'components/slices/userSlice';
import 'firebase/compat/auth';
import { firebase } from "lib/firebaseInit";
import getLocalToken from 'lib/localToken';
import type { AppProps } from 'next/app';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SSRProvider from 'react-bootstrap/SSRProvider';
import { Provider } from 'react-redux';
import { store } from "store";
import 'styles/custom.css';
import 'styles/globals.css';

const publicRoute = ["/", "/login"]

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const [hideContent, setHideContent] = useState<Boolean>(true);


    function authCheck() {
        if (publicRoute.includes(router.pathname)) return setHideContent(false)
        if (getLocalToken()) setHideContent(false)

        firebase.auth().onIdTokenChanged((user: firebase.user) => {
            if (user) {
                setHideContent(false)
                localStorage.setItem("token", user._delegate.stsTokenManager.accessToken)
                localStorage.setItem("expirationTime", user._delegate.stsTokenManager.expirationTime)
                store.dispatch(setUser(user.displayName))
            } else {
                store.dispatch(setUser(null))
                router.push("/login")
            }
        });
    }

    useEffect(() => {
        //router.events.on('routeChangeStart', handleStart)
        /**
         * Not using 'routeChangeStart' so that useSWR in Vocab page could jumping a gun before the component os mounted.
         * fetchHandler and server would handle the authen check.
         */
        authCheck()
    }, [router.pathname])

    return (
        <SSRProvider>
            <Provider store={store} >
                <Message />
                {!hideContent ? <Component {...pageProps} /> : <Loading />
                    //<Component {...pageProps} />
                }
            </Provider>
        </SSRProvider>
    )
}

export default MyApp

