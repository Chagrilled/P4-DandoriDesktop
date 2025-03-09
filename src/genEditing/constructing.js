import { InfoType, PikminTypes, PikminPlayType, defaultAIProperties, PortalTypes, areaBaseGenVarBytes, TriggerDoorAIBytes, ValveWorkType, ValveAPBytes, TeamIDs, ObjectAIParameter, weirdAIEntities, ObjectAI_STRING_INDEX, ObjectAI_END_INDEX, InterpModes, RockModes } from '../api/types';
import { default as entityData } from '../api/entityData.json';
import { floatToByteArr, intToByteArr, disableFlagsToInt } from '../utils/bytes';
import { setFloats, getNameFromAsset, getAssetPathFromId, findObjectKeyByValue, getObjectAIOffset } from '../utils';
import { parseGDMDrops, parseTekiAI, parsePotDrops } from './reading';
import logger from '../utils/logger';

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

export const ASP_FIELDS = [
    'AI',
    'ActionMarker',
    'ActorParameter',
    'Affordance',
    'CakAudioTable',
    'CakEmitterConfig',
    'CakMultiplePosition',
    'CakSimpleState',
    'CakTrigger',
    'CharacterEdit',
    'CheckComp',
    'DemoTrigger',
    'Hash',
    'HiddenBoxTrigger',
    'Life',
    'NarrowSpaceBoxTrigger',
    'NavMeshTrigger',
    'Pikmin',
    'PopPlace',
    'PortalTrigger',
    'Strategy',
    'SubAI',
    'WarpTrigger',
    'WaterTrigger'
];

const writeAsciiString = (bytes, string) => {
    let lengthBytes = intToByteArr(string.length + 1);
    bytes.push(
        ...lengthBytes,
        ...string.split('').map(char => char.charCodeAt(0)),
        0
    );
};

//#region Func Controllers
// The contract for these functions is (drops, aiStatic, { variousProperties }, generatorVersion, creatureId)
export const getConstructAIStaticFunc = (creatureId, infoType) => {
    if (creatureId.startsWith('Spline')) return defaultAI;
    if (creatureId === 'GroupDropManager') return constructGDMAI;
    if (creatureId === 'ActorSpawner') return constructActorSpawnerAI;
    if (weirdAIEntities.some(e => e === creatureId)) return defaultAI;
    if (creatureId.includes('CrackP')) return constructPotAI;
    if (creatureId.includes('NoraSpawner')) return constructNoraSpawnerAI;
    if (creatureId.includes('CrushJelly')) return constructPotAI;
    if (creatureId.includes('Tateana')) return constructPotAI;
    if (infoType === InfoType.Creature) return constructCreatureAI;
    if (creatureId.includes('Gate')) return constructGateAI;
    if (creatureId.includes('TriggerDoor')) return constructTriggerDoorAI;
    if (creatureId.includes('Switch')) return constructSwitchAI;
    if (creatureId === 'Conveyor265uu') return constructConveyorAI;
    if (creatureId.includes('Mush')) return constructCreatureAI;
    if (creatureId.includes('Komush')) return constructCreatureAI;
    if (['Tunnel', 'WarpCarry', 'HappyDoor'].some(s => creatureId.includes(s))) return constructWarpAI;
    if (infoType === InfoType.Base) return constructBaseAI;
    if (creatureId === 'Sprinkler') return constructSprinklerAI;
    if (creatureId.includes('Valve')) return constructValveAI;
    if (creatureId.includes('StickyFloor')) return constructStickyFloorAI;
    if (creatureId.includes('Geyser')) return constructGeyserAI;
    if (creatureId.includes('Circulator')) return constructCirculatorAI;
    if (creatureId.includes('WaterBox') && creatureId !== 'WaterBoxNav') return constructWaterBoxAI;
    if (creatureId === 'WaterBoxNav') return constructWaterBoxNavAI;
    if (creatureId.startsWith('SwampBox')) return constructWaterBoxAI;
    if (creatureId.includes('Mizunuki')) return constructMizunukiAI;
    if (creatureId.includes('HandleBoard')) return constructHandleBoardAI;
    if (creatureId.includes('MoveFloor') && creatureId !== 'MoveFloorSlowTrigger') return constructMoveFloorAI;
    if (creatureId === 'Branch_Long') return constructBranchAI;
    if (creatureId.startsWith('DownWall')) return constructDownWallAI;
    if (creatureId === 'String') return constructStringAI;
    if (infoType === InfoType.Treasure || creatureId.includes('Survivor')) return constructOtakaraAI;
    return defaultAI;
};

export const getConstructDynamicFunc = (creatureId, infoType) => {
    if (creatureId.includes('Valve')) return constructValveAI_Dynamic;
    if (creatureId.includes('Tateana')) return constructTateanaAI_Dynamic;
    if (['HikariStation', 'BridgeStation', 'KinkaiStation'].some(e => creatureId === e)) return constructPileAI_Dynamic;
    if (creatureId.includes('Circulator')) return constructCirculatorAI_Dynamic;
    if (creatureId.includes('WaterBox') && creatureId !== 'WaterBoxNav') return constructWaterBoxAI_Dynamic;
    if (creatureId.startsWith('SwampBox')) return constructWaterBoxAI_Dynamic;
    if (creatureId === 'AmeBozu') return constructAmeBozuAI_Dynamic;
    if (creatureId === 'String') return constructStringAI_Dynamic;
    if (infoType === InfoType.Treasure) return constructOtakaraAI_Dynamic;
    if (creatureId.includes('Survivor')) return constructSurvivorAI_Dynamic;
    return (ai) => ai;
};

export const getConstructSubAIStaticFunc = (creatureId) => {
    if (creatureId.includes('Tateana')) return constructActorSpawnerAI;
    return defaultAI;
};

export const getConstructActorParamFunc = (creatureId) => {
    if (creatureId.includes('Valve')) return constructValveActorParam;
    if (creatureId.includes('Sprinkler')) return constructValveActorParam;
    if (creatureId.includes('WaterBox') && creatureId !== 'WaterBoxNav') return constructWaterBoxActorParam;
    if (creatureId.startsWith('SwampBox')) return constructWaterBoxActorParam;
    if (creatureId.startsWith('Spline')) return constructSplineActorParameter;
    return (ap) => ap;
};

export const getConstructNavMeshTriggerFunc = (creatureId) => {
    if (creatureId.includes('NavMeshTrigger')) return constructNavMeshTrigger;
    return (nmt) => nmt;
};

