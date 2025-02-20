import {tss} from "./themer";

const useStyles = tss.create(({theme}) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
    }
}));

export default function Form({className, children, ...props}) {
    const {cx, classes} = useStyles();
    return (
        <form className={cx(classes.form, className)} {...props}>
            {children}
        </form>
    );
}