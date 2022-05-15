import { FunctionComponent } from "react";

const Discription: FunctionComponent = () => {
    return (
        <>
            <svg height="20" width="20">
                <circle cx="10" cy="10" r="5" stroke="#7e7e7e" strokeWidth="3" fill="transparent" />
                Sorry, your browser does not support inline SVG.
            </svg>
            <small>Days selected for revision </small>
            <br/>

            <svg height="20" width="20">
                <circle cx="10" cy="10" r="5" stroke="#3dcc4a" strokeWidth="3" fill="#3dcc4a" />
                Sorry, your browser does not support inline SVG.
            </svg>
            <small>Days that revision completed</small>
            <br/>
            
            <svg height="20" width="20">
                <circle cx="10" cy="10" r="5" stroke="#216ba5" strokeWidth="3" fill="#216ba5" />
                Sorry, your browser does not support inline SVG.
            </svg>
            <small>Today</small>
        </>
    );
};

export default Discription;
