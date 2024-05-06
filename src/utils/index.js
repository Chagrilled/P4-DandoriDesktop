import { InfoType, internalAssetNames, Times, defaultAIProperties, defaultTriggerAI, defaultSprinklerAI, defaultValveAI } from "../api/types";

export const getPathType = assetName => assetName.match(/Placeables\/(.+)\/G/)[1];
export const getNameFromAsset = assetName => assetName.match(/\.G(.+)_C/)[1];

// Huge numbers like DropOwnerDebugUniqueId that are in JSON as numbers
// exceed MAX_SAFE_INTEGER, so as soon as JS parses them as numbers they're truncated.
// This can be identified in a 21~-length number that ends in 2000 usually.
// Wrap them as strings while we have the data as a string, then re-regex them back to 
// numbers after stringifying
// You'd think you could just replace /[0-9]{16,}/ but there are negatives, decimals, and 
// also BlobOfData that is just a super long STRING of numbers. So I stuck with this.
export const protectNumbers = string => {
    // ["OuterIndex", "ClassIndex", "SuperIndex", "GlobalImportIndex", "PublicExportHash", "DropOwnerDebugUniqueId", "DebugUniqueId"].forEach(key => {
    //     const regex = new RegExp(`${key}": ([0-9]+)(,)?`);
    //     string = string.replace(regex, `${key}": "$1"$2`);
    // });
    string = string.replace(/ (-?[0-9]{16,})/g, ' "$1"');
    return string;
};

export const unprotectNumbers = string => {
    // string = string.replace(/\s\"(-?[0-9]{16,22})\"/g, ' $1');
    string = string.replace(/(?<!"UnknownImport":)\s\"(-?[0-9]{16,22})\"/g, ' $1');
    return string;
};

export const setFloats = (obj) => {
    const newObj = {};
    Object.entries(obj).forEach(([key, val]) => newObj[key] = parseFloat(val));
    return newObj;
};

export const findMarkerById = (ddId, mapMarkerData) => {
    let marker;
    let type;
    Object.entries(mapMarkerData).forEach(([key, val]) => {
        const target = val.find(marker => marker.ddId === ddId);
        if (target) {
            marker = target;
            type = key;
        }
    });
    return {
        marker,
        type
    };
};

export const getAngleRotation = (q) => 2 * Math.acos(q.W) * (180 / Math.PI);

export const getInfoType = subPath => {
    let infoType = InfoType.Object;
    if (subPath.includes('Objects/Otakara')) infoType = InfoType.Treasure;
    if (subPath.includes('Gimmicks/')) infoType = InfoType.Gimmick;
    if (subPath.includes('WorkObjects')) infoType = InfoType.WorkObject;
    if (subPath === 'Pikmin') infoType = InfoType.Pikmin;
    if (subPath.includes('/Camp')) infoType = InfoType.Base;
    if (subPath.includes('Onyon')) infoType = InfoType.Onion;
    if (["/Hiba", "/StickyFloor", "/Mush", "/FireFloor"].some(s => subPath.includes(s))) infoType = InfoType.Hazard;
    if (subPath.includes('/Portal')) infoType = InfoType.Portal;
    if (subPath.includes('/Madori')) infoType = InfoType.Portal;
    if (subPath.includes('/Charcoal')) infoType = InfoType.Hazard;
    if (subPath === 'Teki') infoType = InfoType.Creature;
    if (subPath === 'Items') infoType = InfoType.Item;
    if (subPath === 'Gimmicks/WarpCarry') infoType = InfoType.WorkObject;
    return infoType;
};

export const getSubpathFromAsset = asset => asset.match(/Placeables\/(.+)\/G/)[1];

export const capitalise = string => string.charAt(0).toUpperCase() + string.slice(1);

export const getAssetPathFromId = id => internalAssetNames.find(asset => asset.includes(`G${id}_C`));

export const getAvailableTimes = mapId => {
    if (['HeroStory', 'Cave', 'Area011'].some(area => mapId.includes(area))) return [Times.PERM];
    if (mapId.includes('Night')) return [Times.PERM, Times.NIGHT];
    return [Times.DAY, Times.PERM];
};

export const findObjectKey = (object, target) => Object.keys(object).find(key => key === target);

export const findObjectKeyByValue = (object, target) => Object.keys(object).find(key => object[key] === target);

export const doesEntityHaveDrops = entity => {
    if (entity.infoType === InfoType.Creature) return true;

    if (["Mush", "PoisonMush"].some(e => e === entity.creatureId)) return true; // Mush is a substring of several other entities that aren't ready yet
    return [
        "NoraSpawner",
        "CrackP",
        "GroupDropManager",
        "CrushJelly",
        "Gate",
        "Tateana",
        "Komush",
        "MushS",
        "MushL",
        "StickyMush",
        "StickyFloor"
    ].some(asset => entity.creatureId.includes(asset));
};

export const doesEntityHaveRareDrops = entity => {
    return ["Gate"].some(asset => entity.creatureId.includes(asset));
};

export const shouldIconRotate = creatureId => {
    if (creatureId.includes('Gate')) return true;
    if (creatureId.includes('TriggerDoor')) return true;
    if (creatureId.includes('Fence')) return true;
    if (creatureId.includes('HandleBoard')) return true;
    if (creatureId.includes('YBox')) return true;
    if (creatureId.includes('XBox')) return true;
    if (creatureId.includes('Flexible')) return true;
    if (creatureId.includes('Switch')) return true;
    if (creatureId.includes('Slope')) return true;
    if (['PullNekko', 'DownWall', 'Conveyor265uu'].some(asset => asset === creatureId)) return true;
};

export const findSequenceStartIndex = (array, offset, sequence) => {
    for (let i = offset; i <= array.length - sequence.length; i++) {
        if (array.slice(i, i + sequence.length).every((value, index) => value === sequence[index])) {
            return i;
        }
    }
    return -1;
};

export const deepCopy = obj => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof Array) {
        return obj.reduce((arr, item, i) => {
            arr[i] = deepCopy(item);
            return arr;
        }, []);
    }

    if (obj instanceof Object) {
        return Object.keys(obj).reduce((newObj, key) => {
            newObj[key] = deepCopy(obj[key]);
            return newObj;
        }, {});
    }
};

