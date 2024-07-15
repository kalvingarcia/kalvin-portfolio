import {useState, useEffect} from "react";
import Button from "../source/components/button";
import {tss} from "../source/components/themer";
import { Label, Title } from "../source/components/typography";
import ProjectCard from "./project-card";
import { Icon } from "../source/components/icon-button";

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
        overflow: "hidden",
        overflowX: "auto",
        alignItems: "center",
        justifyContent: "center",
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
            <Title>Featured Projects</Title>
            <div className={classes.projects}>{isClient?
                featured.map(({directory, name, description}) => (
                    <ProjectCard image={`/images/${directory}/wireframes.jpg`} heading={name} body={description} directory={directory} />
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