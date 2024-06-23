"use client"
import {tss} from './themer';
import Icon from './icon';
import {useContainerContext, ContainerContextProvider} from '../helper/container';
import useRippleEffect from '../hooks/ripple';

const useStyles = tss.create(({theme, role, appearance, containerRole}) => ({
    iconButton: {
        
    }
}));

export default function IconButton({className, role, appearance, icon, iconClass = "material-icons", ...props}) {
    // Here we assign the container type depending on the appearance given.
    const type = appearance === "filled"? "accent" : "container";
    const {role: containerRole} = useContainerContext(); // We also request the parent container's role for text and outlined buttons.

    // We obtain the ripple effect handler.
    const {rippleExpand, rippleFade} = useRippleEffect();
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

    const {classes} = useStyles({role, type, containerRole})
    return (
        <ContainerContextProvider role={role} type={type}>
            <button className={[classes.iconButton, className?? ""].join(" ")} {...props}>
                <Icon icon={icon} iconClass={iconClass} />
            </button>
        </ContainerContextProvider>
    )
}