"use client"
import {Children, cloneElement, useEffect, useState} from "react";

const ENTER_EXIT_ERROR_MESSAGE = "Both enter and exit props need to be defined";
const BEGIN_ACTIVE_ERROR_MESSAGE = "Both begin and active props need to be defined";
const SINGLE_CHILD_ERROR_MESSAGE = "Expected to receive a single React element child."

const DEFAULT_ANIMATION_DURATION = 300;
const DEFAULT_DELAY_DURATION = 30;

/**
 * A wrapper component that animates the child component using CSS classes. The animation uses “events,”
 * which are triggered by timeout functions. If there shouldn't be an enter or exit animation,
 * set the prop to "none". This component will always mount and unmount the child. To keep the child
 * mounted even when not shown, use the Effect component.
 * 
 * @param props The Transition takes 5 props:
 *  *   The `show` prop defines whether the component should be rendered. *Defaults to false.*
 *  *   The `enter` and `exit` props define the class names that apply the CSS animations they 
 *      perform. **These props is required.**
 *  *   The `duration` prop is used to define how long the animation will take in terms of milliseconds. 
 *      *Defaults to 300ms*
 *  *   The `children` prop should only have 1 child. **This prop is required.**
 * @returns The child React component when `show` is true.
 */
export function Transition({show = false, enter, exit, duration = DEFAULT_ANIMATION_DURATION, children}) {
    try {
        // Testing that enter and exit are defined.
        if(!enter || !exit)
            throw new Error(ENTER_EXIT_ERROR_MESSAGE); // Throwing an error to inform that enter or exit or both are undefined.

        const [render, setRender] = useState(false); // Defines whether to render the child or not.
        const [state, setState] = useState("inactive");
        useEffect(() => {
            // Testing the cases of show and hide (mount and unmount).
            if(show && !render) {
                setState("enter"); // Updating the child to animated one.
                setRender(true);
                setTimeout(() => setState("active"), duration); // After the animation duration is over, we reset the child.
            } else if(!show && render) {
                setState("exit"); // Updating the child to the animated one.
                setTimeout(() => setRender(false) || setState("inactive"), duration); // After the animation, we unmount and reset the child.
            }
        }, [show, render, duration]);

        const child = Children.only(children); // Assert that the child is an only child.
        return render && cloneElement(child, { 
            className: [ 
                child.props.className?? "",
                state === "enter"? enter : state === "exit"? exit : ""
            ].join(" ")
        });
    } catch(error) {
        console.error(error.message === ENTER_EXIT_ERROR_MESSAGE? ENTER_EXIT_ERROR_MESSAGE : SINGLE_CHILD_ERROR_MESSAGE);
        return <></>;
    }
}

/**
 * A wrapper component that animates the child component using CSS classes. The animation uses "events,"
 * which are triggered by timeout functions. If there shouldn't be an begin animation, then set `begin` 
 * to "none". The `active` prop is required to apply the change of state the Effect components applies.
 * The `end` prop doesn't need to be defined since the effect can remain perpetually active, otherwise,
 * define the `end` prop to get an ending animation. This component always keeps the child mounted. To
 * mount and unmount the child, use the Transition component.
 * 
 * @param props The Effect component takes 6 props:
 *  *   The `start` prop defines whether the component should start the animation. *Defaults to false.*
 *  *   The `being`, `active`, and `end` props define the class names that apply the CSS styles at 
 *      different stages of the animation. **The `begin` and `active` props are required.**
 *  *   The `duration` prop defines the time the animation takes in terms of milliseconds. *Defauls to
 *      300ms.*
 *  *   The `children` prop should only have 1 child. **This prop is required.**
 * @returns The child React component with the given style applied.
 */
export function Effect({start = false, begin, active, end = "end", duration = DEFAULT_ANIMATION_DURATION, children}) {
    try {
        // Testing that enter and exit are defined.
        if(!begin || !active)
            throw new Error(BEGIN_ACTIVE_ERROR_MESSAGE); // Throwing an error to inform that enter or exit or both are undefined.

        const [state, setState] = useState("inactive");
        useEffect(() => {
            // Testing the cases of show and hide (mount and unmount).
            if(start && state === "inactive") {
                setState("begin"); // Updating the child to animated one.
                setTimeout(() => setState("active"), duration); // After the animation duration is over, we reset the child.
            } else if(!start && state === "active") {
                setState("end"); // Updating the child to the animated one.
                setTimeout(() => setState("inactive"), duration); // After the animation, we unmount and reset the child.
            }
        }, [start, duration]);

        const style = {begin, active, end, inactive: "inactive"};
        const child = Children.only(children); // Assert that the child is an only child.
        return cloneElement(child, { 
            className: [
                child.props.className?? "",
                style[state]
            ].join(" ")
        });
    } catch(error) {
        console.error(error.message === BEGIN_ACTIVE_ERROR_MESSAGE? BEGIN_ACTIVE_ERROR_MESSAGE : SINGLE_CHILD_ERROR_MESSAGE);
        console.log(error.message);
        return <></>;
    }
}

export function Trail({start = false, delay = DEFAULT_DELAY_DURATION, children}) {

}