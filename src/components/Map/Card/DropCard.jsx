import React from "react";
import { ActorSpawnerCustomParameter, DropConditions, DropConditions_Named, GameRulePermissionFlags, InfoType } from "../../../api/types";
import { getInfoType, getNameFromAsset, getPathType, getSubpathFromAsset } from "../../../utils/utils";
import { Card } from "./Card";
import { DebouncedInput } from "../DebouncedInput";

const iconMap = {
    "Objects/Otakara": 'treasure',
    "WorkObjects/Shizai": "miscitem",
    "Objects/Survivor": "castaway",
    Teki: 'creature',
    Items: 'miscitem',
    Pikmin: 'pikmin'
};

export const DropCard = ({ drop, updateDrops, isActorSpawner, ddId }) => {
    const nameSuffix = drop.dropCondition == DropConditions.SALVAGE_ITEM ? ' (Revisit only)' : '';

    const subPath = getSubpathFromAsset(drop.assetName);
    const infoType = getInfoType(subPath);
    const asset = getNameFromAsset(drop.assetName);

    const amountStr = (!isActorSpawner && drop.maxDrops !== drop.minDrops)
        ? `${drop.minDrops}-${drop.maxDrops}`
        : drop.maxDrops + '';
    console.log("DropCard", drop);
    const footerFragment = isActorSpawner ?
        <>
            <div>
                <b>Sphere radius</b>:&nbsp;
                <DebouncedInput value={drop.sphereRadius} changeFunc={(v) => updateDrops(v, drop, "sphereRadius")} ddId={ddId} />
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
                <DebouncedInput value={drop.spawnInterval} changeFunc={(v) => updateDrops(v, drop, "spawnInterval")} ddId={ddId} />
            </div>
            <div>
                <b>Spawn limit</b>:&nbsp;
                <DebouncedInput value={drop.spawnLimit} changeFunc={(v) => updateDrops(v, drop, "spawnLimit")} ddId={ddId} />
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
                <DebouncedInput value={amountStr} changeFunc={(v) => updateDrops(v, drop, "amount")} ddId={ddId} />
            </span>
            {
                <span>
                    <b>Chance</b>:
                    <DebouncedInput value={Math.round(drop.dropChance * 100) + '%'} changeFunc={(v) => updateDrops(v, drop, "dropChance")} ddId={ddId} />
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
                    changeFunc={(v) => updateDrops(v, drop, "flags")}
                    type="text"
                    value={JSON.stringify(drop.flags).replaceAll(',', ', ')}
                    ddId={ddId}
                />
            </div>}
            <div>
                <b>CustomFloatParameter</b>:&nbsp;
                <DebouncedInput
                    changeFunc={(v) => updateDrops(v, drop, "customFloatParameter")}
                    className="bg-sky-1000"
                    type="number"
                    value={drop.customFloatParam}
                    ddId={ddId}
                />
            </div>
            <div>
                <b>GameRulePermissionFlag</b>:&nbsp;
                <select
                    className="w-full bg-sky-1000 max-w-[50%]"
                    value={drop.gameRulePermissionFlag || 0}
                    onChange={(e) => updateDrops(e.target.value, drop, "gameRulePermissionFlag")}
                >
                    {GameRulePermissionFlags.map((flag) =>
                        <option key={flag} value={flag}>{flag}</option>
                    )}
                </select>
            </div>
            <div>
                <b>bSetTerritory</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.bSetTerritory}
                    className="w-4 h-4 ml-2 self-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => updateDrops(e.target.checked, drop, "bSetTerritory")}
                />
            </div>
            {drop.bSetTerritory ? ["x", "y", "z", "halfHeight", "radius"].map(key => (
                <div key={key}>
                    <b>{key}</b>:&nbsp;
                    <DebouncedInput
                        changeFunc={(v) => updateDrops(v, drop, key)}
                        className="bg-sky-1000 max-w-[5em]"
                        type="number"
                        value={drop[key] || 0.0}
                        ddId={ddId}
                    />
                </div>
            )) : ''}
        </>;

    const imageProps = {};
    imageProps.imgType = infoType;
    imageProps.imgId = asset;
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
