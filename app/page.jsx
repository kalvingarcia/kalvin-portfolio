"use client"
import { useState } from "react";
import {tss} from "tss-react";

const useStyles = tss.create(({color}) => ({
    home: {
        color
    }
}));

export default function Homepage({}) {
    const [color, setColor] = useState(true);
    const {classes, cx} = useStyles({color: color? "green" : "red"});

    return (
        <main className={classes.home}>
            This is test text.
            <button onClick={() => setColor(!color)}>Change</button>
        </main>
    );
}