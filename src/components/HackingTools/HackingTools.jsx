import React, { useMemo, useState } from "react";
import { ByteInput } from "./ByteInput";
import { useValidation } from "../../hooks/useValidation";
import { floatToByteArr, intToByteArr } from "../../utils/bytes";

const getByteAsHex = (byte) => ('00' + byte.toString(16)).slice(-2);

const scanForStrings = (byteArray) => {
    const strings = [];
    // minus 6, since the shortest (non-empty) string length is '2, 0, 0, 0, x, 0'
    for (let i = 0; i < byteArray.length - 6; i++) {
        const strStart = i + 4;
        const cstrLength = byteArrToInt(byteArray.slice(i, i + 4).reverse());
        if (cstrLength !== 0 && cstrLength > byteArray.length - strStart) {
            continue;
        }

        const nextNullTerminator = byteArray.indexOf(0, strStart);
        // remove null from cstr
        if (nextNullTerminator - strStart !== cstrLength - 1) {
            continue;
        }

        strings.push({
            index: i,
            // add 4 to get the length + 4 length bytes
            value: byteArrToStr(byteArray.slice(i, i + cstrLength + 4))
        });
    }
    return strings;
};

const padArray = (arr, len = 4, fill = 0) => {
    return arr.slice().concat(
        Array(len).fill(fill)
    ).slice(0, len);
};

const byteArrToDataView = (nums) => {
    nums = padArray(nums);

    const view = new DataView(new ArrayBuffer(4));
    nums.forEach((n, i) => {
        if (n < 0) n = 0;
        if (n > 255) n = 255;
        view.setUint8(i, n);
    });
    return view;
};

const byteArrToFloat = (nums) => {
    return byteArrToDataView(nums).getFloat32(0);
};

const byteArrToInt = (nums) => {
    return byteArrToDataView(nums).getInt32(0);
};

const byteArrToStr = (nums) => {
    const cstrLength = byteArrToInt(nums.slice(0, 4).reverse());
    // length - 4 to remove the cstrLength bytes
    return cstrLength === nums.length - 4
        // -1 to remove null terminator
        ? nums.slice(4, -1).map(n => String.fromCharCode(n)).join('')
        : '';
};

const byteStringPatternValidator = (value) => {
    if (!value) {
        return undefined;
    }

    const allBytes = value.split(',').map(v => v.trim());
    for (const byte of allBytes) {
        if (!byte.trim().match(/^\d+$/)) {
            return {
                invalidByte: { byte: byte.trim() }
            };
        }
    }

    return undefined;
};

const floatStringPatternValidator = (value) => {
    if (!value || /[+-]?\d+(\.\d+)?([eE][+-]?\d+)?/.test(value)) {
        return undefined;
    }
    return {
        pattern: { value }
    };
};

export const HackingTools = () => {
    const [byteString, setByteString] = useState('');
    const [floatString, setFloatString] = useState('0.0');
    const [stringString, setStringString] = useState('');
    const [asciiString, setAsciiString] = useState('');

    const { isValid: byteStringIsValid } = useValidation({ value: byteString, validators: [byteStringPatternValidator] });
    const { isValid: floatIsValid } = useValidation({ value: floatString, validators: [floatStringPatternValidator] });

    const { bytesAsFloat, bytesAsInt, stringsInBytes } = useMemo(() => {
        if (!byteStringIsValid) {
            return {
                bytesAsFloat: '',
                bytesAsInt: '',
                stringsInBytes: []
            };
        }

        const rawBytes = byteString.split(',').map(byte => {
            return parseInt(byte.trim());
        });
        const byteArr = padArray(rawBytes).reverse();
        const bytesAsInt = byteArrToInt(byteArr);

        return {
            bytesAsFloat: byteArrToFloat(byteArr),
            bytesAsInt,
            stringsInBytes: scanForStrings(rawBytes)
        };
    }, [byteString, byteStringIsValid]);

    const { floatByteString, floatHexString } = useMemo(() => {
        if (!floatIsValid) {
            return {
                floatByteString: '',
                floatHexString: ''
            };
        }

        const byteArr = floatToByteArr(parseFloat(floatString));
        return {
            floatByteString: byteArr.slice().reverse().join(', '),
            floatHexString: byteArr.map(getByteAsHex).join('')
        };
    }, [floatString, floatIsValid]);

    const stringBytes = useMemo(() => {
        const lengthBytes = intToByteArr(stringString.length + 1).reverse();

        return [
            ...lengthBytes,
            ...stringString.split('').map(char => char.charCodeAt(0)),
            0
        ].join(', ');
    }, [stringString]);

    const asciiStringBytes = useMemo(() => {
        let ints = asciiString.match(/\d+/g) || [];
        if (ints.length > 5 && ints[1] == 0 && ints[2] == 0 && ints[3] == 0) {
            ints = ints.slice(4, ints.length); // chop off the length indicator if we're confident it's there
        }

        return String.fromCharCode(...ints);
    }, [asciiString]);

    return <div className="HackingTools__container">
        <label>
            <div className="font-bold">Float to Number:</div>
            <input className="text-black" type='number' value={floatString} onChange={(evt) => setFloatString(evt.target.value)} />
        </label>
        <div>Bytes (Little Endian): {floatByteString}</div>
        <div>Hex: 0x{floatHexString}</div>

        <br />
        <div className="font-bold">Bytes to int:</div>
        <ByteInput
            value={byteString}
            onChange={setByteString}
        />
        <div>Int: {bytesAsInt}</div>
        <div>Float: {bytesAsFloat}</div>
        <div>
            Strings:
            {
                stringsInBytes.map(s => {
                    return <div>{s.value}</div>;
                })
            }
        </div>

        <br />
        <div className="font-bold">String to bytes:</div>
        <textarea className="w-full text-black" value={stringString} onChange={(evt) => setStringString(evt.target.value)} />
        <div>Bytes: {stringBytes}</div>

        <br />
        <div className="font-bold">Bytes to string:</div>
        <textarea className="w-full text-black" value={asciiString} onChange={(evt) => setAsciiString(evt.target.value)} />
        <div>String: {asciiStringBytes}</div>
    </div>;
};