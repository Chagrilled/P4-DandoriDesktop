import { InfoType, PikminTypes, PikminPlayType, defaultAIProperties, PortalTypes, areaBaseGenVarBytes, TriggerDoorAIBytes, ValveWorkType, ValveAPBytes, TeamIDs, weirdAIEntities, ObjectAI_STRING_INDEX, ObjectAI_END_INDEX, InterpModes, RockModes, QueenAIType, Messages, PopObjectType, DDBPikminHeightType, AmeBozuWalkTypes, NavLinkDirection, PikminLeaves } from '../api/types';
import { default as entityData } from '../api/entityData.json';
import { floatToByteArr, intToByteArr, disableFlagsToInt, u64ToBytes } from '../utils/bytes';
import { setFloats, getNameFromAsset, getAssetPathFromId, findObjectKeyByValue, getObjectAIOffset } from '../utils';
import { parseGDMDrops, parseTekiAI, parsePotDrops, readInventory } from './reading';
import logger from '../utils/logger';
import { BrowserWindow } from 'electron';

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

// I have no idea why I made this modify the array rather than return the bytes to spread
const writeAsciiString = (bytes, string = "None") => {
    let lengthBytes = intToByteArr(string.length + 1);
    bytes.push(
        ...lengthBytes,
        ...string.split('').map(char => char.charCodeAt(0)),
        0
    );
};

// Writes a 7-float 28-byte area that usually defines searchAreaCaution/Rest areas
const writeArea = area => [
    ...writeVector(area.center),
    ...floatBytes(area.halfHeight ?? 180.0),
    ...floatBytes(area.radius ?? 100.0),
    ...floatBytes(area.angle ?? 100.0),
    ...floatBytes(area.sphereRadius ?? 180.0)
];

const bool = b => [
    b ? 1 : 0, 0, 0, 0
];

const writeVector = v => [
    ...floatBytes(v.X ?? 0.0),
    ...floatBytes(v.Y ?? 0.0),
    ...floatBytes(v.Z ?? 0.0),
];

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
    if (creatureId.includes('StickyFloorParts')) return defaultAI;
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
    if (creatureId === 'RopeFishing') return constructRopeFishingAI;
    if (['ZiplineSplineMesh', 'ZiplineAnother'].includes(creatureId)) return constructZiplineAI;
    if (creatureId === 'PressFloor') return constructPressFloorAI;
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
    if (creatureId.startsWith('Pellet')) return constructPelletAI_Dynamic;
    if (creatureId.includes('Gate')) return constructGateAI_Dynamic;
    return (ai) => ai;
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
    if (creatureId === 'DodoroEgg') return constructDodoroEggAI;
    if (creatureId === ('Queen')) return constructQueenAI;
    if (creatureId === ('DamagumoCannon')) return constructDamagumoCannonAI;
    if (creatureId === ('Yamashinju')) return constructYamashinjuAI;
    if (creatureId === 'BigChappy') return constructBigChappyAI;
    if (creatureId.includes('Kurage')) return constructKurageAI;
    return () => [];
};

export const getConstructSubAIStaticFunc = (creatureId) => {
    if (creatureId.includes('Tateana')) return constructActorSpawnerAI;
    return defaultAI;
};

//#region ActorParameter
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

export const getConstructPopPlaceFunc = creatureId => {
    if (creatureId.includes('PopPlaceActor')) return constructPopPlace;
    return (pp) => pp;
};

