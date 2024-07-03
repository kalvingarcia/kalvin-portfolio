"use client"
import {useCallback, useEffect, useState} from "react";
import {tss} from './source/components/themer';
import Splash from "./content/splash";
import Button from "./source/components/button";
import Slider from "./source/components/slider";

const useStyles = tss.create(({theme}) => ({

}));

export default function Homepage({}) {
    const [show, setShow] = useState(false);
    const {classes} = useStyles();

    return (
        <section className={classes.homepage}>
            <Splash show={show} setShow={setShow} />
            <div style={{width: "100%", height: "100vh"}}>
                <Slider min={10} step={10} />
            </div>
            <div style={{width: "100%", height: "100vh"}} />
            <div style={{width: "100%", height: "100vh"}} />
        </section>
    );
}