export const mutateAIProperties = (creature, value) => {
    const aiEnts = ['Camp'];

    [
        {
            ents: ['TriggerDoor', 'Switch', 'Conveyor265uu'],
            AIProperties: defaultTriggerAI
        },
        {
            ents: ['NoraSpawner'],
            AIProperties: defaultAIProperties
        },
        {
            ents: ['Tunnel', 'WarpCarry', 'HappyDoor'],
            AIProperties: { warpID: 'TunnelID_1' }
        },
        {
            ents: ['Sprinkler'],
            AIProperties: defaultSprinklerAI,
            ActorParameter: {
                demoBindName: 'GSprinkler01'
            }
        },
        {
            ents: ['Valve'],
            AIProperties: defaultValveAI,
            ActorParameter: {
                demoBindName: 'GValveOnce00'
            }
        },
        {
            ents: ['StickyFloor'],
            AIProperties: { bAutoSpawnMush: true }
        },
        {
            ents: ['NavMeshTrigger'],
            NavMeshTrigger: {
                overlapBoxExtent: {
                    X: 137.5,
                    Y: 137.5,
                    Z: 137.5,
                },
                navCollBoxExtent: {
                    X: 100.0,
                    Y: 100.0,
                    Z: 100.0,
                },
                CIDList: [],
                navMeshTriggerID: 'NavMeshTrigger00'
            }
        }
    ].forEach(o => {
        aiEnts.push(...o.ents);
        if (o.ents.some(e => value.includes(e))) { // There was an && !creature.AIProperties here, I forget why
            creature.AIProperties = { ...deepCopy(o.AIProperties) };

            if (o.ActorParameter) creature.ActorParameter = { ...deepCopy(o.ActorParameter) };
            else delete creature.ActorParameter;

            if (o.NavMeshTrigger) creature.NavMeshTrigger = { ...deepCopy(o.NavMeshTrigger) };
            else delete creature.NavMeshTrigger;
        }
    });

    if (!aiEnts.some(e => value.includes(e)) && creature.AIProperties)
        delete creature.AIProperties;
};