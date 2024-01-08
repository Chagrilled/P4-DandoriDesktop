import React from 'react';
import { CreatureNames, RebirthTypes } from "../../api/types";
import { useConfig } from '../../hooks/useConfig';
import { DebouncedInput } from './DebouncedInput';

const editableFields = ["generateNum", "generateRadius", "X", "Y", "Z", "groupingRadius", "rebirthInterval", "birthDay", "deadDay"];
const ignoreFields = ["drops", "type", "infoType", "ddId", "outlineFolderPath"];

const updateCreature = (value, mapMarkerData, setMapData, obj, path, ddId) => {
    const newMapData = mapMarkerData.creature.map(creature => {
        if (creature.ddId == ddId) {
            deepUpdate(creature, path, value);
        }
        return { ...creature };
    });

    setMapData({ ...mapMarkerData, creature: newMapData });
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

export const CreatureInfo = ({ obj, mapMarkerData, setMapData, parent, ddId }) => {
    if (!obj) {
        return null;
    }

    const config = useConfig();

    return Object.entries(obj).map(([key, value]) => {
        if (value == null) {
            return <li key={key}><b>{key}</b>: undefined</li>;
        }
        if (ignoreFields.includes(key)) return;

        if (editableFields.includes(key)) {
            const fullKey = `${parent || ''}${parent ? '.' : ''}${key}`;
            return <li key={fullKey}>
                <b>{key}</b>:&nbsp;
                <DebouncedInput changeFunc={e => updateCreature(e, mapMarkerData, setMapData, obj, fullKey, ddId)} value={value} type="number" ddId={ddId} />
            </li>;
        }

        if (key === 'ignoreList') {
            return <li key={key}>
                <b>{key}</b>:&nbsp;
                <DebouncedInput changeFunc={e => updateCreature(e, mapMarkerData, setMapData, obj, key, ddId)} value={value} ddId={ddId} />
            </li>;
        }

        if (key === 'creatureId') {
            if (['ActorSpawner', 'GroupDropManager'].includes(value)) return <li key={key}>
                <b>creatureId</b>
                <div className="ml-4">
                    {/* TODO: Put other entities in selects for their own category - gimmicks can swap to gimmicks, but not creatures */}
                    {value}
                </div>
            </li>;
            return <li key={key}>
                <b>creatureId</b>
                <div>
                    <select value={value} className="w-full bg-sky-1000" onChange={e => updateCreature(e.target.value, mapMarkerData, setMapData, obj, key, ddId)}>
                        {Object.entries(CreatureNames)
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

        if (key === 'rebirthType') {
            return <li key={key}>
                <b>rebirthType</b>:
                <select value={value} className="bg-sky-1000" onChange={e => updateCreature(e.target.value, mapMarkerData, setMapData, obj, key, ddId)}>
                    {Object.values(RebirthTypes).map(rebirthType => <option key={rebirthType} value={rebirthType}>{rebirthType}</option>)}
                </select>
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