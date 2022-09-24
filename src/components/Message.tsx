import { deQueue } from "components/slices/messageSlice";
import { FunctionComponent, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

const background = (type: string) => {
    switch (type) {
        case "update":
            return "success";
        case "error":
            return "danger";
        default:
            return "primary";
    }
};

export default function Message(): FunctionComponent {
    const dispatch = useDispatch();
    const { messageQueue } = useSelector((state: RootState) => state.message);
    const handleClose = () => dispatch(deQueue());

    return (
        messageQueue.length != 0 && (
            <div className="container dialog">
                {messageQueue.map((message: any) => (
                    <div className="row my-1" key={message.content}>
                        <Alert
                            variant={background(message.type)}
                            className="m-0 d-flex flex-row"
                            style={{ whiteSpace: "pre-wrap" }}
                            onClick={background(message.type) == "primary" ? handleClose : null}
                        >
                            {background(message.type) != "primary" && <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>}
                            {message.content}
                        </Alert>
                    </div>
                ))}
            </div>
        )
    );
}
