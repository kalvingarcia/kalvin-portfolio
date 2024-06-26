import {createPortal} from "react-dom";
import {keyframes} from "tss-react";
import {tss} from "./themer";
import { Transition } from "./animation";
import { ContainerContextProvider } from "../helper/container";
import { useEffect, useState } from "react";

// The transition animations for the modal component.
const fadeInUp = keyframes({
    "0%": {
        opacity: 0,
        transform: "translate(0, 1000px)"
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
        transform: "translate(0, 1000px)"
    }
});

// Modal styles.
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

/**
 * The Modal component is used content should appear above the content on the
 * screen, obsuring the content below. The component is made using the createPortal
 * function and the Transition component to animate the render.
 *
 * @param props The component takes 7 props:
 *  *   The `className` prop is used to override styles of the content `div`.
 *  *   The `role` prop is used to describe which palette color the modal should
 *      use. *Defaults to neutral.*
 *  *   The `elevation` prop can only be used when the role is neutral. The prop
 *      allows the user to specify which elevation level the container will have
 *      changing the color. *Defaults to normal.*
 *  *   The `open` and `setOpen` props are used to specify when the modal should
 *      open. The callback is used to close the modal when clicking outside of it.
 *  *   The `delay` prop describes how long the transition animation should take.
 *      *Defaults to 500 milliseconds.*
 *  *   The `children` prop is used to define the content of the modal.
 *
 *  The component passes on other props to the `div` housing the content.
 *
 *  @returns A portal to the root component.
 */
export default function Modal({className, role = "neutral", elevation = "normal", open, setOpen, delay = DEFAULT_DELAY, children, ...props}) {
    if(role != "neutral")
        elevation = "normal";

    const [show, setShow] = useState(open);
    useEffect(() => {
        if(show && !open)
            setTimeout(() => setShow(false), delay);
        else if(!show && open)
            setShow(true);
    }, [open]);

    const {cx, classes} = useStyles({role, elevation, delay});
    return show && createPortal(
        <ContainerContextProvider role={role} type="container">
            <div className={classes.modal}>
                <div className={classes.scrim} onClick={() => setOpen(false)} />
                <Transition show={open} enter={classes.enter} exit={classes.exit} duration={delay}>
                    <div className={cx(classes.content, className)} {...props}>
                        {children}
                    </div>
                </Transition>
            </div>
        </ContainerContextProvider>,
        document.getElementById("root")
    );
}