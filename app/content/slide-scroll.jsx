"use client"
import {useEffect} from "react";

const SCROLL_INTERVAL = 6;
const ANIMATION_DURATION = 600;

export default function useSlideScroll(SLIDE_COUNT) {
    useEffect(() => {
        let startY;
        const touchStart = event => {
            startY = event.touches?.[0].clientY;
        };
        window.addEventListener("touchstart", touchStart, {passive: false});

        const scrollAnimation = direction => {
            const ease = (step) => {
                return Math.sin((step * Math.PI) / 2);
            }

            let time = 0;
            const scrollInterval = setInterval(() => {
                const steps = ANIMATION_DURATION / SCROLL_INTERVAL;
                scrollBy({
                    top: direction * (ease((time + 1) / steps) - ease(time / steps)) * (innerHeight + direction * 25)
                });
                time++;
            }, SCROLL_INTERVAL);
            setTimeout(() => clearInterval(scrollInterval), ANIMATION_DURATION + SCROLL_INTERVAL);
        }

        let disable = false;
        let slide = 0;
        const changeSlide = event => {
            if(disable) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }

            const wheel = Math.sign(event.deltaY);
            const keys = Math.sign(event.keyCode === 38? -1 : event.keyCode === 40? 1 : undefined);
            const touch = Math.sign(startY - event.touches?.[0].clientY);
            const direction = wheel || keys || touch;

            if(slide + direction > -1 && slide + direction < SLIDE_COUNT) {
                scrollAnimation(direction);
                slide += direction;
                disable = true;
                setTimeout(() => disable = false, 2 * ANIMATION_DURATION);
            }

            event.preventDefault();
            event.stopPropagation();
        };
        window.addEventListener("touchmove", changeSlide, {passive: false});
        window.addEventListener("keydown", changeSlide);
        window.addEventListener("wheel", changeSlide, {passive: false});
        
        return () => {
            window.removeEventListener("touchstart", touchStart);
            window.removeEventListener("touchmove", changeSlide);
            window.removeEventListener("keydown", changeSlide);
            window.removeEventListener("wheel", changeSlide);
        }
    }, []);
}