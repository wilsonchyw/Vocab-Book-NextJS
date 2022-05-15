import axios from "axios";
import { firebase } from "lib/firebaseInit";
import tokenManager from "lib/tokenManager";
import getConfig from "next/config";
import { store } from "store";
import errorHandler from "./errorHandler";
import localDataHandler from "./localDataHandler";
import verifier, { VerifiedObj } from "./verifier";

const { publicRuntimeConfig } = getConfig();

async function fetchHandler(option: VerifiedObj, callback: Function | null = null, silent: Boolean = false) {
    try {
        if (!option.method) option.method = "get";

        if (store.getState().user.isLocalLogin) {
            const response = localDataHandler(option);
            return callback ? callback(response) : response;
        }

        verifier.atLeast(["url"], option);

        const localToken = tokenManager.localWithVerify()
        const token: string = localToken || (await firebase.auth().currentUser.getIdToken());
        if (!localToken) localStorage.setItem("token", token);
        if (token) option.headers = { Authorization: "Bearer " + token };

        const url = `${publicRuntimeConfig.endpoint}${option.url}`;
        const response = await axios({ ...option, url: url });

        if (response.data) {
            return callback ? callback(response.data) : response.data;
        }
    } catch (err: any) {
        console.log(err);
        if (silent) return;
        if (err.message.match(/null|reading|getIdToken/g)) err = "Something wrong, please wait..";
        errorHandler(err);
    }
}

export default fetchHandler;
