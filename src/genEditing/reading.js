import { InfoType, PikminTypes, PikminPlayType, PortalTypes, ValveWorkType, AmeBozuWalkTypes, weirdAIEntities, InterpModes, RockModes, ObjectAI_END_INDEX, QueenAIType, PopObjectType, DDBPikminHeightType, NavLinkDirection, PikminLeaves } from '../api/types';
import { findSequenceStartIndex, getObjectAIOffset } from '../utils';
import { bytesToInt, bytesToU64, getDisableSettings } from '../utils/bytes';

//#region Stocks
const readAsciiString = (bytes, index) => {
    let stringLength = bytes[index];
    index += 4;
    const asciiString = bytes.slice(index, index + stringLength - 1); // We don't want the null terminator in the string
    return String.fromCharCode.apply(null, asciiString);
};

const readFloat = (bytes) => parseFloat(new Float32Array(new Uint8Array(bytes).buffer)[0].toFixed(3));

export const readInventory = (drops, index, invSize) => {
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
            const one = drops[index]; // I think this just signifies an object is in the dropconditions array
            index += 4;
            slot.dropCondition = drops[index];
            index += 1;
            slot.dropCondInt = bytesToInt(drops.slice(index, index += 4));
            slot.dropCondName = readAsciiString(drops, index);
            index += drops[index] + 4;
            index += 1; // skip DropCondDemo
        } else index += 4;

        slot.assetName = readAsciiString(drops, index);
        index += drops[index] + 4;

        slot.customParameter = readAsciiString(drops, index);
        index += drops[index] + 4;

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
    if (infoType === InfoType.Treasure) return parseOtakaraAI_Dynamic;
    if (creatureId.includes('Survivor')) return parseSurvivorAI_Dynamic;
    if (creatureId.startsWith('Pellet')) return parsePelletAI_Dynamic;
    if (creatureId.includes('Gate')) return parseGateAI_Dynamic;

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
    if (creatureId.includes('StickyFloorParts')) return () => ({ parsed: [] });
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
    if (infoType === InfoType.Treasure || creatureId.includes('Survivor')) return parseOtakaraAI;
    if (creatureId === 'RopeFishing') return parseRopeFishingAI;
    if (['ZiplineSplineMesh', 'ZiplineAnother'].includes(creatureId)) return parseZiplineAI;
    if (creatureId === 'PressFloor') return parsePressFloorAI;
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
    if (creatureId === 'DodoroEgg') return parseDodoroEggAI;
    if (creatureId === 'Queen') return parseQueenAI;
    if (creatureId === 'DamagumoCannon') return parseDamagumoCannonAI;
    if (creatureId === 'Yamashinju') return parseYamashinjuAI;
    if (creatureId === 'BigChappy') return parseBigChappyAI;
    if (creatureId.includes('Kurage')) return parseKurageAI;
    return () => { };
};

export const getReadPopPlaceFunc = creatureId => {
    if (creatureId === 'PopPlaceActor') return parsePopPlaceActor;
    return () => false;
};

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
                pitch: readFloat(bytes.slice(index, index += 4)),
                yaw: readFloat(bytes.slice(index, index += 4)),
                roll: readFloat(bytes.slice(index, index += 4)),
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

