import { tss } from "../source/components/themer";
import {Body, Subtitle} from "../source/components/typography";
import {ContainerContextProvider} from "../source/helper/container";
import useRippleEffect from "../source/hooks/ripple";

const useStyles = tss.create(({theme, rippleClass}) => ({
    card: {
        display: "flex",
        position: "relative",
        backgroundColor: theme.neutral.containerLow.hex(),
        borderRadius: 20,
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 20px)",
        width: "100%",
        height: 200,
        flexDirection: "row",
        [`@media (max-width: ${640}px)`]: {
            flexDirection: "column",
            height: 500,
        },
        "&::before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            inset: 0,
            backgroundColor:theme.neutral.onContainer.hex(),
            opacity: 0
        },
        "&:hover::before": {
            opacity: 0.2
        },
        [`& .${rippleClass}`]: {
            backgroundColor: theme.neutral.onContainer.hex()
        }
    },
    image: {
        borderRadius: 20,
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 20px)",
        width: "40%",
        height: "100%",
        [`@media (max-width: ${640}px)`]: {
            width: "100%",
            height: "60%"
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
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: 20,
        overflow: "hidden",
        width: "60%",
        height: "100%",
        [`@media (max-width: ${640}px)`]: {
            width: "100%",
            height: "40%"
        },
        "& p": {
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
    },
    title: {
        fontSize: "2.5rem"
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
                    <Subtitle className={classes.title}>{heading}</Subtitle>
                    <Body>{body}</Body>
                </div>
            </ContainerContextProvider>
        </div>
    );
}