//#region ObjectAIParameter
const constructObjectAIParameter = (parsed, AIProperties, generatorVersion) => {
    const bytes = [parsed.length, 0, 0, 0];

    parsed.forEach(drop => {
        const slotBytes = [
            255, 255, 255, 255,
            255, 255, 255, 255
        ];
        slotBytes.push(
            ...intToByteArr(parseInt(drop.minDrops)),
            ...intToByteArr(parseInt(drop.maxDrops)),
            ...floatBytes(parseFloat(drop.dropChance)),
            ...bool(drop.bRegistGenerator),
        );

        if (drop.dropCondition && drop.dropCondition != 'None') {
            slotBytes.push(
                1, 0, 0, 0,
                parseInt(drop.dropCondition),
                ...intToByteArr(parseInt(drop.dropCondInt)),
            );
            writeAsciiString(slotBytes, drop.dropCondName);
            slotBytes.push(0);
        }
        else slotBytes.push(0, 0, 0, 0);
        writeAsciiString(slotBytes, drop.assetName);

        writeAsciiString(slotBytes, drop.customParameter);

        slotBytes.push(
            ...floatBytes(parseFloat(drop.customFloatParam)),
            ...intToByteArr(parseInt(drop.gameRulePermissionFlag), 2),
            ...bool(drop.bSetTerritory)
        );

        if (drop.bSetTerritory) {
            slotBytes.push(
                ...writeVector(drop),
                ...floatBytes(drop.halfHeight || 0.0),
                ...floatBytes(drop.radius || 0.0)
            );
        }
        bytes.push(...slotBytes);
    });
    bytes.push(255, 255, 255, 255);
    writeAsciiString(bytes, AIProperties.boneName);

    ["localOffset", "vel", "randVel"].forEach(prop => bytes.push(...writeVector(AIProperties[prop])));

    bytes.push(
        ...intToByteArr(parseInt(AIProperties.dropOption), 2),
        ...intToByteArr(parseInt(AIProperties.fixedHotExtractDropNum)),
        ...bool(AIProperties.bOverrideInitLocation),
        ...writeVector(AIProperties.overrideInitLocation),
        0, 0, 0, 0, // DebugUniqueIds always 0 in objects
    );

    const offset = getObjectAIOffset(generatorVersion);
    if (offset === 4) bytes.push(...bool(AIProperties.bEnableFreezeBothDrop));
    bytes.push(
        ...bool(AIProperties.bIgnoreLaterTask),
        ...bool(AIProperties.bIgnoreCompleteUI),
        ...writeVector(AIProperties.completeUIOffset),
        ...bool(AIProperties.bEnableOptimizeWaterBoxContext),
        ...bool(AIProperties.bDisableSoftEdge),
        ...bool(AIProperties.bDisableSoftEdgeOnlyFrom),
        ...bool(AIProperties.bDisableSoftEdgeOnlyTo),
    );
    writeAsciiString(bytes, AIProperties.linkNarrowSpaceBoxID);
    writeAsciiString(bytes, AIProperties.linkWarpTriggerID);
    writeAsciiString(bytes, AIProperties.navMeshTriggerID);
    bytes.push(
        AIProperties.escapePoints.length,
        ...AIProperties.escapePoints.map(ep => writeVector(ep)).flat(),
        ...bool(AIProperties.bEnableOptionalPoint),
        ...intToByteArr(AIProperties.optionalPointOffsets.length),
        ...AIProperties.optionalPointOffsets.map(opo => writeVector(opo)).flat(),
        ...intToByteArr(AIProperties.optionalPointPriorityInfo.length),
        ...AIProperties.optionalPointPriorityInfo.map(opo => intToByteArr(opo)).flat(),
    );
    return bytes;
};

//#region WaterBoxes
const constructWaterBoxNavAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    const bytes = [
        ...aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion))
    ];
    bytes.push(...bool(AIProperties.bUseHappyOnly));
    bytes.push(...writeVector(AIProperties.rightOffset));
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
    bytes.push(...bool(AIProperties.bUseSunMeter));
    bytes.push(0, 0, 0, 63);
    bytes.push(...bool(AIProperties.bPlayDemo));
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
    bytes.push(...bool(wt.bDisableSink));
    return bytes;
};

const constructPopPlace = (pp) => {
    const bytes = [
        parseInt(findObjectKeyByValue(PopObjectType, pp.popObjectType)),
        ...intToByteArr(pp.groupId),
        ...intToByteArr(pp.maxObjectNumInRange),
        0, 0, 0, 0,
        ...bool(pp.isTerritorySetting),
        ...bool(pp.bNoSearchOuterTerritory),
        ...writeVector(pp.territory),
        ...floatBytes(parseFloat(pp.territory.halfHeight)),
        ...floatBytes(parseFloat(pp.territory.radius)),
        0,
    ];
    writeAsciiString(bytes, pp.string);
    bytes.push(
        ...pp.spareBytes,
        ...bool(pp.isOtakaraSetting),
        0, 0, 0, 0,
        ...bool(pp.bChangeCrushImpactMoveDir),
        ...bool(pp.bReceiveCrushImpactEvent),
        ...bool(pp.bSendCrushImpactEvent),
        ...floatBytes(pp.crushImpactMoveRot.pitch),
        ...floatBytes(pp.crushImpactMoveRot.yaw),
        ...floatBytes(pp.crushImpactMoveRot.roll),
        ...bool(pp.bUseCrushDDB),
        ...(pp.bUseCrushDDB ? writeVector(pp.crushDDBPoint) : []),
        parseInt(findObjectKeyByValue(DDBPikminHeightType, pp.DDBPikminHeightType)),
        ...NONE_BYTES,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    );
    return bytes;
};

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
        ...bool(AIProperties.bEnableWarpActor),
        ...writeVector(AIProperties.warpOffset),
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
            ...writeVector(point.outVal),
            ...writeVector(point.arriveTangent),
            ...writeVector(point.leaveTangent),
            ...floatBytes(point.rotation.pitch),
            ...floatBytes(point.rotation.yaw),
            ...floatBytes(point.rotation.roll),
            ...writeVector(point.scale),
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
    ...writeVector(AIProperties.navLinkRight),
];

