import { useCallback, useEffect, useState } from "react"

export default function useIntersection(options) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [ratio, setRatio] = useState(0);

    const checkIntersecting = entries => {
        entries.forEach(entry => {
            setIsIntersecting(entry.isIntersecting)
            if(entry.isIntersecting)
                setRatio(entry.intersectionRatio);
        });
    };

    const observer = new IntersectionObserver(checkIntersecting, options);
    const setElement = (element) => {
        if(element)
            observer.observe(element);
    };

    return {isIntersecting, ratio, setElement};
}