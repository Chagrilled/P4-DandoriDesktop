export const floatToByteArr = (num) => {
    const view = new DataView(new ArrayBuffer(4));
    view.setFloat32(0, num);
    return new Array(4)
        .fill(4)
        .map((_, i) => view.getUint8(i));
};


export const padArray = (arr, len = 4, fill = 0) => {
    return arr.slice().concat(
        Array(len).fill(fill)
    ).slice(0, len);
};

export const bytesToInt = (bytes) => byteArrToInt(padArray(bytes).reverse());

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

export const byteArrToFloat = (nums) => {
    return byteArrToDataView(nums).getFloat32(0);
};

export const byteArrToInt = (nums) => {
    return byteArrToDataView(nums).getInt32(0);
};

export const intToByteArr = (number, numBytes = 4) => {
    const bytes = [];
    for (let i = 0; i < numBytes; i++) {
        bytes.push(number & 0xFF);
        number >>= 8;
    }
    return bytes;
};

export const getDisableSettings = (flags) => {
    const pikmin = {};
    for (let i = 0; i < 16; i++) {
        // Extract the bit at position i
        pikmin[i] = (flags & (1 << i)) !== 0;
    }
    return pikmin;
};

export const disableFlagsToInt = (pikminSettings) => {
    let flags = 0;
    for (const [index, isEnabled] of Object.entries(pikminSettings)) {
        if (isEnabled) {
            flags |= (1 << index);
        }
    }
    return flags;
};