//#region ObjectAIParameter
const parseObjectAIParameter = (ai, generatorVersion) => {
    const parsed = [];
    let index = 0;
    const invLength = ai[index];
    index += 4;
    const AIProperties = {};

    // Inventories always start with 8*255
    for (let i = 0; i < invLength; i++) {
        const slot = {};
        slot.id = `${i + 1}`;
        index += 8;
        slot.minDrops = bytesToInt(ai.slice(index, index += 4));
        slot.maxDrops = bytesToInt(ai.slice(index, index += 4));
        slot.dropChance = readFloat(ai.slice(index, index += 4));
        slot.bRegistGenerator = ai[index];
        index += 4;

        if (ai[index] == 1) {
            const one = ai[index]; // I think this just signifies an object is in the dropconditions array
            index += 4;
            slot.dropCondition = ai[index];
            index += 1;
            slot.dropCondInt = bytesToInt(ai.slice(index, index += 4));
            slot.dropCondName = readAsciiString(ai, index);
            index += ai[index] + 4;
            index += 1; // skip DropCondDemo
        } else index += 4;
        slot.assetName = readAsciiString(ai, index);
        index += ai[index] + 4;
        slot.customParameter = readAsciiString(ai, index);
        index += ai[index] + 4;
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
    // and always end in 4*255 regardless of length
    index += 4;

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

    AIProperties.dropOption = bytesToInt(ai.slice(index, index += 2), 2);
    AIProperties.fixedHotExtractDropNum = bytesToInt(ai.slice(index, index += 4));
    AIProperties.bOverrideInitLocation = ai[index];
    index += 4;
    AIProperties.overrideInitLocation = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };
    index += 4; // skip the debugUniqueIds because they're 0'd in objects
    if (getObjectAIOffset(generatorVersion) === 4) {
        AIProperties.bEnableFreezeBothDrop = ai[index];
        index += 4;
    }

    AIProperties.bIgnoreLaterTask = ai[index];
    index += 4;
    AIProperties.bIgnoreCompleteUI = ai[index];
    index += 4;
    AIProperties.completeUIOffset = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };
    AIProperties.bEnableOptimizeWaterBoxContext = ai[index];
    index += 4;
    AIProperties.bDisableSoftEdge = ai[index];
    index += 4;
    AIProperties.bDisableSoftEdgeOnlyFrom = ai[index];
    index += 4;
    AIProperties.bDisableSoftEdgeOnlyTo = ai[index];
    index += 4;
    AIProperties.linkNarrowSpaceBoxID = readAsciiString(ai, index);
    index += ai[index] + 4;
    AIProperties.linkWarpTriggerID = readAsciiString(ai, index);
    index += ai[index] + 4;
    AIProperties.navMeshTriggerID = readAsciiString(ai, index);
    index += ai[index] + 4;
    const escapePointLength = bytesToInt(ai.slice(index, index += 1), 1);

    AIProperties.escapePoints = [];
    for (let i = 0; i < escapePointLength; i++) {
        AIProperties.escapePoints.push({
            X: readFloat(ai.slice(index, index += 4)),
            Y: readFloat(ai.slice(index, index += 4)),
            Z: readFloat(ai.slice(index, index += 4))
        });
    }
    AIProperties.bEnableOptionalPoint = ai[index];
    index += 4;

    const sniffPointLength = bytesToInt(ai.slice(index, index += 4));
    AIProperties.optionalPointOffsets = [];
    for (let i = 0; i < sniffPointLength; i++) {
        AIProperties.optionalPointOffsets.push({
            X: readFloat(ai.slice(index, index += 4)),
            Y: readFloat(ai.slice(index, index += 4)),
            Z: readFloat(ai.slice(index, index += 4))
        });
    }

    const priorityInfoLength = bytesToInt(ai.slice(index, index += 4));
    AIProperties.optionalPointPriorityInfo = [];
    for (let i = 0; i < priorityInfoLength; i++) {
        AIProperties.optionalPointPriorityInfo.push(bytesToInt(ai.slice(index, index += 4)));
    }
    return { parsed, AIProperties, index };
};

//#region RopeFishing
// FIX THIS
const parseRopeFishingAI = (ai, generatorVersion) => {
    let { AIProperties, parsed, index } = parseObjectAIParameter(ai, generatorVersion);
    // let index = ObjectAI_END_INDEX + offset;
    return {
        parsed,
        AIProperties: {
            ...AIProperties,
            jumpForceXY: readFloat(ai.slice(index, index += 4)),
            jumpForceZ: readFloat(ai.slice(index, index += 4)),
            ropeAng: readFloat(ai.slice(index, index += 4)),
            manualWorkNum: bytesToInt(ai.slice(index, index + 4))
        }
    };
};

