"use client"
import {useState} from "react";
import {tss} from './source/components/themer';
import Overlay from "./content/overlay";
import PalettePicker from "./content/palette-picker";
import Bio from "./content/bio";
import Project from "./content/project";
import Contact from "./content/contact";
import Tagline from "./content/tagline";
import { Label } from "./source/components/typography";

const useStyles = tss.create(({theme}) => ({
    homepage: {
        width: "100%",
        maxHeight: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
        scrollBehavior: "smooth"
    },
    content: {
        margin: "auto",
        width: "100%",
        maxWidth: 1280,
        minHeight: "100%"
    },
    accredation: {
        margin: "auto",
        textAlign: "center",
        padding: 10,
        fontSize: "0.75rem",
        color: theme.secondary.accent.alpha(0.75).hexa()
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
                <div className={classes.content}>
                    <Tagline show />
                    <Bio show />
                    <Project />
                    <Contact />
                    <Label className={classes.accredation}>
                        Website designed and built by Kalvin Garcia.
                    </Label>
                </div>
            </section>
        </>
    );
}