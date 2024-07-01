"use client"
import {createPortal} from "react-dom";
import {keyframes} from "tss-react";
import {tss} from "./themer";
import { Transition } from "./animation";
import { ContainerContextProvider } from "../helper/container";
import { useEffect, useState } from "react";

// The transition animations for the drawer component.
const open = keyframes({
    "0%": {
        height: 0
    }
});
const close = keyframes({
    "100%": {
        height: 0
    }
});

// Drawer styles.
const useStyles = tss.create(({theme, height, duration}) => ({
    barrier: {
        position: "fixed",
        width: "100%",
        height: "100%",
        inset: 0,
        backgroundColor: "transparent",
        zIndex: 10,
        display: "none",
        "&.open": {
            display: "block"
        }
    },
    drawer: {
        position: "relative",
        width: "100%",
        height,
        zIndex: 100,

        "&::before": {
            content: "''",
            position: "absolute",
            width: "100vw",
            height: "100%",
            top: 0,
            left: "calc((100% - 100vw) / 2)",
            borderRadius: "0px 0px 20px 20px",
            backgroundColor: theme.primary.container.hex()
        }
    },
    content: {
        margin: "auto",
        width: "100%",
        maxWidth: 1280,
        height: "100%",
        padding: 40,
        overflowX: "auto",
        overflowY: "hidden",
    },
    open: {
        animation: `${open} ${duration}ms ease-out forwards`
    },
    close: {
        animation: `${close} ${duration}ms ease-out forwards`
    },
    lockScroll: {
        overflow: "hidden"
    }
}));

const DEFAULT_ANIMATION_DURATION = 300;
const DEFAULT_HEIGHT = 200;

/**
 * The Drawer component is used content should appear in a container at the top of
 * the screen, moving other content down. The component should be places at the top
 * of the root of the DOM. A Transition component is used to animate the render.
 *
 * @param props The component takes 6 props:
 *  *   The `className` prop is used to override styles of the content `div`.
 *  *   The `height` prop is used to define what height the drawer takes up.
 *      *Defaults to 200px.*
 *  *   The `open` and `setOpen` props are used to specify when the modal should
 *      open. The callback is used to close the modal when clicking outside of it.
 *  *   The `duration` prop describes how long the transition animation should take.
 *      *Defaults to 300 milliseconds.*
 *  *   The `children` prop is used to define the content of the modal.
 *
 *  The component passes on other props to the `div` housing the content.
 *
 *  @returns A portal to the root component.
 */
export default function Drawer({className, height = DEFAULT_HEIGHT, open, setOpen, duration = DEFAULT_ANIMATION_DURATION, children, ...props}) {
    useEffect(() => {
        if(!open) {
            document.body.classList.remove(classes.lockScroll);
            document.documentElement.classList.remove(classes.lockScroll);
        } else if(open) {
            document.body.classList.add(classes.lockScroll);
            document.documentElement.classList.add(classes.lockScroll);
        }
    }, [open]);

    const {cx, classes} = useStyles({height, duration});
    return (
        <ContainerContextProvider role="primary" type="container">
            <div className={cx(classes.barrier, open? "open" : "")} onClick={() => setOpen(false)} />
            <Transition show={open} enter={classes.open} exit={classes.close} duration={duration}>
                <div className={classes.drawer} {...props}>
                    <div className={cx(classes.content, className)}>
                        {children}
                    </div>
                </div>
            </Transition>
        </ContainerContextProvider>
    );
}