const parsePressFloorAI = (ai, generatorVersion) => {
    let { AIProperties, parsed, index } = parseObjectAIParameter(ai, generatorVersion);
    const aip = {
        height: readFloat(ai.slice(index, index += 4)),
        maxHeightSpeed: readFloat(ai.slice(index, index += 4)),
        radius: readFloat(ai.slice(index, index += 4)),
        maxRadiusSpeed: readFloat(ai.slice(index, index += 4)),
    };
    const waterBoxId = readAsciiString(ai, index);
    index += ai[index] + 4;

    return {
        parsed,
        AIProperties: {
            ...AIProperties,
            ...aip,
            waterBoxId,
            createNavBoxRange: {
                X: readFloat(ai.slice(index, index += 4)),
                Y: readFloat(ai.slice(index, index += 4)),
                Z: readFloat(ai.slice(index, index += 4))
            },
            createNavBoxOffset: {
                X: readFloat(ai.slice(index, index += 4)),
                Y: readFloat(ai.slice(index, index += 4)),
                Z: readFloat(ai.slice(index, index += 4))
            }
        }
    };
};


//#region Geyser
const parseGeyserAI = (ai, generatorVersion) => {
    let { AIProperties, parsed, index } = parseObjectAIParameter(ai, generatorVersion);
    AIProperties.bSetCrystal = ai[index];
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
    AIProperties.direction = NavLinkDirection[ai[index]];
    index += 1;
    AIProperties.snapRadius = readFloat(ai.slice(index, index += 4));
    AIProperties.snapHeight = readFloat(ai.slice(index, index += 4));
    index += 4; // supportedAgentsBits
    AIProperties.bUseSnapHeight = ai[index];
    index += 1;
    AIProperties.bSnapToCheapestArea = ai[index];
    return {
        parsed,
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
const parseStickyFloorAI = (ai, generatorVersion) => {
    let { AIProperties, parsed, index } = parseObjectAIParameter(ai, generatorVersion);

    AIProperties.bAutoSpawnMush = ai[index];

    return {
        parsed,
        AIProperties,
    };
};

//#region Valve
const parseValveAI = (ai, generatorVersion) => {

    let { AIProperties, parsed, index } = parseObjectAIParameter(ai, generatorVersion);

    // let index = 155;
    AIProperties.entranceOffset = readFloat(ai.slice(index, index += 4));
    AIProperties.piecePerPanel = bytesToInt(ai.slice(index, index += 4));
    AIProperties.valveID = readAsciiString(ai, index);
    index += ai[index] + 4;
    AIProperties.builtWorkType = ValveWorkType[ai[index]];
    index += 4;
    AIProperties.demoID = ai[index];
    return {
        AIProperties,
        parsed
    };
};

const parseValveAI_Dynamic = ai => ({ piecePutNum: ai[12] });

export const parseValveActorParam = actorParam => ({
    demoBindName: readAsciiString(actorParam, 0)
});

//#region Zipline
const parseZiplineAI = (ai, generatorVersion) => {
    let { AIProperties: aip, parsed, index } = parseObjectAIParameter(ai, generatorVersion);

    const AIProperties = {
        ...aip,
        goalOffset: {
            X: readFloat(ai.slice(index, index += 4)),
            Y: readFloat(ai.slice(index, index += 4)),
            Z: readFloat(ai.slice(index, index += 4))
        },
        startTargetSpeed: readFloat(ai.slice(index, index += 4)),
        maxMoveSpeed: readFloat(ai.slice(index, index += 4)),
        minMoveSpeed: readFloat(ai.slice(index, index += 4)),
        acceleration: readFloat(ai.slice(index, index += 4)),
        deceleration: readFloat(ai.slice(index, index += 4))
    };
    AIProperties.splinePoints = readSpline(ai.slice(index, ai.length)).splinePoints;

    return {
        parsed,
        AIProperties
    };
};

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
const parseGateAI = (ai, generatorVersion) => {
    let { AIProperties, parsed, index } = parseObjectAIParameter(ai, generatorVersion);

    let invSize = ai[index];
    index += 4;
    const { parsed: rareDrops } = readInventory(ai, index, invSize);

    return { parsed, rareDrops, AIProperties };
};

const parseGateAI_Dynamic = ai => ({
    startValidWallIndex: bytesToInt(ai.slice(16, 20))
});

//#region NoraSpawner
const parseNoraSpawnerAI = ai => {
    let index = 0;
    const AIProperties = {};
    const parsed = [];
    AIProperties.spawnNum = bytesToInt(ai.slice(index, index += 4));
    AIProperties.spawnRadius = readFloat(ai.slice(index, index += 4));
    AIProperties.noSpawnRadius = readFloat(ai.slice(index, index += 4));
    AIProperties.pikminType = PikminTypes[ai[index]];
    index += 1;
    AIProperties.bMabikiEnable = ai[index];
    index += 4;
    AIProperties.spawnHeadLeaves = PikminLeaves[ai[index]];
    index += 1;
    AIProperties.mabikiNumFromFollow = bytesToInt(ai.slice(index, index += 4));
    AIProperties.mabikiNumFromAll = bytesToInt(ai.slice(index, index += 4));
    AIProperties.bMabikiPongashi = ai[index];
    index += 4;
    AIProperties.pongashiChangeColorFollowNum = bytesToInt(ai.slice(index, index += 4));
    AIProperties.pongashiChangeColorFromFollow = PikminTypes[ai[index]];
    index += 1;
    AIProperties.bReservedBirth = ai[index];
    index += 4;
    AIProperties.bDisableForcePongashi = ai[index];
    index += 4;
    AIProperties.bProWrestling = ai[index];
    index += 4;
    AIProperties.pongashiColor = PikminTypes[ai[index]];
    index += 1;
    AIProperties.noraIdlingPreset = readAsciiString(ai, index);
    index += ai[index] + 4;

    AIProperties.bEnablePointLight = ai[index];
    index += 4;
    AIProperties.groupIdlingType = PikminPlayType[ai[index]];
    index += 1;
    AIProperties.bExcludesFue = ai[index];
    index += 4;
    AIProperties.mabikiPongashiOffset = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };
    AIProperties.aiWaitTime = readFloat(ai.slice(index, index += 4));
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
    bytes.bGenseiControl = drops[index];
    index += 4;
    bytes.bNotOverlap = drops[index];
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
    bytes.maxAreaNum = bytesToInt(drops.slice(index, index += 4));
    bytes.maxSpawnNum = bytesToInt(drops.slice(index, index += 4));
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
    let index = 155 + getObjectAIOffset(generatorVersion); // this version 155 long vs 159 in the other two
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
const parseBaseAI = (ai, generatorVersion) => {
    const offset = getObjectAIOffset(generatorVersion);
    let index = 155 + offset;

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

//#region Otakara
const parseOtakaraAI = (ai) => {
    let index = 4;
    const AIProperties = {
        bChangeCrushImpactMoveDir: ai[index]
    };
    index += 4;
    AIProperties.bReceiveCrushImpactEvent = ai[index];
    index += 4;
    AIProperties.bSendCrushImpactEvent = ai[index];
    index += 4;
    AIProperties.crushImpactMoveRot = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };
    index += 5; // skip unknown, yes there is 5 0s here it seems
    AIProperties.bDDBSurvivorLeaf = ai[index];
    index += 4;
    AIProperties.bEnableOptionalPoint = ai[index];
    index += 4;

    let arrayLength = ai[index];
    index += 4;
    AIProperties.optionalPointOffsets = [];
    for (let i = 0; i < arrayLength; i++) {
        AIProperties.optionalPointOffsets.push({
            X: readFloat(ai.slice(index, index += 4)),
            Y: readFloat(ai.slice(index, index += 4)),
            Z: readFloat(ai.slice(index, index += 4))
        });
    }
    const priorityInfoLength = bytesToInt(ai.slice(index, index += 4));
    AIProperties.optionalPointPriorityInfo = [];
    for (let i = 0; i < priorityInfoLength; i++) {
        AIProperties.optionalPointPriorityInfo.push(bytesToInt(ai.slice(index, index += 4)));
    }
    return { AIProperties, parsed: [] };
};

const parseOtakaraAI_Dynamic = (ai) => {
    let index = 0;
    const AIProperties = {
        bCanFall: ai[index]
    };
    index += 4;
    AIProperties.bEnableChangeInitTransformAfterFalling = ai[index];
    index += 4;
    AIProperties.rotation = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4)),
        W: readFloat(ai.slice(index, index += 4))
    };
    AIProperties.translation = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };
    return AIProperties;
};

