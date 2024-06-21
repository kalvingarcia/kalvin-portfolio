"use client"
import {tss} from "./themer";
import {useContainerContext} from "../helper/container";

const useStyles = tss.create(({theme, role, type}) => ({
    display: {
        display: "block",
        position: "relative",
        fontSize: "4rem",
        fontFamily: "var(--display-font)",
        color: theme[role][`on${type[0].toUpperCase() + type.slice(1)}`].hex()
    },
    title: {
        display: "block",
        position: "relative",
        fontSize: "2rem",
        fontFamily: "var(--title-font)",
        color: theme[role][`on${type[0].toUpperCase() + type.slice(1)}`].hex()
    },
    subtitle: {
        display: "block",
        position: "relative",
        fontSize: "1.75rem",
        fontFamily: "var(--title-font)",
        color: theme[role][`on${type[0].toUpperCase() + type.slice(1)}`].hex()
    },
    heading: {
        display: "block",
        position: "relative",
        fontSize: "1.5rem",
        fontFamily: "var(--heading-font)",
        color: theme[role][`on${type[0].toUpperCase() + type.slice(1)}`].hex()
    },
    subheading: {
        display: "block",
        position: "relative",
        fontSize: "1.2rem",
        fontFamily: "var(--heading-font)",
        color: theme[role][`on${type[0].toUpperCase() + type.slice(1)}`].hex()
    },
    body: {
        display: "block",
        position: "relative",
        fontSize: "1rem",
        fontFamily: "var(--body-font)",
        color: theme[role][`on${type[0].toUpperCase() + type.slice(1)}`].hex()
    }
}));

export function Display({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <h1 className={[classes.display, className?? ""].join(" ")} {...props}>{children}</h1>;
}

export function Title({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <h2 className={[classes.title, className?? ""].join(" ")} {...props}>{children}</h2>;
}

export function Subtitle({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <h1 className={[classes.subtitle, className?? ""].join(" ")} {...props}>{children}</h1>;
}

export function Heading({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <h1 className={[classes.heading, className?? ""].join(" ")} {...props}>{children}</h1>;
}

export function Subheading({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <h1 className={[classes.subheading, className?? ""].join(" ")} {...props}>{children}</h1>;
}

export function Body({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <p className={[classes.body, className?? ""].join(" ")} {...props}>{children}</p>
}

export function Label({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <span className={[classes.body, className?? ""].join(" ")} {...props}>{children}</span>
}