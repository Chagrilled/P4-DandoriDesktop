import { default as entityData } from '../api/entityData.json';
import { InfoType, PikminTypes, PikminPlayType, defaultAIProperties } from '../api/types';
import { floatToByteArr, intToByteArr, bytesToInt } from './bytes';
import { setFloats, getNameFromAsset, getAssetPathFromId, findObjectKeyByValue } from './utils';
import deepEqual from 'deep-equal';

export const NONE_BYTES = [5, 0, 0, 0, 78, 111, 110, 101, 0];

const CustomParameterOverrides = {
    SurvivorA: "SVSleep000",
    SurvivorLeaf: "LFSleep003" // There are like 13 different LFSleeps, so I just picked the one that is used for a teki drop
};

// This seems constant for DropUniqueDebugID, OuterIndex and SuperIndex and PublicExportHash
// Might be computed for the game's contents when unmodded. Who knows what happens if it no longer matches
export const COMPUTED_ID = "18446744073709551615";
export const ASP_FIELDS = [
    "Hash",
    "CheckComp",
    "Affordance",
    "CakAudioTable",
    "CakEmitterConfig",
    "Strategy",
    "Life",
    "AI",
    "ActorParameter",
    "SubAI",
    "PortalTrigger",
    "DemoTrigger",
    "Pikmin",
    "CharacterEdit",
    "PopPlace",
    "CakSimpleState",
    "CakAudioTable",
    "WaterTrigger",
    "NavMeshTrigger",
    "HiddenBoxTrigger",
    "NarrowSpaceBoxTrigger",
    "WarpTrigger",
    "ActionMarker"
];

export const getReadAIFunc = (creatureId, infoType) => {
    // console.log("Reading", creatureId, infoType);
    if (creatureId === 'GroupDropManager') return parseGDMDrops;
    if (creatureId === 'ActorSpawner') return parseActorSpawnerDrops;
    if (creatureId === 'BurrowDemejako') return () => ({ parsed: [] });
    if (creatureId.includes('CrackPot')) return parsePotDrops;
    if (creatureId.includes('NoraSpawner')) return parseNoraSpawnerAI;
    if (infoType === InfoType.Creature) return parseTekiDrops;
    return () => ({ parsed: [] });
};

const defaultAI = (_, ai) => ai;

export const getConstructAIFunc = (creatureId, infoType) => {
    if (creatureId === 'GroupDropManager') return constructGDMAI;
    if (creatureId === 'ActorSpawner') return constructActorSpawnerAI;
    if (creatureId === 'BurrowDemejako') return defaultAI;
    if (creatureId.includes('CrackPot')) return constructPotAI;
    if (creatureId.includes('NoraSpawner')) return constructNoraSpawnerAI;
    if (infoType === InfoType.Creature) return constructCreatureAI;
    return defaultAI;
};

const constructNoraSpawnerAI = (drops, aiStatic, { AIProperties }) => {
    const bytes = [];
    console.log("Constructing NoraSpawner from:", drops, AIProperties);
    bytes.push(parseInt(AIProperties.spawnNum), 0, 0, 0);
    bytes.push(...floatBytes(parseFloat(AIProperties.spawnRadius)));
    bytes.push(...floatBytes(parseFloat(AIProperties.noSpawnRadius)));
    bytes.push(parseInt(findObjectKeyByValue(PikminTypes, AIProperties.pikminType)));
    bytes.push(1, 0, 0, 0);
    bytes.push(2);
    bytes.push(...intToByteArr(AIProperties.mabikiNumFromFollow).reverse());
    bytes.push(...aiStatic.slice(22, 26));
    bytes.push(AIProperties.bMabikiPongashi ? 1 : 0, 0, 0, 0);
    bytes.push(...intToByteArr(AIProperties.pongashiChangeColorFollowNum).reverse());
    bytes.push(parseInt(findObjectKeyByValue(PikminTypes, AIProperties.pongashiChangeColorFromFollow)));
    bytes.push(0, 0, 0, 0); // bReservedBirth
    bytes.push(0, 0, 0, 0);
    bytes.push(1, 0, 0, 0);
    bytes.push(16); // no idea what this is, it's related to pongashi color
    let lengthBytes = intToByteArr(AIProperties.noraIdlingPreset.length + 1).reverse();
    bytes.push(
        ...lengthBytes,
        ...AIProperties.noraIdlingPreset.split('').map(char => char.charCodeAt(0)),
        0
    );
    bytes.push(0, 0, 0, 0); // this changes often, no clue what bool it is yet
    bytes.push(parseInt(findObjectKeyByValue(PikminPlayType, AIProperties.groupIdlingType)));
    bytes.push(0, 0, 0, 0);
    bytes.push(...floatBytes(parseFloat(AIProperties.mabikiPongashiOffset.X)));
    bytes.push(...floatBytes(parseFloat(AIProperties.mabikiPongashiOffset.Y)));
    bytes.push(...floatBytes(parseFloat(AIProperties.mabikiPongashiOffset.Z)));
    bytes.push(0, 0, 128, 191);
    bytes.push(drops.length, 0, 0, 0);
    drops.forEach(drop => {
        let lengthBytes = intToByteArr(drop.assetName.length + 1).reverse();

        bytes.push(
            ...lengthBytes,
            ...drop.assetName.split('').map(char => char.charCodeAt(0)),
            0
        );
        const actorName = getNameFromAsset(drop.assetName);

        if (actorName.includes("Survivor")) { // Push custom sleep params if survivor
            lengthBytes = intToByteArr(CustomParameterOverrides[actorName].length + 1).reverse();

            bytes.push(
                ...lengthBytes,
                ...CustomParameterOverrides[actorName].split('').map(char => char.charCodeAt(0)),
                0
            );
        }
        else bytes.push(...NONE_BYTES);

        bytes.push(...floatBytes(parseFloat(drop.customFloatParam)));
        bytes.push(...intToByteArr(parseInt(drop.gameRulePermissionFlag)).reverse().slice(0, 2));
        bytes.push(drop.bSetTerritory ? 1 : 0, 0, 0, 0);
        if (drop.bSetTerritory) {
            bytes.push(...floatBytes(parseFloat(drop.x || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.y || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.z || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.halfHeight || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.radius || 0.0)));
        }
    });

    bytes.push(AIProperties.bEnableOptionalPoint ? 1 : 0, 0, 0);
    if (AIProperties.optionalPointOffsets) {
        bytes.push(AIProperties.optionalPointOffsets.length, 0, 0, 0);
        AIProperties.optionalPointOffsets.forEach(offset => {
            bytes.push(...floatBytes(offset.x));
            bytes.push(...floatBytes(offset.y));
            bytes.push(...floatBytes(offset.z));
        });
    }
    else bytes.push(0, 0, 0, 0);
    bytes.push(0, 0, 0, 0);
    return bytes;
};

