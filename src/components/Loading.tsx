import { FunctionComponent } from 'react';

const Loading: FunctionComponent = ({size="xl"}) => {
    const getSize = (_size)=>{
        if(_size=="xl"){
            return {width:"300px",height:"300px"}
        }else if(_size=="sm"){
            return {width:"20px",height:"20px"}
        }
    }

    return (
        <div className="w-100 d-flex justify-content-center">
            <div className="spinner-border text-light mx-auto" role="status" style={getSize(size)}>
                <span className="sr-only"></span>
            </div>
        </div>

    )
}

export default Loading