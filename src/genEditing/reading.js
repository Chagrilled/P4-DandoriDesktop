import { InfoType, PikminTypes, PikminPlayType, PortalTypes, ValveWorkType, weirdAIEntities, InterpModes, RockModes } from '../api/types';
import { findSequenceStartIndex, getObjectAIOffset } from '../utils';
import { bytesToInt, getDisableSettings } from '../utils/bytes';
import { NONE_BYTES } from './constructing';

//#region Stocks
const readAsciiString = (bytes, index) => {
    let stringLength = bytes[index];
    index += 4;
    const asciiString = bytes.slice(index, index + stringLength - 1); // We don't want the null terminator in the string
    return String.fromCharCode.apply(null, asciiString);
};

const readFloat = (bytes) => parseFloat(new Float32Array(new Uint8Array(bytes).buffer)[0].toFixed(3));

const readInventory = (drops, index, invSize) => {
    const parsed = [];
    // if (invSize == 0) index += 4; // I decided I didn't need this because idk - I think with or without an inv you end up at the same place
    for (let i = 0; i < invSize; i++) {
        const slot = {};
        slot.id = i + 1;
        index += 8; // Skip the two -1 u32s at the start of each item
        slot.minDrops = drops[index];
        index += 4;
        slot.maxDrops = drops[index];
        index += 4;
        slot.dropChance = readFloat(drops.slice(index, index += 4));
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

        slot.assetName = readAsciiString(drops, index);
        index += drops[index] + 4;

        index += drops[index] + 4; // CustomParameter can be None, SVSleep000 for castaways, or UseSpawnerTerritory for dweevils

        slot.customFloatParam = readFloat(drops.slice(index, index += 4));
        slot.gameRulePermissionFlag = bytesToInt(drops.slice(index, index += 2));
        slot.bSetTerritory = drops[index];
        index += 4;
        if (slot.bSetTerritory) {
            slot.X = readFloat(drops.slice(index, index += 4));
            slot.Y = readFloat(drops.slice(index, index += 4));
            slot.Z = readFloat(drops.slice(index, index += 4));
            slot.halfHeight = readFloat(drops.slice(index, index += 4));
            slot.radius = readFloat(drops.slice(index, index += 4));
        }
        parsed.push(slot);
    }
    return { parsed, index };
};

//#region Func Controllers
export const getReadAIDynamicFunc = (creatureId, infoType) => {
    if (creatureId.includes('Valve')) return parseValveAI_Dynamic;
    if (creatureId.includes('Tateana')) return parseTateanaAI_Dynamic;
    if (['HikariStation', 'BridgeStation', 'KinkaiStation'].some(e => creatureId === e)) return parsePileAI_Dynamic;
    if (creatureId.includes('Circulator')) return parseCirculatorAI_Dynamic;
    if (creatureId.includes('WaterBox') && creatureId !== 'WaterBoxNav') return parseWaterBoxAI_Dynamic;
    if (creatureId.startsWith('SwampBox')) return parseWaterBoxAI_Dynamic;
    if (creatureId === 'AmeBozu') return parseAmeBozuAI_Dynamic;
    if (creatureId === 'String') return parseStringAI_Dynamic;
    return () => ({});
};

export const getReadSubAIStaticFunc = (creatureId) => {
    if (creatureId.includes('Tateana')) return parseActorSpawnerDrops;
    return () => ({});
};

export const getReadAIStaticFunc = (creatureId, infoType) => {
    // console.log("Reading", creatureId, infoType);
    if (creatureId.startsWith('Spline')) return () => ({ parsed: [] });
    if (creatureId === 'GroupDropManager') return parseGDMDrops;
    if (creatureId === 'ActorSpawner') return parseActorSpawnerDrops;
    if (weirdAIEntities.some(e => e === creatureId)) return () => ({ parsed: [] });
    if (creatureId.includes('CrackP')) return parsePotDrops;
    if (creatureId.includes('NoraSpawner')) return parseNoraSpawnerAI;
    // These are actually the same, except CJs have searchCIDList right at the end
    // idk what it does. It's to do with the jelly containing items. The default is fine for now.
    if (creatureId.includes('CrushJelly')) return parsePotDrops;
    if (creatureId.includes('Tateana')) return parsePotDrops;
    if (infoType === InfoType.Creature) return parseTekiAI;
    if (creatureId.includes('Gate')) return parseGateAI;
    if (creatureId.includes('TriggerDoor')) return parseTriggerDoorAI;
    if (creatureId.includes('Switch')) return parseTriggerDoorAI; // Switches use the same AI, without TriggerDoorAIComponent on the end
    if (creatureId === 'Conveyor265uu') return parseTriggerDoorAI;
    if (creatureId.includes('Mush')) return parseTekiAI;
    if (creatureId.includes('Komush')) return parseTekiAI;
    if (['Tunnel', 'WarpCarry', 'HappyDoor'].some(s => creatureId.includes(s))) return parseWarpAI;
    if (infoType === InfoType.Base) return parseBaseAI;
    if (creatureId === 'Sprinkler') return parseSprinklerAI;
    if (creatureId.includes('Valve')) return parseValveAI;
    if (creatureId.includes('StickyFloor')) return parseStickyFloorAI;
    if (creatureId.includes('Geyser')) return parseGeyserAI;
    if (creatureId.includes('Circulator')) return parseCirculatorAI;
    if (creatureId.includes('WaterBox') && creatureId !== 'WaterBoxNav') return parseWaterBoxAI;
    if (creatureId === 'WaterBoxNav') return parseWaterBoxNavAI;
    if (creatureId.includes('Mizunuki')) return parseMizunukiAI;
    if (creatureId.startsWith('SwampBox')) return parseWaterBoxAI;
    if (creatureId.includes('HandleBoard')) return parseHandleBoardAI;
    if (creatureId.includes('MoveFloor') && creatureId !== 'MoveFloorSlowTrigger') return parseMoveFloorAI;
    if (creatureId === 'Branch_Long') return parseBranchAI;
    if (creatureId.startsWith('DownWall')) return parseDownWallAI;
    if (creatureId === 'String') return parseStringAI;
    return () => ({ parsed: [] });
};

