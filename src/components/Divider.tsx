import { FunctionComponent } from 'react';
import { Stack } from "react-bootstrap";

interface Divider {
    content: string;
    offset?: string
}

const Divider: FunctionComponent = ({ content, offset }: Divider) => {
    return (
        <Stack direction="horizontal" gap={1} className={offset}>
            <span className="badge bg-secondary bg-opacity-75">{content}</span>
            <hr className="w-100" />
        </Stack>
    )
}

export default Divider