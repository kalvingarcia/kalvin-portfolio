"use client"
import {useState} from "react";
import {tss, useThemeContext} from './assets/components/themer';
import Splash from "./assets/components/splash";

// Default Palette for Kalvin's Portfolio
const pink = "#EDBDDC";
const thistle = "#D2BDD1";
const celadon = "#B2DEBB";
const cordovan = "#96484D";
const raisin = "#34202C";

const useStyles = tss.create(({theme}) => ({
    homepage: {

    }
}));

export default function Homepage({}) {
    const [show, setShow] = useState(true);

    const {addPalette} = useThemeContext();
    addPalette("default", {primary: pink, secondary: thistle, tertiary: celadon, error: cordovan, neutral: raisin});

    const {classes} = useStyles();
    return (
        <section className={classes.homepage}>
            <Splash show={show} setShow={setShow} />
        </section>
    );
}