const parseSurvivorAI_Dynamic = (ai) => ({
    npcInfoKey: readAsciiString(ai, 0),
    ...parseOtakaraAI_Dynamic(ai.slice(ai[0] + 4, ai.length))
});

const parsePelletAI_Dynamic = (ai) => ({ colour: PikminTypes[ai[0]] });

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
        slot.id = bytesToU64(ai.slice(index, index += 8)).toString();
        slot.minDrops = bytesToInt(ai.slice(index, index += 4));
        slot.maxDrops = bytesToInt(ai.slice(index, index += 4));
        slot.dropChance = readFloat(ai.slice(index, index += 4));
        slot.bRegistGenerator = ai[index];
        index += 4;
        let dropCondition;
        if (ai[index] == 1) {
            const one = ai[index]; // I think this just signifies an object is in the dropconditions array
            index += 4;
            slot.dropCondition = ai[index];
            index += 1;
            slot.dropCondInt = bytesToInt(ai.slice(index, index += 4));
            slot.dropCondName = readAsciiString(ai, index);
            index += ai[index] + 4 + 1; // start of dropCond string, usually None. We also don't care about the DemoFlag
        } else index += 4;
        slot.assetName = readAsciiString(ai, index);
        index += ai[index] + 4;

        slot.customParameter = readAsciiString(ai, index);
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
    AIProperties.fixedHotExtractDropNum = bytesToInt(ai.slice(index, index += 4));
    AIProperties.bOverrideInitLocation = ai[index];
    index += 4;

    AIProperties.overrideInitLocation = {
        X: readFloat(ai.slice(index, index += 4)),
        Y: readFloat(ai.slice(index, index += 4)),
        Z: readFloat(ai.slice(index, index += 4))
    };
    index += 4 + ai[index] * 8; // skip the inventory flag loop

    // Short gen version is missing 4 bytes here. Not 100% sure which
    const offset = getObjectAIOffset(generatorVersion);
    if (offset === 4) {
        AIProperties.bEnableFreezeBothDrop = ai[index];
        index += 4;
    }
    AIProperties.bCalcSearchAreaOtakaraCarryWithTerritory = ai[index];
    index += 4;
    AIProperties.searchAreaOtakaraCarry = {
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
    AIProperties.invasionStartTimeRatio = readFloat(ai.slice(index, index += 4));
    AIProperties.bNotifyCarryNearProWrestlingPikmin = ai[index];
    index += 4;
    AIProperties.bEnableCullSearchEnemy = ai[index];
    index += 4;
    AIProperties.bUseActorLastRenderTime = ai[index];
    index += 4;
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

    const priorityInfoLength = ai[index];
    index += 4;
    AIProperties.optionalPointPriorityInfo = [];
    for (let i = 0; i < priorityInfoLength; i++) {
        AIProperties.optionalPointPriorityInfo.push(bytesToInt(ai.slice(index, index += 4)));
    }
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
    // MaxChildNum isn't implemented by the serialiser

    return AIProperties;
};

