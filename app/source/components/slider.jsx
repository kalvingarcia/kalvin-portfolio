import {useCallback, useState} from "react";
import {tss} from "./themer";

const useStyles = tss.create(({theme, percentage}) => ({
    container: {
        padding: 5
    },
    slider: {
        margin: 0,
        marginLeft: -2,
        boxSizing: "border-box",
        WebkitAppearance: "none",
        position: "relative",
        backgroundColor: theme.primary.container.alpha(0.5).hexa(),
        width: "100%",
        height: 10,
        borderRadius: 20,
        "&::-webkit-slider-thumb": {
            WebkitAppearance: "none",
            backgroundColor: theme.primary.accent.hex(),
            width: 20,
            height: 20,
            borderRadius: "100%"
        },
        "&::before": {
            content: "''",
            position: "absolute",
            inset: 0,
            width: `calc(${percentage} * 100%)`,
            height: 10,
            borderRadius: 20,
            backgroundColor: theme.primary.accent.alpha(0.75).hexa()
        }
    }
}));

export default function Slider({className, min = 0, max = 100, value = (min + max) / 2, onChange, ...props}) {
    const [percentage, setPercentage] = useState((value - min) / (max - min));
    const handleChange = useCallback(event => {
        const value = event.target.value;
        setPercentage((value - min) / (max - min));
        onChange?.(value);
    }, [min, max]);

    const {cx, classes} = useStyles({percentage});
    return (
        <div className={classes.container}>
            <input type="range" min={min} max={max} className={cx(classes.slider, className)} onChange={handleChange} {...props} />
        </div>
    );
}