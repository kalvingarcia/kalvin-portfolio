import {useState, useCallback, useEffect} from 'react';
import {tss} from './themer';
import {Label} from './typography';
import useRippleEffect from '../hooks/ripple';

const useStyles = tss.create(({theme, filled, rippleClass}) => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "& > *": {
            flex: "0 0 fit-content"
        },
        "& .helper": {
            padding: 5,
            width: "100%",
            height: "fit-content",
            fontSize: "0.75rem",
            color: theme.neutral.onContainer.alpha(0.5).hexa(),
            tansition: "color 200ms ease-in-out"
        },
        "&:focus-within .helper": {
            color: theme.tertiary.accent.hex()
        },
    },
    textArea: {
        width: "100%",
        position: "relative",
        cursor: "text",
        borderRadius: "10px 10px 0 0",
        backgroundColor: theme.neutral.containerHighest.hex(),
        padding: "10px 20px",
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 10px 10px 0 0)",
        borderBottom: `1pt solid ${theme.neutral.onContainer.alpha(0.5).hexa()}`,
        transition: "border-bottom 200ms ease-in-out",
        "&:focus-within": {
            borderColor: theme.tertiary.accent.hex()
        },
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
            minHeight: 100,
            maxHeight: 196,
            resize: "none",
            outline: "none",
            border: "none",
            position: "relative",
            bottom: -10,
            backgroundColor: "transparent",
            fontFamily: "var(--body-font)",
            lineHeight: 1.5,
            color: theme.neutral.onContainer.hex(),
            "&:autofill": {
                outline: "none",
                border: "none",
                transition: "background-color 600000s 0s, color 600000s 0s"
            }
        },
        "& .label": {
            top: 25,
            position: "absolute",
            transformOrigin: "top left",
            transform: filled? "translate(0, -100%) scale(0.8)" : "translate(0, -50%)",
            opacity: 0.5,
            transition: "transform 200ms ease, opacity 200ms ease, color 200ms ease",
            color: theme.neutral.onContainer.hex()
        },
        "&:focus-within .label": {
            transform: "translate(0, -100%) scale(0.8)",
            fontWeight: "bold",
            opacity: 1,
            color: theme.tertiary.accent.hex()
        },
        "&:has(textarea:required) .label::after": {
            content: "'*'"
        },
        "& .sample": {
            display: "none",
            position: "absolute",
            width: "calc(100% - 44px)",
            top: 22,
            left: 22,
            opacity: 0.5,
            color: theme.neutral.onContainer.hex()
        },
        "&:focus-within .sample": {
            display: filled? "none" : "block"
        },
        [`& .${rippleClass}`]: {
            backgroundColor: theme.neutral.onContainer.hex()
        }
    }
}));

export function TextArea({className, label, children: sampleText, helperText, onChange, ...props}) {
    const {rippleClass, rippleExpand, rippleFade} = useRippleEffect();

    const handleClick = useCallback(() => {
        const textField = document.getElementById(label);
        textField.focus();
        textField.setSelectionRange(0, textField.value.length);
    }, []);
    const handleBlur = useCallback(event => {
        if(event.relatedTarget?.contains(event.currentTarget))
            event.currentTarget.focus();
    }, []);

    const [filled, setFilled] = useState(false);
    const handleFill = useCallback(event => {
        const target = event.currentTarget;
        setFilled(true);
        if(!target.value || !target.value.trim().length)
            setFilled(false);
        target.style.height = "1px";
        target.style.height = `${target.scrollHeight}px`;
        console.log(target.scrollHeight)
        onChange?.(event);
    }, []);
    useEffect(() => {
        document.getElementById(label).addEventListener("input", handleFill);
        return () => document.getElementById(label).removeEventListener("input", handleFill);
    }, [])

    const {cx, classes} = useStyles({filled, rippleClass});
    return (
        <div>
            <div 
                tabIndex={-1} // Negative tabIndex to give the div focusability but keep it out of focus order.
                className={cx(classes.textArea, className)}
                onMouseDown={filled? undefined : rippleExpand}
                onMouseUp={rippleFade}
                onClick={handleClick}
            >
                {sampleText? <Label className="sample">{sampleText}</Label> : ""}
                <label htmlFor={label}>
                    <Label className="label">{label}</Label>
                    <textarea
                        rows={3}
                        className="field" 
                        id={label}
                        name={label}
                        onBlur={handleBlur}
                        {...props}
                        autoComplete="off"
                    />
                </label>
            </div>
            {helperText? <Label className="helper">{helperText}</Label> : ""}
        </div>
    )
}