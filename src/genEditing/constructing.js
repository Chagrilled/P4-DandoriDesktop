import { InfoType, PikminTypes, PikminPlayType, defaultAIProperties, PortalTypes, areaBaseGenVarBytes, TriggerDoorAIBytes } from '../api/types';
import { default as entityData } from '../api/entityData.json';
import { floatToByteArr, intToByteArr } from '../utils/bytes';
import { setFloats, getNameFromAsset, getAssetPathFromId, findObjectKeyByValue } from '../utils';
import { parseGDMDrops, parseTekiDrops, parsePotDrops } from './reading';

const defaultAI = (_, ai) => ai;

const floatBytes = float => floatToByteArr(parseFloat(float)).slice().reverse();

const CustomParameterOverrides = {
    SurvivorA: "SVSleep000",
    SurvivorLeaf: "LFSleep003" // There are like 13 different LFSleeps, so I just picked the one that is used for a teki drop
};

export const NONE_BYTES = [5, 0, 0, 0, 78, 111, 110, 101, 0];

// This seems constant for DropUniqueDebugID, OuterIndex and SuperIndex and PublicExportHash
// Might be computed for the game's contents when unmodded. Who knows what happens if it no longer matches
const COMPUTED_ID = "18446744073709551615";

const ASP_FIELDS = [
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

const writeAsciiString = (bytes, string) => {
    let lengthBytes = intToByteArr(string.length + 1).reverse();
    bytes.push(
        ...lengthBytes,
        ...string.split('').map(char => char.charCodeAt(0)),
        0
    );
};

// The contract for these functions is (drops, aiStatic, { variousProperties })
export const getConstructAIFunc = (creatureId, infoType) => {
    if (creatureId === 'GroupDropManager') return constructGDMAI;
    if (creatureId === 'ActorSpawner') return constructActorSpawnerAI;
    if (creatureId === 'BurrowDemejako') return defaultAI;
    if (creatureId.includes('CrackP')) return constructPotAI;
    if (creatureId.includes('NoraSpawner')) return constructNoraSpawnerAI;
    if (creatureId.includes('CrushJelly')) return constructPotAI;
    if (creatureId.includes('Tateana')) return constructPotAI;
    if (infoType === InfoType.Creature) return constructCreatureAI;
    if (creatureId.includes('Gate')) return constructGateAI;
    if (creatureId.includes('TriggerDoor')) return constructTriggerDoorAI;
    if (creatureId.includes('Switch')) return constructSwitchAI;
    if (creatureId === 'Conveyor265uu') return constructConveyorAI;
    if (['Tunnel', 'WarpCarry', 'HappyDoor'].some(s => creatureId.includes(s))) return constructWarpAI;
    if (infoType === InfoType.Base) return constructBaseAI;
    return defaultAI;
};

const constructBaseAI = (_, aiStatic, { AIProperties }) => {
    // push the unknown chunk on
    const bytes = [...areaBaseGenVarBytes];

    bytes.push(parseInt(AIProperties.baseCampId), 0, 0, 0);
    bytes.push(AIProperties.bDeactivateByExit ? 1 : 0, 0, 0, 0);
    bytes.push(...floatBytes(AIProperties.safeRadius));
    bytes.push(...floatBytes(AIProperties.safeAreaOffsetX));
    bytes.push(...floatBytes(AIProperties.safeAreaOffsetY));
    bytes.push(...floatBytes(AIProperties.safeAreaOffsetZ));
    bytes.push(...floatBytes(AIProperties.searchBoundX));
    bytes.push(...floatBytes(AIProperties.searchBoundY));
    bytes.push(...floatBytes(AIProperties.searchBoundZ));
    bytes.push(0, 0, 122, 68);
    bytes.push(...floatBytes(AIProperties.stateChangeDelayTime));
    bytes.push(...floatBytes(AIProperties.guruguruDist));
    if (typeof AIProperties.CIDList === 'string') AIProperties.CIDList = JSON.parse(AIProperties.CIDList);
    bytes.push(AIProperties.CIDList.length, 0, 0, 0);
    AIProperties.CIDList.forEach(actor => writeAsciiString(bytes, actor));
    return bytes;
};

const constructGateAI = ({ parsed, rareDrops, spareBytes }, aiStatic) => {
    const bytes = [];
    bytes.push(rareDrops.length, 0, 0, 0);
    constructInventory(rareDrops, bytes);
    bytes.push(255, 255, 255, 255);

    bytes.push(...spareBytes);

    bytes.push(parsed.length, 0, 0, 0);
    constructInventory(parsed, bytes);
    return bytes;
};

const constructTriggerDoorAI = (_, aiStatic, { AIProperties }) => {
    // because aiStatic may or may not have the segment with the CIDList in, we need to determine if it exists first
    // entityData[0] for TriggerDoor has a Mar CIDList. Haven't checked the switch ones.
    // Grab the first chunk up to the switch ID
    let index = 155;
    let bytes = aiStatic.slice(0, index);

    // Write the SwitchID in
    writeAsciiString(bytes, AIProperties.switchID);
    index += aiStatic[index] + 72; // puts us at the start of CIDList if it exists

    // Determine if the original/default has the extra bytes
    if (aiStatic[index]) {
        bytes.push(...aiStatic.slice(155 + aiStatic[155] + 4, index)); // this should take from after switchID up to the CIDList
    }
    else bytes.push(...TriggerDoorAIBytes); // if not, take what exists and splice the default in up to CIDList

    if (typeof AIProperties.CIDList === 'string') AIProperties.CIDList = JSON.parse(AIProperties.CIDList);
    bytes.push(AIProperties.CIDList.length, 0, 0, 0);
    AIProperties.CIDList.forEach(actor => writeAsciiString(bytes, actor));
    return bytes;
};

const constructSwitchAI = (_, aiStatic, { AIProperties }) => {
    let bytes = aiStatic.slice(0, 155);

    // Write the SwitchID in
    writeAsciiString(bytes, AIProperties.switchID);

    return bytes;
};

const constructConveyorAI = (_, aiStatic, { AIProperties }) => {
    let bytes = aiStatic.slice(0, 155);

    // Write the SwitchID in
    writeAsciiString(bytes, AIProperties.switchID);
    bytes.push(0, 0, 200, 66); // there's a 100 at the end of conveyors, idk

    return bytes;
};

const constructWarpAI = (_, aiStatic, { AIProperties }) => {
    let bytes = aiStatic.slice(0, 155);

    writeAsciiString(bytes, AIProperties.warpID);

    return bytes;
};

export const getConstructPortalTriggerFunc = infoType => {
    if (infoType == InfoType.Portal) return constructPortalTrigger;
    return (_, pt) => pt;
};

const constructPortalTrigger = ({ transform, PortalTrigger }) => {
    const bytes = [];
    bytes.push(parseInt(findObjectKeyByValue(PortalTypes, PortalTrigger.portalType)));
    bytes.push(parseInt(PortalTrigger.portalNumber), 0, 0, 0);
    writeAsciiString(bytes, PortalTrigger.toLevelName);
    writeAsciiString(bytes, PortalTrigger.toSubLevelName);
    bytes.push(parseInt(PortalTrigger.toPortalId), 0, 0, 0);
    bytes.push(1, 0, 0, 0); // Dunno what this bool is
    writeAsciiString(bytes, `/Game/Carrot4/Demo/PlayParam/Common/${PortalTrigger.demoPlayParamEnter}.${PortalTrigger.demoPlayParamEnter}`);
    bytes.push(0, 0, 0, 0); // dunno what this is
    writeAsciiString(bytes, `/Game/Carrot4/Demo/PlayParam/Common/${PortalTrigger.demoPlayParamExit}.${PortalTrigger.demoPlayParamExit}`);
    bytes.push(0, 0, 0, 0); // or this
    if (PortalTrigger.checkPointLevelNames) {
        bytes.push(PortalTrigger.checkPointLevelNames.length, 0, 0, 0);
        PortalTrigger.checkPointLevelNames.forEach(level => writeAsciiString(bytes, level));
    }
    else bytes.push(0, 0, 0, 0);
    bytes.push(...intToByteArr(parseInt(PortalTrigger.toBaseCampId)).reverse());
    bytes.push(PortalTrigger.bInitialPortalMove ? 1 : 0, 0, 0, 0);
    bytes.push(PortalTrigger.bDeactivateByExit ? 1 : 0, 0, 0, 0);
    bytes.push(0, 0, 250, 67); // this float seems regular
    bytes.push(...floatBytes(parseFloat(PortalTrigger.playAnimDist)));
    bytes.push(0, 0, 0, 0);
    bytes.push(parseInt(PortalTrigger.panzakuPriority), 0, 0, 0);
    bytes.push(...intToByteArr(parseInt(PortalTrigger.disablePikminFlags)).reverse());
    bytes.push(PortalTrigger.bDisableIsFlareGuard ? 1 : 0, 0, 0, 0);
    // bytes.push(...PortalTrigger.spareBytes);
    bytes.push(0, 0, 200, 66, 0, 0, 180, 66, 0, 0, 72, 66);
    bytes.push(...floatBytes(parseFloat(transform.translation.X)));
    bytes.push(...floatBytes(parseFloat(transform.translation.Y)));
    bytes.push(...floatBytes(parseFloat(transform.translation.Z) + 50.0));
    return bytes;
};

const constructNoraSpawnerAI = ({ parsed }, aiStatic, { AIProperties }) => {
    const bytes = [];
    console.log("Constructing NoraSpawner from:", parsed, AIProperties);
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
    writeAsciiString(bytes, AIProperties.noraIdlingPreset);
    bytes.push(0, 0, 0, 0); // this changes often, no clue what bool it is yet
    bytes.push(parseInt(findObjectKeyByValue(PikminPlayType, AIProperties.groupIdlingType)));
    bytes.push(0, 0, 0, 0);
    bytes.push(...floatBytes(parseFloat(AIProperties.mabikiPongashiOffset.X)));
    bytes.push(...floatBytes(parseFloat(AIProperties.mabikiPongashiOffset.Y)));
    bytes.push(...floatBytes(parseFloat(AIProperties.mabikiPongashiOffset.Z)));
    bytes.push(0, 0, 128, 191);
    bytes.push(parsed.length, 0, 0, 0);
    parsed.forEach(drop => {
        writeAsciiString(bytes, drop.assetName);
        const actorName = getNameFromAsset(drop.assetName);

        if (actorName.includes("Survivor")) { // Push custom sleep params if survivor
            writeAsciiString(bytes, CustomParameterOverrides[actorName]);
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

const constructInventory = (drops, bytes) => {
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
        writeAsciiString(bytes, drop.assetName);

        const actorName = getNameFromAsset(drop.assetName);

        if (actorName.includes("Survivor")) { // Push custom sleep params if survivor
            writeAsciiString(bytes, CustomParameterOverrides[actorName]);
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
};

const constructGDMAI = ({ parsed }, aiStatic, { groupingRadius, ignoreList = [], inventoryEnd }) => {
    const bytes = [];
    bytes.push(...floatBytes(groupingRadius));

    if (typeof ignoreList === 'string') ignoreList = JSON.parse(ignoreList);
    const ignoreListLength = ignoreList.length;
    bytes.push(ignoreListLength, 0, 0, 0);
    ignoreList.forEach(ignore => {
        writeAsciiString(bytes, ignore);
    });

    bytes.push(parsed.length, 0, 0, 0);

    constructInventory(parsed, bytes);

    bytes.push(255, 255, 255, 255);
    if (!inventoryEnd) {
        ({ inventoryEnd } = parseGDMDrops(aiStatic));
    }
    return [...bytes, ...aiStatic.slice(inventoryEnd, aiStatic.length)];
};

const constructPotAI = ({ parsed }, aiStatic, { inventoryEnd }) => {
    const bytes = [];
    bytes.push(parsed.length, 0, 0, 0);

    constructInventory(parsed, bytes);

    bytes.push(255, 255, 255, 255);
    if (!inventoryEnd) {
        ({ inventoryEnd } = parsePotDrops(aiStatic));
    }
    return [...bytes, ...aiStatic.slice(inventoryEnd, aiStatic.length)];
};

const constructActorSpawnerAI = ({ parsed: [drop] }, aiStatic) => {
    const bytes = [];
    // These are some ordering of avatar, pikmin, both, and something else 
    bytes.push(drop.avatar ? 1 : 0, 0, 0, 0);
    bytes.push(drop.pikmin ? 1 : 0, 0, 0, 0);
    bytes.push(drop.avatarAndPikmin ? 1 : 0, 0, 0, 0);
    bytes.push(drop.carry ? 1 : 0, 0, 0, 0);
    bytes.push(drop.bNotOverlap ? 1 : 0, 0, 0, 0);
    bytes.push(drop.bGenseiControl ? 1 : 0, 0, 0, 0);
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
    writeAsciiString(bytes, drop.assetName);
    writeAsciiString(bytes, drop.customParameter);

    bytes.push(...drop.spareBytes);
    return bytes;
};

const constructCreatureAI = ({ parsed }, aiStatic, { inventoryEnd }) => {
    // The -1 at the end of an inventory could be at [24] for 0 inventories
    const inventoryBytes = [parsed.length, 0, 0, 0];
    parsed.forEach(drop => {
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
        writeAsciiString(slotBytes, drop.assetName);

        const actorName = getNameFromAsset(drop.assetName);
        if (actorName.includes("Survivor")) { // Push custom sleep params if survivor
            writeAsciiString(slotBytes, CustomParameterOverrides[actorName]);
        }
        else slotBytes.push(...NONE_BYTES);

        // if (typeof parsed.params == 'string') drop.params = JSON.parse(drop.params);
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

export const writeLifeDynamic = Life => {
    return [
        ...floatBytes(Life),
        ...floatBytes(Life)
    ];
};

export const writeAffordanceWeight = (weight, { Static }) => Static.toSpliced(Static.length - 4, 4, ...intToByteArr(weight).reverse());

export const constructActor = (actor, mapId) => {
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
                Static: getConstructAIFunc(actor.creatureId, actor.infoType)(actor.drops, entityData[actor.creatureId].AI[0].Static, {
                    groupingRadius: actor?.groupingRadius,
                    ignoreList: actor?.ignoreList,
                    AIProperties: actor?.AIProperties || defaultAIProperties
                }),
                Dynamic: entityData[actor.creatureId].AI[0].Dynamic
            },
            PortalTrigger: {
                Static: getConstructPortalTriggerFunc(actor.infoType)(actor, entityData[actor.creatureId].PortalTrigger[0].Static),
                Dynamic: entityData[actor.creatureId].PortalTrigger[0].Dynamic
            },
            Life: {
                Static: entityData[actor.creatureId].Life[0].Static,
                Dynamic: actor.Life ? writeLifeDynamic(actor.Life) : entityData[actor.creatureId].Life[0].Dynamic
            },
            Affordance: {
                Static: actor.weight ? writeAffordanceWeight(actor.weight, entityData[actor.creatureId].Affordance[0]) : entityData[actor.creatureId].Affordance[0].Static,
                Dynamic: entityData[actor.creatureId].Affordance[0].Dynamic
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
