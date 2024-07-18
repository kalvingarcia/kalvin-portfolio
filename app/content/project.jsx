import {useState, useEffect, useCallback} from "react";
import {keyframes} from "tss-react";
import Button from "../source/components/button";
import {tss} from "../source/components/themer";
import {Label, Title, Heading} from "../source/components/typography";
import ProjectCard from "./project-card";
import { Icon } from "../source/components/icon-button";
import {Effect} from "../source/components/animation";
import { useFadeAnimation } from "../source/hooks/fade";
import useIntersection from "../source/hooks/intersection";

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

export default function Project({show}) {
    const [featured, setFeatured] = useState({});
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        (async () => {
            setFeatured(await fetch("./featured.json").then(response => response.json()));
            setIsClient(true);
        })();
    }, []);

    const {fadeInactive, fadeIn, fadeActive} = useFadeAnimation();
    
    const {isIntersecting: headingIntersecting, setElement: setHeadingElement} = useIntersection({threshold: [0.5, 0.75]});
    const [showHeading, setShowHeading] = useState(false);
    useEffect(() => {
        if(headingIntersecting)
            setShowHeading(true);
    }, [headingIntersecting]);

    const {isIntersecting: card0Intersecting, ratio: card0Ratio, setElement: setCard0} = useIntersection({threshold: [0.3, 0.4, 0.5, 0.6]});
    const [showCard0, setShowCard0] = useState(false);
    useEffect(() => {
        if(card0Intersecting && card0Ratio > 0.3)
            setShowCard0(true);
    }, [card0Intersecting, card0Ratio]);
    const {isIntersecting: card1Intersecting, ratio: card1Ratio, setElement: setCard1} = useIntersection({threshold: [0.3, 0.4, 0.5, 0.6]});
    const [showCard1, setShowCard1] = useState(false);
    useEffect(() => {
        if(card1Intersecting && card1Ratio > 0.3)
            setShowCard1(true);
    }, [card1Intersecting, card1Ratio]);
    const {isIntersecting: card2Intersecting, ratio: card2Ratio, setElement: setCard2} = useIntersection({threshold: [0.3, 0.4, 0.5, 0.6]});
    const [showCard2, setShowCard2] = useState(false);
    useEffect(() => {
        if(card2Intersecting && card2Ratio > 0.3)
            setShowCard2(true);
    }, [card2Intersecting, card2Ratio]);

    const {isIntersecting: buttonIntersecting, setElement: setButtonElement} = useIntersection({threshold: [0.5, 0.75]});
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        if(buttonIntersecting)
            setShowButton(true);
    }, [buttonIntersecting]);

    const {classes} = useStyles();
    return (
        <div className={classes.content}>
            <Effect start={showHeading && show} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
                <div ref={setHeadingElement}>
                    <Heading className={classes.flavorText}>Some things I've worked on:</Heading>
                    <Title className={classes.headline}>Featured Projects</Title>
                </div>
            </Effect>
            <div className={classes.projects}>{isClient?
                <>
                    <Effect start={showCard0 && show} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
                        <ProjectCard ref={setCard0} image={`/images/${featured[0].directory}/card.jpg`} heading={featured[0].name} body={featured[0].description} directory={featured[0].directory} />
                    </Effect>
                    <Effect start={showCard1 && show} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
                        <ProjectCard ref={setCard1} image={`/images/${featured[1].directory}/card.jpg`} heading={featured[1].name} body={featured[1].description} directory={featured[1].directory} />
                    </Effect>
                    <Effect start={showCard2 && show} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
                        <ProjectCard ref={setCard2} image={`/images/${featured[2].directory}/card.jpg`} heading={featured[2].name} body={featured[2].description} directory={featured[2].directory} />
                    </Effect>
                </>
                :
                ""
            }</div>
            <Effect start={showButton && show} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
                <Button ref={setButtonElement} className={classes.button} appearance="outlined" onClick={() => setTimeout(() => window.location.href = "https://projects.kalvingarcia.com/", 300)}>
                    <Label>Want to see more?</Label>
                    <Icon icon="arrow_outward" />
                </Button>
            </Effect>
        </div>
    );
}