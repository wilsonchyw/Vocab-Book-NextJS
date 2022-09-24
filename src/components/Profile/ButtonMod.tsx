import { Button } from "react-bootstrap";
import { FunctionComponent } from "react";

type ButtonProps = {
    variant: string;
    onClick: Function;
    text: string;
    disabled: Boolean;
};

const ButtonMod: FunctionComponent = ({ variant, onClick, text, disabled = false }: ButtonProps) => {
    return (
        <Button variant={variant} onClick={onClick} size="sm" disabled={disabled}>
            {text}
        </Button>
    );
};

export default ButtonMod;