const constructDownWallAI = (_, aiStatic, { AIProperties }, generatorVersion) => [
    ...aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion)),
    ...bool(AIProperties.bDisableAirWall)
];

const constructStringAI = (_, aiStatic, { AIProperties }, generatorVersion) => [
    ...aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion)),
    ...floatBytes(AIProperties.fallHeight)
];

const constructStringAI_Dynamic = (aiStatic, { AIProperties }) => [
    ...Array(12).fill(0),
    ...bool(AIProperties.bFalled)
];

//#region Circulators
const constructCirculatorAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    const bytes = [
        ...aiStatic.slice(0, ObjectAI_END_INDEX + getObjectAIOffset(generatorVersion))
    ];
    writeAsciiString(bytes, AIProperties.switchID);
    bytes.push(...bool(AIProperties.bWindLong));
    bytes.push(...writeVector(AIProperties.navLinkRight));
    return bytes;
};

const constructCirculatorAI_Dynamic = (aiDynamic, { AIProperties }) => [
    ...Array(12).fill(0),
    ...bool(AIProperties.bRotateDefault)
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
    ...constructObjectAIParameter([], AIProperties, generatorVersion),
    ...bool(AIProperties.bSetCrystal),
    ...floatBytes(AIProperties.stopQueenDistXY),
    1, 0, 0, 0,
    ...writeVector(AIProperties.navLinkLeft),
    ...writeVector(AIProperties.navLinkRight),
    ...floatBytes(AIProperties.leftProjectHeight),
    ...floatBytes(AIProperties.maxFallDownLength),
    parseInt(findObjectKeyByValue(NavLinkDirection, AIProperties.direction)),
    ...floatBytes(AIProperties.snapRadius),
    ...floatBytes(AIProperties.snapHeight),
    255, 255, 255, 255,
    AIProperties.bUseSnapHeight ? 1 : 0,
    AIProperties.bSnapToCheapestArea ? 1 : 0
];

//#region NavMeshTriger
const constructNavMeshTrigger = (trigger, triggerProperties) => {
    const bytes = [
        ...writeVector(triggerProperties.overlapBoxExtent),
        ...writeVector(triggerProperties.navCollBoxExtent),
    ];

    if (typeof triggerProperties.CIDList === 'string') triggerProperties.CIDList = JSON.parse(triggerProperties.CIDList);
    bytes.push(triggerProperties.CIDList.length, 0, 0, 0);
    triggerProperties.CIDList.forEach(actor => writeAsciiString(bytes, actor));

    writeAsciiString(bytes, triggerProperties.navMeshTriggerID);
    return bytes;
};

//#region StickyFloor
const constructStickyFloorAI = ({ parsed }, aiStatic, { AIProperties }, generatorVersion) => [
    ...constructObjectAIParameter(parsed, AIProperties, generatorVersion),
    ...bool(AIProperties.bAutoSpawnMush)
];

//#region Valve
const constructValveAI_Dynamic = (aiDynamic, { AIProperties }) => {
    return [
        ...aiDynamic.slice(0, 12),
        parseInt(AIProperties.piecePutNum),
        ...aiDynamic.slice(13, aiDynamic.length)
    ];
};

const constructValveAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    let bytes = constructObjectAIParameter([], AIProperties, generatorVersion);
    bytes.push(
        ...floatBytes(AIProperties.entranceOffset),
        ...intToByteArr(AIProperties.piecePerPanel)
    );
    writeAsciiString(bytes, AIProperties.valveID);
    bytes.push(parseInt(findObjectKeyByValue(ValveWorkType, AIProperties.builtWorkType)), 0, 0, 0);
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
    bytes.push(...bool(AIProperties.bDeactivateByExit));
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
    bytes.push(...bool(AIProperties.bSprinklerOnly));
    return bytes;
};

//#region Gate
const constructGateAI = ({ parsed, rareDrops }, aiStatic, { AIProperties }, generatorVersion) => {
    let bytes = constructObjectAIParameter(parsed, AIProperties, generatorVersion);

    // then tack on the second inventory
    bytes.push(rareDrops.length, 0, 0, 0);
    constructInventory(rareDrops, bytes);
    return bytes;
};

