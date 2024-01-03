import React from "react";
import { ActorSpawnerCustomParameter, DropConditions, DropConditions_Named } from "../../../api/types";
import { getNameFromAsset, getPathType } from "../../../utils/utils";
import { Card } from "./Card";
import { DebouncedInput } from "../DebouncedInput";

const iconMap = {
    "Objects/Otakara": 'treasure',
    "WorkObjects/Shizai": "miscitem",
    Teki: 'creature',
    Items: 'miscitem',
    Pikmin: 'pikmin'
};

export const DropCard = ({ drop, updateDrops, isActorSpawner }) => {
    const nameSuffix = drop.dropCondition == DropConditions.SALVAGE_ITEM ? ' (Revisit only)' : '';

    const type = getPathType(drop.assetName);
    const asset = getNameFromAsset(drop.assetName);

    const amountStr = (!isActorSpawner && drop.maxDrops !== drop.minDrops)
        ? `${drop.minDrops}-${drop.maxDrops}`
        : drop.maxDrops + '';
    console.log("DropCard", drop);
    const footerFragment = isActorSpawner ?
        <>
            <div>
                <b>Sphere radius</b>:&nbsp;
                <DebouncedInput value={drop.sphereRadius} changeFunc={(e) => updateDrops(e, drop, "sphereRadius")} />
            </div>
            <div className="flex">
                <b>Infinite spawn</b>:
                <input
                    type="checkbox"
                    checked={drop.infiniteSpawn}
                    className="w-4 h-4 ml-2 self-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => updateDrops(e.target.checked, drop, "infiniteSpawn")}
                />
            </div>
            <div>
                <b>Spawn interval</b>:&nbsp;
                <DebouncedInput value={drop.spawnInterval} changeFunc={(e) => updateDrops(e, drop, "spawnInterval")} />
            </div>
            <div>
                <b>Spawn limit</b>:&nbsp;
                <DebouncedInput value={drop.spawnLimit} changeFunc={(e) => updateDrops(e, drop, "spawnLimit")} />
            </div>
            <div className="flex">
                <b>Random rotation</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.randomRotation}
                    className="w-4 h-4 ml-2 self-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => updateDrops(e.target.checked, drop, "randomRotation")}
                />
            </div>
            <div className="flex">
                <b>CustomParameter</b>:&nbsp;
                <select
                    className="w-full bg-sky-1000 max-w-[50%]"
                    value={drop.customParameter || "None"}
                    onChange={(e) => updateDrops(e.target.value, drop, "customParameter")}
                >
                    {ActorSpawnerCustomParameter.map((cp) =>
                        <option key={cp} value={cp}>{cp}</option>
                    )}
                </select>
            </div>

        </> :
        <>
            <span>
                <b>Amount</b>:&nbsp;
                <DebouncedInput value={amountStr} changeFunc={(e) => updateDrops(e, drop, "amount")} />
            </span>
            {
                <span>
                    <b>Chance</b>:
                    <DebouncedInput value={Math.round(drop.dropChance * 100) + '%'} changeFunc={(e) => updateDrops(e, drop, "dropChance")} />
                </span>
            }
            <div>
                <b>Drop Condition</b>:
                <select
                    className="w-full bg-sky-1000 max-w-[50%]"
                    value={drop.dropCondition || "0"}
                    onChange={(e) => updateDrops(e.target.value, drop, "dropCondition")}
                >
                    {Object.entries(DropConditions_Named).map(([k, v]) =>
                        <option key={k} value={k}>{v}</option>
                    )}
                </select>
            </div>
            {drop.flags && <div>
                <b>Flags</b>:&nbsp;
                <DebouncedInput
                    className="max-w-[7em] bg-sky-1000"
                    changeFunc={(e) => updateDrops(e, drop, "flags")}
                    type="text"
                    value={JSON.stringify(drop.flags).replaceAll(',', ', ')}
                />
            </div>}
            <div>
                <b>Params</b>:&nbsp;
                <DebouncedInput
                    changeFunc={(e) => updateDrops(e, drop, "params")}
                    className="bg-sky-1000"
                    type="text"
                    value={JSON.stringify(drop.params).replaceAll(',', ', ')}
                />
            </div>
        </>;

    // if (iconMap[type] === 'treasure' || iconMap[type] === 'creature') {
    //     // TODO: type this out better
    //     if (iconMap[type] === 'treasure') {
    //         mappedName = TreasureNames[object];
    //     }
    //     else mappedName = CreatureNames[object];

    //     return <ValueCard
    //         type={iconMap[type]}
    //         id={object}
    //         name={mappedName + nameSuffix}
    //         amount={drop.minDrops} // all creatures/treasures have the same min and max
    //         extras={footerFragment}
    //         drop={drop}
    //         updateDrops={updateDrops}
    //     />;
    // }

    // if (iconMap[type] === 'treasure') {
    //     mappedName = TreasureNames[object];
    // }
    // else if (iconMap[type] === 'creature') mappedName = CreatureNames[object];
    // else 

    const imageProps = {};
    if (iconMap[type] === 'treasure' || iconMap[type] === 'creature') {
        imageProps.imgType = iconMap[type];
        imageProps.imgId = asset;
    }
    else imageProps.imgType = `${iconMap[type]}-${asset.toLowerCase()}`;

    const name = (asset || '') + nameSuffix;

    return <Card
        title={name}
        footer={footerFragment}
        drop={drop}
        updateDrops={updateDrops}
        isActorSpawner={isActorSpawner}
        {...imageProps}
    />;
};
