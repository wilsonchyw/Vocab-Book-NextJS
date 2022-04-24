import { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeRange } from "components/slices";
import { RootState } from 'store';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker: FunctionComponent = () => {
    const dispatch = useDispatch()
    const [start, end] = useSelector((state: RootState) => state.list.dateRange)
    const [startDate, setStartDate] = useState(new Date(end));
    const [endDate, setEndDate] = useState(new Date(start));
    const setDate = (dates: Date[]) => {
        const [_start, _end] = dates
        setStartDate(start);
        setEndDate(end);
        if (_start != null && _end != null) dispatch(changeRange([_start.getTime(), _end.getTime()]))
    }
    return (
        <DatePicker
            selected={startDate}
            onChange={(dates: any[]) => setDate(dates)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
        />
    )
}

export default DateRangePicker