export const getConstructWaterTriggerFunc = creatureId => {
    if (creatureId.includes('WaterBox') && creatureId !== 'WaterBoxNav') return constructWaterBoxWaterTrigger;
    if (creatureId.startsWith('SwampBox')) return constructSwampBoxWaterTrigger;
    return (wt) => wt;
};

export const getConstructCreatureAIFunc = creatureId => {
    if (['KumaChappy', 'Patroller'].includes(creatureId)) return constructKumaChappyAI;
    if (creatureId === 'HageDamagumo') return constructHageDamagumoAI;
    if (creatureId.includes('PanModoki')) return constructPanModokiAI;
    if (creatureId === 'AmeBozu') return constructAmeBozuAI;
    if (['Futakuchi', 'YukiFutakuchi'].includes(creatureId)) return constructFutakuchiAI;
    if (['FutakuchiAdult', 'YukiFutakuchiAdult'].includes(creatureId)) return constructFutakuchiAdultAI;
    if (creatureId === 'Baby') return constructBabyAI;
    if (creatureId === 'BigUjinko') return constructBigUjinkoAI;
    return () => [];
};

//#region WaterBoxes
const constructWaterBoxNavAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    const bytes = [
        ...aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion))
    ];
    bytes.push(AIProperties.bUseHappyOnly ? 1 : 0, 0, 0, 0);
    bytes.push(...floatBytes(AIProperties.rightOffset.X));
    bytes.push(...floatBytes(AIProperties.rightOffset.Y));
    bytes.push(...floatBytes(AIProperties.rightOffset.Z));
    return bytes;
};

const constructWaterBoxAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    const bytes = [
        ...aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion))
    ];
    writeAsciiString(bytes, AIProperties.waterBoxSwitchId);
    bytes.push(...floatBytes(AIProperties.waterLevelChangeDist));
    bytes.push(...floatBytes(AIProperties.waterLevelChangeTime));
    bytes.push(0, 0, 128, 191, 1, 0, 0, 0);
    bytes.push(...(AIProperties.generatorIndex === -1 ? [255, 255, 255, 255] : [0, 0, 0, 0]));
    bytes.push(AIProperties.bUseSunMeter ? 1 : 0, 0, 0, 0);
    bytes.push(0, 0, 0, 63);
    bytes.push(AIProperties.bPlayDemo ? 1 : 0, 0, 0, 0);
    return bytes;
};

const constructWaterBoxAI_Dynamic = (aiDynamic, { AIProperties }) => [
    ...Array(12).fill(0),
    255, 255, 255, 255,
    ...intToByteArr(AIProperties.afterMaxIcePikmins)
];

const constructWaterBoxActorParam = (apStatic, ap) => {
    const bytes = apStatic.slice(0, 64);
    const area = ap.radarMapWBTexture.match(/T_ui_Map_(.+?)_Water/);
    const radarPath = ap.radarMapWBTexture === 'None' ? 'None' : `/Game/Carrot4/UI/InGame/RadarMap/UMG/Map/${area[1]}/${ap.radarMapWBTexture}.${ap.radarMapWBTexture}`;
    writeAsciiString(bytes, radarPath);

    const areaCD = ap.radarMapWBChangeDistTexture.match(/T_ui_Map_(.+?)_Water/);
    const radarPathCD = ap.radarMapWBChangeDistTexture === 'None' ? 'None' : `/Game/Carrot4/UI/InGame/RadarMap/UMG/Map/${areaCD[1]}/${ap.radarMapWBChangeDistTexture}.${ap.radarMapWBChangeDistTexture}`;
    writeAsciiString(bytes, radarPathCD);
    bytes.push(205, 204, 76, 65);
    return bytes;
};

const constructWaterBoxWaterTrigger = (wtStatic, wt) => {
    const bytes = [
        ...intToByteArr(wt.maxIcePikmins),
        ...wtStatic.slice(4, 28)
    ];
    writeAsciiString(bytes, wt.ambientSoundId);
    return bytes;
};

const constructSwampBoxWaterTrigger = (wtStatic, wt) => {
    const bytes = constructWaterBoxWaterTrigger(wtStatic, wt);
    bytes.push(wt.bDisableSink ? 1 : 0, 0, 0, 0);
    return bytes;
};
constructSwampBoxWaterTrigger;

const constructMizunukiAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    const bytes = [
        ...aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion))
    ];
    writeAsciiString(bytes, AIProperties.waterBoxId);
    return bytes;
};

//#region MoveFloor
const constructMoveFloorAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    const bytes = [
        ...aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion))
    ];
    bytes.push(
        ...floatBytes(AIProperties.waitTime),
        ...floatBytes(AIProperties.moveSpeed),
        AIProperties.bEnableWarpActor ? 1 : 0, 0, 0, 0,
        ...floatBytes(AIProperties.warpOffset.X),
        ...floatBytes(AIProperties.warpOffset.Y),
        ...floatBytes(AIProperties.warpOffset.Z),
        ...constructSplinePoints(AIProperties.splinePoints)
    );

    bytes.push(...Array(12).fill(0));
    return bytes;
};

//#region Splines
const constructSplinePoints = splinePoints => {
    const bytes = [
        splinePoints.length, 0, 0, 0
    ];
    for (const point of splinePoints) {
        bytes.push(
            ...floatBytes(point.inVal),
            ...floatBytes(point.outVal.X),
            ...floatBytes(point.outVal.Y),
            ...floatBytes(point.outVal.Z),
            ...floatBytes(point.arriveTangent.X),
            ...floatBytes(point.arriveTangent.Y),
            ...floatBytes(point.arriveTangent.Z),
            ...floatBytes(point.leaveTangent.X),
            ...floatBytes(point.leaveTangent.Y),
            ...floatBytes(point.leaveTangent.Z),
            ...floatBytes(point.rotation.roll),
            ...floatBytes(point.rotation.pitch),
            ...floatBytes(point.rotation.yaw),
            ...floatBytes(point.scale.X),
            ...floatBytes(point.scale.Y),
            ...floatBytes(point.scale.Z),
            parseInt(findObjectKeyByValue(InterpModes, point.interpMode))
        );
    };
    return bytes;
};

