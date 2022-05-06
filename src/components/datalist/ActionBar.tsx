import { changeCurrent, changeKeyword } from "components/slices/listSlice";
import { NextFunctionComponent } from "next";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect } from "react";



function ActionBar({ dataLength }: { dataLength: number }): NextFunctionComponent {
    const [perPage, currentPage] = useSelector((state: RootState) => [state.list.perPage, state.list.currentPage]);
    const dispatch = useDispatch();
    const lastPage = Math.ceil(dataLength / perPage);

    function previousPage() {
        if (currentPage > 1) dispatch(changeCurrent(currentPage - 1));
    }

    function nextPage() {
        if (currentPage <= lastPage) {
            dispatch(changeCurrent(currentPage + 1));
        }
    }

    const handleInput = (event: any) => {
        dispatch(changeKeyword(event.target.value));
        dispatch(changeCurrent(1));
    };

    const listenKeyPress = (event:any)=>{
        if(event.keyCode==37) return previousPage()// <--
        if(event.keyCode==39) return nextPage() // -->

    }
/**
    useEffect(() => {
        window.addEventListener("keydown", listenKeyPress);
        return ()=>window.removeEventListener("keydown", listenKeyPress);
    });
 */
    return (
        <Card className="bg-transparent">
            <Row>
                <Col>
                    <Button variant="secondary" onClick={previousPage} disabled={currentPage === 1}>
                        Previous
                    </Button>
                </Col>
                <Col>
                    <input onChange={handleInput} placeholder="search" className="form-control" />
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={nextPage} disabled={currentPage === lastPage}>
                        Next
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}

export default ActionBar;