const parseNoraSpawnerAI = ai => {
    let index = 0;
    const AIProperties = {};
    const parsed = [];
    AIProperties.spawnNum = ai[index];
    index += 4;
    AIProperties.spawnRadius = parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    AIProperties.noSpawnRadius = parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    AIProperties.pikminType = PikminTypes[ai[index]];
    index += 1;
    index += 4; // No idea what this bool is
    index += 1; // dunno what this int is either
    AIProperties.mabikiNumFromFollow = bytesToInt(ai.slice(index, index + 4).join(','));
    index += 4;
    AIProperties.unknownInt = bytesToInt(ai.slice(index, index + 4).join(','));
    index += 4;
    AIProperties.bMabikiPongashi = ai[index];
    index += 4;
    AIProperties.pongashiChangeColorFollowNum = bytesToInt(ai.slice(index, index + 4).join(','));
    index += 4;
    AIProperties.pongashiChangeColorFromFollow = PikminTypes[ai[index]];
    index += 1;
    index += 13; // unknown bytes here
    const assetLength = ai[index];
    index += 4;
    const asciiString = ai.slice(index, index + assetLength - 1); // We don't want the null terminator in the string
    AIProperties.noraIdlingPreset = String.fromCharCode.apply(null, asciiString);
    index += assetLength;
    // AIProperties.bDisableForcePongashi = ai[index];
    index += 4;
    AIProperties.groupIdlingType = PikminPlayType[ai[index]];
    index += 1;
    index += 4; // idk what's here
    AIProperties.mabikiPongashiOffset = {
        X: parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index += 4)).buffer)[0].toFixed(3)),
        Y: parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index += 4)).buffer)[0].toFixed(3)),
        Z: parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index += 4)).buffer)[0].toFixed(3))
    };
    index += 4; // skip unknown float - always 0, 0, 128, 191 (-1) in float
    const randomActorListLength = ai[index];

    index += 4;
    for (let i = 0; i < randomActorListLength; i++) { // should always be 1 according to game files
        const slot = {};
        slot.id = i + 1; // Avoid 0 IDs, just in case. This never gets written back anyway.
        const assetLength = ai[index];
        index += 4;
        const asciiString = ai.slice(index, index + assetLength - 1); // We don't want the null terminator in the string
        slot.assetName = String.fromCharCode.apply(null, asciiString);
        index += assetLength;
        index += ai[index] + 4; // CustomParameter can be None, SVSleep000 for castaways, or UseSpawnerTerritory for dweevils

        slot.customFloatParam = parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index + 4)).buffer)[0].toFixed(3));
        index += 4;
        slot.gameRulePermissionFlag = bytesToInt(ai.slice(index, index + 2).join(','));
        index += 2;
        slot.bSetTerritory = ai[index];
        index += 4;
        if (slot.bSetTerritory) {
            slot.x = parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.y = parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.z = parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.halfHeight = parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.radius = parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
        }
        parsed.push(slot);
    }

    AIProperties.bEnableOptionalPoint = ai[index];
    index += 4;
    const arrayLength = ai[index];
    index += 4;
    if (arrayLength) AIProperties.optionalPointOffsets = [];
    for (let i = 0; i < arrayLength; i++) {
        AIProperties.optionalPointOffsets.push({
            x: parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index += 4)).buffer)[0].toFixed(3)),
            y: parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index += 4)).buffer)[0].toFixed(3)),
            z: parseFloat(new Float32Array(new Uint8Array(ai.slice(index, index += 4)).buffer)[0].toFixed(3))
        });
    }

    return {
        AIProperties,
        parsed
    };
};

