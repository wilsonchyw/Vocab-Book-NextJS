import { setEdit } from 'components/slices';
import useAgent from "lib/useAgent";
import type { Vocab } from "lib/vocab";
import { FunctionComponent, useMemo } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import ActionBar from "./ActionBar";
import DataHeader from "./DataHeader";
import DataRow from "./DataRow";
import { RootState } from '/store';

type props = {
    datas: Array<Vocab>
    mutate: Function
}

function isWithinRange(date: string | number, offset: number): boolean {
    date = parseInt(date)
    const day = 1000 * 60 * 60 * 24
    const _date = new Date() - offset * day
    const start = new Date(_date).setHours(0, 0, 0, 0)
    const end = new Date(_date).setHours(24, 0, 0, 0)
    return date > start && date < end
}

const Datalist: FunctionComponent = ({ datas, mutate }: props) => {
    const isMobile = useAgent()
    const dispatch = useDispatch()

    const { order, orderType, perPage, currentPage, keyword, filterType } = useSelector((state: RootState) => state.list)
    const visable = useSelector((state: RootState) => state.visable)
    const {revisionInterval} = useSelector((state:RootState)=>state.user)

    const filterCallback = {
        keyword: (vocab: Vocab) => vocab.vocabulary.toLowerCase().includes(keyword.toLowerCase()) || vocab.meaning.includes(keyword),
        forgettingCurve: (vocab: Vocab) => revisionInterval.map((day:number)=>isWithinRange(vocab.createAt, day)).includes(true)//isWithinRange(vocab.createAt, 1) || isWithinRange(vocab.createAt, 2) || isWithinRange(vocab.createAt, 5) || isWithinRange(vocab.createAt, 31)
    }

    const sortCallback = orderType === "random" ? () => Math.random() - 0.5 : (a: any, b: any) => (a[orderType] > b[orderType] ? 1 : -1) * order
    
    const handleEdit = (vocab: Vocab) => {
        dispatch(setEdit({ vocab: vocab, inflection: vocab.inflection, example: vocab.example }))
    }

    const _datas = useMemo(
        () => datas
            .sort(sortCallback)
            .filter(filterCallback[filterType])
        , [orderType, order, filterType, datas, keyword,revisionInterval])
    const header = useMemo(() => <DataHeader isMobile={isMobile} />, [isMobile])
    const actionBar = useMemo(() => <ActionBar dataLength={_datas.length} />, [_datas.length])
    const [start, end] = (perPage && currentPage) ? [(currentPage - 1) * perPage, currentPage * perPage] : [0, _datas.length]

    return (
        <>
            {actionBar}
            {header}
            {_datas
                .slice(start, end)
                .map((data, index) => (
                    <Card key={data.id} className="shadow rounded zoom mouseover" >
                        <DataRow data={data} handleEdit={handleEdit} isMobile={isMobile} visable={visable} />
                    </Card>))
            }
        </>
    )

}


export default Datalist
