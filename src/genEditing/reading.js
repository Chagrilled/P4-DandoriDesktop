import { InfoType, PikminTypes, PikminPlayType } from '../api/types';
import { bytesToInt } from './bytes';

const readInventory = (drops, index, invSize) => {
    const parsed = [];
    for (let i = 0; i < invSize; i++) {
        const slot = {};
        index += 8; // Skip the two -1 u32s at the start of each item
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
    return { parsed, index };
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

const parseGDMDrops = drops => {
    let parsed = [];
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
    ({ parsed, index } = readInventory(drops, index, invSize));

    while (drops[index] != 255 && index < drops.length) {
        index += 1; // Just iterate till we find the 255 byte? Shouldn't run, I think
    }
    // console.log(parsed);
    return { parsed, inventoryEnd: index + 4, groupingRadius, ignoreList };
};

const parsePotDrops = drops => {
    let parsed = [];
    let index = 0;
    const invSize = drops[index];

    index += 4; // There's a -1,-1 (255*4, 255*4) after, idk what they do
    ({ parsed, index } = readInventory(drops, index, invSize));

    while (drops[index] != 255 && index < drops.length) {
        index += 1; // Just iterate till we find the 255 byte? Shouldn't run, I think
    }

    return { parsed, inventoryEnd: index + 4, };
};

const parseActorSpawnerDrops = drops => {
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

const parseTekiDrops = drops => {
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
        index += 1; // Just iterate till we find the 255 byte? Shouldn't run, I think
    }
    return { parsed, inventoryEnd: index + 4 };
};

export const getReadAIFunc = (creatureId, infoType) => {
    // console.log("Reading", creatureId, infoType);
    if (creatureId === 'GroupDropManager') return parseGDMDrops;
    if (creatureId === 'ActorSpawner') return parseActorSpawnerDrops;
    if (creatureId === 'BurrowDemejako') return () => ({ parsed: [] });
    if (creatureId.includes('CrackP')) return parsePotDrops;
    if (creatureId.includes('NoraSpawner')) return parseNoraSpawnerAI;
    if (infoType === InfoType.Creature) return parseTekiDrops;
    return () => ({ parsed: [] });
};