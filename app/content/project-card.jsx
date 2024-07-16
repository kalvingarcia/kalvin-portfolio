import { tss } from "../source/components/themer";
import {Body, Heading} from "../source/components/typography";
import {ContainerContextProvider} from "../source/helper/container";
import useRippleEffect from "../source/hooks/ripple";

const useStyles = tss.create(({theme, rippleClass}) => ({
    card: {
        display: "flex",
        width: 300,
        height: 500,
        position: "relative",
        flexDirection: "column",
        backgroundColor: theme.secondary.container.hex(),
        borderRadius: 20,
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 20px)",
        [`@media (max-width: ${1280}px)`]: {
            width: "100%",
            maxHeight: 150,
            flexDirection: "row",
        },
        "&::before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            inset: 0,
            backgroundColor:theme.secondary.onContainer.hex(),
            opacity: 0
        },
        "&:hover::before": {
            opacity: 0.2
        },
        [`& .${rippleClass}`]: {
            backgroundColor: theme.secondary.onContainer.hex()
        }
    },
    image: {
        width: "100%",
        height: "60%",
        borderRadius: 20,
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 20px)",
        [`@media (max-width: ${1280}px)`]: {
            width: "40%",
            height: "100%"
        },
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
            backgroundColor:theme.primary.onContainer.hex(),
            opacity: 0
        },
        "&:hover::after": {
            opacity: 0.2
        },
        [`& .${rippleClass}`]: {
            backgroundColor: theme.primary.onContainer.hex()
        }
    },
    text: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: 20,
        width: "100%",
        height: "40%",
        overflow: "hidden",
        [`@media (max-width: ${1280}px)`]: {
            width: "50%",
            height: "100%"
        },
        "& h4": {
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
        },
        "& p": {
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
    }
}));

export default function ProjectCard({className, image, heading, body, directory}) {
    const {rippleClass, rippleExpand, rippleFade} = useRippleEffect();
    const {cx, classes} = useStyles({rippleClass});
    return (
        <div className={cx(classes.card, className)} 
            onMouseDown={rippleExpand}
            onMouseUp={rippleFade}
            onClick={() => setTimeout(() => window.location.href = `https://projects.kalvingarcia.com?open=${directory}`, 300)}
        >
            <ContainerContextProvider role="secondary" type="container">
                <figure className={classes.image} onMouseDown={rippleExpand} onMouseUp={rippleFade}>
                    <img src={image} alt="Project Card Image" />
                </figure>
                <div className={classes.text}>
                    <Heading>{heading}</Heading>
                    <Body>{body}</Body>
                </div>
            </ContainerContextProvider>
        </div>
    );
}