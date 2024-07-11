import { tss } from "../source/components/themer";
import {Body, Heading} from "../source/components/typography";
import useRippleEffect from "../source/hooks/ripple";

const useStyles = tss.create(({theme, rippleClass}) => ({
    card: {
        height: 400,
        position: "relative"
    },
    image: {
        position: "absolute",
        inset: 0,
        width: "75%",
        height: "100%",
        borderRadius: 20,
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 20px)",
        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center"
        },
        "&::after": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            inset: 0,
            backgroundColor:theme.neutral.onContainer.hex(),
            opacity: 0
        },
        "&:hover::after": {
            opacity: 0.2
        },
        [`& .${rippleClass}`]: {
            backgroundColor: theme.neutral.onContainer.hex()
        }
    },
    text: {
        position: "absolute",
        padding: 20,
        top: 20,
        right: 0,
        width: "75%",
        height: "fit-content",
        maxHeight: 200,
        backgroundColor: theme.secondary.container.hex(),
        borderRadius: 20,
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 20px)",
        textOverflow: "ellipsis",
        "&::after": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            inset: 0,
            backgroundColor:theme.secondary.onContainer.hex(),
            opacity: 0
        },
        "&:hover::after": {
            opacity: 0.2
        },
        [`& .${rippleClass}`]: {
            backgroundColor: theme.secondary.onContainer.hex()
        }
    }
}));

export default function ProjectCard({image, heading, body, directory}) {
    const {rippleClass, rippleExpand, rippleFade} = useRippleEffect();
    const {classes} = useStyles({rippleClass});
    return (
        <div className={classes.card} onClick={() => setTimeout(() => window.location.href = "https://projects.kalvingarcia.com/", 300)}>
            <figure className={classes.image} onMouseDown={rippleExpand} onMouseUp={rippleFade}>
                <img src={image} alt="Project Card Image" />
            </figure>
            <div className={classes.text} onMouseDown={rippleExpand} onMouseUp={rippleFade}>
                <Heading>{heading}</Heading>
                <Body>{body}</Body>
            </div>
        </div>
    );
}