export const getReadPortalFunc = infoType => {
    if (infoType == InfoType.Portal) return parsePortalTrigger;
    return () => false;
};

export const getReadActorParameterFunc = creatureId => {
    if (creatureId.startsWith('Valve')) return parseValveActorParam;
    if (creatureId.startsWith('Sprinkler')) return parseValveActorParam;
    if (creatureId.includes('WaterBox') && creatureId !== 'WaterBoxNav') return parseWaterBoxActorParam;
    if (creatureId.startsWith('SwampBox')) return parseWaterBoxActorParam;
    if (creatureId.startsWith('Spline')) return parseSplineActorParameter;
    return () => false;
};

export const getReadWaterTriggerFunc = creatureId => {
    if (creatureId.includes('WaterBox') && creatureId !== 'WaterBoxNav') return parseWaterBoxWaterTrigger;
    if (creatureId.startsWith('SwampBox')) return parseSwampBoxWaterTrigger;
    return () => false;
};

export const getReadNavMeshTriggerFunc = creatureId => {
    if (creatureId.startsWith('NavMeshTrigger')) return parseNavMeshTrigger;
    return () => false;
};

export const getReadCreatureAIFunc = creatureId => {
    if (['KumaChappy', 'Patroller'].includes(creatureId)) return parseKumaChappyAI;
    if (creatureId === 'HageDamagumo') return parseHageDamagumoAI;
    if (creatureId.includes('PanModoki')) return parsePanModokiAI;
    if (['Futakuchi', 'YukiFutakuchi'].includes(creatureId)) return parseFutakuchiAI;
    if (['FutakuchiAdult', 'YukiFutakuchiAdult'].includes(creatureId)) return parseFutakuchiAdultAI;
    if (creatureId.startsWith('AmeBozu')) return parseAmeBozuAI;
    if (creatureId === 'Baby') return parseBabyAI;
    if (creatureId === 'BigUjinko') return parseBigUjinkoAI;
    return () => { };
};

// bytes between the 240 and none in long OAIP: 51 67
// short: 47 63
// const readObjectAIParameter = (ai, generatorVersion) => {
//     let parsed = [];
//     let index = 0;
//     const invSize = ai[index];
//     ({ parsed, index } = readInventory(ai, index, invSize));
//     const someString = readAsciiString(ai, index);
//     index += ai[index] + 4;
//     index += 16; // bunch of 0s idk
//     const float1 = readFloat(ai.slice(index, index += 4))
//     const float2 = readFloat(ai.slice(index, index += 4))
//     const float3 = readFloat(ai.slice(index, index += 4))
//     const float4 = readFloat(ai.slice(index, index += 4))
//     const float5 = readFloat(ai.slice(index, index += 4))
// }

//#region Circulators
const parseCirculatorAI = (ai, generatorVersion) => {
    let index = 155 + (generatorVersion == 8626647386 ? 0 : 4);
    if (!ai[index]) index += 4; // again, there's sometimes 4 extra bytes in the middle-ish of the array. Our switch ID is either 155 or 159
    const AIProperties = {
        switchID: readAsciiString(ai, index)
    };
    index += ai[index] + 4;
    AIProperties.bWindLong = ai[index];
    index += 4;
    AIProperties.navLinkRight = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };

    return {
        AIProperties,
        parsed: []
    };
};

const parseCirculatorAI_Dynamic = ai => ({ bRotateDefault: ai[12] });

//#region Material Piles
const parsePileAI_Dynamic = ai => ({ pieceNum: bytesToInt(ai.slice(36, 40)) });

const parseTateanaAI_Dynamic = ai => ({ numDig: bytesToInt(ai.slice(12, 16)) });

// 8626647418 long
// 8626647626 long
// 8626647386 short
//#region WaterBoxes
const parseWaterBoxAI = (ai, generatorVersion) => {
    let index = 155 + getObjectAIOffset(generatorVersion); // this version 155 long vs 159 in the other two
    const waterBoxSwitchId = readAsciiString(ai, index);
    index += ai[index] + 4;
    const waterLevelChangeDist = readFloat(ai.slice(index, index += 4));
    const waterLevelChangeTime = readFloat(ai.slice(index, index += 4));
    index += 8; // two unknown and constant values
    const generatorIndex = readFloat(ai.slice(index, index += 4));
    const bUseSunMeter = ai[index];
    index += 4;
    const idkFloat = readFloat(ai.slice(index, index += 4));
    const bPlayDemo = ai[index];

    return {
        parsed: [],
        AIProperties: {
            waterBoxSwitchId,
            waterLevelChangeDist,
            waterLevelChangeTime,
            generatorIndex: isNaN(generatorIndex) ? -1 : generatorIndex,
            bUseSunMeter,
            bPlayDemo
        }
    };
};

const parseWaterBoxAI_Dynamic = ai => ({ afterMaxIcePikmins: bytesToInt(ai.slice(16, 20)) });

const parseSwampBoxWaterTrigger = waterTrigger => ({
    maxIcePikmins: bytesToInt(waterTrigger.slice(0, 4)),
    ambientSoundId: readAsciiString(waterTrigger, 28),
    bDisableSink: waterTrigger[28 + waterTrigger[28] + 4]
});

const parseWaterBoxActorParam = actorParam => {
    const radarMapWBTexture = readAsciiString(actorParam, 64).split('.').pop();

    return {
        unknownInt: bytesToInt(actorParam.slice(63, 64)),
        radarMapWBTexture,
        radarMapWBChangeDistTexture: readAsciiString(actorParam, 64 + actorParam[64] + 4).split('.').pop()
    };
};

const parseWaterBoxWaterTrigger = waterTrigger => ({
    maxIcePikmins: bytesToInt(waterTrigger.slice(0, 4)),
    ambientSoundId: readAsciiString(waterTrigger, 28)
});

