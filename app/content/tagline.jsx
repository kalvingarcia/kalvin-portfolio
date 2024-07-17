"use client"
import {tss} from "../source/components/themer";
import {Effect} from "../source/components/animation";
import {Label} from "../source/components/typography";
import {useCallback, useState} from "react";
import {useFadeAnimation} from "../source/hooks/fade";

const useStyles = tss.withName("Splash").create(({theme}) => ({
    tagline: {
        position: "sticky",
        zIndex: 100,
        top: 0,
        height: "fit-content",
        padding: "20px 40px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        backgroundColor: theme.neutral.background.alpha(0.6).hexa(),
        backdropFilter: "blur(8px)",
        "& > *": {
            textWrap: "nowrap"
        }
    },
    intro: {
        fontSize: "1.2rem",
        fontWeight: "bold"
    },
    typewriter: {
        minHeight: "2rem",
        display: "block",
        position: "relative",
        fontSize: "2rem",
        fontFamily: "var(--display-font)",
        color: theme.primary.accent.hex(),
        lineHeight: 1,
        textDecoration: `${theme.tertiary.accent.hex()} wavy underline`,
        textDecorationSkipInk: "none",
        textUnderlineOffset: "10px"
    }
}));

export default function Tagline({show = false}) {
    const {fadeInactive, fadeIn, fadeActive} = useFadeAnimation();

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
        <Effect start={show} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
            <div className={classes.tagline}>
                <Label className={classes.intro}>Hello, I'm...</Label>
                <span ref={element => element? typeAnimation(element, 0, 0) : console.assert(!element, "Tagline not Rendered")} className={classes.typewriter} />
            </div>
        </Effect>
    );
}