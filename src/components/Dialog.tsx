import { changeVocab, handleHide, setExample, setInflection, setMessage, setVocabs } from 'components/slices';
import apiHandler from "lib/fetchHandler";
import type { Inflection } from "lib/vocab";
import React, { FunctionComponent, useState } from 'react';
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from 'store';

type prop = {
    mutate: Function
}

type InflectionComponentProp = {
    inf: any,
    _key: string,
    handleInflectChange: Function
}

const InflectionComponent: FunctionComponent<InflectionComponentProp> = ({ inf, _key, handleInflectChange }: InflectionComponentProp) => {
    return (
        <Row className="mt-1">
            <Col>
                <Form.Control placeholder={_key} value={inf.vocab} name="vocab" onChange={(e) => handleInflectChange(e, _key)} />
            </Col>
            <Col>
                <Form.Control value={inf.meaning} name="meaning" onChange={(e) => handleInflectChange(e, _key)} />
            </Col>
        </Row>
    )
}

const Dialog: FunctionComponent<prop> = ({ mutate }: prop) => {
    const dispatch = useDispatch()
    const [isloading, setLoading] = useState<Boolean>(false)
    const { show, isEdit, vocab, inflection, example } = useSelector((state: RootState) => state.dialog)

    const handleClose = () => {
        setLoading(false)
        dispatch(handleHide())
    }

    const handleVocabChange = (event: any) => {
        const { name, value } = event.target
        dispatch(changeVocab({ ...vocab, [name]: value }))
    }

    const handleInflectChange = (event: any, type: keyof Inflection) => {
        const { name, value } = event.target
        const _inflection = { ...inflection, [type]: { ...inflection[type], [name]: value } }
        dispatch(setInflection(_inflection))
    }

    const handleExampleChange = (event: any) => {
        const { name, value } = event.target
        dispatch(setExample({ index: name, value: value }))
    }

    const handleAction = () => {
        setLoading(true)

        if (!vocab.type || !vocab.meaning || !vocab.vocabulary) {
            setLoading(false)
            return store.dispatch(setMessage({ type: "error", message: "Please fill in all required data" }))
        }

        const data = { ...vocab, inflection: JSON.stringify(inflection) }
        if (example.length) data.example = JSON.stringify(example.filter(x => x != ""))
        const method = isEdit ? "put" : "post"
        const option = { url: "/vocab", method: method, data: data }
        apiHandler(option, () => {
            dispatch(setMessage(`${isEdit ? "Edit" : "Create"} ${vocab.vocabulary} success`));
            dispatch(setVocabs(null))
            mutate()
            handleClose()            
        })
    }

    const handleDelete = () => {
        const option = { url: "/vocab", method: "delete", data: { id: vocab.id } }
        confirm(`Confirm delete ${vocab.vocabulary}?`) &&
        apiHandler(option, () => {
            dispatch(setMessage(`Delete ${vocab.vocabulary} success`));
            dispatch(setVocabs(null))
            mutate()
            handleClose()            
        })
    }



    return (
        <Modal show={show} onHide={handleClose} centered scrollable={true} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? "Editing" : "Creating"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-1" >
                        <Form.Label>Vocabulary</Form.Label>
                        <Form.Control value={vocab.vocabulary} onChange={handleVocabChange} name="vocabulary" />
                    </Form.Group>

                    <Form.Group className="mb-1" >
                        <Form.Label>Meaning</Form.Label>
                        <Form.Control value={vocab.meaning} onChange={handleVocabChange} name="meaning" />
                    </Form.Group>

                    <Form.Group className="mb-1" >
                        <Form.Label>Type</Form.Label>
                        <Form.Select value={vocab.type} onChange={handleVocabChange} name="type">
                            <option value="adjective" >Adjective</option>
                            <option value="verb">Verb</option>
                            <option value="noun">Noun</option>
                            <option value="adverb">Adverb</option>
                            <option value="other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-1" >
                        <Form.Label>Inflection</Form.Label>
                        {Object.keys(inflection).map(key => {
                            return vocab.type === key ?
                                null :
                                <InflectionComponent key={key} _key={key} inf={inflection[key]} handleInflectChange={handleInflectChange} />
                        })}
                    </Form.Group>

                    <Form.Group className="mb-1" >
                        <Form.Label>Example</Form.Label>
                        {example.concat([""]).map((sentence: string, index: number) => (
                            <Form.Control value={sentence} onChange={handleExampleChange} key={index} name={index} className="mb-1" />
                        ))}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {isEdit &&
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                }
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAction}>
                    {isloading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                    Save
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
export default Dialog