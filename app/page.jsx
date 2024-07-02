"use client"
import {useCallback, useEffect, useState} from "react";
import {tss} from './source/components/themer';
import Splash from "./content/splash";
import Button from "./source/components/button";
import useSlideScroll from "./content/slide-scroll";

const useStyles = tss.create(({theme}) => ({
    slideScroll: {
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none"
        }
    }
}));

const SLIDE_COUNT = 3;

export default function Homepage({}) {
    const [show, setShow] = useState(false);
    const {classes} = useStyles();

    useSlideScroll(SLIDE_COUNT);
    useEffect(() => {
        document.body.classList.add(classes.slideScroll);
        document.documentElement.classList.add(classes.slideScroll);
    }, []);

    return (
        <section className={classes.homepage}>
            <Splash show={show} setShow={setShow} />
            <div style={{width: "100vw", height: "100vh"}} />
            <div style={{width: "100vw", height: "100vh"}} />
            <div style={{width: "100vw", height: "100vh"}} />
        </section>
    );
}