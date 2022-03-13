import 'firebase/compat/auth';
import { firebase } from 'lib/firebaseInit';
import type { NextPage } from "next";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/vocab',
    callbacks: {
        signInSuccessWithAuthResult: (currentUser: any) => {
            localStorage.setItem("token", currentUser.user._delegate.accessToken)
            return true
        },
    },
};

function Login(): NextPage {
    return (
        <div className="mt-5" >
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div >

    );
};

export default Login;