const constructGateAI_Dynamic = (aiDynamic, { AIProperties }) => [
    ...Array(12).fill(0),
    255, 255, 255, 255,
    ...(AIProperties.startValidWallIndex == -1 ? [255, 255, 255, 255] : intToByteArr(AIProperties.startValidWallIndex)),
    0, 0, 0, 0
];

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
    const playPrefix = PortalTrigger.demoPlayParamEnter === 'None' ? '' : `/Game/Carrot4/Demo/PlayParam/Common/${PortalTrigger.demoPlayParamEnter}.`;
    const exitPrefix = PortalTrigger.demoPlayParamExit === 'None' ? '' : `/Game/Carrot4/Demo/PlayParam/Common/${PortalTrigger.demoPlayParamExit}.`;

    writeAsciiString(bytes, `${playPrefix}${PortalTrigger.demoPlayParamEnter}`);
    bytes.push(0, 0, 0, 0); // dunno what this is
    writeAsciiString(bytes, `${exitPrefix}${PortalTrigger.demoPlayParamExit}`);
    bytes.push(0, 0, 0, 0); // or this
    if (PortalTrigger.checkPointLevelNames) {
        bytes.push(PortalTrigger.checkPointLevelNames.length, 0, 0, 0);
        PortalTrigger.checkPointLevelNames.forEach(level => writeAsciiString(bytes, level));
    }
    else bytes.push(0, 0, 0, 0);
    bytes.push(...intToByteArr(parseInt(PortalTrigger.toBaseCampId)));
    bytes.push(...bool(PortalTrigger.bInitialPortalMove));
    bytes.push(...bool(PortalTrigger.bDeactivateByExit));
    bytes.push(0, 0, 250, 67); // this float seems regular
    bytes.push(...floatBytes(parseFloat(PortalTrigger.playAnimDist)));
    bytes.push(0, 0, 0, 0);
    bytes.push(parseInt(PortalTrigger.pankuzuPriority), 0, 0, 0);
    bytes.push(...intToByteArr(parseInt(disableFlagsToInt(PortalTrigger.disablePikminFlags))));
    bytes.push(...bool(PortalTrigger.bDisableIsFlareGuard));
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

    bytes.push(
        parseInt(AIProperties.spawnNum), 0, 0, 0,
        ...floatBytes(parseFloat(AIProperties.spawnRadius)),
        ...floatBytes(parseFloat(AIProperties.noSpawnRadius)),
        parseInt(findObjectKeyByValue(PikminTypes, AIProperties.pikminType)),
        ...bool(AIProperties.bMabikiEnable),
        parseInt(findObjectKeyByValue(PikminLeaves, AIProperties.spawnHeadLeaves)),
        ...intToByteArr(AIProperties.mabikiNumFromFollow),
        ...intToByteArr(AIProperties.mabikiNumFromAll),
        ...bool(AIProperties.bMabikiPongashi),
        ...intToByteArr(AIProperties.pongashiChangeColorFollowNum),
        parseInt(findObjectKeyByValue(PikminTypes, AIProperties.pongashiChangeColorFromFollow)),
        ...bool(AIProperties.bReservedBirth),
        ...bool(AIProperties.bDisableForcePongashi),
        ...bool(AIProperties.bProWrestling),
        parseInt(findObjectKeyByValue(PikminTypes, AIProperties.pongashiColor)),
    );

    writeAsciiString(bytes, AIProperties.noraIdlingPreset);
    bytes.push(
        ...bool(AIProperties.bEnablePointLight),
        parseInt(findObjectKeyByValue(PikminPlayType, AIProperties.groupIdlingType)),
        ...bool(AIProperties.bExcludesFue),
        ...writeVector(AIProperties.mabikiPongashiOffset),
        ...floatBytes(AIProperties.aiWaitTime),
        parsed.length, 0, 0, 0,
    );


    parsed.forEach(drop => {
        writeAsciiString(bytes, drop.assetName);
        const actorName = getNameFromAsset(drop.assetName);

        if (actorName.includes("Survivor")) { // Push custom sleep params if survivor
            writeAsciiString(bytes, CustomParameterOverrides[actorName]);
        }
        else bytes.push(...NONE_BYTES);

        bytes.push(...floatBytes(parseFloat(drop.customFloatParam)));
        bytes.push(...intToByteArr(parseInt(drop.gameRulePermissionFlag), 2));
        bytes.push(...bool(drop.bSetTerritory));
        if (drop.bSetTerritory) {
            bytes.push(...writeVector(drop));
            bytes.push(...floatBytes(parseFloat(drop.halfHeight || 0.0)));
            bytes.push(...floatBytes(parseFloat(drop.radius || 0.0)));
        }
    });

    bytes.push(...bool(AIProperties.bEnableOptionalPoint));
    if (AIProperties.optionalPointOffsets) {
        bytes.push(AIProperties.optionalPointOffsets.length, 0, 0, 0);
        AIProperties.optionalPointOffsets.forEach(offset => {
            bytes.push(...writeVector(offset));
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
const constructOtakaraAI = (_, aiStatic, { AIProperties }) => {
    const bytes = [
        aiStatic[0], 0, 0, 0,
        ...bool(AIProperties.bChangeCrushImpactMoveDir),
        ...bool(AIProperties.bReceiveCrushImpactEvent),
        ...bool(AIProperties.bSendCrushImpactEvent),
        ...writeVector(AIProperties.crushImpactMoveRot),
        0, 0, 0, 0, 0, // there are 5 here
        ...bool(AIProperties.bDDBSurvivorLeaf),
        ...bool(AIProperties.bEnableOptionalPoint),
    ];

    if (AIProperties.bEnableOptionalPoint) {
        bytes.push(AIProperties.optionalPointOffsets.length, 0, 0, 0);
        AIProperties.optionalPointOffsets.forEach(offset => bytes.push(...writeVector(offset)));
    }
    else bytes.push(0, 0, 0, 0);

    bytes.push(
        ...intToByteArr(AIProperties.optionalPointPriorityInfo.length),
        ...AIProperties.optionalPointPriorityInfo.map(opo => intToByteArr(opo)).flat(),
    );

    return bytes;
};

const constructSurvivorAI_Dynamic = (aiDynamic, { AIProperties }) => {
    const bytes = [];
    writeAsciiString(bytes, AIProperties.npcInfoKey);
    bytes.push(...constructOtakaraAI_Dynamic(aiDynamic.slice(aiDynamic[0] + 4, aiDynamic.length), { AIProperties }));
    return bytes;
};

const constructOtakaraAI_Dynamic = (aiDynamic, { AIProperties }) => [
    ...bool(AIProperties.bCanFall),
    ...bool(AIProperties.bEnableChangeInitTransformAfterFalling),
    ...writeVector(AIProperties.rotation),
    ...floatBytes(parseFloat(AIProperties.rotation.W)),
    ...writeVector(AIProperties.translation),
    ...aiDynamic.slice(9 * 4, aiDynamic.length) // get everything after what we know
];

const constructPelletAI_Dynamic = (aiDynamic, { AIProperties }) => [parseInt(findObjectKeyByValue(PikminTypes, AIProperties.colour))];

//#region RopeFishing
const constructRopeFishingAI = ({ parsed }, aiStatic, { AIProperties }, generatorVersion) => [
    ...constructObjectAIParameter(parsed, AIProperties, generatorVersion),
    ...floatBytes(parseFloat(AIProperties.jumpForceXY)),
    ...floatBytes(parseFloat(AIProperties.jumpForceZ)),
    ...floatBytes(parseFloat(AIProperties.ropeAng)),
    ...intToByteArr(parseInt(AIProperties.manualWorkNum))
];

const constructZiplineAI = (_, aiStatic, { AIProperties }, generatorVersion) => [
    ...constructObjectAIParameter([], AIProperties, generatorVersion),
    ...writeVector(AIProperties.goalOffset),
    ...floatBytes(parseFloat(AIProperties.startTargetSpeed)),
    ...floatBytes(parseFloat(AIProperties.maxMoveSpeed)),
    ...floatBytes(parseFloat(AIProperties.minMoveSpeed)),
    ...floatBytes(parseFloat(AIProperties.acceleration)),
    ...floatBytes(parseFloat(AIProperties.deceleration)),
    ...constructSplinePoints(AIProperties.splinePoints)
];

const constructPressFloorAI = (_, aiStatic, { AIProperties }, generatorVersion) => {
    const bytes = [
        ...constructObjectAIParameter([], AIProperties, generatorVersion),
        ...floatBytes(AIProperties.height),
        ...floatBytes(AIProperties.maxHeightSpeed),
        ...floatBytes(AIProperties.radius),
        ...floatBytes(AIProperties.maxRadiusSpeed),
    ];
    writeAsciiString(bytes, AIProperties.waterBoxId);
    bytes.push(
        ...writeVector(AIProperties.createNavBoxRange),
        ...writeVector(AIProperties.createNavBoxOffset)
    );
    return bytes;
};


//#region ActorSpawner
const constructActorSpawnerAI = ({ parsed: [drop] }, aiStatic) => {
    const bytes = [];
    // These are some ordering of avatar, pikmin, both, and something else 
    bytes.push(...bool(drop.avatar));
    bytes.push(...bool(drop.pikmin));
    bytes.push(...bool(drop.avatarAndPikmin));
    bytes.push(...bool(drop.carry));
    bytes.push(...bool(drop.bGenseiControl));
    bytes.push(...bool(drop.bNotOverlap));
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

    bytes.push(...bool(drop.bSpawnAngRand));
    bytes.push(...floatBytes(drop.spawnAng));
    bytes.push(...floatBytes(drop.spawnVelX));
    bytes.push(...floatBytes(drop.spawnVelY));

    // infiniteSpawn
    bytes.push(parseInt(drop.infiniteSpawn) ? 1 : 0, 0, 0, 0);
    // spawnInterval
    bytes.push(...floatBytes(drop.spawnInterval));
    // spawnLimit
    bytes.push(...intToByteArr(parseInt(drop.maxAreaNum)));
    bytes.push(...intToByteArr(parseInt(drop.maxSpawnNum)));
    /// bRandomRotation
    bytes.push(parseInt(drop.randomRotation) ? 1 : 0, 0, 0, 0);
    //bNoDropItem
    bytes.push(parseInt(drop.noDropItem) ? 1 : 0, 0, 0, 0);
    // assetPath
    writeAsciiString(bytes, drop.assetName);
    writeAsciiString(bytes, drop.customParameter);
    bytes.push(...floatBytes(drop.customFloatParameter));
    bytes.push(...intToByteArr(parseInt(drop.gameRulePermissionFlag), 2));
    bytes.push(...bool(drop.bSetTerritory));
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
        ...writeVector(AIProperties.territory),
        ...floatBytes(AIProperties.territory.halfHeight),
        ...floatBytes(AIProperties.territory.radius),
        parsed.length, 0, 0, 0
    ];

    parsed.forEach(drop => {
        const slotBytes = u64ToBytes(BigInt(drop.id));
        slotBytes.push(
            ...intToByteArr(parseInt(drop.minDrops)),
            ...intToByteArr(parseInt(drop.maxDrops)),
            ...floatBytes(parseFloat(drop.dropChance)),
            ...bool(drop.bRegistGenerator),
        );

        if (drop.dropCondition && drop.dropCondition != 'None') {
            slotBytes.push(
                1, 0, 0, 0,
                parseInt(drop.dropCondition),
                ...intToByteArr(parseInt(drop.dropCondInt)),
            );
            writeAsciiString(slotBytes, drop.dropCondName);
            slotBytes.push(0);
        }
        else slotBytes.push(0, 0, 0, 0);
        writeAsciiString(slotBytes, drop.assetName);

        writeAsciiString(slotBytes, drop.customParameter);

        slotBytes.push(
            ...floatBytes(parseFloat(drop.customFloatParam)),
            ...intToByteArr(parseInt(drop.gameRulePermissionFlag), 2),
            ...bool(drop.bSetTerritory)
        );

        if (drop.bSetTerritory) {
            slotBytes.push(
                ...writeVector(drop),
                ...floatBytes(parseFloat(drop.halfHeight || 0.0)),
                ...floatBytes(parseFloat(drop.radius || 0.0))
            );
        }
        inventoryBytes.push(...slotBytes);
    });
    inventoryBytes.push(255, 255, 255, 255);
    writeAsciiString(inventoryBytes, AIProperties.boneName);

    ["localOffset", "vel", "randVel"].forEach(prop => {
        inventoryBytes.push(
            ...writeVector(AIProperties[prop])
        );
    });

    inventoryBytes.push(
        ...intToByteArr(parseInt(AIProperties.dropOption), 2),
        ...intToByteArr(parseInt(AIProperties.fixedHotExtractDropNum)),
        ...bool(AIProperties.bOverrideInitLocation),
        ...writeVector(AIProperties.overrideInitLocation),
        parsed.length, 0, 0, 0,
    );

    parsed.forEach(drop => {
        inventoryBytes.push(...u64ToBytes(BigInt(drop.id)));
    });

    const offset = getObjectAIOffset(generatorVersion);
    if (offset) inventoryBytes.push(...bool(AIProperties.bEnableFreezeBothDrop));
    inventoryBytes.push(
        ...bool(AIProperties.bCalcSearchAreaOtakaraCarryWithTerritory),
        ...writeArea(AIProperties.searchAreaOtakaraCarry),
        ...floatBytes(AIProperties.invasionStartTimeRatio),
        ...bool(AIProperties.bNotifyCarryNearProWrestlingPikmin),
        ...bool(AIProperties.bEnableCullSearchEnemy),
        ...bool(AIProperties.bUseActorLastRenderTime),
        ...bool(AIProperties.bEnableOptionalPoint)
    );

    inventoryBytes.push(AIProperties.optionalPointOffsets.length, 0, 0, 0);
    if (AIProperties.optionalPointOffsets.length) {
        AIProperties.optionalPointOffsets.forEach(offset => {
            inventoryBytes.push(...writeVector(offset));
        });
    }

    inventoryBytes.push(AIProperties.optionalPointPriorityInfo.length, 0, 0, 0);
    if (AIProperties.optionalPointPriorityInfo.length) {
        AIProperties.optionalPointPriorityInfo.forEach(offset => {
            inventoryBytes.push(...intToByteArr(offset));
        });
    }

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
    // If we haven't constructed creature AI ourselves, or have left params out,
    // grab the rest of the static. This definitely breaks for variable length strings though
    // oh well
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
        ...bool(AIProperties.bAppearSearch),
    ];
    writeAsciiString(bytes, AIProperties.searchTagName);
    bytes.push(
        ...floatBytes(AIProperties.hideTimeMin),
        ...floatBytes(AIProperties.hideTimeMax),
        ...bool(AIProperties.bAppearFixedLocation),
        ...floatBytes(AIProperties.appearSearchRadius),
        parseInt(findObjectKeyByValue(AmeBozuWalkTypes, AIProperties.walkType))
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
        ...bool(AIProperties.bPatrolType)
    ];
    writeAsciiString(bytes, AIProperties.searchTagName);
    return bytes;
};

const constructBigUjinkoAI = AIProperties => {
    const bytes = [
        ...bool(AIProperties.bNoBurrowType),
        ...bool(AIProperties.bPatrolType),
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

const constructDodoroEggAI = AIProperties => {
    const bytes = [];
    writeAsciiString(bytes, AIProperties.splineRoutePathTag);
    bytes.push(
        ...floatBytes(AIProperties.spawnTimer),
        ...bool(AIProperties.bUseParentDropInfo),
        ...bool(AIProperties.bOnceDodoroAppearDemo),
        ...floatBytes(AIProperties.spawnTimerAfterDemo)
    );
    writeAsciiString(bytes, AIProperties.subSplineRoutePathTag);
    bytes.push(...intToByteArr(AIProperties.refObstacleGenID));
    return bytes;
};

const constructQueenAI = AIProperties => [
    parseInt(findObjectKeyByValue(QueenAIType, AIProperties.queenAIType)),
    ...floatBytes(AIProperties.rockBallHeightMin),
    ...floatBytes(AIProperties.rockBallHeightMax),
    ...floatBytes(AIProperties.rockBallSpawnRadius),
    ...floatBytes(AIProperties.rockBallSpawnOffsetY),
    ...floatBytes(AIProperties.rockBallHeightMinInOppositeSide),
    ...floatBytes(AIProperties.rockBallHeightMaxInOppositeSide),
    ...floatBytes(AIProperties.rockBallSpawnRadiusInOppositeSide),
    ...floatBytes(AIProperties.bornSpeed),
    ...floatBytes(AIProperties.childSearchRadius),
    ...floatBytes(AIProperties.fallBabySpawnRadius),
    ...intToByteArr(AIProperties.fallBabySpawnNum),
    ...floatBytes(AIProperties.flickDistXY)
];

const constructDamagumoCannonAI = (AIProperties) => {
    const bytes = [];
    writeAsciiString(bytes, AIProperties.searchTagName);
    const areas = ["searchAreaGoToHome", "searchAreaCaution", "searchAreaRest"];

    bytes.push(
        ...bool(AIProperties.bStraddle),
        ...bool(AIProperties.bAlreadyAppear),
        ...areas.map(a => writeArea(AIProperties[a])).flat()
    );
    return bytes;
};

const constructYamashinjuAI = (AIProperties) => {
    const bytes = [
        ...floatBytes(AIProperties.dropPearlScale)
    ];
    writeAsciiString(bytes, AIProperties.dropActor);
    writeAsciiString(bytes, AIProperties.customParameter);
    bytes.push(...Array(14).fill(0));
    return bytes;
};

const constructBigChappyAI = (AIProperties) => [
    ...bool(AIProperties.bHideEnter),
    ...writeVector(AIProperties.hideOffset),
];

const constructKurageAI = (AIProperties) => [
    ...floatBytes(AIProperties.eatOnBirthRange),
    ...bool(AIProperties.bFallStart),
    ...writeArea(AIProperties.searchAreaRest),
    ...bool(AIProperties.ownerSubComponentFlag)
];

const constructHageDamagumoAI = AIProperties => {
    const bytes = [];
    writeAsciiString(bytes, AIProperties.searchTagName);
    bytes.push(
        ...bool(AIProperties.bStraddle),
        ...writeArea(AIProperties.searchAreaRest),
        ...bool(AIProperties.bSplineWalkStart),
        ...bool(AIProperties.bUniqueLife),
        ...floatBytes(AIProperties.uniqueLife),
        ...bool(AIProperties.bAlreadyAppear),
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
        ...writeArea(AIProperties.splineSearchArea),
        ...writeVector(AIProperties.searchAreaAttack.center),
        ...floatBytes(AIProperties.searchAreaAttack.halfHeight),
        ...floatBytes(AIProperties.searchAreaAttack.radius),
        ...floatBytes(AIProperties.searchAreaAttack.angle),
        // DOES NOT HAVE A SPHERERADIUS

        ...bool(AIProperties.bFixCautionAreaCenter),
        ...bool(AIProperties.bDisappearVisibleOff),

        ...writeArea(AIProperties.searchAreaCaution),
    );
    return bytes;
};

const constructFutakuchiAdultAI = AIProperties => {
    const bytes = [
        ...writeArea(AIProperties.attackArea),
        ...bool(AIProperties.bSplineType),
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

        ...bool(AIProperties.bCreateIcicle),
        ...floatBytes(AIProperties.escapeSecMin),
        ...floatBytes(AIProperties.escapeSecMax),

        ...writeArea(AIProperties.searchAreaCaution),
    );
    return bytes;
};

const constructAmeBozuAI_Dynamic = (aiDynamic, { AIProperties }) => [
    ...Array(20).fill(0),
    ...floatBytes(AIProperties.lifeTire)
];

//#region Actor
export const constructActor = (actor, mapId) => {
    logger.info(`Constructing a ${actor.creatureId} :: ${JSON.stringify(actor)}`);
    let entData = entityData[actor.creatureId] || defaultConstructionData(actor);

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
            CurrNum: parseInt(actor.generateNum),
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
                }, entData.GeneratorVersion[0], actor.creatureId),
                Dynamic: getConstructDynamicFunc(actor.creatureId, actor.infoType)(entData.AI[0].Dynamic, {
                    AIProperties: actor?.AIProperties
                })
            },
            PortalTrigger: {
                Static: getConstructPortalTriggerFunc(actor.infoType)(actor, entData.PortalTrigger[0].Static),
                Dynamic: entData.PortalTrigger[0].Dynamic
            },
            Life: {
                Static: actor.infoType === InfoType.Creature ? writeModdedLife(actor.moddedLife) : entData.Life[0].Static,
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
            },
            PopPlace: {
                Static: getConstructPopPlaceFunc(actor.creatureId)(actor.PopPlace),
                Dynamic: []
            }
        },
        SubLevelName: mapId.replace('Night', 'Area').replace(/-\d/, ''),
        TeamId: actor.teamId,
        GenerateFlags: entData.GenerateFlags[0],
        OriginalPhysicsRadiusZ: entData.OriginalPhysicsRadiusZ[0],
        LastNavPos: transforms.Translation,
        CarcassFlags: 0,
        RefOriginalGenID: -1
    };
};

