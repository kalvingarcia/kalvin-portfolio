import {tss} from "./themer";

const useStyles = tss.create(({theme}) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
    }
}));

export default function Form({className, method = "post", children, ...props}) {
    const {cx, classes} = useStyles();
    return (
        <form className={cx(classes.form, className)} method={method} {...props}>
            {children}
        </form>
    );
}