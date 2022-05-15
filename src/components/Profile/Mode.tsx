import DateRangePicker from "components/DateRangePicker";
import DateSinglePicker from "components/DateSinglePicker";
import Divider from "components/Divider";
import { changeCurrent, changeFilterType, toggleDialog } from "components/slices";
import { setRevisionInterval } from "components/slices/userSlice";
import { FunctionComponent } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import Discription from "./Discription";

const intervals = [0, 1, 2, 3, 7, 14, 21, 30, 60];

const Mode: FunctionComponent = () => {
    const dispatch = useDispatch();
    const {  revisionInterval, filterType } = useSelector((state: RootState) => ({ ...state.user,...state.list }));

    const changeMode = (type: string): void => {
        dispatch(changeFilterType(type));
        dispatch(changeCurrent(1))
        //if (type != "range") toggle();
    };

    const toggle = () => dispatch(toggleDialog());

    return (
        <>
            <Button variant={filterType === "keyword" ? "secondary" : "light"} onClick={() => changeMode("keyword")} size="sm">
                All words
            </Button>
            <Button variant={filterType === "forgettingCurve" ? "secondary" : "light"} onClick={() => changeMode("forgettingCurve")} size="sm">
                Revision
            </Button>
            <Button variant={filterType === "range" ? "secondary" : "light"} onClick={() => changeMode("range")} size="sm">
                Range
            </Button>
            {filterType === "range" && <DateRangePicker />}
            {filterType === "forgettingCurve" && <DateSinglePicker />}
            {filterType === "forgettingCurve" && <Discription />}
            {filterType === "forgettingCurve" && (
                <>
                    <Divider content="Interval (days)" className="mx-1" />
                    <ButtonGroup className="me-2" aria-label="First group" size="sm">
                        {intervals.map((interval) => (
                            <Button variant={revisionInterval.includes(interval) ? "secondary" : "light"} onClick={() => dispatch(setRevisionInterval(interval))} key={interval}>
                                {interval}
                            </Button>
                        ))}
                    </ButtonGroup>
                </>
            )}
            
        </>
    );
};

export default Mode;
