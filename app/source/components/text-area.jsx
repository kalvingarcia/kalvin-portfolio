import {useState, useCallback, useEffect} from 'react';
import {tss} from './themer';
import {Label} from './typography';
import useRippleEffect from '../hooks/ripple';

const useStyles = tss.create(({theme, filled, error}) => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "& > *": {
            flex: "0 0 fit-content"
        },
        "& .helper": {
            padding: "5px",
            width: "100%",
            height: "fit-content",
            fontSize: "0.75rem",
            color: theme[error? "error" : "neutral"].onContainer.alpha(0.5).hexa(),
            transition: "color 200ms ease-in-out"
        },
        "&:focus-within .helper": {
            color: theme[error? "error" : "tertiary"].accent.hex()
        },
    },
    textArea: {
        width: "100%",
        position: "relative",
        cursor: "text",
        borderRadius: "10px 10px 0 0",
        backgroundColor: error? theme.error.container.hex() : theme.neutral.containerHighest.hex(),
        padding: "10px 20px",
        overflow: "hidden",
        borderBottom: `1pt solid ${theme[error? "error" : "neutral"].onContainer.alpha(0.5).hexa()}`,
        "&:focus-within": {
            borderColor: theme[error? "error" : "tertiary"].accent.hex()
        },
        "&::before": {
            content: "''",
            position: "absolute",
            inset: 0,
            opacity: 0,
            backgroundColor: theme[error? "error" : "neutral"].onContainer.hex()
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
            borderBottom: `1pt solid ${theme[error? "error" : "tertiary"].accent.hex()}`
        },
        "&:focus-within::after": {
            transform: "scale(1)",
            opacity: 1,
        },
        "& .area": {
            pointerEvents: "auto",
            zIndex: 1,
            marginTop: "10px",
            width: "100%",
            minHeight: "70px",
            maxHeight: "196",
            resize: "none",
            outline: "none",
            border: "none",
            position: "relative",
            bottom: -10,
            backgroundColor: "transparent",
            lineHeight: 1.5,
            color: theme.neutral.onContainer.hex(),
            fontFamily: "var(--body-font)",
            "&::placeholder": {
                color: "transparent",
                transition: "color 100ms ease-in-out"
            },
            "&:focus::placeholder": {
                color: theme[error? "error" : "neutral"].onContainer.alpha(0.5).hexa()
            }
        },
        "& .label": {
            top: "30px",
            position: "absolute",
            transformOrigin: "top left",
            transform: filled? "translate(0, -80%) scale(0.7)" : "translate(0, -50%)",
            opacity: 0.5,
            transition: "transform 200ms ease, opacity 200ms ease",
            color: theme[error? "error" : "neutral"].onContainer.hex(),
            fontWeight: "bold"
        },
        "&:focus-within .label": {
            transform: "translate(0, -80%) scale(0.7)",
            opacity: 1,
            color: theme[error? "error" : "tertiary"].accent.hex()
        },
        "&:has(input:required) .label::after": {
            content: "'*'"
        }
    }
}));

export function TextArea({className, label, helperText, onChange, value, onClick, error, ...props}) {
    const [textArea, setTextArea] = useState(undefined);
    const handleContainerClick = event => {
        if(textArea)
            textArea.focus();
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
            <div tabIndex={-1} className={cx(classes.textArea, className)} onClick={handleContainerClick}>
                <label htmlFor={label}>
                    <Label className="label">{label}</Label>
                    <textarea
                        ref={element => setTextArea(element)}
                        className="area" 
                        rows={3}
                        id={label}
                        name={label}
                        value={text}
                        onChange={handleFill}
                        {...props}
                    />
                </label>
            </div>
            {helperText? <Label className="helper">{helperText}</Label> : ""}
        </div>
    )
}