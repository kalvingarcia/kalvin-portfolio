"use client"
import {useEffect, useState} from "react";
import {keyframes} from "tss-react";
import {tss, useDarkModeContext} from './assets/components/themer';
import {Transition, Effect} from "./assets/components/animation";
import {Subheading, Title} from "./assets/components/typography";
import {ContainerContextProvider} from "./assets/helper/container";

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
    popup: {
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
    stay: {
        background: theme.primary.container.hex(),
        width: 400,
        height: 200,
        opacity: 0
    },
    enter: {
        animation: `${fadeInUp} 300ms ease-in forwards`
    },
    exit: {
        animation: `${fadeOutDown} 300ms ease-in forwards`
    },
    begin: {
        animation: `${fadeInUp} 300ms ease-in forwards`
    },
    active: {
        "&&": {
            opacity: 1,
            transform: "translate(0, 0)"
        }
    }
}));

export default function Homepage({}) {
    const [show, setShow] = useState(false);
    const [start, setStart] = useState(false);
    useEffect(() => {
        setTimeout(() => setStart(true), 1000);
    }, []);
    const {toggleDarkMode} = useDarkModeContext();

    const {classes} = useStyles();
    return (
        <main>
            <Transition show={show} enter={classes.enter} exit={classes.exit}>
                <div className={classes.popup}>
                    <Title>Text To See</Title>
                </div>
            </Transition>
            <Effect start={start} begin={classes.begin} active={classes.active}>
                <div className={classes.stay}>
                    <ContainerContextProvider role="primary" type="container">
                        <Subheading>Text To See</Subheading>
                    </ContainerContextProvider>
                </div>
            </Effect>
            <button onClick={() => setShow(!show)}>Show</button>
            <button onClick={() => toggleDarkMode()}>Dark Mode</button>
        </main>
    );
}