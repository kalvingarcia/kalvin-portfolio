"use client"
import {createPortal} from "react-dom";
import {keyframes} from "tss-react";
import {tss} from "./themer";
import { Transition } from "./animation";
import { ContainerContextProvider } from "../helper/container";
import { useEffect, useState } from "react";

// The transition animations for the modal component.
const fadeIn = keyframes({
    "0%": {
        opacity: 0
    }
});
const fadeOut = keyframes({
    "100%": {
        opacity: 0
    }
});
const slideUp = keyframes({
    "0%": {
        transform: "translate(0, 1000px)"
    }
});
const slideDown = keyframes({
    "100%": {
        transform: "translate(0, 1000px)"
    }
});
const zoomIn = keyframes({
    "0%": {
        transform: "scale(0.95)"
    }
});
const zoomOut = keyframes({
    "100%": {
        transform: "scale(0.95)"
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
        padding: 40,
        borderRadius: 20,
        overflowX: "hidden",
        overflowY: "auto",
        clip: "inset(0 0 0 0 20px)",
        backgroundColor: theme[role][`container${elevation === "normal"? "" : elevation[0].toUpperCase() + elevation.slice(1)}`].hex()
    },
    fadeIn: {
        animation: `${fadeIn} ${delay}ms ease-out forwards`
    },
    fadeOut: {
        animation: `${fadeOut} ${delay}ms ease-in forwards`
    },
    slideUp: {
        animation: `${slideUp} ${delay}ms ease-in-out forwards`
    },
    slideDown: {
        animation: `${slideDown} ${delay}ms ease-in forwards`
    },
    zoomIn: {
        animation: `${zoomIn} ${delay}ms ease-in-out forwards`
    },
    zoomOut: {
        animation: `${zoomOut} ${delay}ms ease-in forwards`,
        overflow: "hidden"
    },
    lockScroll: {
        overflow: "hidden"
    }
}));

const DEFAULT_DELAY = 300;

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

    const [show, setShow] = useState(false);
    useEffect(() => {
        if(show && !open) {
            document.getElementById("root").classList.remove(classes.zoomOut);
            document.getElementById("root").classList.add(classes.zoomIn);
            document.body.classList.remove(classes.lockScroll);
            document.documentElement.classList.remove(classes.lockScroll);
            setTimeout(() => setShow(false) ||  document.getElementById("root").classList.remove(classes.zoomIn), delay);
        } else if(!show && open) {
            document.getElementById("root").classList.add(classes.zoomOut);
            document.body.classList.add(classes.lockScroll);
            document.documentElement.classList.add(classes.lockScroll);
            setShow(true);
        }
    }, [open]);

    const {cx, classes} = useStyles({role, elevation, delay});
    return show && createPortal(
        <ContainerContextProvider role={role} type="container">
            <div className={classes.modal}>
                <Transition show={open} enter={classes.fadeIn} exit={classes.fadeOut} duration={delay}>
                    <div className={classes.scrim} onClick={() => setOpen(false)} />
                </Transition>
                <Transition show={open} enter={cx(classes.fadeIn, classes.slideUp)} exit={cx(classes.fadeOut, classes.slideDown)} duration={delay}>
                    <div className={cx(classes.content, className)} {...props}>
                        {children}
                    </div>
                </Transition>
            </div>
        </ContainerContextProvider>,
        document.body
    );
}