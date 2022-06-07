import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { changeOrderType } from 'components/slices/listSlice';
import { FunctionComponent } from 'react';
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '/store';

type prop = {
    isMobile: Boolean,
    dataLength:number,
    correntLength:number
}

const Arrow: FunctionComponent = ({ column }: { column: String }) => {
    const {order, orderType,filterType} = useSelector((state: RootState) => state.list)
    if (orderType !== column) return ""
    if (order === 1) {
        return <ArrowUpwardIcon fontSize={'small'} />
    } else {
        return <ArrowDownwardIcon fontSize={'small'} />
    }
}

const DataHeader: FunctionComponent = ({ isMobile ,dataLength,correntLength}: prop) => {
    const dispatch = useDispatch()
    if (isMobile) return (
        <Card className="p-2 shadow rounded">
            <Row className="font-weight-bold">
                <Col onClick={() => dispatch(changeOrderType("vocabulary"))} xs={5}>
                    <strong>Vocabulary</strong><Arrow column={"vocabulary"} />
                </Col>
                <Col onClick={() => dispatch(changeOrderType("meaning"))} className="p-0">
                    <strong>Meaning</strong>
                </Col>
            </Row>
        </Card>
    )
    return (
        <Card className="shadow rounded">
            <Row className="font-weight-bold px-3 py-2">
                <Col className="px-0" style={{ maxWidth: "80px" }}>
                    <strong>Action</strong>
                </Col>
                <Col className="px-0" xs={2}>
                    <strong>Verify</strong>
                    <span>({correntLength}/{dataLength})</span>
                </Col>                
                <Col onClick={() => dispatch(changeOrderType("vocabulary"))} className="px-0" xs={2}>
                    <strong>Vocabulary</strong><Arrow column={"vocabulary"} />
                </Col>
                <Col onClick={() => dispatch(changeOrderType("meaning"))} className="px-0">
                    <strong>Meaning</strong>
                </Col>
                <Col className="px-0" xs={1}>
                    <strong>Type</strong>
                </Col>
                <Col onClick={() => dispatch(changeOrderType("createAt"))} className="px-0" xs={2}>
                    <strong>Create at</strong><Arrow column={"createAt"} />
                </Col>
            </Row>
        </Card>
    )
}

export default DataHeader