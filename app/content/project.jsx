import {useState, useEffect, useCallback} from "react";
import {keyframes} from "tss-react";
import Button from "../source/components/button";
import {tss} from "../source/components/themer";
import { Label, Title } from "../source/components/typography";
import ProjectCard from "./project-card";
import { Icon } from "../source/components/icon-button";
import { Trail, Effect } from "../source/components/animation";

const fadeIn = keyframes({
    "to": {
        opacity: 1
    }
});
const fadeUp = keyframes({
    "to": {
        transform: "translate(0, 0)",
        opacity: 1
    }
});

const useStyles = tss.create(({theme}) => ({
    slide: {
        paddingTop: 40,
        paddingBottom: 40,
        position: "relative",
        height: "100vh",
        width: "100%",
        display: "flex",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: "calc(-1 * (100vw - 100%) / 2)",
            width: "100vw",
            height: "100%",
            backgroundColor: theme.neutral.containerLowest.hex()
        }
    },
    projects: {
        width: "80%",
        display: "flex",
        gap: 10,
        overflowX: "auto",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        [`@media (max-width: ${1280}px)`]: {
            flexDirection: "column",
            "& > *": {
                flex: "1 1 200px",
            },
        }
    },
    inactive: {
        opacity: 0,
        transform: "translate(0, 25%)"
    },
    fadeIn: {
        animation: `${fadeIn} 300ms ease-in forwards`
    },
    fadeUp: {
        animation: `${fadeUp} 300ms ease-in forwards`
    },
    active: {
        opacity: 1,
        transform: "translate(0, 0)"
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
    
    const [start, setStart] = useState(false);
    const createObserver = useCallback(element => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setStart(true);
                }
            });
        }, {
            threshold: 0.8
        });
        observer.observe(element);
    }, []);

    const {classes} = useStyles();
    return (
        <div ref={createObserver} className={classes.slide}>
            <Effect start={start} begin={classes.fadeIn} active={classes.active}>
                <Title className={classes.inactive}>Featured Projects</Title>
            </Effect>
            <div className={classes.projects}>{isClient?
                    <Trail start={start}>{
                        featured.map(({directory, name, description}) => (
                            <Effect begin={classes.fadeUp} active={classes.active}>
                                <ProjectCard className={classes.inactive} image={`/images/${directory}/wireframes.jpg`} heading={name} body={description} directory={directory} />
                            </Effect>
                        ))
                    }</Trail>
                    :
                    ""
            }</div>
            <Effect start={start} begin={classes.fadeIn} active={classes.active}>
                <Button className={classes.inactive} appearance="outlined" onClick={() => setTimeout(() => window.location.href = "https://projects.kalvingarcia.com/", 300)}>
                    <Label>Want to see more?</Label>
                    <Icon icon="arrow_outward" />
                </Button>
            </Effect>
        </div>
    );
}