import BarChart from "components/Chart/BarChart";
import PirChart from "components/Chart/PirChart";
import Loading from "components/Loading";
import NavBar from "components/NavBar";
import { setVocabLength } from 'components/slices/userSlice';
import apiHandler from "lib/fetchHandler";
import type { Vocab } from "lib/vocab";
import type { NextPage } from "next";
import { useMemo } from "react";
import { Stack } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { RootState, store } from "store";
import useSWR from 'swr';


type dateMap = {
    [key: string]: Map<string, number>
}

async function fetcher(url: string) {
    const option = { url: url }
    const result = await apiHandler(option)
    store.dispatch(setVocabLength(result.length))
    return result;
}

function processData(vocabs: Vocab[]): any {
    if (vocabs === undefined) return null
    const dateMap: dateMap = {
        verb: new Map(),//new Map()
        noun: new Map(),
        adverb: new Map(),
        adjective: new Map(),
        other: new Map()
    }
    vocabs.forEach(vocab => {
        const timeStamp = new Date(parseInt(vocab.createAt)).toLocaleDateString()
        const value = dateMap[vocab.type].get(timeStamp) || 0
        dateMap[vocab.type].set(timeStamp, value + 1)
    })
    return dateMap
}


function Chart(): NextPage {
    const { vocabs } = useSelector((state: RootState) => state.user)
    const { data } = useSWR("/vocab", vocabs ? () => [...vocabs] : fetcher)
    const dateMap = useMemo(() => processData(data), [data])

    return (
        <>
            <NavBar />
            <div className="hero"></div>
            <Stack gap={2} className="col-md-10 mx-auto content vstack gap-2 p-3 d-flex align-items-center">
                {!dateMap ? <Loading /> : <>
                    <BarChart dateMap={dateMap} />
                    <PirChart dateMap={dateMap} />
                </>}
            </Stack>
        </>
    )
}

export default Chart