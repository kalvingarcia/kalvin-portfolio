"use client"
import { useState } from "react";
import {tss, keyframes} from "tss-react";
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

const useStyles = tss.create(({color}) => ({
    home: {
        background: color,
        height: 200,
        width: 400,
        position: "fixed",
        top: "calc((100% - 200px) / 2)",
        left: "calc((100% - 400px) / 2)",
        borderRadius: 20
    },
    enter: {
        animation: `${fadeInUp} 300ms ease-in forwards`
    },
    leave: {
        animation: `${fadeOutDown} 300ms ease-in forwards`
    }
}));

export default function Homepage({}) {
    const [show, setShow] = useState(false);

    const {classes, cx} = useStyles({color: "pink"});
    return (
        <main>
            <Animator show={show} enter={classes.enter} leave={classes.leave}>
                <div className={classes.home} />
            </Animator>
            <button onClick={() => setShow(!show)}>Show</button>
        </main>
    );
}