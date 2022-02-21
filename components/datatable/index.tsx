import { NextFunctionComponent } from 'next';
import { useMemo } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Tbody from "./body";
import Thead from "./header";
import Paginations from "./paginations";
import PerPageDropdown from "./perPageDropdown";
import SearchBox from "./searchBox";
import { changeCurrent, changePerPage } from './tableSlice';
import { RootState } from '/store';


type props = {
    data: {}[]
    headers: Array<string | headerProps> | null
    modifier: {}
}

export type headerProps = {
    text: String
    value: string
    style?: object
}


const Datatable: NextFunctionComponent = ({ data, headers = null, modifier }: props) => {
    const colName = headers ? headers.map(header => typeof header === "string" ? header : header.value) : Object.keys(data[0])

    const [sortOrder, sortType, perPage, currentPage, dataLength] = useSelector((state: RootState) => [state.table.order, state.table.orderType, state.table.perPage, state.table.currentPage, state.table.length])
    const dispatch = useDispatch()
    const paginationsProps = {
        currentPage: currentPage,
        total: dataLength,
        itemsPerPage: perPage,
        setCurrent: (value: number) => dispatch(changeCurrent(value))
    }

    const setPerPage = (value: number) => dispatch(changePerPage(value))

    const pagination = useMemo(() =>
        <Row className="w-100">
            <Col lg={4} className="d-flex justify-content-end">
                <PerPageDropdown handleNumChange={setPerPage} />
            </Col>
            <Col lg={4} className="d-flex justify-content-center">
                <Paginations {...paginationsProps} />
            </Col>
            <Col lg={2}>
                <Button size="sm">Total: {dataLength}</Button>
            </Col>
            <Col lg={2}>
                <SearchBox />
            </Col>
        </Row>, [dataLength, setPerPage, paginationsProps])

    return (
        <div>
            <div>sortType: {sortType}</div>
            <div>sortOrder: {sortOrder}</div>
            <button onClick={() => dispatch(changeType("email"))}>Click</button>
            {pagination}
            <Table bordered hover>
                <Thead headers={headers} dispatch={dispatch} sortOrder={sortOrder} sortType={sortType} />
                <Tbody colName={colName} datas={data} sortOrder={sortOrder} sortType={sortType} itemsPerPage={perPage} currentPage={currentPage} modifier={modifier} />
            </Table>
        </div>
    )
}


export default Datatable
