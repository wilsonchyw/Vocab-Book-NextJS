import { setMessage } from "components/slices/messageSlice";
import Router from "next/router";
import { store } from "store";

function ErrorHandler(err: any) {
    if (err.response) {
        if (err.response.status === 401) {
            store.dispatch(setMessage({ type: "error", message: "Unauthorized access" }));
            return Router.push("/login");
        }
        if (err.response.data) {
            store.dispatch(setMessage({ type: "error", message: err.response.data.message }));
            return;
        }
    }
    store.dispatch(setMessage({ type: "error", message: err.toString() }));
}

export default ErrorHandler;