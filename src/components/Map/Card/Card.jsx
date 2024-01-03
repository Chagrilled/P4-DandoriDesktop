import React from "react";
import { MarkerIcon } from "../../Icon";
import { CreatureNames, EntityNames, MiscNames, TreasureNames } from "../../../api/types";
import { useConfig } from "../../../hooks/useconfig";

export const Card = ({ title, imgId, imgType, footer, drop, updateDrops, isActorSpawner }) => {
    const config = useConfig();
    const rawTitle = title.replace(' (Revisit only)', '');
    // const rawName = EntityNames[rawTitle]
    const rawName = Object.keys(EntityNames).find(key => key === rawTitle);
    // let rawName = Object.keys(TreasureNames).find(key => TreasureNames[key] === title.replace(' (Revisit only)', ''));
    // if (!rawName) rawName = Object.keys(CreatureNames).find(key => CreatureNames[key] === title.replace(' (Revisit only)', ''));
    // else if ()
    // TODO: scrape objects and let them be selectable too

    return <div className="flex gap-2 overflow-hidden py-2 border border-slate-600 Card__container">
        <MarkerIcon type={imgType} id={imgId} size="small" />
        <div className="flex-auto flex flex-col gap-2 h-100 items-center Card__content">
            <h4 className="font-bold m-0 text-center inline-flex overflow-hiddenCard__header" title={title}>
                {!isActorSpawner && <svg onClick={(e) => updateDrops(e, drop, "delete")} className="w-6 h-6 mr-1 hover:text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                }
                <select value={rawName} className="w-full bg-sky-1000" onChange={(e) => updateDrops(e.target.value, drop, "assetName")}>
                    <optgroup label="Creatures">
                        {Object.entries(CreatureNames).map(([creatureKey, creatureValue]) => <option key={creatureKey} value={creatureKey}>{config?.internalNames ? creatureKey : creatureValue} ({config?.internalNames ? creatureValue : creatureKey})</option>)}
                    </optgroup>
                    <optgroup label="Misc Items">
                        {Object.entries(MiscNames).map(([miscKey, miscValue]) => <option key={miscKey} value={miscKey}>{miscValue} ({miscKey})</option>)}
                    </optgroup>
                    <optgroup label="Treasures">
                        {Object.entries(TreasureNames).map(([treasureKey, treasureValue]) => <option key={treasureKey} value={treasureKey}>{treasureValue} ({treasureKey})</option>)}
                    </optgroup>
                </select>
            </h4>
            {
                footer && <div className="flex flex-nowrap flex-col Card__footer">{footer}</div>
            }
        </div>
    </div>;
};

// (.+)(?:\(Revisit only\)*)