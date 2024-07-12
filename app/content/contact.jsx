import Button from "../source/components/button";
import Form, {TextArea, TextField} from "../source/components/form";
import { Icon } from "../source/components/icon-button";
import {tss} from "../source/components/themer";
import { Heading, Label } from "../source/components/typography";

const useStyles = tss.create(({theme}) => ({
    slide: {
        paddingTop: 40,
        paddingBottom: 40,
        height: "100%",
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
        backgroundColor: theme.neutral.container.hex()
    }
}));

export default function Contact({}) {
    const {classes} = useStyles();
    return (
        <div className={classes.slide}>
            <Heading>Contact Me</Heading>
            <div className={classes.contact}>
                <Form>
                    <TextField label="Name" />
                    <TextField label="Email" />
                    {/* <TextArea /> */}
                    <Button type="submit">
                        <Icon icon="send" />
                        <Label>Send</Label>
                    </Button>
                </Form>
            </div>
        </div>
    )
}