import Datalist from "components/datalist";
import Dialog from "components/Dialog";
import Loading from "components/Loading";
import NavBar from "components/NavBar";
import { setVocabLength } from 'components/slices/userSlice';
import apiHandler from "lib/fetchHandler";
import type { NextPage } from "next";
import { Stack } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { RootState, store } from "store";
import useSWR from 'swr';

const LAST_UPDATE_DATE = 1646744035854
const UPDATE = ``

function shoudShowUpdate(): Boolean {
    if (typeof window !== "undefined") {
        const lastseen = parseInt(localStorage.getItem("lastseen") || "0")
        return LAST_UPDATE_DATE > lastseen
    }
    return false
}

async function fetcher(url: string) {
    const option = { url: url }
    const result = await apiHandler(option)

    store.dispatch(setVocabLength(result.length))
    return result;
}

function Frame(): NextPage {
    const { vocabs, isLogin } = useSelector((state: RootState) => state.user)
    const { data, mutate } = useSWR(isLogin ? "/vocab" : null, vocabs ? () => [...vocabs] : fetcher)

    /**
    useEffect(() => {
        if (shoudShowUpdate()) {
            store.dispatch(setMessage({ message: UPDATE, duration: 999 }))
            localStorage.setItem("lastseen", String(Date.now()))
        }
    }, [])
     */

    return (
        <>
            <NavBar />
            <div className="hero"></div>
            <Dialog mutate={mutate} />
            <Stack gap={2} className="col-md-10 mx-auto content vstack gap-2 p-3">
                {!data ? <Loading /> : <Datalist datas={data} />
                }
            </Stack>
        </>
    )
}

export default Frame

