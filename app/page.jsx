"use client"
import {useEffect, useState} from "react";
import {tss} from './source/components/themer';
import Overlay from "./content/overlay";
import PalettePicker from "./content/palette-picker";
import Bio from "./content/bio";
import Contact from "./content/contact";
import { Label } from "./source/components/typography";

const useStyles = tss.create(({theme}) => ({
    homepage: {
        width: "100%",
        maxHeight: "100vh",
        overflowX: "hidden",
        scrollBehavior: "smooth"
    },
    content: {
        margin: "auto",
        marginTop: "40px",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        maxWidth: 1280,

        "@media (max-width: 1200px)": {
            flexDirection: "column"
        }
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
    const [showBio, setShowBio] = useState(false);
    const [showContact, setShowContact] = useState(false);
    useEffect(() => {
        setTimeout(() => setShowBio(true));
        setTimeout(() => setShowContact(true), 200);
    }, []);

    const {classes} = useStyles();
    return (
        <>
            <Overlay />
            <PalettePicker />
            <section id="homepage" className={classes.homepage}>
                <div className={classes.content}>
                    <Bio show={showBio} />
                    <Contact show={showContact} />
                </div>
                <Label className={classes.accredation}>
                    Website designed and built by Kalvin Garcia.
                </Label>
            </section>
        </>
    );
}

//                     <Project show={showProjects} />