export const parseGDMDrops = drops => {
    const parsed = [];
    const ignoreList = [];
    let index = 0;
    const groupingRadius = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    const ignoreCIDLength = drops[index]; // ignoreCIDList: [strings] is indicated by a length byte
    index += 4;
    if (ignoreCIDLength)
        for (let i = 0; i < ignoreCIDLength; i++) {
            const assetLength = drops[index];
            index += 4;
            let asciiString = drops.slice(index, index + assetLength - 1); // We don't want the null terminator in the string
            ignoreList.push(String.fromCharCode.apply(null, asciiString));
            index += assetLength;
        }
    const invSize = drops[index];

    index += 4; // There's a -1,-1 (255*4, 255*4) after, idk what they do
    for (let i = 0; i < invSize; i++) {
        const slot = {};
        index += 8; // Skip the two -1 bytes at the start of each item
        slot.minDrops = drops[index];
        index += 4;
        slot.maxDrops = drops[index];
        index += 4;
        slot.dropChance = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
        index += 4;
        slot.bRegistGenerator = drops[index];
        index += 4;
        if (drops[index] == 1) {
            const dcLength = drops[index]; // I think it's the number of objects in the DC array - it's always 1 or 0
            index += 4;
            slot.dropCondition = drops[index];
            index += 4;
            const dropCondInt = drops[index]; // This looks like a float tbh, rather than an int, but is always 0 or -1
            index += 1;
            index += drops[index] + 4 + 1; // start of dropCond string, usually None. We also don't care about the DemoFlag
        } else index += 4;

        const assetLength = drops[index];
        index += 4;
        const asciiString = drops.slice(index, index + assetLength - 1); // We don't want the null terminator in the string
        slot.assetName = String.fromCharCode.apply(null, asciiString);
        index += assetLength;
        index += drops[index] + 4; // CustomParameter can be None, SVSleep000 for castaways, or UseSpawnerTerritory for dweevils

        slot.customFloatParam = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
        index += 4;
        slot.gameRulePermissionFlag = bytesToInt(drops.slice(index, index + 2).join(','));
        index += 2;
        slot.bSetTerritory = drops[index];
        index += 4;
        if (slot.bSetTerritory) {
            slot.x = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.y = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.z = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.halfHeight = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.radius = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
        }
        parsed.push(slot);
    }
    while (drops[index] != 255 && index < drops.length) {
        console.log("iterating to find inventory end");
        index += 1; // Just iterate till we find the 255 byte? Shouldn't run, I think
    }
    // console.log(parsed);
    return { parsed, inventoryEnd: index + 4, groupingRadius, ignoreList };
};

export const parsePotDrops = drops => {
    const parsed = [];
    let index = 0;
    const invSize = drops[index];

    index += 4; // There's a -1,-1 (255*4, 255*4) after, idk what they do
    for (let i = 0; i < invSize; i++) {
        const slot = {};
        index += 8; // Skip the two -1 bytes at the start of each item
        slot.minDrops = drops[index];
        index += 4;
        slot.maxDrops = drops[index];
        index += 4;
        slot.dropChance = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
        index += 4;
        slot.bRegistGenerator = drops[index];
        index += 4;
        if (drops[index] == 1) {
            const dcLength = drops[index]; // I think it's the number of objects in the DC array - it's always 1 or 0
            index += 4;
            slot.dropCondition = drops[index];
            index += 4;
            const dropCondInt = drops[index]; // This looks like a float tbh, rather than an int, but is always 0 or -1
            index += 1;
            index += drops[index] + 4 + 1; // start of dropCond string, usually None. We also don't care about the DemoFlag
        } else index += 4;

        const assetLength = drops[index];
        index += 4;
        const asciiString = drops.slice(index, index + assetLength - 1); // We don't want the null terminator in the string
        slot.assetName = String.fromCharCode.apply(null, asciiString);
        index += assetLength;
        index += drops[index] + 4; // CustomParameter can be None, SVSleep000 for castaways, or UseSpawnerTerritory for dweevils

        slot.customFloatParam = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
        index += 4;
        slot.gameRulePermissionFlag = bytesToInt(drops.slice(index, index + 2).join(','));
        index += 2;
        slot.bSetTerritory = drops[index];
        index += 4;
        if (slot.bSetTerritory) {
            slot.x = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.y = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.z = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.halfHeight = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.radius = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
        }
        parsed.push(slot);
    }
    while (drops[index] != 255 && index < drops.length) {
        console.log("iterating to find inventory end");
        index += 1; // Just iterate till we find the 255 byte? Shouldn't run, I think
    }
    // console.log(parsed);
    return { parsed, inventoryEnd: index + 4, };
};

