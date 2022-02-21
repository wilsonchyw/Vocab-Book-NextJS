import { FunctionComponent, useEffect } from 'react';
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setMessage } from 'components/slices/messageSlice';


const Message: FunctionComponent = () => {
    const dispatch = useDispatch()
    const {message, type} = useSelector((state: RootState) => state.message)
    const handleClose = () => dispatch(setMessage(""))

    useEffect(() => {
        setTimeout(() => { if (message) handleClose() }, 5000)
    })

    return (
        <>
            {!!message &&
                <div className="dialog" onClick={handleClose}>
                    <Alert variant={type === "normal" ? "primary" : "danger"} className="m-0 d-flex justify-content-between">
                        {message}
                    </Alert>
                </div>
            }
        </>
    )

}
export default Message