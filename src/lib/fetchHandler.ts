import axios from "axios";
import { firebase } from "lib/firebaseInit";
import getConfig from "next/config";
import errorHandler from "./errorHandler";
import getLocalToken from "./localToken";
import verifier, { VerifiedObj } from "./verifier";
const { publicRuntimeConfig } = getConfig();

async function fetchHandler(option: VerifiedObj, callback: Function | null = null, silent: Boolean = false) {
    try {
        //console.log("silent",silent)
        verifier.atLeast(["url"], option);
        const localToken = getLocalToken()
        const token: string = localToken || await firebase.auth().currentUser.getIdToken();
        if (!localToken) localStorage.setItem("token", token)
        if (token) option.headers = { Authorization: "Bearer " + token };
        if (!option.method) option.method = "get";

        const url = `${publicRuntimeConfig.endpoint}${option.url}`;
        const response = await axios({ ...option, url: url });

        if (response.data) {
            return callback ? callback(response.data) : response.data;
        }
    } catch (err: any) {
        console.log(err)
        if (silent) return
        if (err.message.match(/null|reading|getIdToken/g)) err.prototype.toString = () => "Something wrong, please wait.."
        errorHandler(err);
    }
}

export default fetchHandler;
