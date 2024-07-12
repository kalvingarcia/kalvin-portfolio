import { useCallback, useEffect, useState } from "react";
import useRippleEffect from "../hooks/ripple";
import {tss} from "./themer";
import {Label} from "./typography";

const useStyles = tss.create(({theme, filled, rippleClass}) => ({
    form: {

    },
    textField: {
        width: "100%",
        height: "3rem",
        position: "relative",
        cursor: "text",
        borderRadius: "10px 10px 0 0",
        backgroundColor: theme.neutral.containerHighest.hex(),
        padding: "10px 20px",
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 10px 10px 0 0)",
        borderBottom: `1pt solid ${theme.neutral.onContainer.alpha(0.5).hexa()}`,
        transition: "border-bottom 100ms ease-in-out",
        "&::before": {
            content: "''",
            position: "absolute",
            inset: 0,
            opacity: 0,
            backgroundColor: theme.neutral.onContainer.hex()
        },
        "&:hover::before": {
            opacity: 0.1
        },
        "&:focus-within::before": {
            opacity: 0.2
        },
        "&::after": {
            content: "''",
            position: "absolute",
            inset: 0,
            transformOrigin: "bottom",
            transform: "scale(0)",
            opacity: 0,
            transition: "transform 200ms ease, opacity 200ms ease",
            borderBottom: `1pt solid ${theme.tertiary.accent.hex()}`
        },
        "&:focus-within::after": {
            transform: "scale(1)",
            opacity: 1,
        },
        "& .field": {
            width: "100%",
            outline: "none",
            border: "none",
            position: "relative",
            bottom: -10,
            backgroundColor: "transparent",
            fontFamily: "var(--body)",
            color: theme.neutral.onContainer.hex(),
            "&:autofill": {
                outline: "none",
                border: "none",
                transition: "background-color 600000s 0s, color 600000s 0s"
            }
        },
        "& .label": {
            top: "50%",
            position: "absolute",
            transformOrigin: "top left",
            transform: filled? "translate(0, -100%) scale(0.8)" : "translate(0, -50%)",
            opacity: 0.5,
            transition: "transform 200ms ease, opacity 200ms ease, color 200ms ease",
            color: theme.neutral.onContainer.hex()
        },
        "&:focus-within .label": {
            transform: "translate(0, -100%) scale(0.8)",
            opacity: 1,
            color: theme.tertiary.accent.hex()
        },
        [`& .${rippleClass}`]: {
            backgroundColor: theme.neutral.onContainer.hex()
        }
    },
    textArea: {
        width: "100%",
        resize: "none"
    }
}));

export function TextField({className, label, children: sampleText, onChange, ...props}) {
    const {rippleClass, rippleExpand, rippleFade} = useRippleEffect();

    const [focused, setFocused] = useState(false);
    const handleClick = useCallback(event => {
        document.getElementById(label).focus();
    }, [focused]);

    const [filled, setFilled] = useState(false);
    const handleFill = useCallback(event => {
        const target = event.currentTarget;
        setFilled(true);
        if(!target.value || !target.value.trim().length)
            setFilled(false);
        onChange?.(event);
    }, [filled]);
    useEffect(() => {
        document.getElementById(label).addEventListener("input", handleFill);
    }, [])

    const {cx, classes} = useStyles({filled, rippleClass});
    return (
        <div
            className={cx(classes.textField, className)} 
            onMouseDown={rippleExpand}
            onMouseUp={rippleFade}
            onClick={handleClick}
            {...props}
        >
            <label htmlFor={label}>
                <Label className="label">{label}</Label>
                {sampleText? <Label className="sample">{sampleText}</Label> : ""}
                <input 
                    className="field" 
                    id={label}
                    name={label} type="text" 
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </label>
        </div>
    )
}

export function TextArea({...props}) {
    const {classes} = useStyles();
    return (
        <textarea className={classes.textArea} {...props} />
    )
}

export default function Form({method = "post", children, ...props}) {
    return (
        <form method={method} {...props}>
            {children}
        </form>
    );
}