const parseHageDamagumoAI = ai => {
    console.log(ai);
    let index = 0;
    const AIProperties = {
        searchTagName: readAsciiString(ai, index)
    };
    index += ai[index] + 4;
    AIProperties.bStraddle = ai[index];
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
    AIProperties.bSplineWalkStart = ai[index];
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
    AIProperties.searchTagName = readAsciiString(ai, index);
    return AIProperties;
};

const parseBigUjinkoAI = ai => {
    let index = 0;
    const AIProperties = {
        bNoBurrowType: ai[index]
    };
    index += 4;
    AIProperties.bPatrolType = ai[index];
    index += 4;
    AIProperties.searchAreaTag = readAsciiString(ai, index);
    return AIProperties;
};

const parseDodoroEggAI = ai => {
    let index = 0;
    const AIProperties = {
        splineRoutePathTag: readAsciiString(ai, index)
    };
    index += ai[index] + 4;
    AIProperties.spawnTimer = readFloat(ai.slice(index, index += 4));
    AIProperties.bUseParentDropInfo = ai[index]; // bUseParentDropInfo?
    index += 4;
    AIProperties.bOnceDodoroAppearDemo = ai[index]; // maybe?
    index += 4;
    AIProperties.spawnTimerAfterDemo = readFloat(ai.slice(index, index += 4));
    AIProperties.subSplineRoutePathTag = readAsciiString(ai, index);
    index += ai[index] + 4;
    AIProperties.refObstacleGenID = bytesToInt(ai.slice(index, index += 4));
    return AIProperties;
};

