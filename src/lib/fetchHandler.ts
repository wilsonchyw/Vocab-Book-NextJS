import axios from "axios";
import { firebase } from "lib/firebaseInit";
import tokenManager from "lib/tokenManager";
import getConfig from "next/config";
import { store } from "store";
import errorHandler from "./errorHandler";
import localDataHandler from "./localDataHandler";
import verifier, { VerifiedObj } from "./verifier";

interface Option {
  slient?: Boolean;
  public?: Boolean;
}

const { publicRuntimeConfig } = getConfig();

async function fetchHandler(
  option: VerifiedObj,
  callback: Function | null = null,
  opt: Option = {},
) {
  try {
    if (!option.method) option.method = "get";

    if (option.url.includes("/local")) {
      const response = localDataHandler(option);
      return callback ? callback(response) : response;
    }

    verifier.atLeast(["url"], option);

    const localToken = tokenManager.localWithVerify();
    const token: string = localToken
      ? localToken
      : opt.public
      ? null
      : await firebase.auth().currentUser.getIdToken();
    if (!localToken) localStorage.setItem("token", token);
    //console.log({localToken,token})
    if (token) option.headers = { Authorization: "Bearer " + token };

    const url = `${publicRuntimeConfig.endpoint}${option.url}`;
    const response = await axios({ ...option, url: url });

    if (response.data) {
      return callback ? callback(response.data) : response.data;
    }
  } catch (err: any) {
    console.log(option.url, err);
    if (opt.slient) return;
    if (err.message.match(/null|reading|getIdToken/g))
      err = "Something wrong, please wait..";
    errorHandler(err);
  }
}

export default fetchHandler;
