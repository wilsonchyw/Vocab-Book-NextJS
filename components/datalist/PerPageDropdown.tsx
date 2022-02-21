import { FunctionComponent } from "react"
import { Dropdown } from 'react-bootstrap'
type PerPageProps = {
    handleNumChange: Function
}

const eachPage: number[] = [10, 15, 20, 30]

const PerPageDropdown: FunctionComponent<PerPageProps> = ({ handleNumChange }: PerPageProps) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic" >
                <span>Per page</span>
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
                {eachPage.map(p =>
                    <Dropdown.Item key={p} className="px-1" onClick={() => handleNumChange(p)}>
                        <span>{p}</span>
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default PerPageDropdown