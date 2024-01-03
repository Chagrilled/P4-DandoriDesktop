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