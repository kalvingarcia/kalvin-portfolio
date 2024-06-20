"use client"
import {Children, cloneElement, useEffect, useState} from "react";

const ENTER_EXIT_ERROR_MESSAGE = "Both enter and exit props need to be defined";
const CHILDREN_ERROR_MESSAGE = "Animator expected to receive a single React element child."

const DEFAULT_ANIMATION_DURATION = 300;
/**
 * A wrapper component that animates the child component using CSS classes. Animate uses “events,”
 * which are triggered by timeout functions.
 * 
 * @props The Animator takes 5 props:
 * *    The `show` prop defines whether the component should be rendered. *Defaults to false.*
 * *    The `enter` and `exit` props define the class names that apply the CSS animations they 
 *      perform. **This prop is required.**
 * *    The `duration` prop is used to define how long the animation will take in terms of ms. 
 *      *Defaults to 300ms*
 * *    The `children` prop should only have 1 child. **This prop is required.**
 * @returns The child React component when `show` is true.
 */
export default function Animator({show = false, enter, exit, duration = DEFAULT_ANIMATION_DURATION, children}) {
    try {
        // Testing that enter and exit are defined.
        if(!enter || !exit)
            throw new Error(ENTER_EXIT_ERROR_MESSAGE); // Throwing an error to inform that enter or exit or both are undefined.

        const [render, setRender] = useState(false); // Defines whether to render the child or not.
        const [child, setChild] = useState(Children.only(children)); // Assert that the child is an only child.
        useEffect(() => {
            const baseChild = child; // Saving the child without any special class names.
            // Testing the cases of show and hide (mount and unmount).
            if(show && !render) {
                setRender(true);
                setChild(cloneElement(child, {className: [enter, child.props.className?? ""].join(" ")})); // Updating the child to animated one.
                setTimeout(() => setChild(baseChild), duration); // After the animation duration is over, we reset the child.
            } else if(!show && render) {
                setChild(cloneElement(child, {className: [exit, child.props.className?? ""].join(" ")})); // Updating the child to the animated one.
                setTimeout(() => setRender(false) || setChild(baseChild), duration); // After the animation, we unmount and reset the child.
            }
        }, [show, duration, render]);

        return render && child;
    } catch(error) {
        error.message = error.message === ENTER_EXIT_ERROR_MESSAGE? ENTER_EXIT_ERROR_MESSAGE : CHILDREN_ERROR_MESSAGE;
        console.error(error);
        return <></>;
    }
}