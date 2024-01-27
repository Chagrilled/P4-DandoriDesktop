import React from "react";
import { MarkerIcon } from "../../Icon";
import { EntityNames, NameMap } from "../../../api/types";
import { useConfig } from "../../../hooks/useConfig";
import { capitalise, findObjectKey } from "../../../utils";

export const Card = ({ title, imgId, imgType, footer, drop, updateDrops, isActorSpawner }) => {
    const config = useConfig();
    const rawTitle = title.replace(' (Revisit only)', '');
    const rawName = findObjectKey(EntityNames, rawTitle);

    return <div className="flex gap-2 overflow-hidden py-2 border border-slate-600 Card__container">
        <MarkerIcon type={imgType} id={imgId} size="small" card={true} />
        <div className="flex-auto flex flex-col gap-2 h-100 items-center Card__content">
            <h4 className="font-bold m-0 text-center inline-flex overflow-hiddenCard__header" title={title}>
                {!isActorSpawner && <svg onClick={(e) => updateDrops(e, drop, "delete")} className="w-6 h-6 mr-1 hover:text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                }
                <select value={rawName} className="w-full bg-sky-1000" onChange={(e) => updateDrops(e.target.value, drop, "assetName")}>
                    {Object.entries(NameMap).map(([key, val]) =>
                        <optgroup key={key} label={capitalise(key)}>
                            {Object.entries(val)
                                .sort((a, b) => a[config?.internalNames ? 0 : 1].localeCompare(b[config?.internalNames ? 0 : 1]))
                                .map(([entityKey, entityVal]) =>
                                    <option
                                        key={entityKey}
                                        value={entityKey}>{config?.internalNames ? entityKey : entityVal} ({config?.internalNames ? entityVal : entityKey})
                                    </option>)}
                        </optgroup>)}
                </select>
            </h4>
            {
                footer && <div className="flex flex-nowrap flex-col Card__footer">{footer}</div>
            }
        </div>
    </div>;
};

// (.+)(?:\(Revisit only\)*)