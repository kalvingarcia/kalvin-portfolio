import IconButton from "../source/components/icon-button";
import {tss} from "../source/components/themer";

const useStyles = tss.create(({theme}) => ({
    overlay: {
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
        right: 10,
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
                <IconButton appearance="text" icon="github" iconClass="kalvin-icons" onClick={() => setTimeout(() => window.open("https://github.com/kalvingarcia/", "_blank"), 300)} />
                <IconButton appearance="text" icon="linkedin" iconClass="kalvin-icons" onClick={() => setTimeout(() => window.open("https://linkedin.com/in/kalvin-garcia/", "_blank"), 300)} />
                <div className="line" />
            </div>
        </section>
    );
}