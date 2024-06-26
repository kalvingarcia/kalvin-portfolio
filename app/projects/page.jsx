"use client"
import {tss} from "../assets/components/themer";
import {Display, Label, Title} from "../assets/components/typography";
import IconButton, {Icon} from "../assets/components/icon-button";
import Button from "../assets/components/button";
import Table, {Row} from "../assets/components/table";
import projects from "./data/project-table.json";
import Modal from "../assets/components/modal";
import { useCallback } from "react";
import Chip from "../assets/components/chip";

const useStyles = tss.create(({theme}) => ({
    projects: {
        padding: 40,
        margin: "auto",
        width: "100%",
        maxWidth: 1280
    },
    backLink: {

    },
    list: {
        width: "100%",
        marginTop: 50,
        borderCollapse: "collapse",
        "& .column-3": {
            maxWidth: 150
        },
        [`@media (max-width: ${1000}px)`]: {
            "& .column-3": {
                display: "none"
            }
        },
        [`@media (max-width: ${1200}px)`]: {
            "& .column-2": {
                display: "none"
            }
        }
    },
    openModal: {
        cursor: "pointer",
        "&:hover": {
            color: theme.primary.accent.hex()
        },
        "& i": {
            display: "inline-block",
            fontSize: "1rem",
        }
    },
    technologies: {
        display: "flex",
        flexWrap: "wrap",
        gap: 5
    },
    links: {
        display: "flex",
        gap: 5,
        [`@media (max-width: ${600}px)`]: {
            flexDirection: "column"
        }
    }
}));

export default function Projects({}) {
    const openProject = useCallback(async directory => {
        console.log(directory)
    }, []);

    const {classes} = useStyles();
    return (
        <section className={classes.projects}>
            <Button role="tertiary" appearance="text" className={classes.backLink} onClick={() => window.location.href = "https://www.kalvingarcia.com/"}>
                <Icon icon="arrow_back" />
                <Label>kalvingarcia.com</Label>
            </Button>
            <Display>Projects</Display>
            <Table className={classes.list} headers={projects.columns}>
                {projects.rows.map((row, index) => (
                    row.display?
                        <Row key={`row-${index}`} className={`${index % 2 === 0? "even" : "odd"}-row`}>
                            <Label>{row.completionDate}</Label>
                            <Label className={classes.openModal} onClick={() => openProject(row.directory)}>{row.name} <Icon icon="arrow_outward" /></Label>
                            <Label>{row.madeFor}</Label>
                            <div className={classes.technologies}>{row.technologiesUsed.map((tech, index) => <Chip>{tech}</Chip>)}</div>
                            <div className={classes.links}>{Object.entries(row.links).map(([name, link]) => <IconButton key={name} appearance="text" icon={name} iconClass="kalvin-icons" onClick={() => window.open(link, "_blank")} />)}</div>
                        </Row>
                        :
                        ""
                ))}
            </Table>
            <Modal>

            </Modal>
        </section>
    );
}