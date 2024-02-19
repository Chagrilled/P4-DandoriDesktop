import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import deepEqual from "deep-equal";

export const DebouncedInput = ({ changeFunc, value, type, className = "max-w-[7em] bg-sky-1000", ddId, marker }) => {
    const [changeValue, setValue] = useState(value);
    const [stateDDId, setId] = useState(ddId);
    const [stateMarker, setStateMarker] = useState(marker);

    const debouncedRequest = useDebounce(() => {
        changeFunc(changeValue);
    });

    if (stateDDId !== ddId) {
        setId(ddId);
        setValue(value);
    }

    // The object is passed in to know if has changed outside of the input 
    // Mainly applicable to dragging markers around the map
    // Force an update if our object changes outside of the debouncer/onChange
    if (!deepEqual(stateMarker, marker)) {
        setStateMarker(marker);
        setValue(value);
    }

    const onChange = (e) => {
        const inputVal = e.target.value;
        setValue(inputVal);

        debouncedRequest();
    };

    return <input onChange={onChange} className={className} value={changeValue} type={type} />;
};