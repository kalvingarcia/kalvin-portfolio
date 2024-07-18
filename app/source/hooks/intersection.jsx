import { useCallback, useEffect, useState } from "react"

export default function useIntersection(options) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [ratio, setRatio] = useState(0);
    const [element, setElement] = useState(undefined);
    const [currentElement, setCurrentElement] = useState(undefined);
    const checkIntersecting = useCallback(entries => {
        entries.forEach(entry => {
            if(entry.target === element) {
                setIsIntersecting(entry.isIntersecting)
                if(entry.isIntersecting)
                    setRatio(entry.intersectionRatio);
            }
        });
    }, [element]);
    const observer = new IntersectionObserver(checkIntersecting, options);
    useEffect(() => {
        if(currentElement)
            observer.unobserve(currentElement);
        if(element)
            observer.observe(element);
        setCurrentElement(element);
    }, [element]);

    return {isIntersecting, ratio, setElement};
}