const parseWaterBoxNavAI = (ai, generatorVersion) => {
    let index = 155 + getObjectAIOffset(generatorVersion);
    const bUseHappyOnly = ai[index];
    index += 4;
    return {
        parsed: [],
        AIProperties: {
            bUseHappyOnly,
            rightOffset: {
                X: readFloat(ai.slice(index, index += 4)),
                Y: readFloat(ai.slice(index, index += 4)),
                Z: readFloat(ai.slice(index, index += 4))
            }
        }
    };
};

const parseMizunukiAI = (ai, generatorVersion) => {
    let index = 155 + getObjectAIOffset(generatorVersion);
    return {
        parsed: [],
        AIProperties: {
            waterBoxId: readAsciiString(ai, index)
        }
    };
};

//#region MoveFloors
const parseMoveFloorAI = (ai, generatorVersion) => {
    const offset = getObjectAIOffset(generatorVersion);
    let index = 155 + offset;
    const AIProperties = {
        waitTime: readFloat(ai.slice(index, index += 4)),
        moveSpeed: readFloat(ai.slice(index, index += 4)),
        bEnableWarpActor: ai[index]
    };
    index += 4;
    AIProperties.warpOffset = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };
    AIProperties.splinePoints = readSpline(ai.slice(index, ai.length)).splinePoints;
    return {
        parsed: [],
        AIProperties
    };
};

//#region Splines
const readSpline = (bytes) => {
    let index = 4;
    const splineLength = bytes[0];

    const splinePoints = [];

    for (let i = 0; i < splineLength; i++) {
        splinePoints.push({
            inVal: readFloat(bytes.slice(index, index += 4)),
            outVal: {
                X: readFloat(bytes.slice(index, index += 4)),
                Y: readFloat(bytes.slice(index, index += 4)),
                Z: readFloat(bytes.slice(index, index += 4)),
            },
            arriveTangent: {
                X: readFloat(bytes.slice(index, index += 4)),
                Y: readFloat(bytes.slice(index, index += 4)),
                Z: readFloat(bytes.slice(index, index += 4)),
            },
            leaveTangent: {
                X: readFloat(bytes.slice(index, index += 4)),
                Y: readFloat(bytes.slice(index, index += 4)),
                Z: readFloat(bytes.slice(index, index += 4)),
            },
            rotation: {
                roll: readFloat(bytes.slice(index, index += 4)),
                pitch: readFloat(bytes.slice(index, index += 4)),
                yaw: readFloat(bytes.slice(index, index += 4))
            },
            scale: {
                X: readFloat(bytes.slice(index, index += 4)),
                Y: readFloat(bytes.slice(index, index += 4)),
                Z: readFloat(bytes.slice(index, index += 4)),
            },
            interpMode: InterpModes[bytes[index]]
        });
        console.log(index, bytes[index], InterpModes[bytes[index]]);
        index += 1; // to advance past the interpMode
    };
    return { splinePoints, index };
};

const parseSplineActorParameter = actorParam => {
    let index = 0;
    index += actorParam[index] + 4;
    index += 12;
    index += actorParam[index] + 4;
    index += actorParam[index] + 4;
    index += 24;

    const splineData = readSpline(actorParam.slice(index, actorParam.length));
    index += splineData.index;
    index += 12;

    return {
        splinePoints: splineData.splinePoints,
        searchTagName: readAsciiString(actorParam, index)
    };
};

//#region HandleBoard
const parseHandleBoardAI = (ai, generatorVersion) => {
    const offset = getObjectAIOffset(generatorVersion);
    let index = 115 + offset; // this places us at the start of the trigger strings
    // HandleBoards can have LinkNarrow and NavMeshTrigger strings of varying length, so skip those
    const linkNarrowSpaceBoxID = readAsciiString(ai, index);
    index += ai[index] + 4;
    const linkWarpTriggerID = readAsciiString(ai, index);
    index += ai[index] + 4;
    const navMeshTriggerID = readAsciiString(ai, index);
    index += ai[index] + 4;
    index += 13; // get past the 0s after the last string
    // we should now be at WorkNum (155/159 if all None strings)
    const workNum = bytesToInt(ai.slice(index, index += 4));
    index += 4; // always true bool here?

    return {
        parsed: [],
        AIProperties: {
            linkNarrowSpaceBoxID,
            linkWarpTriggerID,
            navMeshTriggerID,
            workNum,
            pointLinks: {
                left: {
                    X: readFloat(ai.slice(index, index += 4)),
                    Y: readFloat(ai.slice(index, index += 4)),
                    Z: readFloat(ai.slice(index, index += 4))
                },
                right: {
                    X: readFloat(ai.slice(index, index += 4)),
                    Y: readFloat(ai.slice(index, index += 4)),
                    Z: readFloat(ai.slice(index, index += 4))
                }
            }
        }
    };
};

const parseBranchAI = (ai, generatorVersion) => {
    const offset = getObjectAIOffset(generatorVersion); // in 1 geyser there are 4 more bytes of ObjectAIParameter, all 0. No idea.
    let index = 155 + offset;
    return {
        parsed: [],
        AIProperties: {
            jumpHeight: readFloat(ai.slice(index, index += 4)),
            // This is technically named NavLinkRightOffset but that would made the point aiming annoying
            navLinkRight: {
                X: readFloat(ai.slice(index, index += 4)),
                Y: readFloat(ai.slice(index, index += 4)),
                Z: readFloat(ai.slice(index, index += 4))
            }
        }
    };
};

const parseDownWallAI = (ai, generatorVersion) => {
    const offset = getObjectAIOffset(generatorVersion); // in 1 geyser there are 4 more bytes of ObjectAIParameter, all 0. No idea.
    let index = 155 + offset;
    return {
        parsed: [],
        AIProperties: {
            bDisableAirWall: ai[index]
        }
    };
};

const parseStringAI = (ai, generatorVersion) => {
    const offset = getObjectAIOffset(generatorVersion); // in 1 geyser there are 4 more bytes of ObjectAIParameter, all 0. No idea.
    let index = 155 + offset;
    return {
        parsed: [],
        AIProperties: {
            fallHeight: readFloat(ai.slice(index, index += 4))
        }
    };
};

