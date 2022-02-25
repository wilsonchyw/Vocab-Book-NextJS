import Datalist from "components/datalist";
import Dialog from "components/Dialog";
import Loading from "components/Loading";
import { setVocabs } from 'components/slices/userSlice';
import apiHandler from "lib/fetchHandler";
import type { NextPage } from "next";
import { Stack } from "react-bootstrap";
import { store } from "store";
import useSWR from 'swr';
import LOG from "lib/log"
import { useEffect } from "react"
import { setMessage } from "components/slices/messageSlice";

const LAST_UPDATE_DATE = 1645801777766
const UPDATE = `New function for better memorize:
Auto play if you input correct in verifier.
Check it out in the profile button👉

Performance enhanced:
Re-login if you have any problem
`

function shoudShowUpdate(): Boolean {
    if (typeof window !== "undefined") {
        const lastseen = parseInt(localStorage.getItem("lastseen") || "0")
        return LAST_UPDATE_DATE > lastseen
    }
    return false
}

async function fetcher(url: string) {
    const option = { url: url }
    LOG("Fetching data from server")
    const result = await apiHandler(option)
    store.dispatch(setVocabs(result.length))
    return result;
}

function Frame(): NextPage {
    const { data, mutate } = useSWR("/vocab", fetcher);

    useEffect(() => {
        LOG("useEffect call")
        if (shoudShowUpdate()) {
            store.dispatch(setMessage({ message: UPDATE ,duration:999}))
            //localStorage.setItem("lastseen", String(Date.now()))
        }
    }, [])

    return (
        <>
            <div className="hero"></div>
            <Dialog mutate={mutate} />
            <Stack gap={2} className="col-md-10 mx-auto content vstack gap-2 p-3">
                {!data ? <Loading /> : <Datalist datas={data} mutate={mutate} />
                }
            </Stack>
        </>
    )
}

export default Frame

