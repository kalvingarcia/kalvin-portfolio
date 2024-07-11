import {tss} from "../source/components/themer";
import Slider from "../source/components/slider";
import {useCallback, useState} from "react";
import {Body, Title} from "../source/components/typography";

const useStyles = tss.create(({theme}) => ({
    slide: {
        height: "100vh",
        width: "100%",
        display: "flex",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
        [`@media (max-width: ${1280}px)`]: {
            flexDirection: "column-reverse",
        }
    },
    portrait: {
        width: "50%",
        height: "fit-content",
        [`@media (max-width: ${1280}px)`]: {
            width: "fit-content",
            height: "50%"
        }
    },
    text: {
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        width: "50%",
        height: "fit-content",
        justifyContent: "flex-end",
        [`@media (max-width: ${1280}px)`]: {
            width: "100%",
            maxWidth: 640,
            height: "50%"
        }
    },
    bio: {
        height: 200,
        overflow: "auto"
    }
}));

const DEFAULT_BIO = 2;
const bioList = [
    "I make websites look pretty and computers learn lots.",
    "I’m a Frontend Developer dedicated to creative problem-solving and innovative thinking.",
    "I am a Frontend Developer with expertise in design, React, Next, and AI development. I am dedicated to creative problem-solving and innovative thinking.",
    "I am a Frontend Developer skilled in React, Next, and AI development. I bring a diverse skill set including mobile and web design, front-end development, machine learning, and natural language processing. My projects, like Urban Archaeology's Website and Comensal, reflect my dedication to creative problem-solving and innovative thinking.",
    "I am a Frontend Developer with extensive experience in React, Next, and AI development. I am always searching for opportunities to apply my diverse skill set, which includes web design, front-end development, machine learning, and natural language processing. My projects, like Urban Archaeology's Website and Comensal, reflect my dedication to creative problem-solving and innovative thinking. When I'm not coding, I'm fantasizing about how to make my office space cooler. I enjoy long walks in the park with my partner, where we discuss the profound mysteries of life (the plot lines of whatever show we're watching). Also, I firmly believe all offices should have emotional support cats, and I'm willing to die on that hill."
];

export default function Bio({}) {
    const [bio, setBio] = useState(bioList[DEFAULT_BIO]);
    const changeBio = useCallback(value => {
        setBio(bioList[value]);
    }, [])

    const {classes} = useStyles();
    return (
        <div className={classes.slide}>
            <div className={classes.portrait}>

            </div>
            <div className={classes.text}>
                <div className={classes.headline}>
                    <Title>About me...</Title>
                </div>
                <div className={classes.bio}>
                    <Body>{bio}</Body>
                </div>
                <Slider min={0} max={4} value={DEFAULT_BIO} onChange={changeBio} step={1} />
            </div>
        </div>
    );
}