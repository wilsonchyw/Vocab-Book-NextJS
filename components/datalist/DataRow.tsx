import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Footer, FooterMobile } from "components/datalist/Footer";
import speak from "lib/speak";
import type { Vocab } from "lib/vocab";
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type rowProp = {
    data: Vocab
    handleEdit: Function,
    isMobile: Boolean,
    visable: {
        vocab: Boolean,
        meaning: Boolean
    }
}

type visable = {
    vocab: Boolean,
    meaning: Boolean
}

type verifierProps = {
    word: string,
    setVisable: Function,
    autoPlay: Boolean
}

const Verifier: FunctionComponent = ({ word, setVisable, autoPlay }: verifierProps) => {
    const [answer, setAnswer] = useState<string>("")
    const verifyInput = (input: string) => {
        setAnswer(input)
        if (input === word) {
            if (autoPlay) speak(word)
            setVisable({ vocab: true, meaning: true })
        }
    }

    return (
        <div>
            <input onChange={(e) => verifyInput(e.target.value)} onClick={() => speak(word)} className="form-control form-control-sm w-75 d-inline"></input>
            {answer ? answer === word ? <CheckIcon color="primary" /> : <ClearIcon color="danger" /> : ""}
        </div>
    )
}


const DataRow: FunctionComponent = ({ data, handleEdit, isMobile, visable }: rowProp) => {
    const [_visable, setVisable] = useState<visable>({})
    const [expand, setExpand] = useState<Boolean>(false)
    const autoPlay = useSelector((state: RootState) => state.user.autoPlay)

    useEffect(() => {
        setVisable(visable)
    }, [visable])

    const content = typeof data.inflection === "string" ? JSON.parse(data.inflection) : data.inflection
    const inflection = {
        content: content,
        hasContent: Object.keys(content).some(x => !!content[x].vocab)
    }
    const example = data.example != null ? JSON.parse(data.example) : []
    const hasFooter: Boolean = example.length || inflection.hasContent

    if (isMobile) return (
        <div>
            <Row className="p-2 ">
                <Col onClick={() => setVisable({ ..._visable, vocab: !_visable.vocab })} xs={5} className="pr-0">
                    {_visable.vocab && <div>
                        {data.vocabulary}
                    </div>}
                </Col>
                <Col onClick={() => setVisable({ ..._visable, meaning: !_visable.meaning })} xs={6} className="p-0">
                    {_visable.meaning && data.meaning}
                </Col>
                <Col xs={1} className="p-0">
                    {expand ? <KeyboardArrowUpIcon onClick={() => setExpand(false)} /> : <KeyboardArrowDownIcon onClick={() => setExpand(true)} />}
                </Col>
            </Row >
            {expand && <FooterMobile handleEdit={handleEdit} data={data} inflection={inflection} example={example} />}
        </div>
    )

    return (
        <div>
            <Row className="px-3 py-2">
                <Col className="px-0" style={{ maxWidth: "80px" }}>
                    <span>
                        <PlayCircleIcon onClick={() => speak(data.vocabulary)} />
                        <EditIcon onClick={() => handleEdit(data)} />
                        {hasFooter && (expand ? <KeyboardArrowUpIcon onClick={() => setExpand(false)} /> : <KeyboardArrowDownIcon onClick={() => setExpand(true)} />)}
                    </span>
                </Col>
                <Col className="px-0" xs={2}>
                    <Verifier word={data.vocabulary} setVisable={setVisable} autoPlay={autoPlay} />
                </Col>
                <Col onClick={() => setVisable({ ..._visable, vocab: !_visable.vocab })} className="px-0" xs={2}>
                    {_visable.vocab && data.vocabulary}
                </Col>
                <Col onClick={() => setVisable({ ..._visable, meaning: !_visable.meaning })} className="px-0" >
                    {_visable.meaning && data.meaning}
                </Col>
                <Col className="px-0" sm={1}>
                    {data.type === "adjective" ? "adj" : data.type}
                </Col>
                <Col className="px-0" sm={2}>
                    {new Date(Number(data.createAt)).toLocaleDateString()}
                </Col>
            </Row >
            {expand && <Footer inflection={inflection} example={example} />}
        </div>
    )
}

export default DataRow