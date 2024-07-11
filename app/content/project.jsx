import {useState, useEffect} from "react";
import Button from "../source/components/button";
import {tss} from "../source/components/themer";
import { Label, Subtitle } from "../source/components/typography";
import ProjectCard from "./project-card";
import { Icon } from "../source/components/icon-button";

const useStyles = tss.create(({theme}) => ({
    slide: {
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    projects: {
        width: "100%",
        padding: 20,
        display: "flex",
        gap: 20,
        overflow: "hidden",
        overflowX: "auto",
        "& > *": {
            flex: "0 0 400px",
        },
        [`@media (max-width: ${1280}px)`]: {
            flexDirection: "column",
            "& > *": {
                flex: "1 1 200px",
            },
        }
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

    const {classes} = useStyles();
    return (
        <div className={classes.slide}>
            <Subtitle>Featured Projects</Subtitle>
            <div className={classes.projects}>{isClient?
                featured.map(({directory, name, description}) => (
                    <ProjectCard image={`/images/${directory}/wireframes.png`} heading={name} body={description} directory={directory} />
                ))
                :
                ""
            }</div>
            <Button appearance="outlined" onClick={() => setTimeout(() => window.location.href = "https://projects.kalvingarcia.com/", 300)}>
                <Label>Want to see more?</Label>
                <Icon icon="arrow_outward" />
            </Button>
        </div>
    );
}