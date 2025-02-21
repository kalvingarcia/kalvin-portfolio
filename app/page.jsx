"use client"
import {useEffect, useState} from "react";
import {tss} from './source/components/themer';
import Overlay from "./content/overlay";
import PalettePicker from "./content/palette-picker";
import Bio from "./content/bio";
import Contact from "./content/contact";
import { Label } from "./source/components/typography";
import { Icon } from "./source/components/icon-button";

const useStyles = tss.create(({theme, showLogo}) => ({
    homepage: {
        width: "100%",
        maxHeight: "100vh",
        overflowX: "hidden",
        scrollBehavior: "smooth",
        scrollbarGutter: "stable"
    },
    content: {
        position: "relative",
        margin: "auto",
        marginTop: "80px",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        maxWidth: 1280,

        "@media (max-width: 1200px)": {
            flexDirection: "column"
        }
    },
    logoContainer: {
        position: "absolute",
        top: "-40px",
        left: "40px",
        width: "4rem",
        height: "4rem",
        overflow: "hidden",
    },
    logo: {
        color: theme.secondary.accent.alpha(0.75).hexa(),
        fontSize: "4rem",
        transformOrigin: "bottom left",
        transform: showLogo? "none" : "translate(-100%)",
        transition: showLogo? "transform 300ms ease-out" : "transform 150ms ease-in"
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
    const [showLogo, setShowLogo] = useState(true);
    const setScroller = element => {
        const checkScroll = ({target}) => {
            setShowLogo(!(target.scrollTop > 0));
        }
        element?.addEventListener("scroll", checkScroll);
    };

    const [showBio, setShowBio] = useState(false);
    const [showContact, setShowContact] = useState(false);
    useEffect(() => {
        setTimeout(() => setShowBio(true));
        setTimeout(() => setShowContact(true), 200);
    }, []);

    const {classes} = useStyles({showLogo});
    return (
        <>
            <Overlay />
            <PalettePicker />
            <section ref={setScroller} id="homepage" className={classes.homepage}>
                <div className={classes.content}>
                    <div className={classes.logoContainer}>
                        <Icon className={classes.logo} icon="logo" />
                    </div>
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