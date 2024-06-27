"use client"
import {useCallback} from 'react';
import {tss} from './themer';
import {useContainerContext, ContainerContextProvider} from '../helper/container';
import useRippleEffect from '../hooks/ripple';

// IconButton styles.
const useStyles = tss.create(({theme, role, type, appearance, containerRole, rippleClass, isInButton}) => ({
    icon: {
        display: "block",
        position: "relative",
        fontSize: isInButton? 20 : 30,
        color: theme[role][`on${type[0].toUpperCase() + type.slice(1)}`].hex()
    },
    iconButton: {
        outline: "none",
        border: appearance === "outlined"? `1pt solid ${theme[role].onContainer.hex()}` : "none",

        minWidth: "fit-content",
        minHeight: "fit-content",
        maxWidth: "fit-content",
        maxHeight: "fit-content",
        padding: "10px",
        position: "relative",
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 100%)",
        borderRadius: "100%",

        display: "flex",
        justifyContent: "center",
        gap: 5,
        alignSelf: 'flex-start',

        backgroundColor: appearance === "text" || appearance === "outlined"? "transparent" : theme[role][appearance === "filled"? "accent" : "container"].hex(),
        "&::after": {
            content: "''",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            backgroundColor: appearance === "text" || appearance === "outlined"? theme[containerRole].onContainer.hex() : theme[role][appearance === "filled"? "onAccent" : "onContainer"].hex(),
            opacity: 0,
            transition: "opacity 300ms ease"
        },
        "&:hover::after": {
            opacity: 0.2
        },
        [`& .${rippleClass}`]: {
            backgroundColor: appearance === "text" || appearance === "outlined"? theme[containerRole].onContainer.hex() : theme[role][appearance === "filled"? "onAccent" : "onContainer"].hex()
        }
    }
}));

/**
 * The Icon component is used to display icons from icon fonts.
 *
 * @param props This component takes 3 props:
 *  *   The `className` prop is used to pass classNames to add styles to the Icon.
 *  *   The `icon` prop gives the icon ligature text that displays the icon from
 *      the font.
 *  *   The `iconClass` prop allows users to define their own icon font css class
 *      to change the icon options available. *Defaults to material-icons.*
 *
 * The component also passes forward any other props the user specifies.
 *
 * @returns A styled `i` jsx element.
 */
export function Icon({className, icon, iconClass = "material-icons", __isInButton = false, ...props}) {
    const {role, type} = useContainerContext();
    const {cx, classes} = useStyles({role, type, isInButton: __isInButton});
    return (
        <i className={cx(classes.icon, iconClass, className?? "")} {...props}>{icon}</i>
    );
}

/**
 * The IconButton is used to make buttons that only have icons. The reason there is
 * a distinction between normal Button components and IconButtons is because IconButtons
 * have to be perfectly round, so their padding it different. For a button with text
 * use the Button component.
 * 
 * @param props This component takes 7 props:
 *  *   The `className` prop is available to override any styles using a className.
 *  *   The `role` prop is used to assign the color role of the button. *Defaults
 *      to primary.*
 *  *   The `appearance` prop is used to define which appearance the button takes
 *      on. The options are "filled", "tonal", "outlined", and "text". *Defaults to
 *      filled.*
 *  *   The `onMouseDown` and `onMouseUp` mouse events are available to add extra
 *      callbacks to the events besides the ripple effect.
 * The component also passes forward other props.
 *  
 * @returns A styled `button` jsx element.
 */
export default function IconButton({className, role = "primary", appearance = "filled", icon, iconClass = "material-icons", onMouseDown, onMouseUp, ...props}) {
    // Here we assign the container type depending on the appearance given.
    const type = appearance === "filled"? "accent" : "container";
    const {role: containerRole} = useContainerContext(); // We also request the parent container's role for text and outlined buttons.

    // We obtain the ripple effect handler.
    const {rippleClass, rippleExpand, rippleFade} = useRippleEffect();
    // Create handlers that apply both the ripple event.
    // They also call the mouse events provided by the user
    // if they exist.
    const mouseDownHandler = useCallback(event => {
        rippleExpand(event);
        onMouseDown?.(event);
    }, [onMouseDown]);
    const mouseUpHandler = useCallback(event => {
        rippleFade(event);
        onMouseUp?.(event);
    });

    const {cx, classes} = useStyles({role, type, appearance, containerRole, rippleClass})
    return (
        <ContainerContextProvider role={role} type={type}>
            <Icon className={cx(classes.iconButton, className?? "")} icon={icon} iconClass={iconClass} onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} {...props} />
        </ContainerContextProvider>
    )
}