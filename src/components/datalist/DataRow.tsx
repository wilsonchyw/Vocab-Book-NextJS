import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Footer, FooterMobile } from "components/datalist/Footer";
import Verifier from "components/datalist/Verifier";
import speak from "lib/speak";
import type { Vocab } from "lib/vocab";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "store";

type rowProp = {
    data: Vocab;
    handleEdit: Function;
    isMobile: boolean;
    visible: visible;
    onInputCorrect: Function;
};

type visible = {
    vocab: Boolean;
    meaning: Boolean;
    detail: {
        always: boolean;
        onCorrect: boolean;
    };
};

const DataRow: FunctionComponent = ({ data, handleEdit, isMobile, visible, onInputCorrect }: rowProp) => {
    const [_visible, setVisible] = useState<visible>({});
    const [expand, setExpand] = useState<Boolean>(false);
    const { autoPlay, verifierDisplay } = useSelector((state: RootState) => ({ ...state.user }));

    useEffect(() => {
        /**
         * Determine should the vocab or meaning be visible or not.
         * This state is for a single datarow only, will not affect the other row
         */
        setVisible(visible);
        /**
         * Determine should the details(inflection,example) be expand or not. Default is false
         */
        setExpand(visible.detail.always);
        document.getElementById("row")?.addEventListener("click", speak2);
        return () => document.getElementById("row")?.removeEventListener("click", speak2);
    }, [visible]);

    const content = typeof data.inflection === "string" ? JSON.parse(data.inflection) : data.inflection;
    const inflection = {
        content: content,
        hasContent: Object.keys(content).some((x) => !!content[x].vocab),
    };
    const example = data.example != null ? JSON.parse(data.example) : [];
    const hasFooter: Boolean = example.length || inflection.hasContent;

    if (isMobile)
        return (
            <div>
                <Row className="p-2">
                    {/**
                     * Clicking on the column will make the content visible or hide
                     */}
                    {verifierDisplay ? (
                        <Col xs={5} className="pr-0">
                            <Verifier vocab={data} setVisible={setVisible} autoPlay={autoPlay} setExpand={setExpand} shouldExpand={visible.detail.onCorrect} onInputCorrect={onInputCorrect} />
                        </Col>
                    ) : (
                        <Col onClick={() => setVisible({ ..._visible, vocab: !_visible.vocab })} xs={5} className="pr-0">
                            {_visible.vocab && <div>{data.vocabulary}</div>}
                        </Col>
                    )}

                    <Col onClick={() => setVisible({ ..._visible, meaning: !_visible.meaning })} xs={6} className="p-0">
                        {_visible.meaning && data.meaning}
                    </Col>
                    <Col xs={1} className="p-0">
                        {expand ? <KeyboardArrowUpIcon onClick={() => setExpand(false)} /> : <KeyboardArrowDownIcon onClick={() => setExpand(true)} />}
                    </Col>
                </Row>
                {expand && <FooterMobile handleEdit={handleEdit} data={data} inflection={inflection} example={example} />}
            </div>
        );

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
                    <Verifier vocab={data} setVisible={setVisible} autoPlay={autoPlay} setExpand={setExpand} shouldExpand={visible.detail.onCorrect} onInputCorrect={onInputCorrect} />
                </Col>
                <Col onClick={() => setVisible({ ..._visible, vocab: !_visible.vocab })} className="px-0" xs={2}>
                    {_visible.vocab && data.vocabulary}
                </Col>
                <Col onClick={() => setVisible({ ..._visible, meaning: !_visible.meaning })} className="px-0">
                    {_visible.meaning && data.meaning}
                </Col>
                <Col className="px-0" sm={1}>
                    {data.type === "adjective" ? "adj" : data.type}
                </Col>
                <Col className="px-0" sm={2}>
                    {new Date(Number(data.createAt)).toLocaleDateString()}
                </Col>
            </Row>
            {expand && <Footer inflection={inflection} example={example} />}
        </div>
    );
};

export default DataRow;
