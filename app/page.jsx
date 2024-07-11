"use client"
import {useCallback, useEffect, useState} from "react";
import {tss} from './source/components/themer';
import Splash from "./content/splash";
import Button from "./source/components/button";
import Slider from "./source/components/slider";
import Bio from "./content/bio";
import Project from "./content/project";
import Overlay from "./content/overlay";
import PalettePicker from "./content/palette-picker";

const useStyles = tss.create(({theme}) => ({
    homepage: {
        margin: "auto",
        width: "100%",
        maxWidth: 1280,
        maxHeight: "100vh",
        overflowX: "hidden",
        overflowY: "auto"
    }
}));

export default function Homepage({}) {
    const [show, setShow] = useState(true);
    const {classes} = useStyles();

    return (
        <>
            <Overlay />
            <PalettePicker />
            <section className={classes.homepage}>
                <Splash show={show} setShow={setShow} />
                <Bio />
                <Project />
            </section>
        </>
    );
}