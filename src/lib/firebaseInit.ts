import firebase from 'firebase/compat/app';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const firebaseConfig = publicRuntimeConfig.firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);


export {firebase}