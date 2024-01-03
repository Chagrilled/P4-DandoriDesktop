import React, { Fragment, useEffect, useState } from "react";
import { CreatureNames, TreasureNames, DefaultDrop, EntityNames, MiscNames, GimmickNames } from "../../api/types";
import { MarkerIcon } from "../Icon";
import { ExpandPanel } from "./ExpandPanel";
import { DropCard } from "./Card/DropCard";
import { CardList } from "./Card/CardList";
import { getNameFromAsset } from "../../utils/utils";
import { CreatureInfo } from "./CreatureInfo";

const updateDrops = (value, mapMarkerData, setMapData, ddId, drop, key, dropDeleteStack, setDropDeleteStack) => {
    if (!value && key !== 'delete') return;
    const newMapData = mapMarkerData.creature.map(creature => {
        if (creature.ddId == ddId) {
            creature.drops.parsed = creature.drops.parsed.map(d => {
                if (d.id == drop.id) {
                    let newVal;
                    if (["flags", "params"].includes(key)) {
                        newVal = JSON.parse(value);
                    }
                    else if (key === 'amount') {
                        const parts = value.split('-');
                        return {
                            ...d,
                            minDrops: parseInt(parts[0]),
                            maxDrops: parseInt(parts[parts.length > 1 ? 1 : 0])
                        };
                    }
                    else if (key == 'dropChance') {
                        newVal = parseFloat(value.split('%')[0]) / 100;
                    }
                    else if (['infiniteSpawn', 'randomRotation'].includes(key)) {
                        newVal = value ? 1 : 0;
                    }
                    else if (key == 'delete') {
                        setDropDeleteStack([...dropDeleteStack, { ...drop, ddId }]);
                        return;
                    }
                    else if (key == 'assetName') {
                        // I hate this 
                        const selectVal = value;
                        const isTreasure = TreasureNames[selectVal];
                        const isCreature = CreatureNames[selectVal];
                        const isMisc = MiscNames[selectVal];
                        const isGimmick = GimmickNames[selectVal];

                        let midPath;
                        if (isTreasure) midPath = 'Objects/Otakara';
                        if (isCreature) midPath = 'Teki';
                        if (isMisc) midPath = 'Items';
                        if (isGimmick) midPath = 'WorkObjects/Shizai'; // won't work for all gimmicks
                        newVal = `/Game/Carrot4/Placeables/${midPath}/G${selectVal}.G${selectVal}_C`;
                    }
                    else newVal = value;
                    return {
                        ...d,
                        [key]: newVal
                    };
                }
                return {
                    ...d
                };
            }).filter(d => !!d);
        };
        return { ...creature };
    });

    setMapData({ ...mapMarkerData, creature: newMapData });
};

const deleteMarker = (mapMarkerData, setMapData, creature) => {
    const newMapData = mapMarkerData.creature.map(c => c.ddId != creature.ddId ? c : undefined).filter(c => !!c);
    setMapData({ ...mapMarkerData, creature: newMapData });
};

const undoItemDelete = (dropDeleteStack, setDropDeleteStack, mapMarkerData, setMapData) => {
    if (!dropDeleteStack.length) return;

    const missingDrop = dropDeleteStack.slice(-1)[0];
    const ddId = missingDrop.ddId;
    delete missingDrop.ddId;
    const newMapData = mapMarkerData.creature.map(creature => {
        if (creature.ddId == ddId) {
            return {
                ...creature,
                drops: {
                    parsed: [...creature.drops.parsed, missingDrop]
                }
            };
        }
        return { ...creature };
    });
    setDropDeleteStack(dropDeleteStack.slice(0, dropDeleteStack.length - 1)); //ddId has been deleted above, by reference
    setMapData({ ...mapMarkerData, creature: newMapData });

};

const addDrop = (ddId, setMapData, mapMarkerData) => {
    setMapData({
        ...mapMarkerData,
        creature: mapMarkerData.creature.map(creature => {
            const drops = creature.drops.parsed;
            if (creature.ddId == ddId) return {
                ...creature,
                drops: {
                    parsed: [
                        ...drops,
                        {
                            ...DefaultDrop,
                            // Reduce because undoing/redoing appends to the end, so you need to seek for the highest, as the IDs may no longer be ascending
                            id: drops.length ? parseInt(drops.reduce((acc, drop) => drop.id > acc ? drop.id : acc, 0)) + 1 : 1 // Can a default ID be 1??? 
                        }
                    ]
                }
            };
            return { ...creature };
        })
    });
};

