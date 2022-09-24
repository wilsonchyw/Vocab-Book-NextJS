import "firebase/compat/auth";
//import { firebase } from "lib/firebaseInit";
import firebase from "lib/firebaseInit";
import { FunctionComponent } from "react";
import { Alert, Button, Stack } from "react-bootstrap";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/",
    callbacks: {
        signInSuccessWithAuthResult: (currentUser: any) => {
            localStorage.setItem("token", currentUser.user._delegate.stsTokenManager.accessToken);
            localStorage.setItem("expirationTime", currentUser.user._delegate.stsTokenManager.expirationTime);
            return true;
        },
    },
};

export default function Login({ dismiss }: { dismiss: Function }): FunctionComponent {
    
    return (
        <div className="">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            <Stack gap={2}>
                <Alert variant="primary" style={{ whiteSpace: "pre-wrap" }} className="text-center mx-auto">
                    {`You may use a fake email address\nFor reference only`}
                </Alert>
                <Button variant="secondary" text="Dismiss" onClick={dismiss}>
                    Back
                </Button>
            </Stack>
        </div>
    );
}
