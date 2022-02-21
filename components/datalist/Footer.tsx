import EditIcon from '@mui/icons-material/Edit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Divider from "components/Divider";
import speak from "lib/speak";
import type { Inflection, Vocab } from "lib/vocab";
import React, { FunctionComponent } from 'react';
import { Col, Row } from "react-bootstrap";

interface FooterMobile {
    handleEdit: Function;
    data: Vocab;
    inflection: any;
    example: string[]
}

interface Footer {
    inflection: Inflection;
    example: string[]
}

const Example: FunctionComponent = ({ example }: { example: Array<string> }) => {
    return (
        example.length ?
            <div className="px-1">
                <Divider content="example" />
                {example.map(sentence => (
                    <Row key={sentence} className="my-2">
                        <Col style={{ maxWidth: "24px" }}>
                            <PlayCircleIcon onClick={() => speak(sentence)} />
                        </Col>
                        <Col>
                            {sentence}
                        </Col>
                    </Row>
                ))}
            </div> :
            null
    )
}

export const Footer: FunctionComponent = ({ inflection, example }: Footer) => {
    const inflectionComponent = inflection.hasContent ?
        <div>
            <Divider content="inflection" offset="px-1" />
            {Object.keys(inflection.content).filter(key => !!inflection.content[key].vocab).map((key: string) => (
                <Row key={key} className="px-3 my-2">
                    <Col style={{ maxWidth: "80px" }}></Col>
                    <Col className="px-0" xs={2}></Col>
                    <Col className="px-0" xs={2}>
                        {inflection.content[key].vocab}
                    </Col>
                    <Col className="px-0" >
                        {inflection.content[key].meaning}
                    </Col>
                    <Col className="px-0" xs={1}>
                        {key}
                    </Col>
                    <Col className="px-0" xs={2}> </Col>
                </Row>))}
        </div> :
        null
    return (
        <div>
            {inflectionComponent}
            <Example example={example} />
        </div>
    )
}

export const FooterMobile: FunctionComponent = ({ handleEdit, data, inflection, example }: FooterMobile) => {
    const inflectionComponent = inflection.hasContent ?
        <div>
            <Divider content="inflection" offset="px-1" />
            {Object.keys(inflection.content).filter(key => !!inflection.content[key].vocab).map((key: string) => (
                <Row key={key} className="px-2">
                    <Col xs={5}>
                        {inflection.content[key].vocab}
                    </Col>
                    <Col xs={5} className="p-0">
                        {inflection.content[key].meaning}
                    </Col>
                    <Col xs={2} >
                        {key === "adjective" ? "adj" : key}
                    </Col>
                </Row>))}
        </div> :
        null
    return (
        <div >
            {inflectionComponent}
            <Divider content="details" offset="px-1" />
            <Row className="px-2">
                <Col xs={5} className="pr-0">
                    {data.type.charAt(0).toUpperCase()}{data.type.slice(1)}
                </Col>
                <Col xs={4} className="p-0">
                    {new Date(Number(data.createAt)).toLocaleDateString()}
                </Col>

                <Col xs={3} className="pl-0 d-flex flex-row-reverse">
                    <PlayCircleIcon onClick={() => speak(data.vocabulary)} />
                    <EditIcon onClick={() => handleEdit(data)} />
                </Col>
            </Row>
            <Example example={example} />
        </div>
    )
}

