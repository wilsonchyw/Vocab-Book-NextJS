import Datalist from "components/datalist";
import Dialog from "components/Dialog";
import Loading from "components/Loading";
import NavBar from "components/NavBar";
import { setMsg, setRevisionDays, setVocabLength } from "components/slices";
import apiHandler from "lib/fetchHandler";
import type { NextPage } from "next";
import { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "store";
import useSWR from "swr";

const GESTURE_THRESHOLD = 50;

function shoudShowMessage(id: String): Boolean {
    if (typeof window !== "undefined") {
        const messageId = localStorage.getItem("messageId");
        return id != messageId || messageId == null;
    }
    return false;
}

async function fetcher(url: string) {
    const option = { url: url };
    const result = await apiHandler(option);
    store.dispatch(setVocabLength(result.length));
    return result;
}

function Frame(): NextPage {
    const dispatch = useDispatch();

    /**  
     * Experiment feature!!
     * 
    const [gestureStarted, setGestureState] = useState<boolean>(false);
    const [startPosition, setStart] = useState<number>(0);
    const [endPosition, setEnd] = useState<number>(0);
    const { perPage, currentPage } = useSelector((state: RootState) => state.list);
    */
   
    const { vocabs, isLogin,isLocalLogin } = useSelector((state: RootState) => state.user);    
    const { data, mutate } = useSWR(isLogin ? "/vocab" : null, vocabs ? () => [...vocabs] : fetcher, { revalidateOnFocus: false });

    /**  
     * Experiment feature!!
     * 
    const lastPage = data ? Math.ceil(data.length / perPage) : 1;

    function previousPage() {
        console.log("previousPage","currentPage",currentPage)
        if (currentPage > 1) dispatch(changeCurrent(currentPage - 1));
    }

    function nextPage() {
        console.log("nextPage","currentPage",currentPage)
        if (currentPage <= lastPage) {
            dispatch(changeCurrent(currentPage + 1));
        }
    }

    function gestureSwitchPage(event: any) {
        let position = event.changedTouches[0].screenX;


        console.log("Gesture position", position,"startPosition",startPosition,"endPosition",endPosition, "gestureStarted", gestureStarted);

        if (gestureStarted) {
            setEnd(position);
            if (Math.abs(startPosition - endPosition) > GESTURE_THRESHOLD) {
                endPosition > startPosition ? previousPage() : nextPage();
            }
            setGestureState(false);
        } else {
            setStart(position);
            setGestureState(true);
        }
    }
     */
    useEffect(() => {
        //console.log("useEffect isLocalLogin",isLocalLogin)
        if(isLocalLogin==false){
            apiHandler({ url: "/message" }, (response) => {
                if (shoudShowMessage(response.id) && response.value) {
                    dispatch(setMsg(response.value, "update", 30000));
                    localStorage.setItem("messageId", response.id);
                }
            });
            apiHandler({ url: "/user" }, (response: string[]) => {
                dispatch(setRevisionDays(response));
            });
        }
        
        /** 
         * Experiment feature!!
         * 
        window.addEventListener("touchstart", gestureSwitchPage);
        window.addEventListener("touchend", gestureSwitchPage);

        return () => {
            window.removeEventListener("touchstart", gestureSwitchPage);
            window.removeEventListener("touchend", gestureSwitchPage);
        };
        */
    }, []);//[startPosition,endPosition,gestureStarted]

    return (
        <>
            <NavBar />
            <div className="hero"></div>
            <Dialog mutate={mutate} />
            <Stack gap={2} className="col-md-10 mx-auto content vstack gap-2 p-3">
                {!data ? <Loading /> : <Datalist datas={data} />}
            </Stack>
        </>
    );
}

export default Frame;
