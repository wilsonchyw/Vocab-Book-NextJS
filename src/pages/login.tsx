import { setLocalLogin, setLogin, setUser } from "components/slices";
import "firebase/compat/auth";
import { firebase } from "lib/firebaseInit";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Alert, Stack } from "react-bootstrap";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch } from "react-redux";
import Divider from "components/Divider";
const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: "/vocab",
    callbacks: {
        signInSuccessWithAuthResult: (currentUser: any) => {
            localStorage.setItem("token", currentUser.user._delegate.accessToken);
            localStorage.setItem("expirationTime", currentUser.user._delegate.expirationTime);
            return true;
        },
    },
};

function Login(): NextPage {
    const dispatch = useDispatch();
    const router = useRouter();

    function localLogin() {
        dispatch(setLogin(true));
        dispatch(setLocalLogin(true));
        dispatch(setUser("unregistered user"))
        router.push("/vocab");
    }

    return (
        <div className="mt-5">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

            <Stack gap={2} className="col-md-5 mx-auto">
                <Alert variant="primary" style={{ whiteSpace: "pre-wrap" }} className="w-50 text-center mx-auto">
                    {`You may use a fake email address\nFor login only`}
                </Alert>
                <Divider content="" offset="offset"/>
                <button type="button" className="btn btn-primary w-50 mx-auto" onClick={localLogin}>
                    Continue
                </button>
                <Alert variant="danger" style={{ whiteSpace: "pre-wrap" }} className="w-50 text-center mx-auto">
                    {`Please be aware that if you continue without login, data store locally only. Learning progress will not sync between devices.\n\nAlso, some functions may not be supported`}
                </Alert>
            </Stack>
        </div>
    );
}

export default Login;
