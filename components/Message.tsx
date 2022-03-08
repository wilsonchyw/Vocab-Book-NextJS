import { FunctionComponent, useEffect } from 'react';
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setMessage } from 'components/slices/messageSlice';


const Message: FunctionComponent = () => {
    const dispatch = useDispatch()
    const { message, type, duration } = useSelector((state: RootState) => state.message)
    const handleClose = () => dispatch(setMessage({ message: "", duration: null }))

    useEffect(() => {
        setTimeout(() => { if (message) handleClose() }, duration || 5000)
    })

    return (
        <>
            {!!message &&
                <div className="dialog" onClick={handleClose} >
                    <Alert variant={type === "normal" ? "primary" : "danger"} className="m-0 d-flex justify-content-between" style={{ whiteSpace: 'pre-wrap' }}>
                        {message}
                    </Alert>
                </div>
            }
        </>
    )

}
export default Message