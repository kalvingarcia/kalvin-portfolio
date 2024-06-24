"use client"
import {tss} from './themer';
import {useContainerContext} from '../helper/container';

// Icon styles.
const useStyles = tss.create(({theme, role, type, isInButton}) => ({
    icon: {
        display: "block",
        position: "relative",
        fontSize: isInButton? 20 : 30,
        color: theme[role][`on${type[0].toUpperCase() + type.slice(1)}`].hex()
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
export default function Icon({className, icon, iconClass = "material-icons", __isInButton = false, ...props}) {
    const {role, type} = useContainerContext();
    const {cx, classes} = useStyles({role, type, isInButton: __isInButton});
    return (
        <i className={cx(classes.icon, iconClass, className?? "")} {...props}>{icon}</i>
    );
}