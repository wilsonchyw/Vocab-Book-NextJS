import Datalist from "components/datalist";
import Dialog from "components/Dialog";
import Loading from "components/Loading";
import { setVocabs } from 'components/slices/userSlice';
import apiHandler from "lib/fetchHandler";
import type { NextPage } from "next";
import { Stack } from "react-bootstrap";
import { store } from "store";
import useSWR from 'swr';

async function fetcher(url: string) {
    const option = { url: url }
    const result = await apiHandler(option)
    store.dispatch(setVocabs(result.length))
    return result;
}

function Frame(): NextPage {
    const { data, mutate } = useSWR("/vocab", fetcher);

    console.log("data",data)

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

