import {useState, useCallback} from "react";
import {keyframes} from "tss-react";
import Button from "../source/components/button";
import Form from "../source/components/form";
import TextField from "../source/components/text-field";
import {TextArea} from "../source/components/text-area";
import { Icon } from "../source/components/icon-button";
import {tss} from "../source/components/themer";
import { Title, Label } from "../source/components/typography";
import { Trail, Effect } from "../source/components/animation";

const fadeUp = keyframes({
    "to": {
        transform: "translate(0, 0)",
        opacity: 1
    }
});

const useStyles = tss.create(({theme}) => ({
    slide: {
        paddingTop: 40,
        paddingBottom: 40,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        gap: 40,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    contact: {
        padding: 20,
        width: "80%",
        maxWidth: "calc(0.8 * 1280px)",
        borderRadius: 20,
        backgroundColor: theme.neutral.container.hex(),
        opacity: 0,
        transform: "translate(0, 25%)"
    },
    submit: {
        alignSelf: "flex-end"
    },
    inactive: {
        opacity: 0,
        transform: "translate(0, 100px)"
    },
    fadeUp: {
        animation: `${fadeUp} 300ms ease-in forwards`
    },
    active: {
        "&&": {
            opacity: 1,
            transform: "translate(0, 0)"
        }
    }
}));

export default function Contact({}) {
    const [start, setStart] = useState(false);
    const createObserver = useCallback(element => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setStart(true);
                }
            });
        }, {
            threshold: 0.8
        });
        observer.observe(element);
    }, []);

    const {cx, classes} = useStyles();
    return (
        <div ref={createObserver} className={classes.slide}>
            <Effect start={start} begin={classes.fadeUp} active={classes.active}>
                <Title className={classes.inactive}>Contact Me</Title>
            </Effect>
            <Effect start={start} begin={classes.fadeUp} active={classes.active}>
                <div className={classes.contact}>
                    <Form className="gform" data-email="kalvigarcia@gmail.com" action="https://script.google.com/macros/s/AKfycbwbQkVagBCDvywt_KQrXJyEQX9QkPwnYTF1IV9chdv_m5gBrlWFCc8dIhfYiJzfJnMi7Q/exec">
                        <TextField label="Name" placeholder="John Doe" required />
                        <TextField label="Email" placeholder="sample@email.com" helperText="This will let me know where I can contact you." required />
                        <TextField label="Phone (optional)" placeholder="123-456-7890" />
                        <TextArea label="Message" required>Hello, I'm inquiring about your car's extended warranty.</TextArea>
                        <Button className={classes.submit} type="submit">
                            <Icon icon="send" />
                            <Label>Send</Label>
                        </Button>
                    </Form>
                </div>
            </Effect>
        </div>
    )
}