const constructSplineActorParameter = (apStatic, actorParam) => {
    const bytes = [];
    bytes.push(
        ...NONE_BYTES,
        0, 0, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0,
        ...NONE_BYTES,
        ...NONE_BYTES,
        0, 0, 0, 0,
        0, 0, 128, 191,
        0, 0, 128, 191,
        1, 0, 0, 0,
        1, 0, 0, 0,
        0, 0, 128, 191
    );
    bytes.push(...constructSplinePoints(actorParam.splinePoints));
    bytes.push(
        0, 0, 0, 0,
        0, 0, 0, 0,
        1, 0, 0, 0
    );
    writeAsciiString(bytes, actorParam.searchTagName);
    return bytes;
};

//#region HandleBoard
const constructHandleBoardAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    const bytes = [
        ...aiStatic.slice(0, ObjectAI_STRING_INDEX + getObjectAIOffset(generatorVersion))
    ];
    writeAsciiString(bytes, AIProperties.linkNarrowSpaceBoxID);
    writeAsciiString(bytes, AIProperties.linkWarpTriggerID);
    writeAsciiString(bytes, AIProperties.navMeshTriggerID);
    bytes.push(...Array(13).fill(0));
    bytes.push(...intToByteArr(AIProperties.workNum));
    bytes.push(1, 0, 0, 0);
    bytes.push(
        ...Object.values(AIProperties.pointLinks.left).map(f => floatBytes(f)).flat(),
        ...Object.values(AIProperties.pointLinks.right).map(f => floatBytes(f)).flat()
    );
    return bytes;
};

const constructBranchAI = (_, aiStatic, { AIProperties }, generatorVersion) => [
    ...aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion)),
    ...floatBytes(AIProperties.jumpHeight),
    ...floatBytes(AIProperties.navLinkRight.X),
    ...floatBytes(AIProperties.navLinkRight.Y),
    ...floatBytes(AIProperties.navLinkRight.Z)
];

const constructDownWallAI = (_, aiStatic, { AIProperties }, generatorVersion) => [
    ...aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion)),
    ...floatBytes(AIProperties.bDisableAirWall ? 1 : 0, 0, 0, 0)
];

const constructStringAI = (_, aiStatic, { AIProperties }, generatorVersion) => [
    ...aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion)),
    ...floatBytes(AIProperties.fallHeight)
];

const constructStringAI_Dynamic = (aiStatic, { AIProperties }) => [
    ...Array(12).fill(0),
    AIProperties.bFalled ? 1 : 0, 0, 0, 0
];

//#region Circulators
const constructCirculatorAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    const bytes = [
        ...aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion))
    ];
    writeAsciiString(bytes, AIProperties.switchID);
    bytes.push(AIProperties.bWindLong ? 1 : 0, 0, 0, 0);
    bytes.push(...floatBytes(AIProperties.navLinkRight.X));
    bytes.push(...floatBytes(AIProperties.navLinkRight.Y));
    bytes.push(...floatBytes(AIProperties.navLinkRight.Z));
    return bytes;
};

const constructCirculatorAI_Dynamic = (aiDynamic, { AIProperties }) => [
    ...Array(12).fill(0),
    AIProperties.bRotateDefault ? 1 : 0, 0, 0, 0
];

//#region Treasure Pile
const constructPileAI_Dynamic = (aiDynamic, { AIProperties }) => [
    ...Array(36).fill(0),
    ...intToByteArr(parseInt(AIProperties.pieceNum)),
    255, 255, 255, 255
];

const constructTateanaAI_Dynamic = (aiDynamic, { AIProperties }) => [
    ...Array(12).fill(0),
    parseInt(AIProperties.numDig ?? 1), 0, 0, 0,
    255, 255, 255, 255
];

//#region Geyser
const constructGeyserAI = (_, aiStatic, { AIProperties }, generatorVersion) => [
    ...aiStatic.slice(0, 99 + getObjectAIOffset(generatorVersion)),
    AIProperties.bEnableCustomSoftEdge ? 1 : 0, 0, 0, 0,
    AIProperties.bDisableSoftEdge ? 1 : 0, 0, 0, 0,
    ...aiStatic.slice(107 + getObjectAIOffset(generatorVersion), ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion)),
    AIProperties.bSetCrystal ? 1 : 0, 0, 0, 0,
    ...floatBytes(AIProperties.stopQueenDistXY),
    1, 0, 0, 0,
    ...floatBytes(AIProperties.navLinkLeft.X),
    ...floatBytes(AIProperties.navLinkLeft.Y),
    ...floatBytes(AIProperties.navLinkLeft.Z),
    ...floatBytes(AIProperties.navLinkRight.X),
    ...floatBytes(AIProperties.navLinkRight.Y),
    ...floatBytes(AIProperties.navLinkRight.Z),
    ...floatBytes(AIProperties.leftProjectHeight),
    ...floatBytes(AIProperties.maxFallDownLength),
    1,
    ...floatBytes(AIProperties.snapRadius),
    ...floatBytes(AIProperties.snapHeight),
    255, 255, 255, 255,
    AIProperties.bUseSnapHeight ? 1 : 0,
    1
];

//#region NavMeshTriger
const constructNavMeshTrigger = (trigger, triggerProperties) => {
    const bytes = [
        ...floatBytes(triggerProperties.overlapBoxExtent.X),
        ...floatBytes(triggerProperties.overlapBoxExtent.Y),
        ...floatBytes(triggerProperties.overlapBoxExtent.Z),
        ...floatBytes(triggerProperties.navCollBoxExtent.X),
        ...floatBytes(triggerProperties.navCollBoxExtent.Y),
        ...floatBytes(triggerProperties.navCollBoxExtent.Z)
    ];

    if (typeof triggerProperties.CIDList === 'string') triggerProperties.CIDList = JSON.parse(triggerProperties.CIDList);
    bytes.push(triggerProperties.CIDList.length, 0, 0, 0);
    triggerProperties.CIDList.forEach(actor => writeAsciiString(bytes, actor));

    writeAsciiString(bytes, triggerProperties.navMeshTriggerID);
    return bytes;
};

//#region StickyFloor
const constructStickyFloorAI = ({ parsed }, aiStatic, { AIProperties, inventoryEnd }) => {
    const bytes = [];
    bytes.push(parsed.length, 0, 0, 0);

    constructInventory(parsed, bytes);

    bytes.push(255, 255, 255, 255);
    if (!inventoryEnd) {
        ({ inventoryEnd } = parsePotDrops(aiStatic)); // PotDrops is basically the same - split this out later?
    }
    const finalBytes = [...bytes, ...aiStatic.slice(inventoryEnd, aiStatic.length)];
    finalBytes[finalBytes.length - 4] = AIProperties.bAutoSpawnMush ? 1 : 0;
    return finalBytes;
};

