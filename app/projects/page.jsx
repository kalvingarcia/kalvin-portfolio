"use client"
import {useSearchParams, useRouter} from "next/navigation";
import {useCallback, useEffect, useRef, useState} from "react";
import {tss} from "../source/components/themer";
import {Display, Label} from "../source/components/typography";
import IconButton, {Icon} from "../source/components/icon-button";
import Button from "../source/components/button";
import Table, {Row} from "../source/components/table";
import Modal from "../source/components/modal";
import Remark from "../source/components/remark";
import Chip from "../source/components/chip";
import PalettePicker from "../content/palette-picker";

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
            color: theme.primary.accent.hex(),
            "& i": {
                color: theme.primary.accent.hex(),
            }
        },
        "& i": {
            display: "inline-block",
            fontSize: "1rem"
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
    const [open, setOpen] = useState(false);
    const [markdown, setMarkdown] = useState("");
    const openModal = useCallback(async directory => {
        setMarkdown(await fetch(`./projects/${directory}.md`).then(response => response.text()));
        setOpen(true);
    }, []);

    const router = useRouter();
    const handleModalOpen = useCallback(open => {
        if(!open)
            router.push("/");
        setOpen(open);
    }, [open]);

    const searchParams = useSearchParams();
    useEffect(() => {
        const directory = searchParams.get("open");
        if(directory)
            openModal(directory);
        else
            setOpen(false);
    }, [searchParams.get("open")]);

    const projects = useRef({});
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        (async () => {
            projects.current = await fetch("./projects.json").then(response => response.json());
            setIsClient(true);
        })();
    }, []);

    const {classes} = useStyles();
    return (isClient?
        <>
            <PalettePicker />
            <section className={classes.projects}>
                <Button role="tertiary" appearance="text" className={classes.backLink} onClick={() => setTimeout(() => window.location.href = "https://www.kalvingarcia.com/", 300)}>
                    <Icon icon="arrow_back" />
                    <Label>kalvingarcia.com</Label>
                </Button>
                <Display>Projects</Display>
                <Table className={classes.list} headers={projects.current.columns}>
                    {projects.current.rows.map((row, index) => (
                        row.display?
                            <Row key={`row-${index}`}>
                                <Label>{row.completionDate}</Label>
                                <Label className={classes.openModal} onClick={() => router.push(`?open=${row.directory}`)}>{row.name} <Icon icon="open_in_new" /></Label>
                                <Label>{row.madeFor}</Label>
                                <div className={classes.technologies}>{row.technologiesUsed.map((tech, index) => <Chip key={tech}>{tech}</Chip>)}</div>
                                <div className={classes.links}>{Object.entries(row.links).map(([name, link]) => <IconButton key={name} appearance="text" icon={name} iconClass="kalvin-icons" onClick={() => setTimeout(() => window.open(link, "_blank"), 300)} />)}</div>
                            </Row>
                            :
                            ""
                    ))}
                </Table>
                <Modal elevation="highest" open={open} setOpen={handleModalOpen}>
                    <Remark>{markdown}</Remark>
                </Modal>
            </section>
        </>
        :
        ""
    );
}