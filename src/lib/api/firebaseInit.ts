import * as firebaseAdmin from "firebase-admin";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

const firebaseConfig = serverRuntimeConfig.firebaseAdmin
if (!firebaseAdmin.apps.length) firebaseAdmin.initializeApp(firebaseConfig);

export { firebaseAdmin };
