import { FunctionComponent } from 'react';
import { Stack } from "react-bootstrap";

interface Divider {
    content: string;
    offset?: string
}
//<div class="d-flex align-items-center">
//<Stack direction="horizontal" gap={1} className={offset}>
const Divider: FunctionComponent = ({ content, offset }: Divider) => {
    return (
        <div className={`d-flex align-items-center ${offset}`}>
        
            <span className="badge bg-secondary bg-opacity-75">{content}</span>
            <hr className="w-100" />
        </div>
    )
}

export default Divider