import IconButton from "../source/components/icon-button";
import {tss} from "../source/components/themer";

const useStyles = tss.create(({theme}) => ({
    overlay: {
        mixBlendMode: "hard-light",
        pointerEvents: "none",
        height: "100%",
        width: "100%",
        maxWidth: 1280,
        position: "fixed",
        right: "calc((100% - min(1280px, 100%)) / 2)",
        zIndex: 100,
        "& *": {
            pointerEvents: "auto"
        }
    },
    socials: {
        position: "absolute",
        bottom: 0,
        right: 20,
        "& .line": {
            margin: "auto",
            height: 100,
            width: "1pt",
            backgroundColor: theme.primary.accent.hex()
        }
    }
}));

export default function Overlay({}) {
    const {classes} = useStyles();
    return (
        <section className={classes.overlay}>
            <div className={classes.socials}>
                <IconButton appearance="text" icon="github" iconClass="kalvin-icons"/>
                <IconButton appearance="text" icon="linkedin" iconClass="kalvin-icons"/>
                <IconButton appearance="text" icon="itchio" iconClass="kalvin-icons"/>
                <div className="line" />
            </div>
        </section>
    );
}