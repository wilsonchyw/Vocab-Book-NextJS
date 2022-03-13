import 'firebase/compat/auth';
import { firebase } from 'lib/firebaseInit';
import { FunctionComponent } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
};

const Login: FunctionComponent = () => {
    return(
        <div className = "mt-5" >
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div >

    );
};

export default Login;