export const parseActorSpawnerDrops = drops => {
    // Could this be looped? Yeah probably. Refactor Later :TM:
    // Make an object with the keyname and its byte width? I guess non-fixed bytes are an issue there
    const bytes = {};
    let index = 0;
    bytes.mysteryBool1 = drops[index];
    index += 4;
    bytes.mysteryBool2 = drops[index];
    index += 4;
    bytes.mysteryBool3 = drops[index];
    index += 4;
    bytes.carry = drops[index];
    index += 4;
    bytes.mysteryBool5 = drops[index];
    index += 4;
    bytes.bGenseiControl = drops[index];
    index += 4;
    bytes.overlapCenterX = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    bytes.overlapCenterY = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    bytes.overlapCenterZ = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    bytes.halfHeight = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    bytes.radius = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    bytes.angle = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    bytes.sphereRadius = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    index += drops[index] + 4; // A custom parameter - not exposing for now
    index += 4; // Some bool that's always 1 - haven't found a zero yet
    bytes.spawnLocationX = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    bytes.spawnLocationY = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    bytes.spawnLocationZ = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    index += 16; // No clue what these 4 bytes do - always 0
    bytes.infiniteSpawn = drops[index];
    index += 4;
    bytes.spawnInterval = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
    index += 4;
    bytes.spawnLimit = drops[index];
    index += 4;
    index += 4; // Mystery bool here
    bytes.randomRotation = drops[index];
    index += 4;
    bytes.noDropItem = drops[index];
    index += 4;
    const assetLength = drops[index];
    index += 4;
    let asciiString = drops.slice(index, index + assetLength - 1); // We don't want the null terminator in the string
    bytes.assetName = String.fromCharCode.apply(null, asciiString);
    index += assetLength;

    const cpLength = drops[index];
    index += 4;
    asciiString = drops.slice(index, index + cpLength - 1); // We don't want the null terminator in the string
    bytes.customParameter = String.fromCharCode.apply(null, asciiString);
    index += cpLength;
    // Customer parameters and territory comes after this, but I've no idea what they do
    // So I'm not going to read/expose yet. We'll just splice all zeroes instead.

    // Keep anything after the asset path and just splice it back in
    bytes.spareBytes = drops.slice(index, drops.length);
    return {
        parsed: [{
            ...bytes
            // I think the vectors are offsets from the ActorSpawner's origin? 
            // Not sure why that's useful, so I'm not going to make UI for them unless someone proves otherwise
            // We do want them to reconstruct existing AIs the same though, and not change
            // their vectors opaquely because we don't have the vectors later
        }]
    };
};

export const parseTekiDrops = drops => {
    // find the inventory size byte
    // if 0, return empty list
    const parsed = [];
    const invSize = drops[20]; // This seems consistent across tekis
    if (invSize === 0) {
        return { parsed, inventoryEnd: 28 };
    }

    let index = 24; // start of the first item
    for (let i = 0; i < invSize; i++) {
        const slot = {};
        slot.id = drops[index];
        index += 4;
        slot.flags = drops.slice(index, index + 4);
        index += 4;
        slot.minDrops = drops[index];
        index += 4;
        slot.maxDrops = drops[index];
        index += 4;
        slot.dropChance = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
        index += 4;
        slot.bRegistGenerator = drops[index];
        index += 4;
        let dropCondition;
        if (drops[index] == 1) {
            const one = drops[index]; // I think this just signifies an object is in the dropconditions array
            index += 4;
            slot.dropCondition = drops[index];
            index += 4;
            const dropCondInt = drops[index];
            index += 1;
            index += drops[index] + 4 + 1; // start of dropCond string, usually None. We also don't care about the DemoFlag
        } else index += 4;

        const assetLength = drops[index];
        index += 4;
        const asciiString = drops.slice(index, index + assetLength - 1); // We don't want the null terminator in the string
        slot.assetName = String.fromCharCode.apply(null, asciiString);
        index += assetLength;
        index += drops[index] + 4; // CustomParameter can be None, SVSleep000 for castaways, or UseSpawnerTerritory for dweevils
        slot.customFloatParam = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
        index += 4;
        slot.gameRulePermissionFlag = bytesToInt(drops.slice(index, index + 2).join(','));
        index += 2;
        slot.bSetTerritory = drops[index];
        index += 4;
        if (slot.bSetTerritory) {
            slot.x = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.y = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.z = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.halfHeight = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
            slot.radius = parseFloat(new Float32Array(new Uint8Array(drops.slice(index, index + 4)).buffer)[0].toFixed(3));
            index += 4;
        }
        // const params = drops.slice(index, index + 10);
        // index += 10;
        parsed.push(slot);
    }
    while (drops[index] != 255 && index < drops.length) {
        console.log("iterating to find inventory end");
        index += 1; // Just iterate till we find the 255 byte? Shouldn't run, I think
    }
    return { parsed, inventoryEnd: index + 4 };
};

