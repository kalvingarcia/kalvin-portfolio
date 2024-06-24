import {keyframes} from "tss-react";
import {tss} from "./themer";
import {Transition} from "./animation";
import {Display, Label} from "./typography";
import Icon from "./icon";
import Button from "./button";

const slideLeft = keyframes({
    "to": {
        width: 0
    }
})

const useStyles = tss.create(({theme}) => ({
    splash: {
        overscrollBehavior: "contain",
        backgroundColor: theme.neutral.containerLowest.hex(),
        width: "calc(100% + 1000px)",
        height: "100%",
        position: "fixed",
        left: -500,
        top: 0,
        "&::before": {
            content: "''",
            backgroundColor: theme.tertiary.accent.hex(),
            width: 500,
            height: "100%",
            position: "absolute",
            top: 0,
            right: -150,
            transform: "skew(-10deg)"
        },
        "&::after": {
            content: "''",
            backgroundColor: theme.primary.accent.hex(),
            width: 500,
            height: "100%",
            position: "absolute",
            top: 0,
            right: -250,
            transform: "skew(-10deg)"
        }
    },
    splashExit: {
        animation: `${slideLeft} 600ms ease`
    },
    content: {
        overflow: "hidden",
        width: "calc(100% - 500px)",
        position: "absolute",
        top: 0,
        left: 500,
        "& > *": {
            textWrap: "nowrap"
        }
    }
}));

export default function Splash({show, setShow}) {
    const {classes} = useStyles();
    return (
        <Transition show={show} enter="none" exit={classes.splashExit} duration={600}>
            <div className={classes.splash}>
                <div className={classes.content}>
                    <Display>I'm</Display>
                    <Button role="primary" appearance="filled" onClick={() => setShow(false)}>
                        <Label>See More</Label>
                        <Icon icon="arrow_forward" />
                    </Button>
                    <Button className={classes.projectsButton} role="secondary" appearance="text">
                        <Label>Projects</Label>
                    </Button>
                </div>
            </div>
        </Transition>
    );
}