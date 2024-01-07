export const floatToByteArr = (num) => {
    const view = new DataView(new ArrayBuffer(4));
    view.setFloat32(0, num);
    return new Array(4)
        .fill(4)
        .map((_, i) => view.getUint8(i));
};

export const intToByteArr = (num) => {
    const view = new DataView(new ArrayBuffer(4));
    view.setInt32(0, num);
    return new Array(4)
        .fill(4)
        .map((_, i) => view.getUint8(i));
};

export const padArray = (arr, len = 4, fill = 0) => {
    return arr.slice().concat(
        Array(len).fill(fill)
    ).slice(0, len);
};

export const bytesToInt = (byteString) => {
    const rawBytes = byteString.split(',').map(byte => {
        return parseInt(byte.trim());
    });
    const byteArr = padArray(rawBytes).reverse();
    return byteArrToInt(byteArr);
}

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