export const floatBytes = float => floatToByteArr(parseFloat(float)).slice().reverse();

export const constructGDMAI = (drops, aiStatic, { groupingRadius, ignoreList = [], inventoryEnd }) => {
    const bytes = [];
    bytes.push(...floatBytes(groupingRadius));

    if (typeof ignoreList === 'string') ignoreList = JSON.parse(ignoreList);
    const ignoreListLength = ignoreList.length
    bytes.push(ignoreListLength, 0, 0, 0);
    ignoreList.forEach(ignore => {
        let lengthBytes = intToByteArr(ignore.length + 1).reverse();
        bytes.push(
            ...lengthBytes,
            ...ignore.split('').map(char => char.charCodeAt(0)),
            0
        );
    });

    bytes.push(drops.length, 0, 0, 0);

    drops.forEach(drop => {
        bytes.push(255, 255, 255, 255, 255, 255, 255, 255); // This is the start of each GDM item
        bytes.push(drop.minDrops, 0, 0, 0);
        bytes.push(drop.maxDrops, 0, 0, 0);
        bytes.push(...floatBytes(parseFloat(drop.dropChance)));
        bytes.push(drop.bRegistGenerator ? 1 : 0, 0, 0, 0);
        if (drop.dropCondition && drop.dropCondition != 'None') {
            bytes.push(1, 0, 0, 0);
            bytes.push(parseInt(drop.dropCondition));
            bytes.push(0, 0, 0, 0); // We'll 0 dropCondInt for now, idk what -1 is for
            bytes.push(...NONE_BYTES); // Force dropCondName to None for now.
            bytes.push(0); // Also zero demoFlag for now too
        }
        else bytes.push(0, 0, 0, 0);
        let lengthBytes = intToByteArr(drop.assetName.length + 1).reverse();

        bytes.push(
            ...lengthBytes,
            ...drop.assetName.split('').map(char => char.charCodeAt(0)),
            0
        );
        const actorName = getNameFromAsset(drop.assetName);

        if (actorName.includes("Survivor")) { // Push custom sleep params if survivor
            lengthBytes = intToByteArr(CustomParameterOverrides[actorName].length + 1).reverse();

            bytes.push(
                ...lengthBytes,
                ...CustomParameterOverrides[actorName].split('').map(char => char.charCodeAt(0)),
                0
            );
        }
        else bytes.push(...NONE_BYTES);

        bytes.push(...floatBytes(parseFloat(drop.customFloatParam)));
        bytes.push(...intToByteArr(parseInt(drop.gameRulePermissionFlag)).reverse().slice(0, 2));
        bytes.push(drop.bSetTerritory ? 1 : 0, 0, 0, 0);
        if (drop.bSetTerritory) {
            bytes.push(...floatBytes(parseFloat(drop.x || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.y || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.z || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.halfHeight || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.radius || 0.0)));
        }
        // if (typeof drops.params == 'string') drop.params = JSON.parse(drop.params);
        // bytes.push(...drop.params);
    });

    bytes.push(255, 255, 255, 255);
    if (!inventoryEnd) {
        ({ inventoryEnd } = parseGDMDrops(aiStatic));
    }
    return [...bytes, ...aiStatic.slice(inventoryEnd, aiStatic.length)];
};

export const constructPotAI = (drops, aiStatic, { inventoryEnd }) => {
    const bytes = [];
    console.log("Constructing pot from", drops, inventoryEnd);
    console.dir(aiStatic, { maxArrayLength: 400 });
    bytes.push(drops.length, 0, 0, 0);

    drops.forEach(drop => {
        bytes.push(255, 255, 255, 255, 255, 255, 255, 255); // This is the start of each GDM item
        bytes.push(drop.minDrops, 0, 0, 0);
        bytes.push(drop.maxDrops, 0, 0, 0);
        bytes.push(...floatBytes(parseFloat(drop.dropChance)));
        bytes.push(drop.bRegistGenerator ? 1 : 0, 0, 0, 0);
        if (drop.dropCondition && drop.dropCondition != 'None') {
            bytes.push(1, 0, 0, 0);
            bytes.push(parseInt(drop.dropCondition));
            bytes.push(0, 0, 0, 0); // We'll 0 dropCondInt for now, idk what -1 is for
            bytes.push(...NONE_BYTES); // Force dropCondName to None for now.
            bytes.push(0); // Also zero demoFlag for now too
        }
        else bytes.push(0, 0, 0, 0);
        let lengthBytes = intToByteArr(drop.assetName.length + 1).reverse();

        bytes.push(
            ...lengthBytes,
            ...drop.assetName.split('').map(char => char.charCodeAt(0)),
            0
        );
        const actorName = getNameFromAsset(drop.assetName);

        if (actorName.includes("Survivor")) { // Push custom sleep params if survivor
            lengthBytes = intToByteArr(CustomParameterOverrides[actorName].length + 1).reverse();

            bytes.push(
                ...lengthBytes,
                ...CustomParameterOverrides[actorName].split('').map(char => char.charCodeAt(0)),
                0
            );
        }
        else bytes.push(...NONE_BYTES);

        bytes.push(...floatBytes(parseFloat(drop.customFloatParam)));
        bytes.push(...intToByteArr(parseInt(drop.gameRulePermissionFlag)).reverse().slice(0, 2));
        bytes.push(drop.bSetTerritory ? 1 : 0, 0, 0, 0);
        if (drop.bSetTerritory) {
            bytes.push(...floatBytes(parseFloat(drop.x || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.y || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.z || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.halfHeight || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.radius || 0.0)));
        }
    });

    bytes.push(255, 255, 255, 255);
    if (!inventoryEnd) {
        ({ inventoryEnd } = parsePotDrops(aiStatic));
    }
    return [...bytes, ...aiStatic.slice(inventoryEnd, aiStatic.length)];
};

