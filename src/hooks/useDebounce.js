import { useRef, useMemo, useEffect } from "react";

export const useDebounce = (callback) => {
    const ref = useRef();

    // TODO: Check if useLayoutEffect works better here
    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        const func = () => {
            ref.current?.();
        };

        return debounce(func, 1500);
    }, []);

    return debouncedCallback;
};


const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};