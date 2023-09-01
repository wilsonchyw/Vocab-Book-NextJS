import firebase from "firebase/compat/app";
//import firebase from "firebase/app";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const firebaseConfig = publicRuntimeConfig.firebase;
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default firebase;
export { firebase };