export const constructActorSpawnerAI = ([drop], aiStatic) => {
    const bytes = [];
    // These are some ordering of avatar, pikmin, both, and something else 
    bytes.push(parseInt(drop.mysteryBool1) ? 1 : 0, 0, 0, 0);
    bytes.push(parseInt(drop.mysteryBool2) ? 1 : 0, 0, 0, 0);
    bytes.push(parseInt(drop.mysteryBool3) ? 1 : 0, 0, 0, 0);
    bytes.push(parseInt(drop.carry) ? 1 : 0, 0, 0, 0);
    bytes.push(parseInt(drop.mysteryBool5) ? 1 : 0, 0, 0, 0);
    bytes.push(parseInt(drop.bGenseiControl) ? 1 : 0, 0, 0, 0);
    // X
    bytes.push(...floatBytes(drop.overlapCenterX));
    // Y
    bytes.push(...floatBytes(drop.overlapCenterY));

    // Z
    bytes.push(...floatBytes(drop.overlapCenterZ));
    // Halfheight
    bytes.push(...floatBytes(drop.halfHeight));
    // Radius
    bytes.push(...floatBytes(drop.radius));
    // Angle
    bytes.push(...floatBytes(drop.angle));
    // SphereRadius
    bytes.push(...floatBytes(drop.sphereRadius));
    // CustomParameter
    bytes.push(5, 0, 0, 0, 78, 111, 110, 101, 0);

    // ???
    bytes.push(1, 0, 0, 0);
    // Spawn X
    bytes.push(...floatBytes(drop.spawnLocationX));
    // Spawn Y
    bytes.push(...floatBytes(drop.spawnLocationY));
    // Spawn Z
    bytes.push(...floatBytes(drop.spawnLocationZ));
    // 16 of whatever
    bytes.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    // infiniteSpawn
    bytes.push(parseInt(drop.infiniteSpawn) ? 1 : 0, 0, 0, 0);
    // spawnInterval
    bytes.push(...floatBytes(drop.spawnInterval));
    // spawnLimit
    bytes.push(parseInt(drop.spawnLimit), 0, 0, 0);
    // ???
    bytes.push(1, 0, 0, 0);
    /// bRandomRotation
    bytes.push(parseInt(drop.randomRotation) ? 1 : 0, 0, 0, 0);
    //bNoDropItem
    bytes.push(parseInt(drop.noDropItem) ? 1 : 0, 0, 0, 0);
    // assetPath
    let lengthBytes = intToByteArr(drop.assetName.length + 1).reverse();
    bytes.push(
        ...lengthBytes,
        ...drop.assetName.split('').map(char => char.charCodeAt(0)),
        0
    );

    lengthBytes = intToByteArr(drop.customParameter.length + 1).reverse();
    bytes.push(
        ...lengthBytes,
        ...drop.customParameter.split('').map(char => char.charCodeAt(0)),
        0
    );

    bytes.push(...drop.spareBytes);
    return bytes;
};

