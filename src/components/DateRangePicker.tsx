import { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeRange } from "components/slices";
import { RootState } from 'store';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker: FunctionComponent = () => {
    const dispatch = useDispatch()
    const [start, end] = useSelector((state: RootState) => state.list.dateRange)
    const [dateStart, setStartDate] = useState(new Date(end));
    const [dateEnd, setEndDate] = useState(new Date(start));
    const setDate = (dates: Date[]) => {
        const [_start, _end] = dates
        console.log(dates)
        setStartDate(_start);
        setEndDate(_end);
        
        if (_start != null && _end != null) dispatch(changeRange([_start.getTime(), _end.getTime()]))
    }
    return (
        <DatePicker
            selected={dateStart}
            onChange={setDate}
            startDate={dateStart}
            endDate={dateEnd}
            selectsRange
            inline
        />
    )
}

export default DateRangePicker