const parseQueenAI = ai => {
    let index = 1;
    return {
        queenAIType: QueenAIType[ai[0]], // EQueenAIType::FallBaby = 3, ::Born == 1, 0 == no larva
        rockBallHeightMin: readFloat(ai.slice(index, index += 4)),
        rockBallHeightMax: readFloat(ai.slice(index, index += 4)),
        rockBallSpawnRadius: readFloat(ai.slice(index, index += 4)),
        rockBallSpawnOffsetY: readFloat(ai.slice(index, index += 4)),
        rockBallHeightMinInOppositeSide: readFloat(ai.slice(index, index += 4)),
        rockBallHeightMaxInOppositeSide: readFloat(ai.slice(index, index += 4)),
        rockBallSpawnRadiusInOppositeSide: readFloat(ai.slice(index, index += 4)),
        bornSpeed: readFloat(ai.slice(index, index += 4)),
        childSearchRadius: readFloat(ai.slice(index, index += 4)),
        fallBabySpawnRadius: readFloat(ai.slice(index, index += 4)),
        fallBabySpawnNum: bytesToInt(ai.slice(index, index += 4)),
        flickDistXY: readFloat(ai.slice(index, index += 4))
    };
};

const parseDamagumoCannonAI = ai => {
    let index = 0;
    const AIProperties = {
        searchTagName: readAsciiString(ai, index)
    };
    index += ai[index] + 4;
    AIProperties.bStraddle = ai[index];
    index += 4;
    AIProperties.bAlreadyAppear = ai[index];
    index += 4;
    AIProperties.searchAreaGoToHome = {
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
    return AIProperties;
};

const parseYamashinjuAI = ai => {
    let index = 0;
    const AIProperties = {
        dropPearlScale: readFloat(ai.slice(index, index += 4)),
        dropActor: readAsciiString(ai, index),
    };
    index += ai[index] + 4;
    AIProperties.customParameter = readAsciiString(ai, index);
    return AIProperties;
};

const parseBigChappyAI = ai => {
    let index = 4;
    return {
        bHideEnter: ai[0],
        hideOffset: {
            X: readFloat(ai.slice(index, index += 4)),
            Y: readFloat(ai.slice(index, index += 4)),
            Z: readFloat(ai.slice(index, index += 4))
        },
    };
};

const parseKurageAI = ai => {
    let index = 0;
    const AIProperties = {
        eatOnBirthRange: readFloat(ai.slice(index, index += 4)),
        bFallStart: ai[index],
    };
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
        sphereRadius: readFloat(ai.slice(index, index += 4)),
    };
    AIProperties.ownerSubComponentFlag = ai[index];
    return AIProperties;
};