//#region Valve
const constructValveAI_Dynamic = (aiDynamic, { AIProperties }) => {
    return [
        ...aiDynamic.slice(0, 12),
        parseInt(AIProperties.piecePutNum),
        ...aiDynamic.slice(13, aiDynamic.length)
    ];
};

const constructValveAI = (_, aiStatic, { AIProperties }) => {
    let index = 163;
    let bytes = aiStatic.slice(0, index);
    writeAsciiString(bytes, AIProperties.valveID);
    bytes.push(parseInt(findObjectKeyByValue(ValveWorkType, AIProperties.workType)), 0, 0, 0);
    bytes.push(parseInt(AIProperties.demoID), 0, 0, 0);
    return bytes;
};

const constructValveActorParam = (_, { demoBindName }) => {
    const bytes = [];
    writeAsciiString(bytes, demoBindName);
    return [...bytes, ...ValveAPBytes];
};

//#region Base
const constructBaseAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    // push the unknown chunk on
    let index = ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion);
    let bytes = aiStatic.slice(0, index);

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

//#region Sprinkler
const constructSprinklerAI = (_, aiStatic, { AIProperties, transform }) => {
    // Sprinklers only use the short generator so this is ok
    let index = 133;
    let bytes = aiStatic.slice(0, index);
    writeAsciiString(bytes, AIProperties.navMeshTriggerID);
    index += aiStatic[index] + 4;
    bytes.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    writeAsciiString(bytes, AIProperties.valveID);
    bytes.push(...floatBytes(parseFloat(transform.X)));
    bytes.push(...floatBytes(parseFloat(transform.Y)));
    bytes.push(...floatBytes(parseFloat(transform.Z) + 50.0));
    bytes.push(...floatBytes(parseFloat(AIProperties.waterRange)));
    bytes.push(...floatBytes(parseFloat(AIProperties.openTime)));
    bytes.push(1, 0, 0, 0);
    bytes.push(...floatBytes(parseFloat(AIProperties.flatEffectOffsetZ)));
    bytes.push(AIProperties.bSprinklerOnly ? 1 : 0, 0, 0, 0);
    return bytes;
};

//#region Gate
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

//#region TriggerDoor
const constructTriggerDoorAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    // because aiStatic may or may not have the segment with the CIDList in, we need to determine if it exists first
    // entityData[0] for TriggerDoor has a Mar CIDList. Haven't checked the switch ones.
    // Grab the first chunk up to the switch ID
    let index = ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion);
    let bytes = aiStatic.slice(0, index);

    // Write the SwitchID in
    writeAsciiString(bytes, AIProperties.switchID);
    index += aiStatic[index] + 72; // puts us at the start of CIDList if it exists

    // Determine if the original/default has the extra bytes
    if (aiStatic[index]) {
        bytes.push(...aiStatic.slice(ObjectAI_END_INDEX + aiStatic[ObjectAI_END_INDEX] + 4, index)); // this should take from after switchID up to the CIDList
    }
    else bytes.push(...TriggerDoorAIBytes); // if not, take what exists and splice the default in up to CIDList

    if (typeof AIProperties.CIDList === 'string') AIProperties.CIDList = JSON.parse(AIProperties.CIDList);
    bytes.push(AIProperties.CIDList.length, 0, 0, 0);
    AIProperties.CIDList.forEach(actor => writeAsciiString(bytes, actor));
    return bytes;
};

//#region Switch
const constructSwitchAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    let bytes = aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion));

    // Write the SwitchID in
    writeAsciiString(bytes, AIProperties.switchID);

    return bytes;
};

//#region Conveyor
const constructConveyorAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    let bytes = aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion));

    // Write the SwitchID in
    writeAsciiString(bytes, AIProperties.switchID);
    bytes.push(0, 0, 200, 66); // there's a 100 at the end of conveyors, idk

    return bytes;
};

//#region Warp
const constructWarpAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    let bytes = aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion));

    writeAsciiString(bytes, AIProperties.warpID);

    return bytes;
};

//#region PortalTrigger
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
    bytes.push(...intToByteArr(parseInt(PortalTrigger.toBaseCampId)));
    bytes.push(PortalTrigger.bInitialPortalMove ? 1 : 0, 0, 0, 0);
    bytes.push(PortalTrigger.bDeactivateByExit ? 1 : 0, 0, 0, 0);
    bytes.push(0, 0, 250, 67); // this float seems regular
    bytes.push(...floatBytes(parseFloat(PortalTrigger.playAnimDist)));
    bytes.push(0, 0, 0, 0);
    bytes.push(parseInt(PortalTrigger.panzakuPriority), 0, 0, 0);
    bytes.push(...intToByteArr(parseInt(disableFlagsToInt(PortalTrigger.disablePikminFlags))));
    bytes.push(PortalTrigger.bDisableIsFlareGuard ? 1 : 0, 0, 0, 0);
    // bytes.push(...PortalTrigger.spareBytes);
    bytes.push(0, 0, 200, 66, 0, 0, 180, 66, 0, 0, 72, 66);
    bytes.push(...floatBytes(parseFloat(transform.translation.X)));
    bytes.push(...floatBytes(parseFloat(transform.translation.Y)));
    bytes.push(...floatBytes(parseFloat(transform.translation.Z) + 50.0));
    return bytes;
};

//#region NoraSpawner
const constructNoraSpawnerAI = ({ parsed }, aiStatic, { AIProperties }) => {
    const bytes = [];
    console.log("Constructing NoraSpawner from:", parsed, AIProperties);
    bytes.push(parseInt(AIProperties.spawnNum), 0, 0, 0);
    bytes.push(...floatBytes(parseFloat(AIProperties.spawnRadius)));
    bytes.push(...floatBytes(parseFloat(AIProperties.noSpawnRadius)));
    bytes.push(parseInt(findObjectKeyByValue(PikminTypes, AIProperties.pikminType)));
    bytes.push(1, 0, 0, 0);
    bytes.push(2);
    bytes.push(...intToByteArr(AIProperties.mabikiNumFromFollow));
    bytes.push(...aiStatic.slice(22, 26));
    bytes.push(AIProperties.bMabikiPongashi ? 1 : 0, 0, 0, 0);
    bytes.push(...intToByteArr(AIProperties.pongashiChangeColorFollowNum));
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
        bytes.push(...intToByteArr(parseInt(drop.gameRulePermissionFlag), 2));
        bytes.push(drop.bSetTerritory ? 1 : 0, 0, 0, 0);
        if (drop.bSetTerritory) {
            bytes.push(...floatBytes(parseFloat(drop.X || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.Y || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.Z || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.halfHeight || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.radius || 0.0)));
        }
    });

    bytes.push(AIProperties.bEnableOptionalPoint ? 1 : 0, 0, 0);
    if (AIProperties.optionalPointOffsets) {
        bytes.push(AIProperties.optionalPointOffsets.length, 0, 0, 0);
        AIProperties.optionalPointOffsets.forEach(offset => {
            bytes.push(...floatBytes(offset.X));
            bytes.push(...floatBytes(offset.Y));
            bytes.push(...floatBytes(offset.Z));
        });
    }
    else bytes.push(0, 0, 0, 0);
    bytes.push(0, 0, 0, 0);
    return bytes;
};

