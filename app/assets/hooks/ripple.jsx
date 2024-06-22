"use client"
import {useCallback} from 'react';
import {keyframes} from 'tss-react';
import {tss} from '../components/themer';

// The ripple animations keyframes.
const rippledEffect = keyframes({
    "to": {
        transform: "scale(4)"
    }
});
const fadeEffect = keyframes({
    "to": {
        opacity: 0
    }
});

// The ripple effect styles.
tss.create(({theme}) => ({
    ".ripple": {
        position: "fixed",
        tranform: "scale(0)",
        pointerEvents: "none",
        borderRadius: "50%",
        opacity: "0.3",
        animation: `${rippledEffect} 1800ms forwards`,
        "&.ripple-fade": {
            animation: `${rippledEffect} 1800ms forwards, ${fadeEffect} 600ms forwards`
        }
    }
}));

/**
 * The ripple effect hook. Used specifically to add a simillar effect to components
 * on click that Material Design has. The hook returns 2 functions which would be
 * applied to the onMouseDown and onMouseUp mouse events for a component.
 *  *   The `rippleEffect` function is given to the onMouseDown event and add the
 *      ripple effect `span` element to the component's tree.
 *  *   The `rippleFade` function is given to the onMouseUp event and handles fading
 *      and removing the ripple `span`.
 * @returns 2 functions for the mouse event handlers.
 */
export default function useRippleEffect() {
    // This is the onMouseDown event handler, which will add the expanding circle
    // effect to the component. The circle will grow slowly as the user holds the
    // mouse button.
    const rippleExpand = useCallback(event => {
        const target = event.currentTarget; // First we get the component's reference.

        // We create the circle.
        const circle = document.createElement("span");
        const diameter = Math.max(target.clientWidth, target.clientHeight);
        const radius = diameter / 2;

        // We then set the circle's styles.
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - radius}px`;
        circle.style.top = `${event.clientY - radius}px`;
        circle.classList.add("ripple");

        // Check if the component already has a circle and remove it.
        // I might look into a way to have the original ripple fade
        // instead, so that there isn't just a tiny circle getting spammed.
        const ripple = target.getElementsByClassName("ripple")[0];
        ripple?.remove();
        target.appendChild(circle); //Here we append the new ripple.

        event.stopPropagation();
    }, []);

    // The onMouseUp handler. It speeds up the expanding effect and adds a fade.
    const rippleFade = useCallback(event => {
        const target = event.currentTarget; // Finding the component.

        // Getting the ripple circle.
        const ripple = target.getElementsByClassName("ripple")[0];
        ripple?.classList.add("ripple-fade"); // We add the fade animation.
        setTimeout(() => ripple?.remove(), 600); // Set the timeout to kill it once the animation is over.

        event.stopPropagation();
    }, []);

    return {rippleExpand, rippleFade};
}