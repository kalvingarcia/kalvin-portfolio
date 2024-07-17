import {tss} from "../source/components/themer";
import Slider from "../source/components/slider";
import {useCallback, useState} from "react";
import {Body, Title, Label} from "../source/components/typography";
import {Icon} from "../source/components/icon-button";
import Button from "../source/components/button";
import { Effect } from "../source/components/animation";
import {useFadeAnimation} from "../source/hooks/fade";

const useStyles = tss.create(({theme}) => ({
    text: {
        float: "right",
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        width: "100%",
        maxWidth: 640,
        height: "fit-content"
    },
    headline: {
        fontSize: "5rem",
    },
    bio: {
        height: 200,
        overflow: "auto"
    },
    buttons: {
        display: "flex",
        gap: 10,
        alignSelf: "flex-end"
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

export default function Bio({show}) {
    const {fadeInactive, fadeIn, fadeActive} = useFadeAnimation();

    const [bio, setBio] = useState(bioList[DEFAULT_BIO]);
    const changeBio = useCallback(value => {
        setBio(bioList[value]);
    }, [])

    const {classes} = useStyles();
    return (
        <Effect start={show} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
            <div className={classes.text}>
                <Title className={classes.headline}>About me...</Title>
                <Body className={classes.bio}>{bio}</Body>
                <Slider min={0} max={4} value={DEFAULT_BIO} onChange={changeBio} step={1} />
                <Effect start={show} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
                    <div className={classes.buttons}>
                        <Button role="primary" appearance="filled" onClick={() => window.location.href = "#contact"}>
                            <Icon icon="alternate_email" />
                            <Label>Contact Me!</Label>
                        </Button>
                        <Button className={classes.projectsButton} role="secondary" appearance="text" onClick={() => setTimeout(() => window.location.href = "https://projects.kalvingarcia.com/", 300)}>
                            <Label>My Projects</Label>
                        </Button>
                    </div>
                </Effect>
            </div>
        </Effect>
    );
}