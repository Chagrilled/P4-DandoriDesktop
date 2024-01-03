import React, { useCallback } from "react";

export const ByteInput = ({ value, onChange }) => {
    const handleChange = useCallback((evt) => {
        onChange?.(evt.target.value);
    }, [onChange]);
    const handlePaste = useCallback((evt) => {
        // Stop data actually being pasted into div
        evt.stopPropagation();
        evt.preventDefault();

        // Get pasted data via clipboard API
        const clipboardData = evt.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('Text');

        const trimmedText = pastedData.replaceAll(/\s+/g, ' ').trim();
        onChange?.(trimmedText);
    }, [onChange]);

    return <textarea
        className="text-black"
        value={value}
        onPaste={handlePaste}
        onChange={handleChange}
    />;
};
