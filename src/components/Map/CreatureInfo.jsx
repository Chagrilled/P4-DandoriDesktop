import React, { useContext } from 'react';
import { NameMap, editableNumberFields, editableBools, ignoreFields, editableStrings, arrayStrings, selectFields, defaultPlacementCond, defaultVector, PikminTypes, defaultSplinePoint, defaultAppearanceCond, ActorPlacementAppearanceCondition } from "../../api/types";
import { findMarkerById, getAvailableTimes, mutateAIProperties, deepCopy } from '../../utils';
import { DebouncedInput } from './DebouncedInput';
import { MapContext } from './MapContext';
import { MarkerIcon } from '../MarkerIcon';
import tooltips from '../../api/tooltips';
import { Tooltip } from 'react-tooltip';

//#region updateCreature
const updateCreature = (value, mapMarkerData, setMapData, obj, path, ddId, index) => {
    console.log("updateObj", obj);
    let type = obj.infoType;
    const oldCreatureId = obj.creatureId;
    if (!type) {
        ({ type } = findMarkerById(ddId, mapMarkerData));
    }

    const newMapData = mapMarkerData[type].map(creature => {
        if (creature.ddId == ddId) {
            deepUpdate(creature, path, value, index);

            if (path === 'creatureId') {
                mutateAIProperties(creature, value, '', oldCreatureId);
            }
        }
        return { ...creature };
    });

    setMapData({ ...mapMarkerData, [type]: newMapData });
};

const deleteArrayItem = (mapMarkerData, setMapData, obj, path, ddId, index) => {
    let type = obj.infoType;
    if (!type) {
        ({ type } = findMarkerById(ddId, mapMarkerData));
    }
    const newMapData = mapMarkerData[type].map(creature => {
        if (creature.ddId == ddId) {
            if (creature[path])
                creature[path].splice(index, 1);
            else if (creature.AIProperties[path]) //shit hack for splines being nested in AIP
                creature.AIProperties[path].splice(index, 1);
        }
        return { ...creature };
    });
    setMapData({ ...mapMarkerData, [type]: newMapData });
};

const deepUpdate = (obj, path, value, index) => {
    console.log(obj, path, value, index);
    // Keep numbers as numbers, for some reason they get stringified
    if (!isNaN(parseFloat(value))) value = parseFloat(value);

    if (typeof path == 'string')
        return deepUpdate(obj, path.split('.'), value, index);
    else if (path.length == 1 && value !== undefined) {
        if (Array.isArray(obj) && path[0] in defaultPlacementCond) {
            obj[index][path[0]] = value;
        }
        else obj[path[0]] = value;
        console.log(obj);
    }
    else if (path.length == 0)
        return obj;
    if (Array.isArray(obj) && index !== undefined) {
        return deepUpdate(obj[index], path, value, index);
    }
    else
        return deepUpdate(obj[path[0]], path.slice(1), value, index);
};