const parseStringAI_Dynamic = (ai) => ({ bFalled: ai[12] });

//#region Geyser
const parseGeyserAI = (ai, generatorVersion) => {
    const offset = getObjectAIOffset(generatorVersion); // in 1 geyser there are 4 more bytes of ObjectAIParameter, all 0. No idea.
    let index = 155 + offset;
    const AIProperties = {
        bEnableCustomSoftEdge: ai[99 + offset],
        bDisableSoftEdge: ai[103 + offset],
        bSetCrystal: ai[index]
    };
    index += 4;
    AIProperties.stopQueenDistXY = readFloat(ai.slice(index, index += 4));
    index += 4;
    AIProperties.navLinkLeft = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };
    AIProperties.navLinkRight = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };
    AIProperties.leftProjectHeight = readFloat(ai.slice(index, index += 4));
    AIProperties.maxFallDownLength = readFloat(ai.slice(index, index += 4));
    index += 1; //mystery u8 here, always 1
    AIProperties.snapRadius = readFloat(ai.slice(index, index += 4));
    AIProperties.snapHeight = readFloat(ai.slice(index, index += 4));
    index += 4;
    AIProperties.bUseSnapHeight = ai[index];
    return {
        parsed: [],
        AIProperties
    };
};

//#region NavMeshTrigger
const parseNavMeshTrigger = trigger => {
    let index = 0;
    const navMeshTrigger = {
        overlapBoxExtent: {
            X: readFloat(trigger.slice(index, index += 4)),
            Y: readFloat(trigger.slice(index, index += 4)),
            Z: readFloat(trigger.slice(index, index += 4)),
        },
        navCollBoxExtent: {
            X: readFloat(trigger.slice(index, index += 4)),
            Y: readFloat(trigger.slice(index, index += 4)),
            Z: readFloat(trigger.slice(index, index += 4)),
        },
        CIDList: []
    };

    const ignoreCIDLength = trigger[index];
    index += 4;
    if (ignoreCIDLength)
        for (let i = 0; i < ignoreCIDLength; i++) {
            navMeshTrigger.CIDList.push(readAsciiString(trigger, index));
            index += trigger[index] + 4;
        }
    navMeshTrigger.navMeshTriggerID = readAsciiString(trigger, index);

    return navMeshTrigger;
};

//#region StickyFloor
const parseStickyFloorAI = ai => {
    let parsed = [];
    let index = 0;
    const invSize = ai[index];

    index += 4; // There's a -1,-1 (255*4, 255*4) after, idk what they do
    ({ parsed, index } = readInventory(ai, index, invSize));
    const AIProperties = {
        bAutoSpawnMush: ai.at(-4) ? true : false
    };

    while (ai[index] != 255 && index < ai.length) {
        console.log("Iterating forward in stickyfloor");
        index += 1; // Just iterate till we find the 255 byte? Shouldn't run, I think
    }

    return {
        parsed,
        AIProperties,
        inventoryEnd: index + 4
    };
};

//#region Valve
const parseValveAI = ai => {
    let index = 155;
    index += 4; // a float
    index += 4; // a bool
    const AIProperties = {
        valveID: readAsciiString(ai, index)
    };
    index += ai[index] + 4;
    AIProperties.workType = ValveWorkType[ai[index]];
    index += 4;
    AIProperties.demoID = ai[index];
    return {
        AIProperties,
        parsed: []
    };
};

const parseValveAI_Dynamic = ai => ({ piecePutNum: ai[12] });

export const parseValveActorParam = actorParam => ({
    demoBindName: readAsciiString(actorParam, 0)
});

//#region Sprinkler
const parseSprinklerAI = ai => {
    let index = 133;
    const AIProperties = {
        navMeshTriggerID: readAsciiString(ai, index)
    };
    index += ai[index] + 4;
    index += 13; // skip the rest of whatever's here
    AIProperties.valveID = readAsciiString(ai, index);
    index += ai[index] + 4;
    index += 12; // skip the 3 transform floats
    AIProperties.waterRange = readFloat(ai.slice(index, index += 4));
    AIProperties.openTime = readFloat(ai.slice(index, index += 4));
    index += 4;
    AIProperties.flatEffectOffsetZ = readFloat(ai.slice(index, index += 4));
    AIProperties.bSprinklerOnly = ai[index];
    return {
        AIProperties,
        parsed: []
    };
};

//#region Gate
const parseGateAI = ai => {
    let rareDrops = [];
    let parsed = [];
    let index = 0;
    let invSize = ai[index];
    index += 4;
    ({ parsed: rareDrops, index } = readInventory(ai, index, invSize));

    // Find the start byte of the next inventory AFTER the first one - yes this is susceptible to similar patterns if there are any between
    let dropItemIndex = findSequenceStartIndex(ai, index, [0, 0, 0, 255, 255, 255, 255]) - 1;
    const spareBytes = ai.slice(index + 4, dropItemIndex);
    invSize = ai[dropItemIndex];
    dropItemIndex += 4;
    ({ parsed, index } = readInventory(ai, dropItemIndex, invSize));
    return { parsed, rareDrops, spareBytes };
};

