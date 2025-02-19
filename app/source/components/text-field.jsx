import {useCallback, useEffect, useState} from "react";
import {tss} from "./themer";
import {Label} from "./typography";

const useStyles = tss.create(({theme, filled, error}) => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "& .helper": {
            padding: "5px",
            width: "100%",
            height: "fit-content",
            fontSize: "0.75rem",
            color: error? theme.onError : theme.neutral.onContainer.alpha(0.5).hexa(),
            transition: "color 200ms ease-in-out"
        },
        "&:focus-within .helper": {
            color: error? theme.onError : theme.tertiary.accent.hex()
        }
    },
    textField: {
        width: "100%",
        height: "55px",
        position: "relative",
        cursor: "text",
        borderRadius: "10px 10px 0 0",
        backgroundColor: error? theme.error + "3F" : theme.neutral.containerHighest.hex(),
        padding: "10px 20px",
        overflow: "hidden",
        borderBottom: `1pt solid ${error? theme.onError + "7F" : theme.neutral.onContainer.alpha(0.5).hexa()}`,
        transition: "background-color 300ms ease, border-bottom 200ms ease-in-out",
        "&:focus-within": {
            borderColor: error? theme.onError : theme.onSecondary
        },
        "&::before": {
            content: "''",
            position: "absolute",
            inset: 0,
            opacity: 0,
            backgroundColor: error? theme.onError : theme.neutral.onContainer.hex()
        },
        "&:hover::before": {
            opacity: 0.2
        },
        "&:focus-within::before": {
            opacity: 0.1
        },
        "&::after": {
            content: "''",
            position: "absolute",
            inset: 0,
            transformOrigin: "bottom",
            transform: "scale(0)",
            opacity: 0,
            transition: "transform 100ms ease, opacity 200ms ease",
            borderBottom: `1pt solid ${error? theme.onError : theme.tertiary.accent.hex()}`
        },
        "&:focus-within::after": {
            transform: "scale(1)",
            opacity: 1,
        },
        "& .field": {
            pointerEvents: "auto",
            zIndex: 1,
            width: "100%",
            outline: "none",
            border: "none",
            position: "relative",
            bottom: "-15px",
            backgroundColor: "transparent",
            color: theme.body,
            fontFamily: "var(--body-font)",
            "&::placeholder": {
                color: "transparent"
            },
            "&:focus::placeholder": {
                color: error? theme.onError + "7F" : theme.body + "7F"
            }
        },
        "& .label": {
            top: "30px",
            position: "absolute",
            transformOrigin: "top left",
            transform: filled? "translate(0, -80%) scale(0.7)" : "translate(0, -50%)",
            opacity: 0.5,
            transition: "transform 200ms ease, opacity 200ms ease, color 200ms ease",
            color: error? theme.onError : theme.neutral.onContainer.hex(),
            fontWeight: "bold"
        },
        "&:focus-within .label": {
            transform: "translate(0, -80%) scale(0.7)",
            opacity: 1,
            color: error? theme.onError : theme.tertiary.accent.hex()
        },
        "&:has(input:required) .label::after": {
            content: "'*'"
        }
    }
}));

export default function TextField({className, label, helperText, value, onChange, onClick, error, ...props}) {
    const [textField, setTextField] = useState(undefined);
    const handleContainerClick = event => {
        if(textField)
            textField.focus();
        onClick?.(event);
    }

    const [text, setText] = useState(value?? "");
    useEffect(() => {
        setText(value?? "");
        setFilled(!value || value === ""? false : true);
    }, [value]);
    const [filled, setFilled] = useState(!value || value === ""? false : true);
    const handleFill = event => {
        const target = event.currentTarget;
        setFilled(true);
        if(!target.value || !target.value.trim().length)
            setFilled(false);
        setText(target.value);
        onChange?.(target.value);
    }

    const {cx, classes} = useStyles({filled, error});
    return (
        <div className={classes.container}>
            <div tabIndex={-1} className={cx(classes.textField, className)} onClick={handleContainerClick}>
                <label htmlFor={label}>
                    <Label className="label">{label}</Label>
                    <input
                        ref={element => setTextField(element)}
                        className="field" 
                        id={label}
                        name={label}
                        type="text"
                        value={text}
                        onChange={handleFill}
                        {...props}
                    />
                </label>
            </div>
            {helperText && <Label className="helper">{helperText}</Label>}
        </div>
    )
}