export const InfoPanel = ({ marker, mapMarkerData, setMapData }) => {
    // Getting kinda messy, but I need everything to be 
    // sourced from the data array so components rerender on change
    const [deleteStack, setDeleteStack] = useState([]);
    const [dropDeleteStack, setDropDeleteStack] = useState([]);

    useEffect(() => {
        const callback = (event) => {
            // event.metaKey - pressed Command key on Macs
            // event.ctrlKey - pressed Control key on Linux or Windows
            if ((event.metaKey || event.ctrlKey) && event.code === 'KeyZ') {
                const missingMarker = deleteStack.slice(-1)[0];
                if (missingMarker) {
                    setMapData({ creature: [...mapMarkerData.creature, missingMarker] });
                    setDeleteStack(deleteStack.filter(c => c.ddId != missingMarker.ddId));
                }
            }
        };
        document.addEventListener('keydown', callback);
        return () => {
            document.removeEventListener('keydown', callback);
        };
    });

    if (!marker) return null;

    const creature = mapMarkerData.creature.find(obj => marker.ddId == obj.ddId);
    if (!creature) return null; // CreatureInfo likes to hold on to the selected ID if you change maps
    console.log("CreatureInfo", creature);
    const isActorSpawner = creature.creatureId === 'ActorSpawner';

    const title = creature.generateNum
        ? <Fragment>{EntityNames[creature.creatureId]} &times; {creature.generateNum}</Fragment>
        : <Fragment>{EntityNames[creature.creatureId]}</Fragment>;

    // This function control is degusting. Maybe use context or something.
    const dropList =
        <ExpandPanel isActorSpawner={isActorSpawner} addDrop={() => addDrop(creature.ddId, setMapData, mapMarkerData)} label="Drops">
            {creature.drops?.parsed?.length ? (
                <CardList>
                    {creature.drops.parsed.map(drop => <DropCard key={drop.id || "1"} isActorSpawner={isActorSpawner} drop={drop} updateDrops={(e, drop, key) => updateDrops(e, mapMarkerData, setMapData, creature.ddId, drop, key, dropDeleteStack, setDropDeleteStack)} />)}
                </CardList>
            ) : null}
        </ExpandPanel>;

    const markerIconId = isActorSpawner ? getNameFromAsset(marker.drops.parsed[0].assetName) : marker.creatureId;

    const sizeOverrides = {
        Egg: 'xl',
        BigEgg: 'xl',
        GroupDropManager: 'xl'
    };

    return <div className="flex flex-col px-3 overflow-auto CreatureInfo__container">
        <MarkerIcon size={sizeOverrides[creature.creatureId] || "large"} type={marker.infoType} id={markerIconId} />
        <h2 className="text-2xl font-bold my-4">{title}</h2>
        <ul className="list-disc list-inside DefaultInfo__container" style={{ overflow: 'visible ' }}>
            {<CreatureInfo obj={creature} mapMarkerData={mapMarkerData} setMapData={setMapData} parent={''} ddId={creature.ddId} />}
        </ul>
        {dropList}
        <div className="flex">
            <svg onClick={() => { deleteMarker(mapMarkerData, setMapData, creature); setDeleteStack([...deleteStack, creature]); }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-auto pt-4 min-h-[5rem] w-20 h-20 hover:text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

            {!isActorSpawner && <svg onClick={() => undoItemDelete(dropDeleteStack, setDropDeleteStack, mapMarkerData, setMapData)} className="m-auto pt-4 min-h-[5rem] w-20 h-20 hover:text-green-400" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10.625H14.2C14.2 10.625 14.2 10.625 14.2 10.625C14.2 10.625 17 10.625 17 13.625C17 17 14.2 17 14.2 17H13.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5 14L7 10.625L10.5 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
        </div>
    </div>;
};
