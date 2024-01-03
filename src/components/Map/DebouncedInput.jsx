import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

export const DebouncedInput = ({ changeFunc, value, type, className = "max-w-[7em] bg-sky-1000" }) => {
    const [changeValue, setValue] = useState(value);
    const debouncedRequest = useDebounce(() => {
        changeFunc(changeValue);
    });

    const onChange = (e) => {
        const inputVal = e.target.value;
        setValue(inputVal);

        debouncedRequest();
    };

    return <input onChange={onChange} className={className} value={changeValue} type={type} />;
};