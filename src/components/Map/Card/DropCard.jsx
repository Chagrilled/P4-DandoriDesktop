import React from "react";
import { ActorSpawnerCustomParameter, DropConditions, DropConditions_Named, GameRulePermissionFlags, InfoType } from "../../../api/types";
import { getInfoType, getNameFromAsset, getSubpathFromAsset } from "../../../utils";
import { Card } from "./Card";
import { DebouncedInput } from "../DebouncedInput";

export const DropCard = ({ drop, updateDrops, isActorSpawner, ddId }) => {
    console.log("DropCard", drop);

    const nameSuffix = drop.dropCondition == DropConditions.SALVAGE_ITEM ? ' (Revisit only)' : '';
    const subPath = getSubpathFromAsset(drop.assetName);
    const infoType = getInfoType(subPath);
    const asset = getNameFromAsset(drop.assetName);
    const classNameStyles = "w-4 h-4 ml-2 self-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";

    const amountStr = (!isActorSpawner && drop.maxDrops !== drop.minDrops)
        ? `${drop.minDrops}-${drop.maxDrops}`
        : drop.maxDrops + '';

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
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "infiniteSpawn")}
                />
            </div>
            <div>
                <b>Spawn interval</b>:&nbsp;
                <DebouncedInput value={drop.spawnInterval} type="number" changeFunc={(v) => updateDrops(v, drop, "spawnInterval")} ddId={ddId} />
            </div>
            <div>
                <b>Spawn limit</b>:&nbsp;
                <DebouncedInput value={drop.spawnLimit} tpe="number" changeFunc={(v) => updateDrops(v, drop, "spawnLimit")} ddId={ddId} />
            </div>
            <div className="flex">
                <b>overlapCenterX</b>:&nbsp;
                <DebouncedInput value={drop.overlapCenterX} type="number" changeFunc={(v) => updateDrops(v, drop, "overlapCenterX")} ddId={ddId} />
            </div>
            <div className="flex">
                <b>overlapCenterY</b>:&nbsp;
                <DebouncedInput value={drop.overlapCenterY} type="number" changeFunc={(v) => updateDrops(v, drop, "overlapCenterY")} ddId={ddId} />
            </div>
            <div className="flex">
                <b>overlapCenterZ</b>:&nbsp;
                <DebouncedInput value={drop.overlapCenterZ} type="number" changeFunc={(v) => updateDrops(v, drop, "overlapCenterZ")} ddId={ddId} />
            </div>
            <div className="flex">
                <b>overlapAreaHalfHeight</b>:&nbsp;
                <DebouncedInput value={drop.halfHeight} type="number" changeFunc={(v) => updateDrops(v, drop, "halfHeight")} ddId={ddId} />
            </div>
            <div className="flex">
                <b>overlapAreaRadius</b>:&nbsp;
                <DebouncedInput value={drop.radius} type="number" changeFunc={(v) => updateDrops(v, drop, "radius")} ddId={ddId} />
            </div>
            <div className="flex">
                <b>overlapAreaAngle</b>:&nbsp;
                <DebouncedInput value={drop.angle} type="number" changeFunc={(v) => updateDrops(v, drop, "angle")} ddId={ddId} />
            </div>
            <div className="flex">
                <b>spawnAng</b>:&nbsp;
                <DebouncedInput value={drop.spawnAng} type="number" changeFunc={(v) => updateDrops(v, drop, "spawnAng")} ddId={ddId} />
            </div>
            <div className="flex">
                <b>spawnVelX</b>:&nbsp;
                <DebouncedInput value={drop.spawnVelX} type="number" changeFunc={(v) => updateDrops(v, drop, "spawnVelX")} ddId={ddId} />
            </div>
            <div className="flex">
                <b>spawnVelY</b>:&nbsp;
                <DebouncedInput value={drop.spawnVelY} type="number" changeFunc={(v) => updateDrops(v, drop, "spawnVelY")} ddId={ddId} />
            </div>
            <div className="flex">
                <b>bSpawnAngRand</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.bSpawnAngRand}
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "bSpawnAngRand")}
                />
            </div>
            <div className="flex">
                <b>Random rotation</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.randomRotation}
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "randomRotation")}
                />
            </div>
            <div className="flex">
                <b>Avatar</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.avatar}
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "avatar")}
                />
            </div>
            <div className="flex">
                <b>Pikmin</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.pikmin}
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "pikmin")}
                />
            </div>
            <div className="flex">
                <b>Avatar and Pikmin</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.avatarAndPikmin}
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "avatarAndPikmin")}
                />
            </div>
            <div className="flex">
                <b>Carrying</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.carry}
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "carry")}
                />
            </div>
            <div className="flex">
                <b>bNotOverlap</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.bNotOverlap}
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "bNotOverlap")}
                />
            </div>
            <div className="flex">
                <b>bGenseiControl</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.bGenseiControl}
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "bGenseiControl")}
                />
            </div>
            <div className="flex">
                <b>noDropItem</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.noDropItem}
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "noDropItem")}
                />
            </div>
            <div className="flex">
                <b>fallStart</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.fallStart}
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "fallStart")}
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
            <div className="flex">
                <b>customFloatParameter</b>:&nbsp;
                <DebouncedInput value={drop.customFloatParameter} type="number" changeFunc={(v) => updateDrops(v, drop, "customFloatParameter")} ddId={ddId} />
            </div>
            <div className="flex">
                <b>gameRulePermissionFlag</b>:&nbsp;
                <DebouncedInput value={drop.gameRulePermissionFlag} type="number" changeFunc={(v) => updateDrops(v, drop, "gameRulePermissionFlag")} ddId={ddId} />
            </div>
            <div className="flex">
                <b>bSetTerritory</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.bSetTerritory}
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "bSetTerritory")}
                />
            </div>
            {!!drop.bSetTerritory && <div className="flex">
                <b>territoryX</b>:&nbsp;
                <DebouncedInput value={drop.territoryX} type="number" changeFunc={(v) => updateDrops(v, drop, "territoryX")} ddId={ddId} />
            </div>}
            {!!drop.bSetTerritory && <div className="flex">
                <b>territoryY</b>:&nbsp;
                <DebouncedInput value={drop.territoryY} type="number" changeFunc={(v) => updateDrops(v, drop, "territoryY")} ddId={ddId} />
            </div>}
            {!!drop.bSetTerritory && <div className="flex">
                <b>territoryZ</b>:&nbsp;
                <DebouncedInput value={drop.territoryZ} type="number" changeFunc={(v) => updateDrops(v, drop, "territoryZ")} ddId={ddId} />
            </div>}
            {!!drop.bSetTerritory && <div className="flex">
                <b>territoryHalfHeight</b>:&nbsp;
                <DebouncedInput value={drop.territoryHalfHeight} type="number" changeFunc={(v) => updateDrops(v, drop, "territoryHalfHeight")} ddId={ddId} />
            </div>}
            {!!drop.bSetTerritory && <div className="flex">
                <b>territoryRadius</b>:&nbsp;
                <DebouncedInput value={drop.territoryRadius} type="number" changeFunc={(v) => updateDrops(v, drop, "territoryRadius")} ddId={ddId} />
            </div>}
            <div className="flex">
                <b>invasionStartTimeRatio</b>:&nbsp;
                <DebouncedInput value={drop.invasionStartTimeRatio} type="number" changeFunc={(v) => updateDrops(v, drop, "invasionStartTimeRatio")} ddId={ddId} />
            </div>
        </> :
        <>
            {amountStr != 'undefined' && <span>
                <b>Amount</b>:&nbsp;
                <DebouncedInput value={amountStr} changeFunc={(v) => updateDrops(v, drop, "amount")} ddId={ddId} />
            </span>}
            {!!drop.dropChance && <span>
                <b>Chance</b>:&nbsp;
                <DebouncedInput value={Math.round(drop.dropChance * 100) + '%'} changeFunc={(v) => updateDrops(v, drop, "dropChance")} ddId={ddId} />
            </span>}
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
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "bSetTerritory")}
                />
            </div>
            <div>
                <b>bRegistGenerator</b>:&nbsp;
                <input
                    type="checkbox"
                    checked={drop.bRegistGenerator}
                    className={classNameStyles}
                    onChange={(e) => updateDrops(e.target.checked, drop, "bRegistGenerator")}
                />
            </div>
            {drop.bSetTerritory ? ["X", "Y", "Z", "halfHeight", "radius"].map(key => (
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
