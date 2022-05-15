import { Button } from "react-bootstrap";
import { FunctionComponent } from "react";

type ButtonProps = {
    variant:string,
    onClick:Function,
    text:string
}

const ButtonMod: FunctionComponent = ({variant,onClick,text}:ButtonProps) => {
    return (
        <Button variant={variant} onClick={onClick} size="sm">
            {text}
        </Button>
    );
};

export default ButtonMod;
