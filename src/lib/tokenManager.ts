import { firebase } from "lib/firebaseInit";
const tokenManager = {
    local: (): null | string => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (!token) {
                return null;
            }
            return token;
        }
        return null;
    },
    localWithVerify: () => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            const expirationTime = parseInt(localStorage.getItem("expirationTime") || "0");
            if (!token || !expirationTime || expirationTime < Date.now()) {
                localStorage.removeItem("token");
                return null;
            }
            return token;
        }
        return null;
    },
    firebase: (resolve: Function, reject: Function) => {
        firebase.auth().onIdTokenChanged((user: firebase.user) => {
            if (user) {
                localStorage.setItem("token", user._delegate.stsTokenManager.accessToken);
                localStorage.setItem("expirationTime", user._delegate.stsTokenManager.expirationTime);
                resolve(user);
            } else {
                reject();
            }
        });
    },
};

export default tokenManager;