//#region GDM
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

//#region Pot
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

//#region Otakara 
const constructOtakaraAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    const bytes = [
        aiStatic[0], 0, 0, 0,
        AIProperties.bChangeCrushImpactMoveDir ? 1 : 0, 0, 0, 0,
        AIProperties.bReceiveCrushImpactEvent ? 1 : 0, 0, 0, 0,
        AIProperties.bSendCrushImpactEvent ? 1 : 0, 0, 0, 0,
        ...floatBytes(parseFloat(AIProperties.crushImpactMoveRot.X)),
        ...floatBytes(parseFloat(AIProperties.crushImpactMoveRot.Y)),
        ...floatBytes(parseFloat(AIProperties.crushImpactMoveRot.Z)),
        0, 0, 0, 0, 0, // there are 5 here
        AIProperties.bDDBSurvivorLeaf ? 1 : 0, 0, 0, 0,
        AIProperties.bEnableOptionalPoint ? 1 : 0, 0, 0, 0,
    ];

    if (AIProperties.bEnableOptionalPoint) {
        bytes.push(AIProperties.optionalPointOffsets.length, 0, 0, 0);
        AIProperties.optionalPointOffsets.forEach(offset => {
            bytes.push(...floatBytes(offset.X));
            bytes.push(...floatBytes(offset.Y));
            bytes.push(...floatBytes(offset.Z));
        });
    }
    else bytes.push(0, 0, 0, 0);

    bytes.push(
        AIProperties.optionalPointPriorityInfoSize, 0, 0, 0,
        ...Array(AIProperties.optionalPointPriorityInfoSize * 4).fill(0),
    );

    return bytes;
};

const constructSurvivorAI_Dynamic = (aiDynamic, { AIProperties }) => {
    const bytes = [];
    console.log(AIProperties);
    writeAsciiString(bytes, AIProperties.npcInfoKey);
    bytes.push(...constructOtakaraAI_Dynamic(aiDynamic.slice(aiDynamic[0] + 4, aiDynamic.length), { AIProperties }));
    return bytes;
};

const constructOtakaraAI_Dynamic = (aiDynamic, { AIProperties }) => {
    console.log(AIProperties);
    console.log(AIProperties.rotation);
    console.log(AIProperties.rotation.X);
    console.log("Otakara dynamic");
    return [
        AIProperties.bCanFall ? 1 : 0, 0, 0, 0,
        AIProperties.bEnableChangeInitTransformAfterFalling ? 1 : 0, 0, 0, 0,
        ...floatBytes(parseFloat(AIProperties.rotation.X)),
        ...floatBytes(parseFloat(AIProperties.rotation.Y)),
        ...floatBytes(parseFloat(AIProperties.rotation.Z)),
        ...floatBytes(parseFloat(AIProperties.rotation.W)),
        ...floatBytes(parseFloat(AIProperties.translation.X)),
        ...floatBytes(parseFloat(AIProperties.translation.Y)),
        ...floatBytes(parseFloat(AIProperties.translation.Z)),
        ...aiDynamic.slice(9 * 4, aiDynamic.length) // get everything after what we know
    ];
};

//#region ActorSpawner
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
    writeAsciiString(bytes, drop.fallStart ? 'FallStart' : 'None');

    // ???
    bytes.push(1, 0, 0, 0);
    // Spawn X
    bytes.push(...floatBytes(drop.spawnLocationX));
    // Spawn Y
    bytes.push(...floatBytes(drop.spawnLocationY));
    // Spawn Z
    bytes.push(...floatBytes(drop.spawnLocationZ));

    bytes.push(drop.bSpawnAngRand ? 1 : 0, 0, 0, 0);
    bytes.push(...floatBytes(drop.spawnAng));
    bytes.push(...floatBytes(drop.spawnVelX));
    bytes.push(...floatBytes(drop.spawnVelY));

    // infiniteSpawn
    bytes.push(parseInt(drop.infiniteSpawn) ? 1 : 0, 0, 0, 0);
    // spawnInterval
    bytes.push(...floatBytes(drop.spawnInterval));
    // spawnLimit
    bytes.push(...intToByteArr(parseInt(drop.spawnLimit)));
    // ???
    bytes.push(1, 0, 0, 0);
    /// bRandomRotation
    bytes.push(parseInt(drop.randomRotation) ? 1 : 0, 0, 0, 0);
    //bNoDropItem
    bytes.push(parseInt(drop.noDropItem) ? 1 : 0, 0, 0, 0);
    // assetPath
    writeAsciiString(bytes, drop.assetName);
    writeAsciiString(bytes, drop.customParameter);
    bytes.push(...floatBytes(drop.customFloatParameter));
    bytes.push(...intToByteArr(parseInt(drop.gameRulePermissionFlag), 2));
    bytes.push(drop.bSetTerritory ? 1 : 0, 0, 0, 0);
    if (drop.bSetTerritory) {
        bytes.push(...floatBytes(drop.territoryX || 0));
        bytes.push(...floatBytes(drop.territoryY || 0));
        bytes.push(...floatBytes(drop.territoryZ || 0));
        bytes.push(...floatBytes(drop.territoryHalfHeight || 0));
        bytes.push(...floatBytes(drop.territoryRadius || 0));
    }
    bytes.push(...floatBytes(drop.invasionStartTimeRatio));

    // bytes.push(...drop.spareBytes);
    return bytes;
};

