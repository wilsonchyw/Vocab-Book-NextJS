import Datalist from "components/datalist";
import Dialog from "components/Dialog";
import Loading from "components/Loading";
import { setVocabLength } from 'components/slices/userSlice';
import apiHandler from "lib/fetchHandler";
import type { NextPage } from "next";
import { Stack } from "react-bootstrap";
import { RootState, store } from "store";
import useSWR, { useSWRConfig } from 'swr'
import LOG from "lib/log"
import { useEffect, useState } from "react"
import { setMessage } from "components/slices/messageSlice";
import axios from "axios";
import NavBar from "components/NavBar";
import { useDispatch, useSelector } from 'react-redux';
import type { Vocab } from "lib/vocab";
import { useRouter } from "next/router";
import getLocalToken from "lib/localToken";
import { firebase } from "lib/firebaseInit";

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
    console.log("using fetcher")
    const option = { url: url }
    const result = await apiHandler(option)
    store.dispatch(setVocabLength(result.length))
    return result;
}

function Frame(): NextPage {
    const { vocabs } = useSelector((state: RootState) => state.user)
    const { data, mutate } = useSWR("/vocab", vocabs ? () => [...vocabs] : fetcher)

    useEffect(() => {
        if (shoudShowUpdate()) {
            store.dispatch(setMessage({ message: UPDATE, duration: 999 }))
            localStorage.setItem("lastseen", String(Date.now()))
        }
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

