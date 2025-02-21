import {tss} from "../source/components/themer";
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
        height: 325,
        overflow: "auto"
    },
    buttons: {
        display: "flex",
        gap: 10,
        alignSelf: "flex-end",
        alignItems: "flex-end",

        "@media (max-width: 600px)": {
            flexDirection: "column"
        }
    }
}));

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
                    I'm a Software Engineer driven by curiosity and a passion for continuous learning.
                    I thrive on tackling new challenges, developing innovative projects, and exploring
                    creative ideas. Whether it's coding, refining application concepts, or experimenting
                    with new recipes, I'm always building something. I also believe every office should
                    have an emotional support cat—and I'm prepared to die on that hill.
                </Body>
                <div className={classes.buttons}>
                    <Button role="primary" appearance="filled" onClick={() => setTimeout(() => window.location.href = "https://projects.kalvingarcia.com/", 300)}>
                        <Icon icon="code" />
                        <Label>Portfolio</Label>
                    </Button>
                    {/* <Button role="primary" appearance="outlined" onClick={() => setTimeout(() => window.location.href = "https://food.kalvingarcia.com/", 300)}>
                        <Icon icon="skillet" />
                        <Label>Recipes</Label>
                    </Button>
                    <Button role="primary" appearance="outlined" onClick={() => setTimeout(() => window.location.href = "https://devlog.kalvingarcia.com/", 300)}>
                        <Icon icon="docs" />
                        <Label>Devlog</Label>
                    </Button> */}
                </div>
            </div>
        </Effect>
    );
}