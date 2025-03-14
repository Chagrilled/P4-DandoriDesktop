import { InfoType, Times, weirdAIEntities, ActorPlacementCondition } from '../api/types';
import { internalAssetNames } from "../api/assetList";
import { creatureDefaults, entityDefaults } from "./defaults";

export const getNameFromAsset = assetName => {
    if (assetName === 'None') return assetName;
    return assetName.match(/\.G(.+)_C/)[1];
};
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

export const getAngleRotation = (q) => {
    const norm = Math.sqrt(q.W ** 2 + q.X ** 2 + q.Y ** 2 + q.Z ** 2);

    const angle = 2 * Math.acos(q.W / norm);
    return q.Z / norm < 0 ? -angle : angle;
};

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
    if (subPath === 'Items/RockBall') infoType = InfoType.Item;
    if (subPath === 'Gimmicks/WarpCarry') infoType = InfoType.WorkObject;
    if (subPath === 'Gimmicks/ActorSpawner') infoType = InfoType.Creature;
    if (subPath === 'Objects/Egg') infoType = InfoType.Creature;
    if (subPath.includes('Spline')) infoType = InfoType.Creature;
    return infoType;
};

export const getSubpathFromAsset = asset => {
    if (asset === 'None') return asset;
    return asset.match(/Placeables\/(.+)\/G/)[1];
};

export const capitalise = string => string.charAt(0).toUpperCase() + string.slice(1);

export const getAssetPathFromId = id => id === 'None' ? "None" : internalAssetNames.find(asset => asset.includes(`G${id}_C`));

export const getInfoTypeFromId = id => getInfoType(getSubpathFromAsset(getAssetPathFromId(id)));

export const getAvailableTimes = mapId => {
    if (['HeroStory', 'Cave', 'Area011', 'Area500'].some(area => mapId.includes(area))) return [Times.PERM];
    if (mapId.includes('Night')) return [Times.NIGHT, Times.PERM];
    return [Times.DAY, Times.PERM];
};

export const findObjectKey = (object, target) => Object.keys(object).find(key => key === target);

export const findObjectKeyByValue = (object, target) => Object.keys(object).find(key => object[key] === target);

export const doesEntityHaveDrops = entity => {
    if (weirdAIEntities.some(e => e === entity.creatureId)) return false;
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

export const getObjectAIOffset = generatorVersion => generatorVersion === 8626647386 ? 0 : 4;

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
    if (creatureId.includes('PullNekko')) return true;
    if (['DownWall', 'Conveyor265uu', 'SpaceBus', 'ZiplineSplineMesh', 'ZiplineAnother'].some(asset => asset === creatureId)) return true;
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

// This function has become huge and warrants its own file now
// Takes in the entity object and fetches defaults for a creature/infoType passed in
export const mutateAIProperties = (creature, newCreatureId, newInfoType = '', oldCreatureId) => {
    const aiEnts = ['Camp'];

    entityDefaults.forEach(o => {
        aiEnts.push(...o.ents);

        if (o.ents.some(e => newCreatureId.includes(e) && !oldCreatureId.includes(e)) || o.infoTypes?.some(e => newInfoType.includes(e))) { // There was an && !creature.AIProperties here, I forget why
            ["AIProperties", "ActorParameter", "NavMeshTrigger", "WaterTrigger"].forEach(prop => {
                if (o[prop]) creature[prop] = { ...deepCopy(o[prop]) };
                else delete creature[prop];
            });

            ["parsed", "parsedSubAI"].forEach(prop => {
                if (o[prop]) creature.drops[prop] = deepCopy(o[prop]);
            });
        }
    });

    // Layer creature-specific AIProps over the top
    if (creature.infoType === InfoType.Creature)
        creatureDefaults.forEach(o => {
            if (o.ents.some(e => newCreatureId === e)) {
                creature.AIProperties = {
                    ...creature.AIProperties,
                    ...deepCopy(o.AIProperties)
                };
            }
        });

    if (!aiEnts.some(e => newCreatureId.includes(e)) && creature.AIProperties && ![InfoType.Creature, InfoType.Treasure].includes(creature.infoType)) {
        delete creature.AIProperties;
        delete creature.NavMeshTrigger;
        delete creature.ActorParameter;
        delete creature.WaterTrigger;
    }
};

// An entity should show on night maps if: 
// - it has no birth conditions (caught by [].every()) 
// - none of its birth condiions are NightAdventurePattern
// - For NightAdventurePattern, it's CondInt is equal to the mission ID (night map ID - 1)
export const isEntityOnNightMap = (entity, mapId) => {
    const nightStage = mapId.slice(-1);

    const nonNightCondition = entity.birthCond.every(cond => cond.Condition !== ActorPlacementCondition.NightAdventurePattern);
    return nonNightCondition || entity.birthCond.some(cond =>
        cond.Condition === ActorPlacementCondition.NightAdventurePattern && parseInt(cond.CondInt) + 1 == nightStage
    );
};