//#region Extras
export const writeLifeDynamic = Life => [
    ...floatBytes(Life.maxLife),
    ...floatBytes(Life.life)
];

export const writeModdedLife = life => [

    ...(life.maxLife ? floatBytes(life.maxLife) : []),
    ...(life.startingLife ? floatBytes(life.startingLife) : []),
    ...(life.regenPercent ? floatBytes(life.regenPercent) : [])
];

export const writeAffordanceWeight = (weight, { Static }) => Static.toSpliced(Static.length - 4, 4, ...intToByteArr(weight));

const constructInventory = (drops, bytes) => {
    drops.forEach(drop => {
        bytes.push(255, 255, 255, 255, 255, 255, 255, 255); // This is the start of each GDM item
        bytes.push(drop.minDrops, 0, 0, 0);
        bytes.push(drop.maxDrops, 0, 0, 0);
        bytes.push(...floatBytes(parseFloat(drop.dropChance)));
        bytes.push(...bool(drop.bRegistGenerator));
        if (drop.dropCondition && drop.dropCondition != 'None') {
            bytes.push(
                1, 0, 0, 0,
                parseInt(drop.dropCondition),
                ...intToByteArr(parseInt(drop.dropCondInt)),
            );
            writeAsciiString(bytes, drop.dropCondName);
            bytes.push(0);
        }
        else bytes.push(0, 0, 0, 0);
        writeAsciiString(bytes, drop.assetName);

        writeAsciiString(bytes, drop.customParameter);

        bytes.push(...floatBytes(parseFloat(drop.customFloatParam)));
        bytes.push(...intToByteArr(parseInt(drop.gameRulePermissionFlag), 2));
        bytes.push(...bool(drop.bSetTerritory));
        if (drop.bSetTerritory) {

            bytes.push(...writeVector(drop));
            bytes.push(...floatBytes(drop.halfHeight || 0.0));
            bytes.push(...floatBytes(drop.radius || 0.0));
        }
    });
};