//#region NoraSpawner
const parseNoraSpawnerAI = ai => {
    let index = 0;
    const AIProperties = {};
    const parsed = [];
    AIProperties.spawnNum = ai[index];
    index += 4;
    AIProperties.spawnRadius = readFloat(ai.slice(index, index += 4));
    AIProperties.noSpawnRadius = readFloat(ai.slice(index, index += 4));
    AIProperties.pikminType = PikminTypes[ai[index]];
    index += 1;
    index += 4; // No idea what this bool is
    index += 1; // dunno what this int is either
    AIProperties.mabikiNumFromFollow = bytesToInt(ai.slice(index, index += 4));
    AIProperties.unknownInt = bytesToInt(ai.slice(index, index += 4));
    AIProperties.bMabikiPongashi = ai[index];
    index += 4;
    AIProperties.pongashiChangeColorFollowNum = bytesToInt(ai.slice(index, index += 4));
    AIProperties.pongashiChangeColorFromFollow = PikminTypes[ai[index]];
    index += 1;
    index += 13; // unknown bytes here
    AIProperties.noraIdlingPreset = readAsciiString(ai, index);
    index += ai[index] + 4;

    // AIProperties.bDisableForcePongashi = ai[index];
    index += 4;
    AIProperties.groupIdlingType = PikminPlayType[ai[index]];
    index += 1;
    index += 4; // idk what's here
    AIProperties.mabikiPongashiOffset = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };
    index += 4; // skip unknown float - always 0, 0, 128, 191 (-1) in float
    const randomActorListLength = ai[index];

    index += 4;
    for (let i = 0; i < randomActorListLength; i++) { // should always be 1 according to game files
        const slot = {};
        slot.id = i + 1; // Avoid 0 IDs, just in case. This never gets written back anyway.
        slot.assetName = readAsciiString(ai, index);
        index += ai[index] + 4;

        index += ai[index] + 4; // CustomParameter can be None, SVSleep000 for castaways, or UseSpawnerTerritory for dweevils

        slot.customFloatParam = readFloat(ai.slice(index, index += 4));
        slot.gameRulePermissionFlag = bytesToInt(ai.slice(index, index += 2));
        slot.bSetTerritory = ai[index];
        index += 4;
        if (slot.bSetTerritory) {
            slot.X = readFloat(ai.slice(index, index += 4));
            slot.Y = readFloat(ai.slice(index, index += 4));
            slot.Z = readFloat(ai.slice(index, index += 4));
            slot.halfHeight = readFloat(ai.slice(index, index += 4));
            slot.radius = readFloat(ai.slice(index, index += 4));
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
            X: readFloat(ai.slice(index, index += 4)),
            Y: readFloat(ai.slice(index, index += 4)),
            Z: readFloat(ai.slice(index, index += 4))
        });
    }

    return {
        AIProperties,
        parsed
    };
};

