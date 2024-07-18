import {useState, useCallback, useEffect} from "react";
import {keyframes} from "tss-react";
import Button from "../source/components/button";
import Form from "../source/components/form";
import TextField from "../source/components/text-field";
import {TextArea} from "../source/components/text-area";
import { Icon } from "../source/components/icon-button";
import {tss} from "../source/components/themer";
import { Title, Label, Heading } from "../source/components/typography";
import { Trail, Effect } from "../source/components/animation";
import { useFadeAnimation } from "../source/hooks/fade";
import useIntersection from "../source/hooks/intersection";

const useStyles = tss.create(({theme}) => ({
    content: {
        padding: 40,
        width: "100%",
        maxWidth: 640,
        overflow: "hidden",
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

export default function Contact({}) {
    const {fadeInactive, fadeIn, fadeActive} = useFadeAnimation();

    const {isIntersecting: headingIntersecting, setElement: setHeadingElement} = useIntersection({threshold: [0.5, 0.75]});
    const [showHeading, setShowHeading] = useState(false);
    useEffect(() => {
        if(headingIntersecting)
            setShowHeading(true);
    }, [headingIntersecting]);

    const {isIntersecting: formIntersecting, ratio: formRatio, setElement: setFormElement} = useIntersection({threshold: [0.5, 0.6, 0.7]});
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        if(formIntersecting && formRatio >= 0.5)
            setShowForm(true);
    }, [formIntersecting, formRatio]);

    const {isIntersecting: labelIntersecting, setElement: setLabelElement} = useIntersection({threshold: [0.5, 0.75]});
    const [showLabel, setShowLabel] = useState(false);
    useEffect(() => {
        if(labelIntersecting)
            setShowLabel(true);
    }, [labelIntersecting]);

    const {cx, classes} = useStyles();
    return (
        
            <div id="contact" className={classes.content}>
                <Effect start={showHeading} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
                    <div ref={setHeadingElement}>
                        <Heading className={classes.flavorText}>Need to reach me?</Heading>
                        <Title className={classes.title}>Contact Me*</Title>
                    </div>
                </Effect>
                <Effect start={showForm} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
                    <div ref={setFormElement} className={classes.contact}>
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
                <Effect start={showLabel} inactive={fadeInactive} begin={fadeIn} active={fadeActive}>
                    <Label ref={setLabelElement} className={classes.asterisk}>
                        *You can also send emails directy to <a className={classes.email} href="mailto:contact@kalvingarcia.com">contact@kalvingarcia.com</a>!
                    </Label>
                </Effect>
            </div>
    )
}