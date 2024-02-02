import React from 'react';
import { NameMap, RebirthTypes, PikminTypes, PikminPlayType, defaultAIProperties, DemoPlayParamEnter, DemoPlayParamExit, PortalTypes } from "../../api/types";
import { useConfig } from '../../hooks/useConfig';
import { findMarkerById, getAvailableTimes } from '../../utils';
import { DebouncedInput } from './DebouncedInput';

const editableNumberFields = ["generateNum", "generateRadius", "X", "Y", "Z", "W", "groupingRadius", "rebirthInterval", "birthDay", "deadDay", "spawnNum", "spawnRadius", "noSpawnRadius", "mabikiNumFromFollow", "unknownInt", "pongashiChangeColorFollowNum", "portalNumber", "toPortalId", "toBaseCampId", "playAnimDist", "disablePikminFlags", "panzakuPriority"];
const editableBools = ["bMabikiPongashi", "bInitialPortalMove", "bDeactivateByExit", "bDisableIsFlareGuard"];
const ignoreFields = ["drops", "type", "infoType", "ddId", "outlineFolderPath", "spareBytes"];
const editableStrings = ["ignoreList", "toLevelName", "toSubLevelName"];
const selectFields = {
    pongashiChangeColorFromFollow: Object.values(PikminTypes),
    pikminType: Object.values(PikminTypes),
    groupIdlingType: Object.values(PikminPlayType),
    rebirthType: Object.values(RebirthTypes),
    portalType: Object.values(PortalTypes),
    demoPlayParamEnter: DemoPlayParamEnter,
    demoPlayParamExit: DemoPlayParamExit,
};

const updateCreature = (value, mapMarkerData, setMapData, obj, path, ddId) => {
    console.log("updateObj", obj);
    let type = obj.infoType;
    if (!type) {
        ({ type } = findMarkerById(ddId, mapMarkerData));
    }
    console.log(mapMarkerData);
    const newMapData = mapMarkerData[type].map(creature => {
        if (creature.ddId == ddId) {
            deepUpdate(creature, path, value);
            if (path === 'creatureId') {
                if (value.includes('NoraSpawner') && !creature.AIProperties)
                    creature.AIProperties = { ...defaultAIProperties };
                if (!value.includes('NoraSpawner') && creature.AIProperties)
                    delete creature.AIProperties;
            }
        }
        return { ...creature };
    });

    setMapData({ ...mapMarkerData, [type]: newMapData });
};

const deepUpdate = (obj, path, value) => {
    if (typeof path == 'string')
        return deepUpdate(obj, path.split('.'), value);
    else if (path.length == 1 && value !== undefined)
        obj[path[0]] = value;
    else if (path.length == 0)
        return obj;
    else
        return deepUpdate(obj[path[0]], path.slice(1), value);
};

export const CreatureInfo = ({ obj, mapMarkerData, setMapData, parent, ddId, mapId }) => {
    if (!obj) {
        return null;
    }

    const config = useConfig();

    return Object.entries(obj).map(([key, value]) => {
        if (value == null) {
            return <li key={key}><b>{key}</b>: undefined</li>;
        }
        if (ignoreFields.includes(key)) return;
        const fullKey = `${parent || ''}${parent ? '.' : ''}${key}`;

        if (editableNumberFields.includes(key)) {
            return <li key={fullKey}>
                <b>{key}</b>:&nbsp;
                <DebouncedInput changeFunc={e => updateCreature(e, mapMarkerData, setMapData, obj, fullKey, ddId)} value={value} type="number" ddId={ddId} />
            </li>;
        }

        if (editableStrings.includes(key)) {
            return <li key={key}>
                <b>{key}</b>:&nbsp;
                <DebouncedInput changeFunc={e => updateCreature(e, mapMarkerData, setMapData, obj, fullKey, ddId)} value={value} ddId={ddId} />
            </li>;
        }

        if (key === 'creatureId') {
            if (['ActorSpawner', 'GroupDropManager'].includes(value)) return <li key={key}>
                <b>creatureId</b>
                <div className="ml-4">
                    {value}
                </div>
            </li>;
            return <li key={key}>
                <b>creatureId</b>
                <div>
                    <select value={value} className="w-full bg-sky-1000" onChange={e => updateCreature(e.target.value, mapMarkerData, setMapData, obj, key, ddId)}>
                        {Object.entries(NameMap[obj.infoType])
                            .sort((a, b) => a[config?.internalNames ? 0 : 1].localeCompare(b[config?.internalNames ? 0 : 1]))
                            .map(([creatureKey, creatureValue]) =>
                                <option
                                    key={creatureKey}
                                    value={creatureKey}>{config?.internalNames ? creatureKey : creatureValue} ({config?.internalNames ? creatureValue : creatureKey})
                                </option>)}
                    </select>
                </div>
            </li>;
        }

        if (key === 'time') {
            return <li key={key}>
                <b>Time</b>:
                <select value={value} className="bg-sky-1000" onChange={e => updateCreature(e.target.value, mapMarkerData, setMapData, obj, key, ddId)}>
                    {getAvailableTimes(mapId).map(time => <option key={time} value={time}>{time}</option>)}
                </select>
            </li>;
        }

        if (selectFields[key]) {
            return <li key={fullKey}>
                <b>{key}</b>:
                <select value={value} className="bg-sky-1000" onChange={e => updateCreature(e.target.value, mapMarkerData, setMapData, obj, fullKey, ddId)}>
                    {selectFields[key].map(value => <option key={value} value={value}>{value}</option>)}
                </select>
            </li>;
        }

        if (editableBools.includes(key)) {
            return <li key={fullKey}>
                <b>{key}</b>
                <input
                    type="checkbox"
                    checked={value}
                    className="w-4 h-4 ml-2 self-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => updateCreature(e.target.checked, mapMarkerData, setMapData, obj, fullKey, ddId)}
                />
            </li>;
        }

        if (typeof value === 'object') {
            return <li key={key}>
                <b>{key}</b>
                <ul className="ps-4 list-disc list-inside">{<CreatureInfo obj={value} mapMarkerData={mapMarkerData} setMapData={setMapData} parent={parent ? `${parent}.${key}` : key} ddId={ddId} />}</ul>
            </li>;
        }

        return <li key={key}><b>{key}</b>: {value + ""}</li>;
    });
};