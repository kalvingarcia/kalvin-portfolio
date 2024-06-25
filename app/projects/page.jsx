"use client"
import {useState} from "react";
import Modal from "../assets/components/modal";
import Button from "../assets/components/button";
import {Label, Title} from "../assets/components/typography";

export default function Projects({}) {
    const [open, setOpen] = useState(false);

    return (
        <main>
            <Button onClick={() => setOpen(true)}>
                <Label>Open</Label>
            </Button>
            <Modal open={open} setOpen={setOpen}>
                <Title>Modal</Title>
            </Modal>
        </main>
    )
}