import { setEdit } from "components/slices";
import useAgent from "lib/useAgent";
import type { Vocab } from "lib/vocab";
import { FunctionComponent, useMemo, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ActionBar from "./ActionBar";
import DataHeader from "./DataHeader";
import DataRow from "./DataRow";
import { RootState } from "/store";
import speak from "lib/speak";
import apiHandler from "lib/fetchHandler";

type props = {
    datas: Array<Vocab>;
};

function isWithinRange(date: string | number, interval: number, pivot: number): boolean {
    date = parseInt(date);
    const day = 1000 * 60 * 60 * 24;
    const _date = new Date(pivot) - interval * day;
    const start = new Date(_date).setHours(0, 0, 0, 0);
    const end = new Date(_date).setHours(24, 0, 0, 0);
    return date > start && date < end;
}

function increaseCorrect(id: string) {
    const option = { url: `/vocab/${id}`, method: "put" };
    apiHandler(option, null, true);
}

function finishRevision(){
    console.log("finishRevision")
    const option = { url: "/user", method: "post",data:{day:new Date().getTime()} };
    apiHandler(option, null, true);
}

const Datalist: FunctionComponent = ({ datas }: props) => {
    const isMobile = useAgent();
    const dispatch = useDispatch();

    const { order, orderType, perPage, currentPage, keyword, filterType, dateRange } = useSelector((state: RootState) => state.list);
    const visible = useSelector((state: RootState) => state.visible);
    const { revisionInterval, learningDay, autoPlay } = useSelector((state: RootState) => state.user);

    const filterCallback = {
        keyword: (vocab: Vocab) => vocab.vocabulary.toLowerCase().includes(keyword.toLowerCase()) || vocab.meaning.includes(keyword),
        forgettingCurve: (vocab: Vocab) => revisionInterval.map((interval: number) => isWithinRange(vocab.createAt, interval, learningDay)).includes(true), //isWithinRange(vocab.createAt, 1) || isWithinRange(vocab.createAt, 2) || isWithinRange(vocab.createAt, 5) || isWithinRange(vocab.createAt, 31)
        range: (vocab: Vocab) => dateRange[0] < Number(vocab.createAt) && Number(vocab.createAt) < dateRange[1],
    };

    const sortCallback = orderType === "random" ? () => Math.random() - 0.5 : (a: any, b: any) => (a[orderType] > b[orderType] ? 1 : -1) * order;

    const handleEdit = (vocab: Vocab) => {
        dispatch(setEdit({ vocab: vocab, inflection: vocab.inflection, example: vocab.example }));
    };

    const _datas = useMemo(() => datas.sort(sortCallback).filter(filterCallback[filterType]), [orderType, order, filterType, datas, keyword, revisionInterval, dateRange, learningDay]);
    const header = useMemo(() => <DataHeader isMobile={isMobile} />, [isMobile]);
    const actionBar = useMemo(() => <ActionBar dataLength={_datas.length} />, [_datas.length]);
    const [start, end] = perPage && currentPage ? [(currentPage - 1) * perPage, currentPage * perPage] : [0, _datas.length];

    /**
     * Record user's input if it is correct
     */
    const [verify, setVerify] = useState<object>({});

    /**
     * Record the default "_datas" length for comparsion. "_datas" length will change on various situation.
     * While "_datas" change, compare the defaultLength with the new "_datas" length. If the length is different, clear the "verify" state
     */
    const defaultLength = useMemo(() => _datas.length, [verify])
    if (defaultLength != _datas.length) setVerify({});

    const onInputCorrect = (vocab: Vocab) => {
        increaseCorrect(vocab.id)
        /**
         * Keys of verify is each vocab user inputed correct,
         * If all verify input correct, it consider as finish today's revision
         */
        if (Object.keys(verify).length == _datas.length - 1) finishRevision()

        if (autoPlay.onCorrect) speak(vocab.vocabulary);
        setVerify((preState: object) => ({ ...preState, [vocab.vocabulary]: true }));
    };

    //console.log("learntCount default",learntCount)

    return (
        <>
            {actionBar}
            {header}
            {_datas.slice(start, end).map((data, index) => (
                <Card key={data.id} className="shadow rounded zoom mouseover">
                    <DataRow data={data} handleEdit={handleEdit} isMobile={isMobile} visible={visible} onInputCorrect={onInputCorrect} />
                </Card>
            ))}
        </>
    );
};

export default Datalist;
