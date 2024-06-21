"use client"
import { useContext, useState} from "react";
import {keyframes} from "tss-react";
import {tss, DarkModeContext, ThemeContext} from './assets/components/themer';
import Animator from "./assets/components/animator";

const fadeInUp = keyframes({
    "0%": {
        opacity: 0,
        transform: "translate(0, 100px) scale(0.75)"
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
        transform: "translate(0, 100px) scale(0.75)"
    }
});

const useStyles = tss.create(({theme}) => ({
    home: {
        background: theme.neutral.surface.hex(),
        [`@media (max-width: ${500}px)`]: {
            width: 200,
            left: "calc((100% - 200px) / 2)",
        },
        width: 400,
        height: 200,
        position: "fixed",
        top: "calc((100% - 200px) / 2)",
        left: "calc((100% - 400px) / 2)",
        borderRadius: 20,
        transition: "background-color 300ms ease, width 300ms ease, left 300ms ease"
    },
    enter: {
        animation: `${fadeInUp} 300ms ease-in forwards`
    },
    exit: {
        animation: `${fadeOutDown} 300ms ease-in forwards`
    }
}));

export default function Homepage({}) {
    const [show, setShow] = useState(false);
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);

    const {classes, cx} = useStyles();
    return (
        <main>
            <Animator show={show} enter={classes.enter} exit={classes.exit}>
                <div className={classes.home} />
            </Animator>
            <button onClick={() => setShow(!show)}>Show</button>
            <button onClick={() => toggleDarkMode()}>Dark Mode</button>
        </main>
    );
}