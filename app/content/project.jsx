import {useState, useEffect, useCallback} from "react";
import {keyframes} from "tss-react";
import Button from "../source/components/button";
import {tss} from "../source/components/themer";
import {Label, Title, Heading} from "../source/components/typography";
import ProjectCard from "./project-card";
import { Icon } from "../source/components/icon-button";
import {Effect} from "../source/components/animation";
import { useFadeAnimation } from "../source/hooks/fade";

const useStyles = tss.create(({theme}) => ({
    content: {
        padding: 40,
        width: "100%",
        display: "flex",
        gap: 20,
        flexDirection: "column",
    },
    flavorText: {
        color: theme.secondary.accent.hex()
    },
    headline: {
        fontSize: "6rem",
    },
    projects: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        overflowX: "auto",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible"
    },
    button: {
        alignSelf: "center"
    }
}));

export default function Project({}) {
    const [featured, setFeatured] = useState({});
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        (async () => {
            setFeatured(await fetch("./featured.json").then(response => response.json()));
            setIsClient(true);
        })();
    }, []);
    
    const {fadeInactive, fadeIn, fadeActive} = useFadeAnimation();
    const [start, setStart] = useState(false);
    // const createObserver = useCallback(element => {
    //     const observer = new IntersectionObserver((entries, observer) => {
    //         entries.forEach(entry => {
    //             if(entry.isIntersecting) {
    //                 setStart(true);
    //             }
    //         });
    //     }, {
    //         threshold: 0.5
    //     });
    //     observer.observe(element);
    // }, []);

    const {classes} = useStyles();
    return (
        <Effect start inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
            <div className={classes.content}>
                <div>
                    <Heading className={classes.flavorText}>Some things I've worked on:</Heading>
                    <Title className={classes.headline}>Featured Projects</Title>
                </div>
                <div className={classes.projects}>{isClient?
                    featured.map(({directory, name, description}) => (
                        <ProjectCard image={`/images/${directory}/card.jpg`} heading={name} body={description} directory={directory} />
                    ))
                    :
                    ""
                }</div>
                <Button  className={classes.button} appearance="outlined" onClick={() => setTimeout(() => window.location.href = "https://projects.kalvingarcia.com/", 300)}>
                    <Label>Want to see more?</Label>
                    <Icon icon="arrow_outward" />
                </Button>
            </div>
        </Effect>
    );
}