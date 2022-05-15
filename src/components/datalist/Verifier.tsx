import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import apiHandler from "lib/fetchHandler";
import speak from "lib/speak";
import React, { FunctionComponent, useState } from 'react';
import type { Vocab } from "lib/vocab";

type verifierProps = {
    vocab: Vocab,
    setVisible: Function,
    setExpand:Function,
    autoPlay: {
        onCorrect: Boolean,
        onVerifierClick: Boolean,
        [key: string]: Boolean
    },
    shouldExpand:boolean,
    onInputCorrect:Function
}

function increaseCorrect(id: string) {
    const option = { url: `/vocab/${id}`, method: "put" }
    apiHandler(option,null,true)
}

const Verifier: FunctionComponent = ({ vocab, setVisible, autoPlay,shouldExpand,setExpand,onInputCorrect }: verifierProps) => {
    const [answer, setAnswer] = useState<string>("")
    const verifyInput = (input: string) => {
        setAnswer(input)
        if (input === vocab.vocabulary) {
            onInputCorrect(vocab)
            //increaseCorrect(vocab.id)
            //if (autoPlay.onCorrect) speak(vocab.vocabulary)
            if(shouldExpand) setExpand(true)
            setVisible({ vocab: true, meaning: true })
        }
    }

    return (
        <div>
            <input
                onChange={(e) => verifyInput(e.target.value)}
                onClick={() => { if (autoPlay.onVerifierClick) speak(vocab.vocabulary) }}
                className="form-control form-control-sm w-75 d-inline">
            </input>
            {answer ? answer === vocab.vocabulary ? <CheckIcon color="primary" /> : <ClearIcon color="danger" /> : ""}
        </div>
    )
}

export default Verifier