export const constructCreatureAI = (drops, aiStatic, { inventoryEnd }) => {
    // The -1 at the end of an inventory could be at [24] for 0 inventories
    const inventoryBytes = [drops.length, 0, 0, 0];
    drops.forEach(drop => {
        const slotBytes = [parseInt(drop.id), 0, 0, 0];
        if (typeof drop.flags == 'string') drop.flags = JSON.parse(drop.flags);
        slotBytes.push(...drop.flags);
        slotBytes.push(drop.minDrops, 0, 0, 0);
        slotBytes.push(drop.maxDrops, 0, 0, 0);
        slotBytes.push(...floatBytes(parseFloat(drop.dropChance)));
        slotBytes.push(drop.bRegistGenerator ? 1 : 0, 0, 0, 0);
        if (drop.dropCondition && drop.dropCondition != 'None') {
            slotBytes.push(1, 0, 0, 0);
            slotBytes.push(parseInt(drop.dropCondition));
            slotBytes.push(0, 0, 0, 0); // We'll 0 dropCondInt for now, idk what -1 is for
            slotBytes.push(...NONE_BYTES); // Force dropCondName to None for now.
            slotBytes.push(0); // Also zero demoFlag for now too
        }
        else slotBytes.push(0, 0, 0, 0);
        let lengthBytes = intToByteArr(drop.assetName.length + 1).reverse();

        slotBytes.push(
            ...lengthBytes,
            ...drop.assetName.split('').map(char => char.charCodeAt(0)),
            0
        );

        const actorName = getNameFromAsset(drop.assetName);
        if (actorName.includes("Survivor")) { // Push custom sleep params if survivor
            lengthBytes = intToByteArr(CustomParameterOverrides[actorName].length + 1).reverse();

            slotBytes.push(
                ...lengthBytes,
                ...CustomParameterOverrides[actorName].split('').map(char => char.charCodeAt(0)),
                0
            );
        }
        else slotBytes.push(...NONE_BYTES);

        // if (typeof drops.params == 'string') drop.params = JSON.parse(drop.params);
        // slotBytes.push(...drop.params);
        slotBytes.push(...floatBytes(parseFloat(drop.customFloatParam)));
        slotBytes.push(...intToByteArr(parseInt(drop.gameRulePermissionFlag)).reverse().slice(0, 2));
        slotBytes.push(drop.bSetTerritory ? 1 : 0, 0, 0, 0);
        if (drop.bSetTerritory) {
            slotBytes.push(...floatBytes(parseFloat(drop.x || 0.0)));
            slotBytes.push(...floatBytes(parseFloat(drop.y || 0.0)));
            slotBytes.push(...floatBytes(parseFloat(drop.z || 0.0)));
            slotBytes.push(...floatBytes(parseFloat(drop.halfHeight || 0.0)));
            slotBytes.push(...floatBytes(parseFloat(drop.radius || 0.0)));
        }
        inventoryBytes.push(...slotBytes);
    });
    inventoryBytes.push(255, 255, 255, 255);
    if (!inventoryEnd) {
        // Because we won't have an aiStatic to "edit into", we take the first in the scraped list
        // Find its end of inventory byte, and splice the rest into our AI to form a complete one.
        // This may cause some enemies to have some odd overrides if the scraped one has something special done to it
        ({ inventoryEnd } = parseTekiDrops(aiStatic));
    }

    // console.log("AI:", [...aiStatic.slice(0, 20), ...inventoryBytes, ...aiStatic.slice(inventoryEnd, aiStatic.length)]);
    // Splice our new inventory into a regular functioning AI
    return [...aiStatic.slice(0, 20), ...inventoryBytes, ...aiStatic.slice(inventoryEnd, aiStatic.length)];
};

export const getSubpath = creatureId => {
    if (creatureId === 'ActorSpawner') return 'Gimmicks/ActorSpawner';
    if (creatureId === 'GroupDropManager') return 'Gimmicks/GroupDropManager';
    if (creatureId.includes('Egg')) return 'Objects/Egg';
    return 'Teki';
};

