"use client"
import {useState} from "react";
import {tss} from './source/components/themer';
import Overlay from "./content/overlay";
import PalettePicker from "./content/palette-picker";
import Bio from "./content/bio";
import Project from "./content/project";
import Contact from "./content/contact";
import Splash from "./content/splash";

const useStyles = tss.create(({theme}) => ({
    homepage: {
        margin: "auto",
        width: "100%",
        maxHeight: "100vh",
        overflowX: "hidden",
        overflowY: "auto"
    },
    content: {
        margin: "auto",
        width: "100%",
        maxWidth: 1280,
        maxHeight: "100%"
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
                    <Bio />
                    <Project />
                    <Contact />
                </div>
                <Splash show={show} setShow={setShow} />
            </section>
        </>
    );
}