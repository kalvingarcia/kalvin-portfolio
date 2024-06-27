"use client"
import {keyframes} from "tss-react";
import {tss} from "../source/components/themer";
import {Transition} from "../source/components/animation";
import {Title, Label} from "../source/components/typography";
import {Icon} from "../source/components/icon-button";
import Button from "../source/components/button";
import {useCallback, useState} from "react";

const slideLeft = keyframes({
    "to": {
        width: 0
    }
});
const slideUp = keyframes({
    "to": {
        height: 0
    }
})

const useStyles = tss.withName("Splash").create(({theme}) => ({
    splash: {
        overscrollBehavior: "contain",
        backgroundColor: theme.neutral.containerLowest.hex(),
        width: "calc(100% + 1280px)",
        height: "100%",
        position: "fixed",
        left: -500,
        top: 0,
        [`@media (max-width: ${1280}px)`]: {
            left: 0,
            top: -500,
            width: "100%",
            height: "calc(100% + 1280px)",
        },
        "&::before": {
            content: "''",
            backgroundColor: theme.tertiary.accent.hex(),
            width: 500,
            height: "100%",
            position: "absolute",
            bottom: "auto",
            right: 0,
            [`@media (max-width: ${1280}px)`]: {
                width: "100%",
                height: 500,
                bottom: 0,
                right: "auto"
            },
        },
        "&::after": {
            content: "''",
            backgroundColor: theme.primary.accent.hex(),
            width: 500,
            height: "100%",
            position: "absolute",
            bottom: "auto",
            right: -250,
            [`@media (max-width: ${1280}px)`]: {
                width: "100%",
                height: 500,
                bottom: -250,
                right: "auto"
            },
        }
    },
    splashExit: {
        animation: `${slideLeft} 1280ms ease`,
        [`@media (max-width: ${1280}px)`]: {
            animation: `${slideUp} 1280ms ease`,
        }
    },
    content: {
        overflow: "hidden",
        width: "calc(100% - 1280px)",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
        [`@media (max-width: ${1280}px)`]: {
            width: "100%",
            height: "calc(100% - 1280px)",
            top: 500,
            left: 0,
            flexDirection: "column-reverse",
        }
    },
    text: {
        display: "flex",
        flexDirection: "column",
        gap: 40,
        width: "50%",
        height: "fit-content",
        justifyContent: "flex-end",
        [`@media (max-width: ${1280}px)`]: {
            width: "fit-content",
            height: "50%"
        }
    },
    tagline: {
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        [`@media (max-width: ${1280}px)`]: {
            alignItems: "center"
        },
        "& > *": {
            textWrap: "nowrap"
        }
    },
    typewriter: {
        minHeight: "4rem",
        display: "block",
        position: "relative",
        fontSize: "4rem",
        fontFamily: "var(--display-font)",
        color: theme.primary.accent.hex(),
        lineHeight: 1,
        textDecoration: `${theme.tertiary.accent.hex()} wavy underline`,
        textDecorationSkipInk: "none",
        textUnderlineOffset: "10px"
    },
    buttons: {
        display: "flex",
        flexWrap: "nowrap",
        gap: 10,
        [`@media (max-width: ${1280}px)`]: {
            alignItems: "center",
            flexDirection: "column"
        }
    },
    portrait: {
        width: "50%",
        height: "fit-content",
        [`@media (max-width: ${1280}px)`]: {
            width: "fit-content",
            height: "50%"
        }
    }
}));

export default function Splash({show, setShow}) {
    const tagLines = ["a Designer.", "a Developer.", "an Engineer.", "a Programmer.", "Kalvin Garcia!"];
    const TYPE_FREQUENCY = 80;

    const [typing, setTyping] = useState(false);
    const typeAnimation = useCallback((element, atChar, currString) => {
        setTyping(true);
        if (!typing && atChar < tagLines[currString].length) {
            element.innerHTML += tagLines[currString].charAt(atChar);
            setTimeout(() => typeAnimation(element, atChar + 1, currString), TYPE_FREQUENCY);
        } else if(!typing && currString < tagLines.length - 1)
            setTimeout(() => backSpace(element, tagLines[currString].length, currString), TYPE_FREQUENCY * 4);
    }, [typing]);
    const backSpace = useCallback((element, atChar, currString) => {
        if(!typing && atChar > -1) {
            element.innerHTML = element.innerHTML.slice(0, atChar);
            setTimeout(() => backSpace(element, atChar - 1, currString), TYPE_FREQUENCY / 2);
        } else if(!typing)
            setTimeout(() => typeAnimation(element, 0, currString + 1), TYPE_FREQUENCY);
    }, [typing]);

    const {classes} = useStyles();
    return (
        <Transition show={show} enter="none" exit={classes.splashExit} duration={600}>
            <div className={classes.splash}>
                <div className={classes.content}>
                    <div className={classes.portrait}>

                    </div>
                    <div className={classes.text}>
                        <div className={classes.tagline}>
                            <Title>Hello, I'm...</Title>
                            <span ref={element => element? typeAnimation(element, 0, 0) : console.assert(!element, "Tagline not Rendered")} className={classes.typewriter} />
                        </div>
                        <div className={classes.buttons}>
                            <Button role="primary" appearance="filled" onClick={() => setShow(false)}>
                                <Icon icon="info" />
                                <Label>Learn More</Label>
                            </Button>
                            <Button className={classes.projectsButton} role="secondary" appearance="text">
                                <Label>My Projects</Label>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
}