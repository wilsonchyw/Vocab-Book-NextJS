import Datalist from "components/datalist";
import Dialog from "components/Dialog";
import Loading from "components/Loading";
import NavBar from "components/NavBar";
import { setVocabLength, setMsg } from 'components/slices';
import apiHandler from "lib/fetchHandler";
import type { NextPage } from "next";
import { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, store } from "store";
import useSWR from 'swr';


function shoudShowMessage(id: String): Boolean {
    if (typeof window !== "undefined") {
        const messageId = localStorage.getItem("messageId")
        return id != messageId || messageId == null
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
    const dispatch = useDispatch()
    const { vocabs, isLogin } = useSelector((state: RootState) => state.user)
    const { data, mutate } = useSWR(isLogin ? "/vocab" : null, vocabs ? () => [...vocabs] : fetcher, { revalidateOnFocus: false })


    useEffect(() => {
        apiHandler({ url: "/vocab/message" }, (response) => {
            if (shoudShowMessage(response.id)) {
                dispatch(setMsg(response.value,"update",10000))
                localStorage.setItem("messageId", response.id)
            }
        })
    }, [])


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