//#region Teki
const constructCreatureAI = ({ parsed }, aiStatic, { inventoryEnd, AIProperties }, generatorVersion, creatureId) => {
    // The -1 at the end of an inventory could be at [24] for 0 inventories
    const inventoryBytes = [
        ...floatBytes(parseFloat(AIProperties.territory.X)),
        ...floatBytes(parseFloat(AIProperties.territory.Y)),
        ...floatBytes(parseFloat(AIProperties.territory.Z)),
        ...floatBytes(parseFloat(AIProperties.territory.halfHeight)),
        ...floatBytes(parseFloat(AIProperties.territory.radius)),
        parsed.length, 0, 0, 0
    ];

    parsed.forEach(drop => {
        const slotBytes = intToByteArr(parseInt(drop.id));
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
        slotBytes.push(...intToByteArr(parseInt(drop.gameRulePermissionFlag), 2));
        slotBytes.push(drop.bSetTerritory ? 1 : 0, 0, 0, 0);
        if (drop.bSetTerritory) {
            slotBytes.push(...floatBytes(parseFloat(drop.X || 0.0)));
            slotBytes.push(...floatBytes(parseFloat(drop.Y || 0.0)));
            slotBytes.push(...floatBytes(parseFloat(drop.Z || 0.0)));
            slotBytes.push(...floatBytes(parseFloat(drop.halfHeight || 0.0)));
            slotBytes.push(...floatBytes(parseFloat(drop.radius || 0.0)));
        }
        inventoryBytes.push(...slotBytes);
    });
    inventoryBytes.push(255, 255, 255, 255);
    writeAsciiString(inventoryBytes, AIProperties.boneName);

    ["localOffset", "vel", "randVel"].forEach(prop => {
        inventoryBytes.push(...floatBytes(parseFloat(AIProperties[prop].X || 0.0)));
        inventoryBytes.push(...floatBytes(parseFloat(AIProperties[prop].Y || 0.0)));
        inventoryBytes.push(...floatBytes(parseFloat(AIProperties[prop].Z || 0.0)));
    });
    inventoryBytes.push(...intToByteArr(parseInt(AIProperties.dropOption), 2));
    inventoryBytes.push(0, 0, 0, 0); //FixedHotExtractDropNum?
    inventoryBytes.push(AIProperties.bOverrideInitLocation ? 1 : 0, 0, 0, 0);
    inventoryBytes.push(...floatBytes(parseFloat(AIProperties.overrideInitLocation.X || 0.0)));
    inventoryBytes.push(...floatBytes(parseFloat(AIProperties.overrideInitLocation.Y || 0.0)));
    inventoryBytes.push(...floatBytes(parseFloat(AIProperties.overrideInitLocation.Z || 0.0)));

    inventoryBytes.push(parsed.length, 0, 0, 0);
    parsed.forEach(drop => {
        inventoryBytes.push(...intToByteArr(parseInt(drop.id)));
        inventoryBytes.push(...drop.flags);
    });
    const offset = getObjectAIOffset(generatorVersion);
    if (offset) inventoryBytes.push(AIProperties.bEnableFreezeBothDrop ? 1 : 0, 0, 0, 0);
    inventoryBytes.push(1, 0, 0, 0); // no idea what this bool is, but it's usually 1?
    inventoryBytes.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0); // 3 somethings
    inventoryBytes.push(0, 0, 72, 66);
    inventoryBytes.push(...floatBytes(AIProperties.searchAreaOtakaraCarryRadius));
    inventoryBytes.push(0, 0, 52, 67, 0, 0, 240, 65);
    inventoryBytes.push(...floatBytes(AIProperties.invasionStartTimeRatio));
    inventoryBytes.push(0, 0, 0, 0);
    inventoryBytes.push(1, 0, 0, 0);
    inventoryBytes.push(0, 0, 0, 0);
    inventoryBytes.push(AIProperties.bEnableOptionalPoint ? 1 : 0, 0, 0, 0);

    if (AIProperties.bEnableOptionalPoint) {
        inventoryBytes.push(AIProperties.optionalPointOffsets.length, 0, 0, 0);
        AIProperties.optionalPointOffsets.forEach(offset => {
            inventoryBytes.push(...floatBytes(offset.X));
            inventoryBytes.push(...floatBytes(offset.Y));
            inventoryBytes.push(...floatBytes(offset.Z));
        });
    }
    else inventoryBytes.push(0, 0, 0, 0);
    inventoryBytes.push(0, 0, 0, 0); // possible OptionalPointPriorityInfo

    console.log(AIProperties);
    const creatureAIBytes = getConstructCreatureAIFunc(creatureId)(AIProperties);

    if (!inventoryEnd) {
        // Because we won't have an aiStatic to "edit into", we take the first in the scraped list
        // Find its end of inventory byte, and splice the rest into our AI to form a complete one.
        // This may cause some enemies to have some odd overrides if the scraped one has something special done to it
        ({ inventoryEnd } = parseTekiAI(aiStatic, generatorVersion, creatureId));
    }

    // if we construct our own creature AI we don't need to slice it out of the default
    if (creatureAIBytes.length) {
        inventoryBytes.push(...creatureAIBytes);
        inventoryEnd += creatureAIBytes.length;
    }
    // console.log("AI:", [...aiStatic.slice(0, 20), ...inventoryBytes, ...aiStatic.slice(inventoryEnd, aiStatic.length)]);
    // Splice our new inventory into a regular functioning AI
    return [...inventoryBytes, ...aiStatic.slice(inventoryEnd, aiStatic.length)];
};

//#region Creature-Specific
const constructKumaChappyAI = (AIProperties) => {
    const bytes = [];
    writeAsciiString(bytes, AIProperties.searchTagName);
    bytes.push(...floatBytes(AIProperties.giveUpDistance));
    return bytes;
};

const constructAmeBozuAI = (AIProperties) => {
    const bytes = [
        AIProperties.bAppearSearch ? 1 : 0, 0, 0, 0,
    ];
    writeAsciiString(bytes, AIProperties.searchTagName);
    bytes.push(
        ...floatBytes(AIProperties.hideTimeMin),
        ...floatBytes(AIProperties.hideTimeMax),
        AIProperties.bAppearFixedLocation ? 1 : 0, 0, 0, 0,
        ...floatBytes(AIProperties["searchDistance?"]),
        1
    );
    writeAsciiString(bytes, AIProperties.canAttackLevelFaceMessageName);
    return bytes;
};

const constructPanModokiAI = AIProperties => {
    const bytes = [];
    writeAsciiString(bytes, AIProperties.routeTag);
    writeAsciiString(bytes, AIProperties.hideAreaTag);
    return bytes;
};

const constructBabyAI = AIProperties => {
    const bytes = [
        AIProperties.bPatrolType ? 1 : 0, 0, 0, 0
    ];
    writeAsciiString(bytes, AIProperties.searchAreaTag);
    return bytes;
};