//#region GDM
export const parseGDMDrops = drops => {
    let parsed = [];
    const ignoreList = [];
    let index = 0;
    const groupingRadius = readFloat(drops.slice(index, index += 4));
    const ignoreCIDLength = drops[index]; // ignoreCIDList: [strings] is indicated by a length byte
    index += 4;
    if (ignoreCIDLength)
        for (let i = 0; i < ignoreCIDLength; i++) {
            ignoreList.push(readAsciiString(drops, index));
            index += drops[index] + 4;
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

//#region Pots
export const parsePotDrops = drops => {
    let parsed = [];
    let index = 0;
    const invSize = drops[index];

    index += 4; // There's a -1,-1 (255*4, 255*4) after, idk what they do
    ({ parsed, index } = readInventory(drops, index, invSize));

    while (drops[index] != 255 && index < drops.length) {
        index += 1; // Just iterate till we find the 255 byte? Shouldn't run, I think
    }

    return { parsed, inventoryEnd: index + 4 };
};

//#region ActorSpawner
const parseActorSpawnerDrops = drops => {
    // Could this be looped? Yeah probably. Refactor Later :TM:
    // Make an object with the keyname and its byte width? I guess non-fixed bytes are an issue there
    const bytes = {};
    let index = 0;
    bytes.avatar = drops[index];
    index += 4;
    bytes.pikmin = drops[index];
    index += 4;
    bytes.avatarAndPikmin = drops[index];
    index += 4;
    bytes.carry = drops[index];
    index += 4;
    bytes.bNotOverlap = drops[index];
    index += 4;
    bytes.bGenseiControl = drops[index];
    index += 4;
    bytes.overlapCenterX = readFloat(drops.slice(index, index += 4));
    bytes.overlapCenterY = readFloat(drops.slice(index, index += 4));
    bytes.overlapCenterZ = readFloat(drops.slice(index, index += 4));
    bytes.halfHeight = readFloat(drops.slice(index, index += 4));
    bytes.radius = readFloat(drops.slice(index, index += 4));
    bytes.angle = readFloat(drops.slice(index, index += 4));
    bytes.sphereRadius = readFloat(drops.slice(index, index += 4));
    const motionName = readAsciiString(drops, index);
    bytes.fallStart = motionName === 'FallStart' ? true : false;
    index += drops[index] + 4;

    index += 4; // Some bool that's always 1 - haven't found a zero yet
    bytes.spawnLocationX = readFloat(drops.slice(index, index += 4));
    bytes.spawnLocationY = readFloat(drops.slice(index, index += 4));
    bytes.spawnLocationZ = readFloat(drops.slice(index, index += 4));
    bytes.bSpawnAngRand = drops[index];
    index += 4;
    bytes.spawnAng = readFloat(drops.slice(index, index += 4));
    bytes.spawnVelX = readFloat(drops.slice(index, index += 4));
    bytes.spawnVelY = readFloat(drops.slice(index, index += 4));

    bytes.infiniteSpawn = drops[index];
    index += 4;
    bytes.spawnInterval = readFloat(drops.slice(index, index += 4));
    bytes.spawnLimit = bytesToInt(drops.slice(index, index += 4));;
    index += 4; // Mystery bool here
    bytes.randomRotation = drops[index];
    index += 4;
    bytes.noDropItem = drops[index];
    index += 4;
    bytes.assetName = readAsciiString(drops, index);
    index += drops[index] + 4;

    bytes.customParameter = readAsciiString(drops, index);
    index += drops[index] + 4;
    bytes.customFloatParameter = readFloat(drops.slice(index, index += 4));
    bytes.gameRulePermissionFlag = bytesToInt(drops.slice(index, index += 2));

    const bSetTerritory = drops[index];
    bytes.bSetTerritory = bSetTerritory;
    index += 4;
    if (bSetTerritory) {
        bytes.territoryX = readFloat(drops.slice(index, index += 4));
        bytes.territoryY = readFloat(drops.slice(index, index += 4));
        bytes.territoryZ = readFloat(drops.slice(index, index += 4));
        bytes.territoryHalfHeight = readFloat(drops.slice(index, index += 4));
        bytes.territoryRadius = readFloat(drops.slice(index, index += 4));
    }
    bytes.invasionStartTimeRatio = readFloat(drops.slice(index, index += 4));

    return {
        parsed: [bytes]
    };
};

//#region TriggerDoor
const parseTriggerDoorAI = (ai, generatorVersion) => {
    let index = 155 + (generatorVersion == 8626647386 ? 0 : 4); // this version 155 long vs 159 in the other two
    // we only care about CIDList for now, which is the very last thing in the array
    // it also might not even exist. 156 lands us on the switch string, usually 9chars of switch00, but variable
    const parsedAI = { parsed: [], AIProperties: {} };

    parsedAI.AIProperties.switchID = readAsciiString(ai, index);
    index += ai[index] + 4;
    index += 68; // This should now be the start of CIDList
    parsedAI.AIProperties.CIDList = [];

    const cidLength = ai[index];
    index += 4;
    if (cidLength) // will be undefined if TriggerDoorAI isn't there. Thanks JS.
        for (let i = 0; i < cidLength; i++) {
            parsedAI.AIProperties.CIDList.push(readAsciiString(ai, index));
            index += ai[index] + 4;
        }
    return parsedAI;
};


//#region Warp
const parseWarpAI = ai => {
    const parsedAI = { parsed: [], AIProperties: {} };

    parsedAI.AIProperties.warpID = readAsciiString(ai, 155);

    return parsedAI;
};

//#region Base
const parseBaseAI = ai => {
    let lastNoneIndex = 0;
    let loopIndex = 0;
    while (loopIndex != -1) {
        // We want to find the last None string in the bytes, because it's AFTER the 4 bytes
        // that _sometimes_ exists, thus change length and placement of things
        // we could parse the array and see if we get a None early, or we can just seek to the last None,
        // and +14 to get to BaseCampId and the parameters we actually want. The rest is fairly static (and unknown)
        loopIndex = findSequenceStartIndex(ai, loopIndex + NONE_BYTES.length, NONE_BYTES);
        if (loopIndex != -1) lastNoneIndex = loopIndex;
    }
    let index = lastNoneIndex + NONE_BYTES.length + 13; // Should place us at the start of BaseCampId - makes no sense bc what data types make up 13 bytes?? There must be a u8
    const AIProperties = {
        baseCampId: ai[index]
    };
    index += 4;
    AIProperties.bDeactivateByExit = ai[index];
    index += 4;
    AIProperties.safeRadius = readFloat(ai.slice(index, index += 4));
    AIProperties.safeAreaOffsetX = readFloat(ai.slice(index, index += 4));
    AIProperties.safeAreaOffsetY = readFloat(ai.slice(index, index += 4));
    AIProperties.safeAreaOffsetZ = readFloat(ai.slice(index, index += 4));
    AIProperties.searchBoundX = readFloat(ai.slice(index, index += 4));
    AIProperties.searchBoundY = readFloat(ai.slice(index, index += 4));
    AIProperties.searchBoundZ = readFloat(ai.slice(index, index += 4));
    index += 4; // Unknown
    AIProperties.stateChangeDelayTime = readFloat(ai.slice(index, index += 4));
    AIProperties.guruguruDist = readFloat(ai.slice(index, index += 4));
    AIProperties.CIDList = [];
    const cidLength = ai[index];
    index += 4;
    if (cidLength)
        for (let i = 0; i < cidLength; i++) {
            AIProperties.CIDList.push(readAsciiString(ai, index));
            index += ai[index] + 4;
        }

    return { AIProperties, parsed: [] };
};

//#region Teki
export const parseTekiAI = (ai, generatorVersion, creatureId) => {
    // find the inventory size byte
    // if 0, return empty list
    let index = 0; // start of the first item
    const parsed = [];
    const AIProperties = {};
    AIProperties.territory = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4)),
        halfHeight: readFloat(ai.slice(index, index += 4)),
        radius: readFloat(ai.slice(index, index += 4))
    };
    const invSize = ai[20]; // This seems consistent across tekis
    index += 4;

    for (let i = 0; i < invSize; i++) {
        const slot = {};
        slot.id = bytesToInt(ai.slice(index, index += 4));
        slot.flags = ai.slice(index, index += 4);
        slot.minDrops = ai[index];
        index += 4;
        slot.maxDrops = ai[index];
        index += 4;
        slot.dropChance = readFloat(ai.slice(index, index += 4));
        slot.bRegistGenerator = ai[index];
        index += 4;
        let dropCondition;
        if (ai[index] == 1) {
            const one = ai[index]; // I think this just signifies an object is in the dropconditions array
            index += 4;
            slot.dropCondition = ai[index];
            index += 4;
            const dropCondInt = ai[index];
            index += 1;
            index += ai[index] + 4 + 1; // start of dropCond string, usually None. We also don't care about the DemoFlag
        } else index += 4;
        slot.assetName = readAsciiString(ai, index);
        index += ai[index] + 4;

        index += ai[index] + 4; // CustomParameter can be None, SVSleep000 for castaways, or UseSpawnerTerritory for dweevils
        slot.customFloatParam = readFloat(ai.slice(index, index += 4));
        slot.gameRulePermissionFlag = bytesToInt(ai.slice(index, index += 2));
        slot.bSetTerritory = ai[index];
        index += 4;

        if (slot.bSetTerritory) {
            slot.X = readFloat(ai.slice(index, index += 4));
            slot.Y = readFloat(ai.slice(index, index += 4));
            slot.Z = readFloat(ai.slice(index, index += 4));
            slot.halfHeight = readFloat(ai.slice(index, index += 4));
            slot.radius = readFloat(ai.slice(index, index += 4));
        }
        // const params = ai.slice(index, index + 10);
        // index += 10;
        parsed.push(slot);
    }
    index += 4; // Advance past 255s

    AIProperties.boneName = readAsciiString(ai, index);
    index += ai[index] + 4;

    AIProperties.localOffset = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };

    AIProperties.vel = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };

    AIProperties.randVel = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };

    AIProperties.dropOption = bytesToInt(ai.slice(index, index += 2));
    index += 4; // unknown bool - FixedHotExtractDropNum? it's only ever 0 maybe except on kogane
    AIProperties.bOverrideInitLocation = ai[index];
    index += 4;

    AIProperties.overrideInitLocation = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };
    index += 4 + invSize * 8; // skip the inventory flag loop

    // Short gen version is missing 4 bytes here. Not 100% sure which
    // bool is freezeBothDrop vs something else. It might be bEnableZukanDrop
    const offset = getObjectAIOffset(generatorVersion);
    index += offset;
    // index += 4; // this is always 1 - maybe bEnableZukanDrop

    AIProperties.bEnableFreezeBothDrop = ai[index];
    index += AIProperties.bEnableFreezeBothDrop ? 16 : 12; // this bool is ADDITIONAL bytes if present
    index += 4; //unknown float
    AIProperties.searchAreaOtakaraCarryRadius = readFloat(ai.slice(index, index += 4));
    index += 8; // unknown floats
    AIProperties.invasionStartTimeRatio = readFloat(ai.slice(index, index += 4));
    index += 12; // always 1 and 0 bools?
    AIProperties.bEnableOptionalPoint = ai[index];
    index += 4;

    const arrayLength = ai[index];
    index += 4;
    AIProperties.optionalPointOffsets = [];
    for (let i = 0; i < arrayLength; i++) {
        AIProperties.optionalPointOffsets.push({
            X: readFloat(ai.slice(index, index += 4)),
            Y: readFloat(ai.slice(index, index += 4)),
            Z: readFloat(ai.slice(index, index += 4))
        });
    }
    index += 4; // something else to end SniffPointParameter
    // while (ai[index] != 255 && index < ai.length) {
    //     console.log("Iterating in creature to find end of inventory?");
    //     index += 1; // Just iterate till we find the 255 byte? Shouldn't run, I think
    // }

    const creatureAIProperties = getReadCreatureAIFunc(creatureId)(ai.slice(index, ai.length));

    return {
        parsed,
        AIProperties: {
            ...AIProperties,
            ...creatureAIProperties
        },
        inventoryEnd: index
    };
};

