import { Dropdown } from 'react-bootstrap'

type PerPageProps = {
    handleNumChange: (value: number)=>void
}

const eachPage:number[] = [10,15,20,30]

function PerPageDropdown({ handleNumChange}: PerPageProps) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm">
                <span>Per page </span>
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
                {eachPage.map(p =>
                    <Dropdown.Item key={p} className="px-1"  onClick={() => handleNumChange(p)}>
                        <span>{p}</span>
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default PerPageDropdown