const constructBigUjinkoAI = AIProperties => {
    const bytes = [
        AIProperties.bPatrolType ? 1 : 0, 0, 0, 0,
        AIProperties.bNoBurrowType ? 1 : 0, 0, 0, 0,
    ];
    writeAsciiString(bytes, AIProperties.searchAreaTag);
    bytes.push(
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 72, 66,
        0, 0, 150, 67,
        0, 0, 52, 67,
        0, 0, 240, 65
    );
    return bytes;
};

const constructHageDamagumoAI = AIProperties => {
    const bytes = [];
    writeAsciiString(bytes, AIProperties.searchTagName);
    bytes.push(
        AIProperties.bStartSplineWalk ? 1 : 0, 0, 0, 0,
        ...floatBytes(AIProperties.searchAreaRest.center.X),
        ...floatBytes(AIProperties.searchAreaRest.center.Y),
        ...floatBytes(AIProperties.searchAreaRest.center.Z),
        ...floatBytes(AIProperties.searchAreaRest.halfHeight),
        ...floatBytes(AIProperties.searchAreaRest.radius),
        ...floatBytes(AIProperties.searchAreaRest.angle),
        ...floatBytes(AIProperties.searchAreaRest.sphereRadius),
        AIProperties.bStraddle ? 1 : 0, 0, 0, 0,
        AIProperties.bUniqueLife ? 1 : 0, 0, 0, 0,
        ...floatBytes(AIProperties.uniqueLife),
        AIProperties.bAlreadyAppear ? 1 : 0, 0, 0, 0,
        ...floatBytes(AIProperties.fightCameraChangeDistanceXY),
    );
    return bytes;
};

const constructFutakuchiAI = AIProperties => {
    const bytes = [
        parseInt(findObjectKeyByValue(RockModes, AIProperties.rockMode))
    ];
    writeAsciiString(bytes, AIProperties.searchTagName);
    bytes.push(
        ...floatBytes(AIProperties.splineSearchArea.center.X),
        ...floatBytes(AIProperties.splineSearchArea.center.Y),
        ...floatBytes(AIProperties.splineSearchArea.center.Z),
        ...floatBytes(AIProperties.splineSearchArea.halfHeight),
        ...floatBytes(AIProperties.splineSearchArea.radius),
        ...floatBytes(AIProperties.splineSearchArea.angle),
        ...floatBytes(AIProperties.splineSearchArea.sphereRadius),

        ...floatBytes(AIProperties.searchAreaAttack.center.X),
        ...floatBytes(AIProperties.searchAreaAttack.center.Y),
        ...floatBytes(AIProperties.searchAreaAttack.center.Z),
        ...floatBytes(AIProperties.searchAreaAttack.halfHeight),
        ...floatBytes(AIProperties.searchAreaAttack.radius),
        ...floatBytes(AIProperties.searchAreaAttack.angle),

        AIProperties.bFixCautionAreaCenter ? 1 : 0, 0, 0, 0,
        AIProperties.bDisappearVisibleOff ? 1 : 0, 0, 0, 0,

        ...floatBytes(AIProperties.searchAreaCaution.center.X),
        ...floatBytes(AIProperties.searchAreaCaution.center.Y),
        ...floatBytes(AIProperties.searchAreaCaution.center.Z),
        ...floatBytes(AIProperties.searchAreaCaution.halfHeight),
        ...floatBytes(AIProperties.searchAreaCaution.radius),
        ...floatBytes(AIProperties.searchAreaCaution.angle),
        ...floatBytes(AIProperties.searchAreaCaution.sphereRadius),
    );
    return bytes;
};

const constructFutakuchiAdultAI = AIProperties => {
    const bytes = [
        ...floatBytes(AIProperties.attackArea.center.X),
        ...floatBytes(AIProperties.attackArea.center.Y),
        ...floatBytes(AIProperties.attackArea.center.Z),
        ...floatBytes(AIProperties.attackArea.halfHeight),
        ...floatBytes(AIProperties.attackArea.radius),
        ...floatBytes(AIProperties.attackArea.angle),
        ...floatBytes(AIProperties.attackArea.sphereRadius),

        AIProperties.bSplineType ? 1 : 0, 0, 0, 0,

        ...floatBytes(AIProperties.splineAttackParam.attackLoopWaitSecMin),
        ...floatBytes(AIProperties.splineAttackParam.attackLoopWaitSecMax),
        ...floatBytes(AIProperties.splineAttackParam.attackSignSecMin),
        ...floatBytes(AIProperties.splineAttackParam.attackSignSecMax),
        ...floatBytes(AIProperties.splineAttackParam.attackInterval),
        ...floatBytes(AIProperties.splineAttackParam.attackIntervalSuccess),
    ];

    writeAsciiString(bytes, AIProperties.searchTagName);

    bytes.push(
        ...floatBytes(AIProperties.attackParam.attackLoopWaitSecMin),
        ...floatBytes(AIProperties.attackParam.attackLoopWaitSecMax),
        ...floatBytes(AIProperties.attackParam.attackSignSecMin),
        ...floatBytes(AIProperties.attackParam.attackSignSecMax),
        ...floatBytes(AIProperties.attackParam.attackInterval),
        ...floatBytes(AIProperties.attackParam.attackIntervalSuccess),

        AIProperties.bCreateIcicle ? 1 : 0, 0, 0, 0,
        ...floatBytes(AIProperties.escapeSecMin),
        ...floatBytes(AIProperties.escapeSecMax),

        ...floatBytes(AIProperties.searchAreaCaution.center.X),
        ...floatBytes(AIProperties.searchAreaCaution.center.Y),
        ...floatBytes(AIProperties.searchAreaCaution.center.Z),
        ...floatBytes(AIProperties.searchAreaCaution.halfHeight),
        ...floatBytes(AIProperties.searchAreaCaution.radius),
        ...floatBytes(AIProperties.searchAreaCaution.angle),
        ...floatBytes(AIProperties.searchAreaCaution.sphereRadius),
    );
    return bytes;
};

const constructAmeBozuAI_Dynamic = (aiDynamic, { AIProperties }) => [
    ...Array(20).fill(0),
    AIProperties.lifeTire ? 1 : 0, 0, 0, 0
];

