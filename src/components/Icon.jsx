import React from "react";
import { getIconOptions } from "./Map/FeatureStyles";
import { InfoType, iconOverrides } from "../api/types";

export const MarkerIcon = ({ type, id, size = 'small', card, override }) => {
    const typeOverrides = {
        [InfoType.Gimmick]: 'w-48 h-48 mr-2 mt-4 inline self-center',
        [InfoType.Object]: 'w-48 h-48 mr-2 mt-4 inline self-center',
        [InfoType.WorkObject]: 'w-48 h-48 mr-2 mt-4 inline self-center',
        [InfoType.Pikmin]: 'w-48 h-48 mr-2 mt-4 inline self-center',
        [InfoType.Base]: 'w-48 h-48 mr-2 mt-4 inline self-center',
        [InfoType.Onion]: 'w-48 h-48 mr-2 mt-4 inline self-center',
        [InfoType.Hazard]: 'w-48 h-48 mr-2 mt-4 inline self-center',
        [InfoType.Portal]: 'w-48 h-48 mr-2 mt-4 inline self-center',
        [InfoType.Item]: 'w-48 h-48 mr-2 mt-4 inline self-center',
        [InfoType.PopPlaceActor]: 'w-48 h-48 mr-2 mt-4 inline self-center',
        "pikmin-disable": 'w-10 h-10 mr-px mt-px inline self-center'
    };
    if (id?.startsWith('night')) id = id.replace('night', '');
    id = iconOverrides[id?.toLowerCase()] || id;

    const src = !id
        ? getIconOptions(type).src
        : `../images/${type}s/${type}-${id.toLowerCase().replace('night', '')}.png`;

    const sizes = {
        'small': "w-16 h-16 mr-2 inline self-center",
        'xl': 'w-32 h-32 mr-2 mt-4 inline self-center'
    };
    return <img className={(!card && typeOverrides[type + override]) || sizes[size] || 'self-center'} src={src} />;
};