export const defaultConstructionData = actor => {
    // Treasures (and all entities) that only appear as drops won't have any 
    // construction data, as there's no AGL data to scrape. Thus, we either need to
    // fully understand the full ASP, or use a sensible default. While I've charted the treasure bytes
    // there's a lot of facets to fully recreating the ASP beyond just AI. Thus, we'll just assign
    // some similar default entities that DO have data and hope things turn out ok.
    if (actor.infoType === InfoType.Treasure) return entityData.OtaPaintsAQU;
    if (actor.infoType === InfoType.Pikmin) return entityData.PikminRed;
    if (actor.creatureId === "NightBaby") return entityData.Baby;
    if (actor.creatureId === "Dodoro") return entityData.Kochappy;
    if (actor.creatureId === "PoisonKomush") return entityData.PoisonKomushS;
    if (actor.creatureId === "OnyonCarryRed") return entityData.OnyonCarryYellow;
    if (actor.infoType === InfoType.Item) return entityData.Bomb;
    if (actor.creatureId === "Pellet10") return entityData.Pellet5;
    if (actor.creatureId === 'KinkaiPick') return entityData.PiecePick;
    BrowserWindow.getAllWindows().map(w => w.webContents.send(Messages.ERROR, `${actor.creatureId} doesn't have construction data or an override - report this to Noodl`));
    return undefined;
};