//#region Actor
export const constructActor = (actor, mapId) => {
    logger.info(`Constructing a ${actor.creatureId} :: ${JSON.stringify(actor)}`);
    let entData = entityData[actor.creatureId];
    if (!entData && actor.infoType === InfoType.Treasure) {
        // Treasures (and all entities) that only appear as drops won't have any 
        // construction data, as there's no AGL data to scrape. Thus, we either need to
        // fully understand the full ASP, or use a sensible default. While I've charted the treasure bytes
        // there's a lot of facets to fully recreating the ASP beyond just AI. Thus, we'll just assign
        // the default data to this paints one, which seems to have a very basic bitch config.
        entData = entityData.OtaPaintsAQU;
    }
    if (!entData && actor.infoType === InfoType.Pikmin) {
        entData = entityData.PikminRed;
    }
    if (!entData && actor.creatureId === "NightBaby") {
        entData = entityData.Baby;
    }
    if (!entData && actor.creatureId === "Dodoro") {
        entData = entityData.Kochappy;
    }
    if (!entData && actor.creatureId === "PoisonKomush") {
        entData = entityData.PoisonKomushS;
    }
    if (!entData && actor.creatureId === "OnyonCarryRed") {
        entData = entityData.OnyonCarryYellow;
    }
    if (!entData && actor.infoType === InfoType.Item) {
        entData = entityData.Bomb;
    }

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
        AssetVersion: entData.AssetVersion[0],
        GeneratorVersion: entData.GeneratorVersion[0],
        GeneratorID: -1,
        SoftRefActorClass: {
            AssetPathName: getAssetPathFromId(actor.creatureId),
            SubPathString: 0
        },
        ExploreRateType: actor.exploreRateType,
        ActorVersion: 1,
        OutlineFolderPath: "Teki/Day", // idk if this is used for anything
        InitTransform: transforms,
        Transform: transforms,
        GenerateInfo: {
            EnableSave: true,
            DebugUniqueId: entData.DebugUniqueId[0], // Not unique - just grab one?
            ActorGlobalId: "None",
            GenerateNum: parseInt(actor.generateNum),
            GenerateRadius: parseFloat(actor.generateRadius),
            WakeCond: [],
            bOnceWakeCond: false,
            SleepCond: [],
            bNoChkCondWhenDead: false
        },
        RebirthInfo: {
            ActivityTime: actor.activityTime,
            RebirthType: actor.rebirthType,
            BirthDay: parseInt(actor.birthDay) || 0,
            DeadDay: parseInt(actor.deadDay) || 0,
            ExpireDay: 0,
            CurrNum: 1,
            ExpireProgress: 0,
            RebirthInterval: parseInt(actor.rebirthInterval) || 0,
            SaveFlag: entData.SaveFlag[0],
            MyID: -1,
            RefID: -1,
            RebirthInfoFlags: 0,
            bIgnoreFullFillBirthCondWhenFirstAndNightTime: false,
            EraseCond: actor.eraseCond.map(cond => ({
                ...cond,
                Condition: cond.Condition,
                CondInt: parseInt(cond.CondInt),
            })),
            BirthCond: actor.birthCond.map(cond => ({
                ...cond,
                Condition: cond.Condition,
                CondInt: parseInt(cond.CondInt),
            }))
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
                [key]: entData[key][0] // Grab the first thing from the dump data.
                // Aside from AI (drops), and CakAudioTable(?), they're the same per actor type 
            }), {}),
            AI: {
                Static: getConstructAIStaticFunc(actor.creatureId, actor.infoType)(actor.drops, entData.AI[0].Static, {
                    groupingRadius: actor?.groupingRadius,
                    ignoreList: actor?.ignoreList,
                    AIProperties: actor?.AIProperties || defaultAIProperties,
                    transform: transforms.Translation
                }, actor.generatorVersion || entData.GeneratorVersion[0], actor.creatureId),
                Dynamic: getConstructDynamicFunc(actor.creatureId, actor.infoType)(entData.AI[0].Dynamic, {
                    AIProperties: actor?.AIProperties
                })
            },
            PortalTrigger: {
                Static: getConstructPortalTriggerFunc(actor.infoType)(actor, entData.PortalTrigger[0].Static),
                Dynamic: entData.PortalTrigger[0].Dynamic
            },
            Life: {
                Static: entData.Life[0].Static,
                Dynamic: actor.Life ? writeLifeDynamic(actor.Life) : entData.Life[0].Dynamic
            },
            Affordance: {
                Static: actor.weight ? writeAffordanceWeight(actor.weight, entData.Affordance[0]) : entData.Affordance[0].Static,
                Dynamic: entData.Affordance[0].Dynamic
            },
            ActorParameter: {
                Static: getConstructActorParamFunc(actor.creatureId)(entData.ActorParameter[0].Static, actor.ActorParameter),
                Dynamic: entData.ActorParameter[0].Dynamic
            },
            NavMeshTrigger: {
                Static: getConstructNavMeshTriggerFunc(actor.creatureId)(entData.NavMeshTrigger[0].Static, actor.NavMeshTrigger),
                Dynamic: entData.NavMeshTrigger[0].Dynamic
            },
            SubAI: {
                Static: getConstructSubAIStaticFunc(actor.creatureId)({ parsed: actor.drops.parsedSubAI }, entData.SubAI[0].Static),
                Dynamic: []
            },
            WaterTrigger: {
                Static: getConstructWaterTriggerFunc(actor.creatureId)(entData.WaterTrigger[0].Static, actor.WaterTrigger),
                Dynamic: []
            }
        },
        SubLevelName: mapId.replace('Night', 'Area').replace(/-\d/, ''),
        TeamId: actor.creatureId.startsWith('NavMeshTrigger') ? TeamIDs.A : TeamIDs.No,
        GenerateFlags: entData.GenerateFlags[0],
        OriginalPhysicsRadiusZ: entData.OriginalPhysicsRadiusZ[0],
        LastNavPos: transforms.Translation,
        CarcassFlags: 0,
        RefOriginalGenID: -1
    };
};

//#region Extras
export const writeLifeDynamic = Life => {
    return [
        ...floatBytes(Life),
        ...floatBytes(Life)
    ];
};

export const writeAffordanceWeight = (weight, { Static }) => Static.toSpliced(Static.length - 4, 4, ...intToByteArr(weight));

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
        bytes.push(...intToByteArr(parseInt(drop.gameRulePermissionFlag), 2));
        bytes.push(drop.bSetTerritory ? 1 : 0, 0, 0, 0);
        if (drop.bSetTerritory) {
            bytes.push(...floatBytes(parseFloat(drop.X || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.Y || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.Z || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.halfHeight || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.radius || 0.0)));
        }
    });
};
