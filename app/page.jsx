"use client"
import {useEffect, useState} from "react";
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
    const [showTagline, setShowTagline] = useState(true);
    const [showBio, setShowBio] = useState(false);
    const [showProjects, setShowProjects] = useState(false);
    useEffect(() => {
        setShowTagline(true);
        setTimeout(() => setShowBio(true), 200);
        setTimeout(() => setShowProjects(true), 400);
    }, []);

    const {classes} = useStyles();
    return (
        <>
            <Overlay />
            <PalettePicker />
            <section id="homepage" className={classes.homepage}>
                <div className={classes.content}>
                    <Tagline show={showTagline} />
                    <Bio show={showBio} />
                    <Project show={showProjects} />
                    <Contact />
                    <Label className={classes.accredation}>
                        Website designed and built by Kalvin Garcia.
                    </Label>
                </div>
            </section>
        </>
    );
}