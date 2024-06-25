import {createPortal} from "react-dom";
import {keyframes} from "tss-react";
import {tss} from "./themer";
import { Transition } from "./animation";
import { ContainerContextProvider } from "../helper/container";
import { useEffect, useState } from "react";

const fadeInUp = keyframes({
    "0%": {
        opacity: 0,
        transform: "translate(0, 1000px) scale(0.5)"
    },
    "100%": {
        opacity: 1,
        transform: "translate(0, 0)"
    }
});
const fadeOutDown = keyframes({
    "0%": {
        opacity: 1,
        transform: "translate(0, 0)"
    },
    "100%": {
        opacity: 0,
        transform: "translate(0, 1000px) scale(0.5)"
    }
});

const useStyles = tss.create(({theme, role, elevation, delay}) => ({
    modal: {
        position: "absolute",
        zIndex: 1000,
    },
    scrim: {
        position: "fixed",
        width: "100%",
        height: "100%",
        inset: 0,
        opacity: 0.75,
        backgroundColor: theme.neutral.shadow.hex()
    },
    content: {
        position: "fixed",
        width: "80%",
        height: "80%",
        maxWidth: 1000,
        top: "10%",
        left: "calc((100% - min(80%, 1000px)) / 2)",
        padding: 40,
        borderRadius: 20,
        overflowX: "hidden",
        overflowY: "auto",
        backgroundColor: theme[role][`container${elevation === "normal"? "" : elevation[0].toUpper() + elevation.slice(1)}`].hex()
    },
    enter: {
        animation: `${fadeInUp} ${delay}ms ease-in forwards`
    },
    exit: {
        animation: `${fadeOutDown} ${delay}ms ease-in forwards`
    }
}));

const DEFAULT_DELAY = 500;

export default function Modal({role = "neutral", elevation = "normal", open, setOpen, delay = DEFAULT_DELAY, children}) {
    if(role != "neutral")
        elevation = "normal";

    const [show, setShow] = useState(open);
    useEffect(() => {
        if(show && !open)
            setTimeout(() => setShow(false), delay);
        else if(!show && open)
            setShow(true);
    }, [open]);

    const {classes} = useStyles({role, elevation, delay});
    return show && createPortal(
        <ContainerContextProvider role={role} type="container">
            <div className={classes.modal}>
                <div className={classes.scrim} onClick={() => setOpen(false)} />
                <Transition show={open} enter={classes.enter} exit={classes.exit} duration={delay}>
                    <div className={classes.content}>
                        {children}
                    </div>
                </Transition>
            </div>
        </ContainerContextProvider>,
        document.getElementById("root")
    );
}