export const constructTeki = (actor, mapId) => {
    console.log("Constructing a", actor);
    const transforms = {
        Rotation: {
            X: -0.0,
            Y: 0.0,
            Z: -0.0,
            W: 1.0 // I have no idea what this does, but average values seem to trend more towards 1 than 0 or 0.5
        },
        Translation: setFloats(actor.transform.translation),
        Scale3D: setFloats(actor.transform.scale3D),
        Rotation: setFloats(actor.transform.rotation)
    };
    return {
        AssetVersion: 8626647386,
        GeneratorVersion: 8626647386,
        GeneratorID: -1,
        SoftRefActorClass: {
            AssetPathName: getAssetPathFromId(actor.creatureId),
            SubPathString: 0
        },
        ExploreRateType: "EExploreRateTargetType::None",
        ActorVersion: 1,
        OutlineFolderPath: "Teki/Day", // idk if this is used for anything
        InitTransform: transforms,
        Transform: transforms,
        GenerateInfo: {
            EnableSave: true,
            DebugUniqueId: entityData[actor.creatureId].DebugUniqueId[0], // Not unique - just grab one?
            ActorGlobalId: "None",
            GenerateNum: parseInt(actor.generateNum),
            GenerateRadius: parseFloat(actor.generateRadius),
            WakeCond: [],
            bOnceWakeCond: false,
            SleepCond: [],
            bNoChkCondWhenDead: false
        },
        RebirthInfo: {
            ActivityTime: "EActivityTime::Daytime",
            RebirthType: actor.rebirthType,
            BirthDay: parseInt(actor.birthDay) || 0,
            DeadDay: parseInt(actor.deadDay) || 0,
            ExpireDay: 0,
            CurrNum: 1,
            ExpireProgress: 0,
            RebirthInterval: parseInt(actor.rebirthInterval) || 0,
            SaveFlag: entityData[actor.creatureId].SaveFlag[0],
            MyID: -1,
            RefID: -1,
            RebirthInfoFlags: 0,
            BirthCond: [],
            bIgnoreFullFillBirthCondWhenFirstAndNightTime: false,
            EraseCond: []
        },
        CarriedInfo: {
            bEnableInitializeLocation: false,
            InitializeInterval: 0,
            bEnableCorrectLocation: false,
            CarriedDay: 0,
            LastCarriedDay: 0
        },
        DropActorInfo: {
            DropOwnerDebugUniqueId: COMPUTED_ID,
            DropIndex: -1,
            bSalvagedOtakaraIndices: []
        },
        ActorSerializeParameter: {
            ...ASP_FIELDS.reduce((acc, key) => ({
                ...acc,
                [key]: entityData[actor.creatureId][key][0] // Grab the first thing from the dump data.
                // Aside from AI (drops), and CakAudioTable(?), they're the same per actor type 
            }), {}),
            AI: {
                Static: getConstructAIFunc(actor.creatureId, actor.infoType)(actor.drops.parsed, entityData[actor.creatureId].AI[0].Static, {
                    groupingRadius: actor?.groupingRadius,
                    ignoreList: actor?.ignoreList,
                    AIProperties: actor?.AIProperties || defaultAIProperties
                }),
                Dynamic: entityData[actor.creatureId].AI[0].Dynamic
            }
        },
        SubLevelName: mapId,
        TeamId: "ETeamIdEditor::No",
        GenerateFlags: entityData[actor.creatureId].GenerateFlags[0],
        OriginalPhysicsRadiusZ: entityData[actor.creatureId].OriginalPhysicsRadiusZ[0],
        LastNavPos: transforms.Translation,
        CarcassFlags: 0,
        RefOriginalGenID: -1
    };
};

export const regenerateAGLEntity = (actor, aglData) => {
    console.log("AGL ID:", aglData.ddId);
    // There are non-tekis in the teki AGL - leave them be
    // Tekis/G is because splines are Teki/Other/Spline/GSpline....
    // const editables = ['Placeables/Teki/G', 'Gimmicks/ActorSpawner', 'Objects/Egg'];
    // if (!editables.some(asset => aglData.SoftRefActorClass.AssetPathName.includes(asset))) {
    //     const newEntity = {
    //         ...aglData
    //     };
    //     delete newEntity.ddId;
    //     return newEntity;
    // }
    const transforms = {
        Rotation: setFloats(aglData.InitTransform.Rotation),
        Translation: setFloats(actor.transform.translation),
        Scale3D: setFloats(actor.transform.scale3D)
    };
    const originalAI = aglData.ActorSerializeParameter.AI.Static;
    const { parsed, inventoryEnd, ignoreList, groupingRadius, AIProperties } = getReadAIFunc(actor.creatureId, actor.infoType)(originalAI);
    const isAIUnchanged = deepEqual({
        parsed,
        AIProperties
    }, {
        parsed: actor.drops.parsed,
        AIProperties: actor.AIProperties
    });
    let newAI = {};
    if (!isAIUnchanged) {
        console.log(actor.creatureId, "constructing new AI");
        newAI = {
            AI: {
                Static: getConstructAIFunc(actor.creatureId, actor.infoType)(actor.drops.parsed, originalAI, {
                    inventoryEnd,
                    groupingRadius: actor.groupingRadius,
                    ignoreList: actor.ignoreList,
                    AIProperties: actor.AIProperties
                }),
                Dynamic: aglData.ActorSerializeParameter.AI.Dynamic
            }
        };
    }
    else console.log(actor.creatureId, "AI is unchanged");

    const newEntity = {
        ...aglData,
        SoftRefActorClass: {
            ...aglData.SoftRefActorClass,
            AssetPathName: getAssetPathFromId(actor.creatureId) || `/Game/Carrot4/Placeables/${getSubpath(actor.creatureId)}/G${actor.creatureId}.G${actor.creatureId}_C`,
        },
        InitTransform: transforms,
        Transform: transforms,
        GenerateInfo: {
            ...aglData.GenerateInfo,
            GenerateNum: parseInt(actor.generateNum),
            GenerateRadius: parseFloat(actor.generateRadius),

        },
        RebirthInfo: {
            ...aglData.RebirthInfo,
            RebirthType: actor.rebirthType,
            RebirthInterval: parseInt(actor.rebirthInterval) || 0,
            BirthDay: parseInt(actor.birthDay) || 0,
            DeadDay: parseInt(actor.deadDay) || 0
        },
        ActorSerializeParameter: {
            ...aglData.ActorSerializeParameter,
            ...newAI
        }
    };
    // console.log("regenerated:", newEntity.DropActorInfo.DropOwnerDebugUniqueId);
    delete newEntity.ddId;
    // console.log(newEntity);
    return newEntity;
};