// he needs charting properly I think
// const parseBigKingChappyAI = ai => {
//     let index = 0;
//     // seems to be a vector first
//     // then bWithFallRock?
//     // bTriggerByAppear?
//     // bTangueCollisionOnlyWall?
//     // then bigjJumpSinkFloor
//     // fallRock bSinkFloor
//     // appearParameter bSinkFloor
//     // pressParameter bSinkFloor
// };

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
    AIProperties.bCreateIcicle = ai[index];
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

    AIProperties.appearSearchRadius = readFloat(ai.slice(index, index += 4));
    AIProperties.walkType = AmeBozuWalkTypes[ai[index]];
    index += 1;

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
    PortalTrigger.pankuzuPriority = portalTrigger[index];
    index += 4;
    const flags = bytesToInt(portalTrigger.slice(index, index += 4));
    PortalTrigger.disablePikminFlags = getDisableSettings(flags);
    PortalTrigger.bDisableIsFlareGuard = portalTrigger[index];
    index += 4;
    // PortalTrigger.spareBytes = portalTrigger.slice(index, portalTrigger.length); // These last 3 floats are the trigger coordinates

    return { PortalTrigger };
};


//#region PopPlace
const parsePopPlaceActor = (bytes) => {
    let index = 1;
    const PopPlace = {
        popObjectType: PopObjectType[bytes[0]],
        groupId: bytesToInt(bytes.slice(index, index += 4)),
        maxObjectNumInRange: bytesToInt(bytes.slice(index, index += 4))
    };
    index += 4; // ?
    PopPlace.isTerritorySetting = bytes[index];
    index += 4;
    PopPlace.bNoSearchOuterTerritory = bytes[index];
    index += 4;
    PopPlace.territory = {
        X: readFloat(bytes.slice(index, index += 4)),
        Y: readFloat(bytes.slice(index, index += 4)),
        Z: readFloat(bytes.slice(index, index += 4)),
        halfHeight: readFloat(bytes.slice(index, index += 4)),
        radius: readFloat(bytes.slice(index, index += 4))
    };
    index += 1;
    PopPlace.string = readAsciiString(bytes, index);
    index += bytes[index] + 4;

    // This skips everything between the string and IsOtakaraSetting as it's never changed and thus untraceable, so I think it's safe
    PopPlace.spareBytes = bytes.slice(index, index += 171);

    PopPlace.isOtakaraSetting = bytes[index];
    index += 8; // dunno what the bool after is
    PopPlace.bChangeCrushImpactMoveDir = bytes[index];
    index += 4;
    PopPlace.bReceiveCrushImpactEvent = bytes[index];
    index += 4;
    PopPlace.bSendCrushImpactEvent = bytes[index];
    index += 4;
    PopPlace.crushImpactMoveRot = {
        pitch: readFloat(bytes.slice(index, index += 4)),
        yaw: readFloat(bytes.slice(index, index += 4)),
        roll: readFloat(bytes.slice(index, index += 4)),
    };
    PopPlace.bUseCrushDDB = bytes[index];
    index += 4;
    PopPlace.crushDDBPoint = {
        X: PopPlace.bUseCrushDDB ? readFloat(bytes.slice(index, index += 4)) : 0,
        Y: PopPlace.bUseCrushDDB ? readFloat(bytes.slice(index, index += 4)) : 0,
        Z: PopPlace.bUseCrushDDB ? readFloat(bytes.slice(index, index += 4)) : 0
    };
    PopPlace.DDBPikminHeightType = DDBPikminHeightType[bytes[index]];
    // Some stuff comes after but it's a None and 12 bytes of 0

    return { PopPlace };
};

export const readLife = life => ({
    maxLife: readFloat(life.slice(0, 4)),
    life: readFloat(life.slice(4, 8)),
});