import NextFunctionComponent from 'next'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {headerProps} from "."
import { changeOrderType } from './tableSlice'

type prop = {
    headers: string[],
    dispatch: Function,
    sortOrder: number,
    sortType: string
}


const Thead: NextFunctionComponent = ({ headers, dispatch, sortOrder, sortType }: prop) => {
    const headerElements = headers.map((header: string | headerProps) => {
        const [text, value, style] = typeof header === "string" ? [header, header, {}] : [header.text, header.value, header.style ? header.style : {}]
        const orderIcon = sortType === value ? sortOrder === 1 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon /> : ""
        return (
            <th
                onClick={() => dispatch(changeOrderType(value))}
                key={value}
                style={style}>
                {text}
                {orderIcon}
            </th>
        )
    })

    return (
        <thead>
            <tr>
                {headerElements}
            </tr>
        </thead>
    )
}


export default Thead
