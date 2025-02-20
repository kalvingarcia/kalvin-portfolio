import {tss} from "../source/components/themer";
import Slider from "../source/components/slider";
import {useCallback, useState} from "react";
import {Body, Title, Label} from "../source/components/typography";
import {Icon} from "../source/components/icon-button";
import Button from "../source/components/button";
import { Effect } from "../source/components/animation";
import {useFadeAnimation} from "../source/hooks/fade";
import Tagline from "./tagline";

const useStyles = tss.create(({theme}) => ({
    text: {
        float: "left",
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 40,
        width: "100%",
        maxWidth: 640,
        height: "fit-content"
    },
    into: {

    },
    headline: {
        fontSize: "5rem",
    },
    bio: {
        height: 350,
        overflow: "auto"
    },
    buttons: {
        display: "flex",
        gap: 10,
        alignSelf: "flex-end",

        "@media (max-width: 600px)": {
            flexDirection: "column"
        }
    }
}));

const DEFAULT_BIO = 2;
const bioList = [
    "I'm a human that likes to cook and code.",
    "I’m a Frontend Developer dedicated to creative problem-solving and innovative thinking.",
    "I am a Frontend Developer with expertise in design, React, Next, and AI development. I am dedicated to creative problem-solving and innovative thinking.",
    "I am a Frontend Developer skilled in React, Next, and AI development. I bring a diverse skill set including mobile and web design, front-end development, machine learning, and natural language processing. My projects, like Urban Archaeology's Website and Comensal, reflect my dedication to creative problem-solving and innovative thinking.",
    
];

export default function Bio({show}) {
    const {fadeInactive, fadeIn, fadeActive} = useFadeAnimation();
    const {classes} = useStyles();
    return (
        <Effect start={show} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
            <div className={classes.text}>
                <div className={classes.intro}>
                    <Tagline show={show} />
                    <Title className={classes.headline}>About me</Title>
                </div>
                <Body className={classes.bio}>
                    I am a Frontend Developer with extensive experience in React, Next, and AI development. I am always searching
                    for opportunities to apply my diverse skill set, which includes web design, front-end development, machine learning, 
                    and natural language processing. My projects, like Urban Archaeology's Website and Comensal, reflect my dedication
                    to creative problem-solving and innovative thinking. When I'm not coding, I'm fantasizing about how to make my office
                    space cooler. I enjoy long walks in the park with my partner, where we discuss the profound mysteries of life (the
                    plot lines of whatever show we're watching). Also, I firmly believe all offices should have emotional support cats,
                    and I'm willing to die on that hill.
                </Body>
                <div className={classes.buttons}>
                    <Button className={classes.projectsButton} role="primary" appearance="filled" onClick={() => setTimeout(() => window.location.href = "https://projects.kalvingarcia.com/", 300)}>
                        <Icon icon="code" />
                        <Label>Portfolio</Label>
                    </Button>
                    <Button role="primary" appearance="outlined" onClick={() => setTimeout(() => window.location.href = "https://food.kalvingarcia.com/", 300)}>
                        <Icon icon="skillet" />
                        <Label>Recipes</Label>
                    </Button>
                    <Button role="primary" appearance="outlined" onClick={() => setTimeout(() => window.location.href = "https://devlog.kalvingarcia.com/", 300)}>
                        <Icon icon="docs" />
                        <Label>Devlog</Label>
                    </Button>
                </div>
            </div>
        </Effect>
    );
}