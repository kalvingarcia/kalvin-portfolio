import {useCallback, useState} from "react";
import {tss} from "./themer";
import {ContainerContextProvider} from "../helper/container";
import {Label} from "./typography";

const useStyles = tss.create(({theme, role, active}) => ({
    chip: {
        minWidth: "fit-content",
        minHeight: "fit-content",
        maxWidth: "fit-content",
        maxHeight: "fit-content",
        position: "relative",
        overflow: "hidden",
        padding: "5px 10px",
        borderRadius: 2000,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        fontSize: "0.9rem",

        backgroundColor: theme[active? role : "neutral"][active? "container" : "containerHigh"].hex(),
        "&::after": {
            content: "''",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            backgroundColor: theme[active? role : "neutral"].onContainer.hex(),
            opacity: 0,
            transition: "opacity 300ms ease"
        },
        "&:hover::after": {
            opacity: 0.2
        }
    }
}));

export default function Chip({className, role="primary", activeDefault = false, children, onClick, ...props}) {
    const [active, setActive] = useState(activeDefault);
    const clickHandler = useCallback(event => {
        onClick?.(event);
        setActive(!active);
    }, [active]);

    const {cx, classes} = useStyles({role, active});
    return (
        <ContainerContextProvider role={active? role : "neutral"} type="container">
            <Label className={cx(classes.chip, className)} onClick={clickHandler} {...props}>
                {children}
            </Label>
        </ContainerContextProvider>
    )
}