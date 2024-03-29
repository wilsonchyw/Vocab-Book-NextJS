import "firebase/compat/auth";
import { firebase } from "lib/firebaseInit";
import type { NextPage } from "next";
import { Alert, Stack } from "react-bootstrap";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/",
    callbacks: {
        signInSuccessWithAuthResult: (currentUser: any) => {
            console.log(currentUser.user._delegate);
            console.log(currentUser.user._delegate.stsTokenManager.expirationTime);
            localStorage.setItem("token", currentUser.user._delegate.stsTokenManager.accessToken);
            localStorage.setItem("expirationTime", currentUser.user._delegate.stsTokenManager.expirationTime);
            return true;
        },
    },
};

function Login(): NextPage {
    return (
        <div className="mt-5">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

            <Stack gap={2} className="col-md-5 mx-auto">
                <Alert variant="primary" style={{ whiteSpace: "pre-wrap" }} className="w-50 text-center mx-auto">
                    {`You may use a fake email address\nFor reference only`}
                </Alert>
            </Stack>
        </div>
    );
}

export default Login;
