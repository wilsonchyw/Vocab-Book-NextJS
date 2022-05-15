import { FunctionComponent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import DatePicker from "react-datepicker";
import { setLearningDate } from "./slices/userSlice";
import "react-datepicker/dist/react-datepicker.css";

const oneDay = 1000 * 60 * 60 * 24;

const DateSinglePicker: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { revisionDays, revisionInterval, learningDay } = useSelector((state: RootState) => state.user);
    const [startDate, setStartDate] = useState<number>(learningDay);
    const setDay = (day: Date) => {
        setStartDate(day.getTime());
        dispatch(setLearningDate(day.getTime()));
    };

    const dates = [
        {
            "will-learn": revisionInterval.map((interval: number): number => startDate - oneDay * interval),
        },
        {
            learnt: revisionDays,
        },
    ];

    return <DatePicker selected={startDate} onChange={setDay} highlightDates={dates} inline disabledKeyboardNavigation />;
};

export default DateSinglePicker;
