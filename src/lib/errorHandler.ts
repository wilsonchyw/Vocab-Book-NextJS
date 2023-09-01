import { setMsg } from "components/slices/messageSlice";
import Router from "next/router";
import { store } from "store";

function ErrorHandler(err: any) {
  //console.log(err.name)
  //console.log(err.message)
  if (err.response) {
    if (err.response.status === 401) {
      store.dispatch(setMsg("Authentication fail", "error"));
      localStorage.removeItem("token");
      return Router.push("/login");
    }
    if (err.response.data) {
      store.dispatch(setMsg(err.response.data.message, "error"));
      return;
    }
  }
  store.dispatch(setMsg(err.toString(), "error"));
}

export default ErrorHandler;