//#region Creature-Specific
const parseKumaChappyAI = ai => {
    let index = 0;
    const AIProperties = {
        searchTagName: readAsciiString(ai, index)
    };
    index += ai[index] + 4;
    AIProperties.giveUpDistance = readFloat(ai.slice(index, index += 4));
    // Where's MaxChildNum??

    return AIProperties;
};

const parseHageDamagumoAI = ai => {
    let index = 0;
    const AIProperties = {
        searchTagName: readAsciiString(ai, index)
    };
    index += ai[index] + 4;
    AIProperties.bSplineWalkStart = ai[index];
    index += 4;
    AIProperties.searchAreaRest = {
        center: {
            X: readFloat(ai.slice(index, index += 4)),
            Y: readFloat(ai.slice(index, index += 4)),
            Z: readFloat(ai.slice(index, index += 4))
        },
        halfHeight: readFloat(ai.slice(index, index += 4)),
        radius: readFloat(ai.slice(index, index += 4)),
        angle: readFloat(ai.slice(index, index += 4)),
        sphereRadius: readFloat(ai.slice(index, index += 4))
    };
    AIProperties.bStraddle = ai[index];
    index += 4;
    AIProperties.bUniqueLife = ai[index];
    index += 4;
    AIProperties.uniqueLife = readFloat(ai.slice(index, index += 4));
    AIProperties.bAlreadyAppear = ai[index];
    index += 4;
    AIProperties.fightCameraChangeDistanceXY = readFloat(ai.slice(index, index += 4));
    return AIProperties;
};

const parseFutakuchiAI = ai => {
    let index = 1;
    const AIProperties = {
        rockMode: RockModes[ai[0]],
        searchTagName: readAsciiString(ai, index)
    };
    index += ai[index] + 4;
    AIProperties.splineSearchArea = {
        center: {
            X: readFloat(ai.slice(index, index += 4)),
            Y: readFloat(ai.slice(index, index += 4)),
            Z: readFloat(ai.slice(index, index += 4))
        },
        halfHeight: readFloat(ai.slice(index, index += 4)),
        radius: readFloat(ai.slice(index, index += 4)),
        angle: readFloat(ai.slice(index, index += 4)),
        sphereRadius: readFloat(ai.slice(index, index += 4))
    };
    AIProperties.searchAreaAttack = {
        center: {
            X: readFloat(ai.slice(index, index += 4)),
            Y: readFloat(ai.slice(index, index += 4)),
            Z: readFloat(ai.slice(index, index += 4))
        },
        halfHeight: readFloat(ai.slice(index, index += 4)),
        radius: readFloat(ai.slice(index, index += 4)),
        angle: readFloat(ai.slice(index, index += 4)),
    };
    AIProperties.bFixCautionAreaCenter = ai[index];
    index += 4;
    AIProperties.bDisappearVisibleOff = ai[index];
    index += 4;
    AIProperties.searchAreaCaution = {
        center: {
            X: readFloat(ai.slice(index, index += 4)),
            Y: readFloat(ai.slice(index, index += 4)),
            Z: readFloat(ai.slice(index, index += 4))
        },
        halfHeight: readFloat(ai.slice(index, index += 4)),
        radius: readFloat(ai.slice(index, index += 4)),
        angle: readFloat(ai.slice(index, index += 4)),
        sphereRadius: readFloat(ai.slice(index, index += 4))
    };

    return AIProperties;
};

const parsePanModokiAI = ai => {
    let index = 0;
    const AIProperties = {
        routeTag: readAsciiString(ai, index)
    };
    index += ai[index] + 4;
    AIProperties.hideAreaTag = readAsciiString(ai, index);
    return AIProperties;
};

const parseBabyAI = ai => {
    let index = 0;
    const AIProperties = {
        bPatrolType: ai[index]
    };
    index += 4;
    AIProperties.hideAreaTag = readAsciiString(ai, index);
    return AIProperties;
};

