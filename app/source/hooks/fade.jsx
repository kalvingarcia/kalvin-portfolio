import {keyframes} from "tss-react";
import {tss} from "../components/themer";

const DEFAULT_ANIMATION_DURATION = 300;

const fadeIn = keyframes({
    from: {
        opacity: 0
    }
});
const fadeOut = keyframes({
    to: {
        opacity: 0
    }
});

const useStyles = tss.create(({theme, duration}) => ({
    fadeActive: {
        opacity: 1
    },
    fadeInactive: {
        opacity: 0
    },
    fadeIn: {
        animation: `${fadeIn} ${duration}ms ease-in forwards`
    },
    fadeOut: {
        animation: `${fadeOut} ${duration}ms ease-in forwards`
    }
}));

export function useFadeAnimation(duration = DEFAULT_ANIMATION_DURATION) {
    const {classes: {fadeInactive, fadeIn, fadeActive, fadeOut}} = useStyles({duration});
    return {fadeInactive, fadeIn, fadeActive, fadeOut};
}

