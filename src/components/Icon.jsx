import React from "react";
import { getIconOptions } from "./Map/FeatureStyles";

export const MarkerIcon = ({ type, id, size = 'small' }) => {
    console.log("Icon", type, id)
    if (id?.startsWith('night')) id = id.replace('night', '');

    const src = !id
        ? getIconOptions(type).src
        : `../images/${type}s/${type}-${id.toLowerCase().replace('night', '')}.png`;

    const sizes = {
        'small': "w-16 h-16 mr-2 inline self-center",
        'xl': 'w-32 h-32 mr-2 mt-4 inline self-center'
    };
    return <img className={sizes[size] || 'self-center'} src={src} />;
};