const parseBigUjinkoAI = ai => {
    let index = 0;
    const AIProperties = {
        bPatrolType: ai[index]
    };
    index += 4;
    AIProperties.bNoBurrowType = ai[index];
    index += 4;
    AIProperties.searchAreaTag = readAsciiString(ai, index);
    return AIProperties;
};

const parseFutakuchiAdultAI = ai => {
    let index = 0;
    const AIProperties = {
        attackArea: {
            center: {
                X: readFloat(ai.slice(index, index += 4)),
                Y: readFloat(ai.slice(index, index += 4)),
                Z: readFloat(ai.slice(index, index += 4)),
            },
            halfHeight: readFloat(ai.slice(index, index += 4)),
            radius: readFloat(ai.slice(index, index += 4)),
            angle: readFloat(ai.slice(index, index += 4)),
            sphereRadius: readFloat(ai.slice(index, index += 4)),
        },
        bSplineType: ai[index]
    };
    index += 4;
    AIProperties.splineAttackParam = {
        attackLoopWaitSecMin: readFloat(ai.slice(index, index += 4)),
        attackLoopWaitSecMax: readFloat(ai.slice(index, index += 4)),
        attackSignSecMin: readFloat(ai.slice(index, index += 4)),
        attackSignSecMax: readFloat(ai.slice(index, index += 4)),
        attackInterval: readFloat(ai.slice(index, index += 4)),
        attackIntervalSuccess: readFloat(ai.slice(index, index += 4))
    };
    AIProperties.searchTagName = readAsciiString(ai, index);
    index += ai[index] + 4;
    AIProperties.attackParam = {
        attackLoopWaitSecMin: readFloat(ai.slice(index, index += 4)),
        attackLoopWaitSecMax: readFloat(ai.slice(index, index += 4)),
        attackSignSecMin: readFloat(ai.slice(index, index += 4)),
        attackSignSecMax: readFloat(ai.slice(index, index += 4)),
        attackInterval: readFloat(ai.slice(index, index += 4)),
        attackIntervalSuccess: readFloat(ai.slice(index, index += 4))
    };
    AIProperties.bCreateIcicle = true;
    index += 4;
    AIProperties.escapeSecMin = readFloat(ai.slice(index, index += 4));
    AIProperties.escapeSecMax = readFloat(ai.slice(index, index += 4));
    AIProperties.searchAreaCaution = {
        center: {
            X: readFloat(ai.slice(index, index += 4)),
            Y: readFloat(ai.slice(index, index += 4)),
            Z: readFloat(ai.slice(index, index += 4))
        },
        halfHeight: readFloat(ai.slice(index, index += 4)),
        radius: readFloat(ai.slice(index, index += 4)),
        angle: readFloat(ai.slice(index, index += 4)),
        sphereRadius: readFloat(ai.slice(index, index += 4)),
    };
    return AIProperties;
};

const parseAmeBozuAI = ai => {
    let index = 0;
    const AIProperties = {
        bAppearSearch: ai[index]
    };
    index += 4;

    AIProperties.searchTagName = readAsciiString(ai, index);
    index += ai[index] + 4;

    AIProperties.hideTimeMin = readFloat(ai.slice(index, index += 4));
    AIProperties.hideTimeMax = readFloat(ai.slice(index, index += 4));

    AIProperties.bAppearFixedLocation = ai[index];
    index += 4;

    AIProperties["searchDistance?"] = readFloat(ai.slice(index, index += 4));
    index += 1; // random 1 here

    AIProperties.canAttackLevelFaceMessageName = readAsciiString(ai, index);
    return AIProperties;
};

const parseAmeBozuAI_Dynamic = ai => ({ lifeTire: readFloat(ai.slice(20, 24)) });

//#region PortalTrigger
const parsePortalTrigger = portalTrigger => {
    const PortalTrigger = {};
    let index = 0;
    PortalTrigger.portalType = PortalTypes[portalTrigger[index]];
    index += 1;
    PortalTrigger.portalNumber = portalTrigger[index];
    index += 4;

    PortalTrigger.toLevelName = readAsciiString(portalTrigger, index);
    index += portalTrigger[index] + 4;

    PortalTrigger.toSubLevelName = readAsciiString(portalTrigger, index);
    index += portalTrigger[index] + 4;

    PortalTrigger.toPortalId = portalTrigger[index];
    index += 4;

    index += 4; // unknown boolean here, always 1

    PortalTrigger.demoPlayParamEnter = readAsciiString(portalTrigger, index).match(/\.(.+)|(None)/)[1];
    index += portalTrigger[index] + 4;

    index += 4; // unknown zeros

    PortalTrigger.demoPlayParamExit = readAsciiString(portalTrigger, index).match(/\.(.+)|(None)/)[1];
    index += portalTrigger[index] + 4;

    index += 4; // unknown zeros

    const checkPointLength = portalTrigger[index];
    index += 4;
    if (checkPointLength) PortalTrigger.checkPointLevelNames = [];
    for (let i = 0; i < checkPointLength; i++) {
        PortalTrigger.checkPointLevelNames.push(readAsciiString(portalTrigger, index));
        index += portalTrigger[index] + 4;
    }

    PortalTrigger.toBaseCampId = bytesToInt(portalTrigger.slice(index, index += 4));
    PortalTrigger.bInitialPortalMove = portalTrigger[index];
    index += 4;
    PortalTrigger.bDeactivateByExit = portalTrigger[index];
    index += 4;
    index += 4; // some float
    PortalTrigger.playAnimDist = readFloat(portalTrigger.slice(index, index += 4));
    index += 4; // unknown zeros
    PortalTrigger.panzakuPriority = portalTrigger[index];
    index += 4;
    const flags = bytesToInt(portalTrigger.slice(index, index += 4));
    PortalTrigger.disablePikminFlags = getDisableSettings(flags);
    PortalTrigger.bDisableIsFlareGuard = portalTrigger[index];
    index += 4;
    PortalTrigger.spareBytes = portalTrigger.slice(index, portalTrigger.length); // These last 3 floats are the trigger coordinates

    return { PortalTrigger };
};
