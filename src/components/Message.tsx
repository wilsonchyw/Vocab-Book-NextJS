import { deQueue } from 'components/slices/messageSlice';
import { FunctionComponent, useEffect } from 'react';
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

const background=(type:string)=>{
    switch(type){
        case "update":
            return "success"
        case "error":
            return "danger"
        default:
            return "primary"
    }
}

const Message: FunctionComponent = () => {
    const dispatch = useDispatch()
    const { message, type, duration, messageQueue } = useSelector((state: RootState) => state.message)
    const handleClose = () => dispatch(deQueue())

    return (
        messageQueue.length!=0 && <div class="container dialog" onClick={handleClose}>
            {messageQueue.map((message: any) =>
                <div className="row my-1"  >
                    <Alert variant={background(message.type)} className="m-0 d-flex justify-content-between" style={{ whiteSpace: 'pre-wrap' }}>
                        {message.content}
                    </Alert>
                </div>)}
        </div>
    )

}
export default Message