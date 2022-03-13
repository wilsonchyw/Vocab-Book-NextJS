import { FunctionComponent } from 'react';

const Loading: FunctionComponent = () => {
    return (
        <div className="w-100 d-flex justify-content-center">
            <div className="spinner-border spinner text-light mx-auto mt-5" role="status">
                <span className="sr-only"></span>
            </div>
        </div>

    )
}

export default Loading