import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Footer, FooterMobile } from "components/datalist/Footer";
import Verifier from "components/datalist/Verifier";
import speak from "lib/speak";
import type { Vocab } from "lib/vocab";
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type rowProp = {
    data: Vocab
    handleEdit: Function,
    isMobile: boolean,
    visable: visable 
    
}

type visable = {
    vocab: Boolean,
    meaning: Boolean,
    detail:{
        all:boolean,
        onCorrect:boolean
    }
}

type verifierProps = {
    word: string,
    setVisable: Function,
    autoPlay: {
        onCorrect: Boolean,
        onVerifierClick: Boolean,
        [key: string]: Boolean
    }
}

const DataRow: FunctionComponent = ({ data, handleEdit, isMobile, visable }: rowProp) => {

    const [_visable, setVisable] = useState<visable>({})
    const [expand, setExpand] = useState<Boolean>(false)
    const autoPlay = useSelector((state: RootState) => state.user.autoPlay)

    useEffect(() => {
        setVisable(visable)
        setExpand(visable.detail.all)
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
                    <Verifier vocab={data} setVisable={setVisable} autoPlay={autoPlay} setExpand={setExpand} shouldExpand={visable.detail.onCorrect}/>
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