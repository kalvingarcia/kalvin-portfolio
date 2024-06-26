"use client"
import {useState} from "react";
import {tss} from './assets/components/themer';
import Splash from "./content/splash";
import Button from "./assets/components/button";

const useStyles = tss.create(({theme}) => ({
    homepage: {

    }
}));

export default function Homepage({}) {
    const [show, setShow] = useState(true);

    const {classes} = useStyles();
    return (
        <section className={classes.homepage}>
            <Splash show={show} setShow={setShow} />
            <Button onClick={() => window.location.href = "/projects"} />
        </section>
    );
}