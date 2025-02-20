import {useState, useEffect} from "react";
import Button from "../source/components/button";
import Form from "../source/components/form";
import TextField from "../source/components/text-field";
import {TextArea} from "../source/components/text-area";
import { Icon } from "../source/components/icon-button";
import {tss} from "../source/components/themer";
import { Title, Label, Heading } from "../source/components/typography";
import { Effect } from "../source/components/animation";
import { useFadeAnimation } from "../source/hooks/fade";
import useIntersection from "../source/hooks/intersection";

const useStyles = tss.create(({theme}) => ({
    content: {
        alignSelf: "flex-end",
        padding: 40,
        width: "100%",
        maxWidth: 640,
        display: "flex",
        gap: 40,
        flexDirection: "column"
    },
    flavorText: {
        color: theme.secondary.accent.hex()
    },
    title: {
        fontSize: "5rem"
    },
    contact: {
        padding: 20,
        width: "100%",
        borderRadius: 20,
        backgroundColor: theme.neutral.container.hex(),
    },
    submit: {
        alignSelf: "flex-end"
    },
    asterisk: {
        textAlign: "right"
    },
    email: {
        color: theme.tertiary.onContainer.hex(),
        "&:hover": {
            color: theme.tertiary.accent.hex()
        }
    }
}));

export default function Contact({show}) {
    const {fadeInactive, fadeIn, fadeActive} = useFadeAnimation();

    const {ratio: headingRatio, setElement: setHeadingElement} = useIntersection({threshold: [0, 0.25, 0.5, 0.75, 1]});
    const [showHeading, setShowHeading] = useState(false);
    useEffect(() => {
        if(headingRatio >= 0.5)
            setShowHeading(true);
    }, [headingRatio]);

    const {ratio: formRatio, setElement: setFormElement} = useIntersection({threshold: [0, 0.25, 0.5, 0.75, 1]});
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        if(formRatio > 0.25)
            setShowForm(true);
    }, [formRatio]);

    const {isIntersecting: labelIntersecting, setElement: setLabelElement} = useIntersection({threshold: [0, 0.25, 0.5, 0.75, 1]});
    const [showLabel, setShowLabel] = useState(false);
    useEffect(() => {
        if(labelIntersecting)
            setShowLabel(true);
    }, [labelIntersecting]);

    const validate = async event => {
        event.preventDefault();

        const userIP = await fetch("https://ipinfo.io/json") 
                .then(response => response.json())
                .then(response => response.ip)
                .catch(() => undefined);

        const form = document.getElementById("gform");
        const data = new FormData(form);
        const spamCheck = await fetch(`http://api.stopforumspam.org/api?ip=${userIP?? ""}&email=${data.get("Email")}&json`, {method: "GET"})
            .then(response => response.json());

        if(!(spamCheck.email.appears || spamCheck.ip.appears) && !spamCheck.email.error)
            fetch("https://script.google.com/macros/s/AKfycbwbQkVagBCDvywt_KQrXJyEQX9QkPwnYTF1IV9chdv_m5gBrlWFCc8dIhfYiJzfJnMi7Q/exec", {
                method: "POST",
                body: data
            });

        window.location.reload();
    };

    const {classes} = useStyles();
    return (
        
            <div id="contact" className={classes.content}>
                <Effect start={show && showHeading} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
                    <div ref={setHeadingElement}>
                        <Heading className={classes.flavorText}>Need to reach me?</Heading>
                        <Title className={classes.title}>Contact Me*</Title>
                    </div>
                </Effect>
                <Effect start={show && showForm} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
                    <div ref={setFormElement} className={classes.contact}>
                        <Form id="gform">
                            <TextField label="Name" placeholder="John Doe" required />
                            <TextField label="Email" placeholder="sample@email.com" helperText="This will let me know where I can contact you." required />
                            <TextField label="Phone (optional)" placeholder="123-456-7890" />
                            <TextArea label="Message" placeholder="Hello, I'm inquiring about your car's extended warranty." required />
                            <Button className={classes.submit} onClick={validate}>
                                <Icon icon="send" />
                                <Label>Send</Label>
                            </Button>
                        </Form>
                    </div>
                </Effect>
                <Effect start={show && showLabel} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
                    <Label ref={setLabelElement} className={classes.asterisk}>
                        *You can also send emails directy to <a className={classes.email} href="mailto:contact@kalvingarcia.com">contact@kalvingarcia.com</a>!
                    </Label>
                </Effect>
            </div>
    )
}