import { NextFunctionComponent } from 'next'
import { RootState } from 'store'
import { changeLength } from './tableSlice'
import { useSelector, useDispatch } from 'react-redux'

type prop = {
    datas: {}[],
    colName: string[],
    sortOrder: number,
    sortType: string,
    modifier: {},
    itemsPerPage: number | null,
    currentPage: number | null
}

const Tbody: NextFunctionComponent = ({ datas, colName, sortOrder, sortType, modifier, itemsPerPage = null, currentPage = null }: prop) => {

    sortType === "" ? colName[0] : sortType

    const [start, end] = (itemsPerPage && currentPage) ? [(currentPage - 1) * itemsPerPage, currentPage * itemsPerPage] : [0, datas.length]
    const keyword = useSelector((state: RootState) => state.table.filter)
    const sortMethod = (a: any, b: any) => (a[sortType] > b[sortType] ? 1 : -1) * sortOrder
    const filterMethod = (data: any) => data.vocabulary.includes(keyword)
    const dispatch = useDispatch()

    dispatch(changeLength(datas.filter(filterMethod).length))

    return (
        <tbody>
            {datas
                .filter(filterMethod)
                .slice(start, end)
                .sort(sortMethod)
                .map((data, index) => (
                    <tr key={data.id ? data.id : index}>
                        {colName.map((col) =>
                            <td key={data[col]}>
                                {modifier[col] ? modifier[col](data) : data[col]}
                            </td>)}
                    </tr>))
            }
        </tbody>
    )
}

export default Tbody