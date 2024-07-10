import {tss} from "../source/components/themer";

const useStyles = tss.create(({theme}) => ({
    slide: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
        [`@media (max-width: ${1280}px)`]: {
            height: "100vh",
            width: "100vw",
            top: 500,
            left: 0,
            flexDirection: "column-reverse",
        }
    }
}));

export default function Project({}) {
    const {classes} = useStyles();
    return (
        <div className={classes.slide}>

        </div>
    );
}