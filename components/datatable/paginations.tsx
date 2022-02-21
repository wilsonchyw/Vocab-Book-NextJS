import { Pagination} from 'react-bootstrap'

type props = {
    currentPage: number,
    total: number,
    itemsPerPage: number,
    setCurrent: Function,
}



function Paginations({ currentPage, total, itemsPerPage, setCurrent }: props) {
    const pageList: number[] = Array.from({ length: Math.ceil(total / itemsPerPage) }, (el, idx) => idx + 1)
    const lastPage: number = pageList[pageList.length - 1]

    function previousPage() {
        if (currentPage > 1) setCurrent(currentPage - 1)
    }

    function nextPage() {
        if (currentPage < pageList.length) setCurrent(currentPage + 1)
    }

    function elementDefinder(page: number, index: number) {
        if ((index >= currentPage - 5 && index <= currentPage + 1) || (index >= pageList.length - 4 || index <= 1)) {
            return <Pagination.Item onClick={() => setCurrent(page)} active={currentPage === page} key={index}>{page}</Pagination.Item>
        } else if (index === currentPage - 6 || index === currentPage + 2) {
            return <Pagination.Ellipsis key={index} />
        } else {
            return ""
        }
    }

    return (
        <Pagination size="sm">
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item active={currentPage === 1} onClick={() => setCurrent(1)} >1</Pagination.Item>
            {pageList.slice(1, -1).map((page, index) => elementDefinder(page, index))}
            {pageList.length > 1 && <Pagination.Item active={currentPage === lastPage} onClick={() => setCurrent(lastPage)}>{lastPage}</Pagination.Item>}
            <Pagination.Next onClick={nextPage} />
        </Pagination>
    )
}

export default Paginations