//#region Component
export const CreatureInfo = ({ obj, parent, ddId, index }) => {
    if (!obj) {
        return null;
    }
    const { mapMarkerData, setMapData, mapId, config } = useContext(MapContext);

    return Object.entries(obj).map(([key, value]) => {
        if (value == null) {
            return <li key={key}><b>{key}</b>: undefined</li>;
        }
        if (ignoreFields.includes(key)) return;
        const fullKey = `${parent || ''}${parent ? '.' : ''}${key}`;

        const tooltip = tooltips[key] ? <Tooltip id={key} place={"top"}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {tooltips[key]}
            </div>
        </Tooltip> : null;
        
        if (editableNumberFields.includes(key)) {
            // console.log(fullKey)
            return <li key={fullKey} data-tooltip-id={key}>
                {tooltip}
                <b>{key}</b>:&nbsp;
                <DebouncedInput marker={obj} changeFunc={e => updateCreature(e, mapMarkerData, setMapData, obj, fullKey, ddId, index)} value={value} type="number" ddId={ddId} />
            </li>;
        }

        if (editableStrings.includes(key)) {
            return <li key={fullKey} data-tooltip-id={key}>
                {tooltip}
                <b>{key}</b>:&nbsp;
                <DebouncedInput marker={obj} changeFunc={e => updateCreature(e, mapMarkerData, setMapData, obj, fullKey, ddId, index)} value={arrayStrings.includes(key) ? JSON.stringify(value) : value} ddId={ddId} />
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
                    <select value={value} className="w-full bg-sky-1000" onChange={e => updateCreature(e.target.value, mapMarkerData, setMapData, obj, key, ddId, index)}>
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
            return <li key={key} data-tooltip-id={key}>
                {tooltip}
                <b>AGL File</b>:
                <select value={value} className="bg-sky-1000" onChange={e => updateCreature(e.target.value, mapMarkerData, setMapData, obj, key, ddId, index)}>
                    {getAvailableTimes(mapId).map(time => <option key={time} value={time}>{time}</option>)}
                </select>
            </li>;
        }

        if (selectFields[key]) {
            // value = value.replace("EActorPlacementCondition::", "");

            // Needs a separate block because it has the same `Condition` as the one below
            // and I don't have a good way to map between the two so ugly solution it is
            if (parent === 'wakeCond' || parent === 'sleepCond') {
                return <li key={fullKey} data-tooltip-id={key}>
                    {tooltip}
                    <b>{key}</b>:
                    <select value={value} className="bg-sky-1000" onChange={e => updateCreature(e.target.value, mapMarkerData, setMapData, obj, fullKey, ddId, index)}>
                        {Object.values(ActorPlacementAppearanceCondition).map(value => <option key={value} value={value}>{value.replace("EActorPlacementAppearanceCondition::", "")}</option>)}
                    </select>
                </li>;
            }
            else return <li key={fullKey} data-tooltip-id={key}>
                {tooltip}
                <b>{key}</b>:
                <select value={value} className="bg-sky-1000" onChange={e => updateCreature(e.target.value, mapMarkerData, setMapData, obj, fullKey, ddId, index)}>
                    {selectFields[key].map(value => <option key={value} value={value}>{value.replace(/.+::/, "")}</option>)}
                </select>
            </li>;
        }

        if (editableBools.includes(key)) {
            return <li key={fullKey} data-tooltip-id={key}>
                {tooltip}
                <b>{key}</b>
                <input
                    type="checkbox"
                    checked={value}
                    className="w-4 h-4 ml-2 self-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => updateCreature(e.target.checked, mapMarkerData, setMapData, obj, fullKey, ddId, index)}
                />
            </li>;
        }


        if (key === 'disablePikminFlags') {
            return <li key={fullKey}>
                <b>{key}</b>
                <ul className='columns-3 gap-x-0'>
                    {Object.entries(value).slice(0, 8).map(([type, disabled]) =>
                        <li className='flex'>
                            <input
                                type="checkbox"
                                checked={disabled}
                                className="w-4 h-4 ml-2 self-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={(e) => updateCreature(e.target.checked, mapMarkerData, setMapData, obj, `${fullKey}.${type}`, ddId, index)}
                            />
                            <MarkerIcon type="pikmin" override="-disable" id={PikminTypes[type].toLowerCase()} />
                        </li>
                    )}
                    <li className='flex'>
                        <input
                            type="checkbox"
                            checked={value[9]}
                            className="w-4 h-4 ml-2 self-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => updateCreature(e.target.checked, mapMarkerData, setMapData, obj, `${fullKey}.9`, ddId, index)}
                        />
                        <MarkerIcon type="pikmin" override="-disable" id={PikminTypes[9].toLowerCase()} />
                    </li>
                </ul>
            </li>;
        }

        if (["birthCond", "eraseCond", "optionalPointOffsets", "splinePoints", "sleepCond", "wakeCond"].includes(key)) {
            const objectToAdd = {
                optionalPointOffsets: defaultVector,
                birthCond: defaultPlacementCond,
                eraseCond: defaultPlacementCond,
                sleepCond: defaultAppearanceCond,
                wakeCond: defaultAppearanceCond,
                splinePoints: defaultSplinePoint
            }[key];

            return <li key={key}>
                {tooltip}
                <b className="font-bold inline-flex">
                    {key}:
                    <svg
                        className="ml-1 w-6 h-6 hover:text-green-400 self-center"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        onClick={(e) => updateCreature([...value, { ...deepCopy(objectToAdd) }], mapMarkerData, setMapData, obj, fullKey, ddId, index)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </b>
                {value.map((val, index) => {
                    return <div key={fullKey + index} className="flex gap-2 overflow-hidden py-2 border border-slate-600 relative Card__container">
                        <div className="flex-auto flex flex-col gap-2 h-100 items-start Card__content">
                            <div className="flex flex-nowrap flex-col relative ml-3 Card__footer">
                                <svg
                                    className="absolute top-[-0.5em] right-0 left-[-0.6em] right-2 w-6 h-6 mr-1 hover:text-red-600 cursor-pointer"
                                    onClick={(e) => deleteArrayItem(mapMarkerData, setMapData, obj, key, ddId, index)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <ul className="ps-4 list-disc list-inside">
                                    {<CreatureInfo obj={val} parent={parent ? `${parent}.${key}` : key} ddId={ddId} index={index} />}
                                </ul>
                            </div>
                        </div>
                    </div>;
                })}
            </li>;
        }

        else if (typeof value === 'object') {
            return <li key={key}>
                <b>{key}</b>
                <ul className="ps-4 list-disc list-inside">{<CreatureInfo obj={value} parent={parent ? `${parent}.${key}` : key} ddId={ddId} index={index} />}</ul>
            </li>;
        }

        return <li key={key}><b>{key}</b>: {value + ""}</li>;
    });
};