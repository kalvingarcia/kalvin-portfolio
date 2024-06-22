"use client"
import {tss} from "./themer";
import {useContainerContext} from "../helper/container";

// Style list for typography components.
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

/**
 * The Display component is used to create display (`h1`) text.
 *
 * @param props The component takes 2 props:
 *  *   The `className` prop is optional.
 *  *   The `children` prop is specifically for text nodes.
 *
 * While not necessarily requires, other props can be passed to the
 * component when needed, such as for capturing mouse events.
 *
 * @returns An `h1` jsx component.
 */
export function Display({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <h1 className={[classes.display, className?? ""].join(" ")} {...props}>{children}</h1>;
}

/**
 * The Title component is used to create title (`h2`) text.
 *
 * @param props The component takes 2 props:
 *  *   The `className` prop is optional.
 *  *   The `children` prop is specifically for text nodes.
 *
 * While not necessarily requires, other props can be passed to the
 * component when needed, such as for capturing mouse events.
 *
 * @returns An `h2` jsx component.
 */
export function Title({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <h2 className={[classes.title, className?? ""].join(" ")} {...props}>{children}</h2>;
}

/**
 * The Subtitle component is used to create subtitle (`h3`) text.
 *
 * @param props The component takes 2 props:
 *  *   The `className` prop is optional.
 *  *   The `children` prop is specifically for text nodes.
 *
 * While not necessarily requires, other props can be passed to the
 * component when needed, such as for capturing mouse events.
 *
 * @returns An `h3` jsx component.
 */
export function Subtitle({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <h3 className={[classes.subtitle, className?? ""].join(" ")} {...props}>{children}</h3>;
}

/**
 * The Heading component is used to create heading (`h4`) text.
 *
 * @param props The component takes 2 props:
 *  *   The `className` prop is optional.
 *  *   The `children` prop is specifically for text nodes.
 *
 * While not necessarily requires, other props can be passed to the
 * component when needed, such as for capturing mouse events.
 *
 * @returns An `h4` jsx component.
 */
export function Heading({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <h4 className={[classes.heading, className?? ""].join(" ")} {...props}>{children}</h4>;
}

/**
 * The Subheading component is used to create subheading (`h5`) text.
 *
 * @param props The component takes 2 props:
 *  *   The `className` prop is optional.
 *  *   The `children` prop is specifically for text nodes.
 *
 * While not necessarily requires, other props can be passed to the
 * component when needed, such as for capturing mouse events.
 *
 * @returns An `h5` jsx component.
 */
export function Subheading({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <h1 className={[classes.subheading, className?? ""].join(" ")} {...props}>{children}</h1>;
}

/**
 * The Body component is used to create body (`p`) text. This component
 * should be used for paragraphs of body text. The Label component should
 * be used instead for shorter labels or special one-off text segments.
 *
 * @param props The component takes 2 props:
 *  *   The `className` prop is optional.
 *  *   The `children` prop is specifically for text nodes.
 *
 * While not necessarily requires, other props can be passed to the
 * component when needed, such as for capturing mouse events.
 *
 * @returns A `p` jsx component.
 */
export function Body({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <p className={[classes.body, className?? ""].join(" ")} {...props}>{children}</p>
}

/**
 * The Label component is used to create label (`span`) text. This component
 * should be used for shorter labels and special one-off text segments. Longer
 * text in the form of paragraphs should use the Body component.
 *
 * @param props The component takes 2 props:
 *  *   The `className` prop is optional.
 *  *   The `children` prop is specifically for text nodes.
 *
 * While not necessarily requires, other props can be passed to the
 * component when needed, such as for capturing mouse events.
 *
 * @returns A `span` jsx component.
 */
export function Label({className, children, ...props}) {
    const {role, type} = useContainerContext();
    const {classes} = useStyles({role, type});
    return <span className={[classes.body, className?? ""].join(" ")} {...props}>{children}</span>
}