import Markdown from "react-markdown";
import {Title, Subtitle, Heading, Subheading, Body, Label} from "./typography";
import Code from "./code";
import {tss} from "./themer";
import Button from "./button";

const useStyles = tss.create(({theme}) => ({
    title: {
        marginBottom: 40,
        color: theme.primary.accent.hex()
    },
    subtitle: {
        marginBottom: 20,
        color: theme.tertiary.accent.hex()
    },
    heading: {
        marginBottom: 10,
        color: theme.primary.onContainer.hex()
    },
    subheading: {
        marginBottom: 10,
        color: theme.tertiary.onContainer.hex()
    },
    button: {
        display: "inline-flex"
    },
    body: {
        marginBottom: 10,
        opacity: 0.75
    },
    image: {
        marginBottom: 10,
        width: "100%",
        height: "100%",
        "& img": {
            objectPosition: "center",
            objectFit: "contain"
        }
    },
    code: {
        marginBottom: 10
    }
}));

export default function Remark({children}) {
    const {classes} = useStyles();
    return (
        <Markdown components={{
            h1({children}) {
                return <Title className={classes.title}>{children}</Title>;
            },
            h2({children}) {
                return <Subtitle className={classes.subtitle}>{children}</Subtitle>;
            },
            h3({children}) {
                return <Heading className={classes.heading}>{children}</Heading>;
            },
            h4({children}) {
                return <Subheading className={classes.subheading}>{children}</Subheading>;
            },
            h5({children}) {
                const params = children.split(',');
                return (
                    <Button className={classes.button} appearance="outlined" onClick={() => setTimeout(() => window.open(params[1], "_blank"), 300)}>
                        <Label>{params[0]}</Label>
                    </Button>
                );
            },
            p({children}) {
                return <Body className={classes.body}>{children}</Body>;
            },
            img({src, alt}) {
                return (src?
                    <div className={classes.image}>
                        <img src={src} alt={alt} /> 
                    </div>
                    : 
                    ""
                );
            },
            code({className, children}) {
                return <Code className={classes.code} language={className.replace("language-", "")}>{children}</Code>;
            },
            pre({children}) {
                return children;
            },
        }}>
            {children}
        </Markdown>
    );
}