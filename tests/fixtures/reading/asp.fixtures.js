// AUTO-GENERATED from pristine AP_*.json actor placement files (P4 archive/Carrot4/Maps).
// Byte arrays are real ActorSerializeParameter data; every comment labels the bytes that follow it.
// AI.Static labels come from the ai-static layouts (reference parser that parses all 7,640 shipped samples).
import { InfoType } from '../../../src/api/types';

export const dynamicReadingFixtures = [
    {
        name: 'Circulator',
        description: 'Circulator dynamic',
        source: 'Madori/Cave/Cave013/Cave013_F02/ActorPlacementInfo/AP_Cave013_F02_P_Objects.json#9',
        creatureId: 'Circulator',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseCirculatorAI_Dynamic',
        bytes: [
            // Unmapped (12 bytes)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // bRotateDefault: true
            1, 0, 0, 0,
        ],
        expected: {
            bRotateDefault: 1
        }
    },
    {
        name: 'VarGateBomb',
        description: 'VarGateBomb dynamic',
        source: 'Main/Area/Area002/ActorPlacementInfo/AP_Area002_P_Hero_Objects.json#23',
        creatureId: 'VarGateBomb',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        reader: 'parseGateAI_Dynamic',
        bytes: [
            // Unmapped (12 bytes)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // Unmapped: -1
            255, 255, 255, 255,
            // startValidWallIndex: -1
            255, 255, 255, 255,
            // Unmapped: 0
            0, 0, 0, 0,
        ],
        expected: {
            startValidWallIndex: -1
        }
    },
    {
        name: 'Ota3DMegane',
        description: 'Ota3DMegane dynamic',
        source: 'Madori/Cave/Cave023/Cave023_F01/ActorPlacementInfo/AP_Cave023_F01_P_Objects.json#2',
        creatureId: 'Ota3DMegane',
        infoType: InfoType.Treasure,
        generatorVersion: 8626647386,
        reader: 'parseOtakaraAI_Dynamic',
        bytes: [
            // bCanFall: false
            0, 0, 0, 0,
            // bEnableChangeInitTransformAfterFalling: false
            0, 0, 0, 0,
            // rotation (X, Y, Z, W): (0, 0, 0, 1)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63,
            // translation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // Unmapped - copied from the original on write
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
        ],
        expected: {
            bCanFall: 0,
            bEnableChangeInitTransformAfterFalling: 0,
            rotation: {
                X: 0,
                Y: 0,
                Z: 0,
                W: 1
            },
            translation: {
                X: 0,
                Y: 0,
                Z: 0
            }
        }
    },
    {
        name: 'Pellet1',
        description: 'Pellet1 dynamic',
        source: 'Main/Area/Area010/ActorPlacementInfo/AP_Area010_P_Objects_Day.json#18',
        creatureId: 'Pellet1',
        infoType: InfoType.Object,
        generatorVersion: 8626647386,
        reader: 'parsePelletAI_Dynamic',
        bytes: [
            // colour (EPikminColor): 0
            0,
        ],
        expected: {
            colour: 'PikminRed'
        }
    },
    {
        name: 'HikariStation',
        description: 'HikariStation dynamic',
        source: 'Main/Area/Area001/ActorPlacementInfo/AP_Area001_P_Objects_Night.json#0',
        creatureId: 'HikariStation',
        infoType: InfoType.Object,
        generatorVersion: 8626647386,
        reader: 'parsePileAI_Dynamic',
        bytes: [
            // Unmapped (36 bytes)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0,
            // pieceNum: 20
            20, 0, 0, 0,
            // Unmapped
            255, 255, 255, 255,
        ],
        expected: {
            pieceNum: 20
        }
    },
    {
        name: 'String',
        description: 'String dynamic',
        source: 'Madori/Cave/Cave003/Cave003_F00/ActorPlacementInfo/AP_Cave003_F00_P_Objects.json#9',
        creatureId: 'String',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        reader: 'parseStringAI_Dynamic',
        bytes: [
            // Unmapped (12 bytes)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // bFalled: false
            0, 0, 0, 0,
        ],
        expected: {
            bFalled: 0
        }
    },
    {
        name: 'SurvivorA',
        description: 'SurvivorA dynamic',
        source: 'Madori/Cave/Cave001/Cave001_F00/ActorPlacementInfo/AP_Cave001_F00_P_Objects.json#3',
        creatureId: 'SurvivorA',
        infoType: InfoType.Object,
        generatorVersion: 8626647386,
        reader: 'parseSurvivorAI_Dynamic',
        bytes: [
            // npcInfoKey: "SVSleep000"
            11, 0, 0, 0, 83, 86, 83, 108, 101, 101, 112, 48, 48, 48, 0,
            // bCanFall: false
            0, 0, 0, 0,
            // bEnableChangeInitTransformAfterFalling: false
            0, 0, 0, 0,
            // rotation (X, Y, Z, W): (0, 0, 0, 1)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63,
            // translation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // Unmapped - copied from the original on write
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
        ],
        expected: {
            npcInfoKey: 'SVSleep000',
            bCanFall: 0,
            bEnableChangeInitTransformAfterFalling: 0,
            rotation: {
                X: 0,
                Y: 0,
                Z: 0,
                W: 1
            },
            translation: {
                X: 0,
                Y: 0,
                Z: 0
            }
        }
    },
    {
        name: 'Tateana',
        description: 'Tateana dynamic',
        source: 'Madori/Cave/Cave007/Cave007_F02/ActorPlacementInfo/AP_Cave007_F02_P_Objects.json#16',
        creatureId: 'Tateana',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseTateanaAI_Dynamic',
        bytes: [
            // Unmapped (12 bytes)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // numDig: 5
            5, 0, 0, 0,
            // Unmapped
            255, 255, 255, 255,
        ],
        expected: {
            numDig: 5
        }
    },
    {
        name: 'ValveOnce',
        description: 'ValveOnce dynamic',
        source: 'Madori/Cave/Cave011/Cave011_F00/ActorPlacementInfo/AP_Cave011_F00_P_Objects.json#9',
        creatureId: 'ValveOnce',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        reader: 'parseValveAI_Dynamic',
        bytes: [
            // Unmapped (12 bytes)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // piecePutNum: 8
            8,
            // Unmapped - copied from the original on write
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0,
        ],
        expected: {
            piecePutNum: 8
        }
    },
    {
        name: 'WaterBox',
        description: 'WaterBox dynamic',
        source: 'Madori/Cave/Cave004/Cave004_F00/ActorPlacementInfo/AP_Cave004_F00_P_Objects.json#3',
        creatureId: 'WaterBox',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseWaterBoxAI_Dynamic',
        bytes: [
            // Unmapped (16 bytes)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255,
            // afterMaxIcePikmins: 0
            0, 0, 0, 0,
        ],
        expected: {
            afterMaxIcePikmins: 0
        }
    },
    {
        name: 'SwampBox',
        description: 'SwampBox dynamic',
        source: 'Madori/Cave/Cave016/Cave016_F07/ActorPlacementInfo/AP_Cave016_F07_P_Objects.json#1',
        creatureId: 'SwampBox',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseWaterBoxAI_Dynamic',
        bytes: [
            // Unmapped (16 bytes)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255,
            // afterMaxIcePikmins: 0
            0, 0, 0, 0,
        ],
        expected: {
            afterMaxIcePikmins: 0
        }
    },
    {
        name: 'AmeBozu',
        description: 'AmeBozu dynamic',
        source: 'Madori/Cave/Cave014/Cave014_F00/ActorPlacementInfo/AP_Cave014_F00_P_Teki.json#2',
        creatureId: 'AmeBozu',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseAmeBozuAI_Dynamic',
        bytes: [
            // Unmapped (20 bytes)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0,
            // lifeTire: 1800
            0, 0, 225, 68,
        ],
        expected: {
            lifeTire: 1800
        }
    }
];

export const portalTriggerReadingFixtures = [
    {
        name: 'DownPortal',
        description: 'DownPortal PortalTrigger',
        source: 'Madori/Cave/Cave002/Cave002_F00/ActorPlacementInfo/AP_Cave002_F00_P_Objects.json#1',
        creatureId: 'DownPortal',
        infoType: InfoType.Portal,
        generatorVersion: 8626647386,
        bytes: [
            // portalType (EPortalType): 4
            4,
            // portalNumber: 1
            1, 0, 0, 0,
            // toLevelName: "Cave002_F01"
            12, 0, 0, 0, 67, 97, 118, 101, 48, 48, 50, 95, 70, 48, 49, 0,
            // toSubLevelName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // toPortalId: 0
            0, 0, 0, 0,
            // Unmapped bool (always 1): true
            1, 0, 0, 0,
            // demoPlayParamEnter: "/Game/Carrot4/Demo/PlayParam/Common/DPP_MoveCave.DPP_MoveCave"
            62, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 68, 101, 109, 111, 47, 80, 108, 97, 121, 80, 97, 114, 97, 109,
            47, 67, 111, 109, 109, 111, 110, 47, 68, 80, 80, 95, 77, 111, 118, 101,
            67, 97, 118, 101, 46, 68, 80, 80, 95, 77, 111, 118, 101, 67, 97, 118,
            101, 0,
            // Unmapped
            0, 0, 0, 0,
            // demoPlayParamExit: "/Game/Carrot4/Demo/PlayParam/Common/DPP_FloorCourseInCave.DPP_FloorCourseInCave"
            80, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 68, 101, 109, 111, 47, 80, 108, 97, 121, 80, 97, 114, 97, 109,
            47, 67, 111, 109, 109, 111, 110, 47, 68, 80, 80, 95, 70, 108, 111, 111,
            114, 67, 111, 117, 114, 115, 101, 73, 110, 67, 97, 118, 101, 46, 68, 80,
            80, 95, 70, 108, 111, 111, 114, 67, 111, 117, 114, 115, 101, 73, 110, 67,
            97, 118, 101, 0,
            // Unmapped
            0, 0, 0, 0,
            // checkPointLevelNames (count): 0
            0, 0, 0, 0,
            // toBaseCampId: -1
            255, 255, 255, 255,
            // bInitialPortalMove: false
            0, 0, 0, 0,
            // bDeactivateByExit: false
            0, 0, 0, 0,
            // Unmapped float (written as 500): 500
            0, 0, 250, 67,
            // playAnimDist: 175
            0, 0, 47, 67,
            // Unmapped
            0, 0, 0, 0,
            // pankuzuPriority: 0
            0, 0, 0, 0,
            // disablePikminFlags (bitfield): 0
            0, 0, 0, 0,
            // bDisableIsFlareGuard: false
            0, 0, 0, 0,
            // Unmapped floats (written as 100, 90, 50)
            0, 0, 200, 66, 0, 0, 180, 66, 0, 0, 72, 66,
            // Trigger location - regenerated from the transform (X, Y, Z + 50) on write: (689, -1214, 160)
            255, 63, 44, 68, 0, 192, 151, 196, 4, 0, 32, 67,
        ],
        expected: {
            PortalTrigger: {
                portalType: 'DownPortal (cave)',
                portalNumber: 1,
                toLevelName: 'Cave002_F01',
                toSubLevelName: 'None',
                toPortalId: 0,
                demoPlayParamEnter: 'DPP_MoveCave',
                demoPlayParamExit: 'DPP_FloorCourseInCave',
                toBaseCampId: -1,
                bInitialPortalMove: 0,
                bDeactivateByExit: 0,
                playAnimDist: 175,
                pankuzuPriority: 0,
                disablePikminFlags: {
                    '0': false,
                    '1': false,
                    '2': false,
                    '3': false,
                    '4': false,
                    '5': false,
                    '6': false,
                    '7': false,
                    '8': false,
                    '9': false,
                    '10': false,
                    '11': false,
                    '12': false,
                    '13': false,
                    '14': false,
                    '15': false
                },
                bDisableIsFlareGuard: 0
            }
        }
    }
];

export const popPlaceReadingFixtures = [
    {
        name: 'PopPlaceActor',
        description: 'PopPlaceActor PopPlace',
        source: 'Madori/Ddb/DDB_AI001/ActorPlacementInfo/AP_DDB_AI001_P_LVS_Objects.json#71',
        creatureId: 'PopPlaceActor',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        bytes: [
            // popObjectType (EVsPopObjectType): 1
            1,
            // groupId: 104
            104, 0, 0, 0,
            // maxObjectNumInRange: 0
            0, 0, 0, 0,
            // Unmapped float (not read): 0
            0, 0, 0, 0,
            // isTerritorySetting: false
            0, 0, 0, 0,
            // bNoSearchOuterTerritory: false
            0, 0, 0, 0,
            // territory: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // territory.halfHeight: 50
            0, 0, 72, 66,
            // territory.radius: 100
            0, 0, 200, 66,
            // Unmapped: 0
            0,
            // string: "FutakuchiRock"
            14, 0, 0, 0, 70, 117, 116, 97, 107, 117, 99, 104, 105, 82, 111, 99,
            107, 0,
            // spareBytes - kept verbatim (171 bytes)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 66,
            0, 0, 200, 66, 0, 0, 180, 66, 0, 0, 240, 65, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 66, 0, 0, 200, 66,
            0, 0, 180, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 66, 0, 0, 200, 66,
            0, 0, 180, 66, 0, 0, 240, 65, 0, 0, 0, 0, 0, 0, 0, 0,
            255, 255, 255, 255, 5, 0, 0, 0, 78, 111, 110, 101, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 150,
            66, 0, 128, 187, 67, 0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240,
            65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // isOtakaraSetting: false
            0, 0, 0, 0,
            // Unmapped
            0, 0, 0, 0,
            // bChangeCrushImpactMoveDir: false
            0, 0, 0, 0,
            // bReceiveCrushImpactEvent: false
            0, 0, 0, 0,
            // bSendCrushImpactEvent: false
            0, 0, 0, 0,
            // crushImpactMoveRot (pitch, yaw, roll): (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // bUseCrushDDB: false
            0, 0, 0, 0,
            // DDBPikminHeightType: 0
            0,
            // Unmapped
            5, 0, 0, 0, 78, 111, 110, 101, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
        ],
        expected: {
            PopPlace: {
                popObjectType: 'EVsPopObjectType::Otakara',
                groupId: 104,
                maxObjectNumInRange: 0,
                isTerritorySetting: 0,
                bNoSearchOuterTerritory: 0,
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                },
                string: 'FutakuchiRock',
                spareBytes: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    72,
                    66,
                    0,
                    0,
                    200,
                    66,
                    0,
                    0,
                    180,
                    66,
                    0,
                    0,
                    240,
                    65,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    72,
                    66,
                    0,
                    0,
                    200,
                    66,
                    0,
                    0,
                    180,
                    66,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    72,
                    66,
                    0,
                    0,
                    200,
                    66,
                    0,
                    0,
                    180,
                    66,
                    0,
                    0,
                    240,
                    65,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    255,
                    255,
                    255,
                    255,
                    5,
                    0,
                    0,
                    0,
                    78,
                    111,
                    110,
                    101,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    150,
                    66,
                    0,
                    128,
                    187,
                    67,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    112,
                    65,
                    0,
                    0,
                    240,
                    65,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                isOtakaraSetting: 0,
                bChangeCrushImpactMoveDir: 0,
                bReceiveCrushImpactEvent: 0,
                bSendCrushImpactEvent: 0,
                crushImpactMoveRot: {
                    pitch: 0,
                    yaw: 0,
                    roll: 0
                },
                bUseCrushDDB: 0,
                crushDDBPoint: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                DDBPikminHeightType: 'EDDBPikminHeightType::AllPikmin'
            }
        }
    }
];

export const actorParameterReadingFixtures = [
    {
        name: 'WaterBox',
        description: 'WaterBox ActorParameter',
        source: 'Madori/Cave/Cave004/Cave004_F00/ActorPlacementInfo/AP_Cave004_F00_P_Objects.json#3',
        creatureId: 'WaterBox',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        bytes: [
            // ActorParameter header (unmapped)
            5, 0, 0, 0, 78, 111, 110, 101, 0, 0, 0, 0, 0, 1, 0, 0,
            0, 1, 0, 0, 0, 5, 0, 0, 0, 78, 111, 110, 101, 0, 5, 0,
            0, 0, 78, 111, 110, 101, 0, 0, 0, 0, 0, 0, 0, 128, 191, 0,
            0, 128, 191, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 128, 191,
            // unknownInt: 0
            0,
            // radarMapWBTexture: "/Game/Carrot4/UI/InGame/RadarMap/UMG/Map/Cave004_F00/T_ui_Map_Cave004_F00_WaterBox00_D.T_ui_Map_Cave004_F00_WaterBox00_D"
            121, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 85, 73, 47, 73, 110, 71, 97, 109, 101, 47, 82, 97, 100, 97,
            114, 77, 97, 112, 47, 85, 77, 71, 47, 77, 97, 112, 47, 67, 97, 118,
            101, 48, 48, 52, 95, 70, 48, 48, 47, 84, 95, 117, 105, 95, 77, 97,
            112, 95, 67, 97, 118, 101, 48, 48, 52, 95, 70, 48, 48, 95, 87, 97,
            116, 101, 114, 66, 111, 120, 48, 48, 95, 68, 46, 84, 95, 117, 105, 95,
            77, 97, 112, 95, 67, 97, 118, 101, 48, 48, 52, 95, 70, 48, 48, 95,
            87, 97, 116, 101, 114, 66, 111, 120, 48, 48, 95, 68, 0,
            // radarMapWBChangeDistTexture: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // Unmapped
            205, 204, 76, 65,
        ],
        expected: {
            unknownInt: 0,
            radarMapWBTexture: 'T_ui_Map_Cave004_F00_WaterBox00_D',
            radarMapWBChangeDistTexture: 'None'
        }
    },
    {
        name: 'SplineAmeBozu',
        description: 'SplineAmeBozu ActorParameter',
        source: 'Madori/Cave/Cave014/Cave014_F00/ActorPlacementInfo/AP_Cave014_F00_P_Teki.json#7',
        creatureId: 'SplineAmeBozu',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        bytes: [
            // Unmapped name: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // Unmapped (12 bytes)
            0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            // Unmapped name: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // Unmapped name: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // Unmapped (24 bytes)
            0, 0, 0, 0, 0, 0, 128, 191, 0, 0, 128, 191, 1, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 128, 191,
            // splinePoints (count): 11
            11, 0, 0, 0,
            // ---- splinePoints[0] ----
            // inVal: 0
            0, 0, 0, 0,
            // outVal: (-280.606, -2.91141, -65.0002)
            140, 77, 140, 195, 128, 84, 58, 192, 26, 0, 130, 194,
            // arriveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // leaveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // rotation (pitch, yaw, roll): (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // interpMode: 2
            2,
            // ---- splinePoints[1] ----
            // inVal: 1
            0, 0, 128, 63,
            // outVal: (-341.844, 392.17, -65.0002)
            248, 235, 170, 195, 198, 21, 196, 67, 26, 0, 130, 194,
            // arriveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // leaveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // rotation (pitch, yaw, roll): (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // interpMode: 2
            2,
            // ---- splinePoints[2] ----
            // inVal: 2
            0, 0, 0, 64,
            // outVal: (767.156, 385.17, -40.0002)
            4, 202, 63, 68, 198, 149, 192, 67, 52, 0, 32, 194,
            // arriveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // leaveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // rotation (pitch, yaw, roll): (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // interpMode: 1
            1,
            // ---- splinePoints[3] ----
            // inVal: 3
            0, 0, 64, 64,
            // outVal: (1296.47, 286.665, -40.0002)
            30, 15, 162, 68, 17, 85, 143, 67, 52, 0, 32, 194,
            // arriveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // leaveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // rotation (pitch, yaw, roll): (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // interpMode: 2
            2,
            // ---- splinePoints[4] ----
            // inVal: 4
            0, 0, 128, 64,
            // outVal: (1312.54, 907.853, -40.0002)
            49, 17, 164, 68, 157, 246, 98, 68, 52, 0, 32, 194,
            // arriveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // leaveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // rotation (pitch, yaw, roll): (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // interpMode: 2
            2,
            // ---- splinePoints[5] ----
            // inVal: 5
            0, 0, 160, 64,
            // outVal: (1725.68, 907.853, -40.0002)
            180, 181, 215, 68, 157, 246, 98, 68, 52, 0, 32, 194,
            // arriveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // leaveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // rotation (pitch, yaw, roll): (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // interpMode: 2
            2,
            // ---- splinePoints[6] ----
            // inVal: 6
            0, 0, 192, 64,
            // outVal: (1299.68, -192.147, -40.0002)
            180, 117, 162, 68, 140, 37, 64, 195, 52, 0, 32, 194,
            // arriveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // leaveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // rotation (pitch, yaw, roll): (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // interpMode: 2
            2,
            // ---- splinePoints[7] ----
            // inVal: 7
            0, 0, 224, 64,
            // outVal: (1553.68, 77.8533, -40.0002)
            180, 53, 194, 68, 232, 180, 155, 66, 52, 0, 32, 194,
            // arriveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // leaveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // rotation (pitch, yaw, roll): (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // interpMode: 2
            2,
            // ---- splinePoints[8] ----
            // inVal: 8
            0, 0, 0, 65,
            // outVal: (487.678, 108.853, -40.0002)
            208, 214, 243, 67, 232, 180, 217, 66, 52, 0, 32, 194,
            // arriveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // leaveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // rotation (pitch, yaw, roll): (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // interpMode: 2
            2,
            // ---- splinePoints[9] ----
            // inVal: 9
            0, 0, 16, 65,
            // outVal: (280.678, -738.147, -15.0002)
            208, 86, 140, 67, 100, 137, 56, 196, 208, 0, 112, 193,
            // arriveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // leaveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // rotation (pitch, yaw, roll): (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // interpMode: 2
            2,
            // ---- splinePoints[10] ----
            // inVal: 10
            0, 0, 32, 65,
            // outVal: (1007.68, -170.147, -10.3612)
            104, 235, 123, 68, 144, 37, 42, 195, 112, 199, 37, 193,
            // arriveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // leaveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // rotation (pitch, yaw, roll): (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // interpMode: 2
            2,
            // Unmapped (12 bytes)
            0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            // searchTagName: "AmeBozuRootPoint"
            17, 0, 0, 0, 65, 109, 101, 66, 111, 122, 117, 82, 111, 111, 116, 80,
            111, 105, 110, 116, 0,
        ],
        expected: {
            splinePoints: [
                {
                    inVal: 0,
                    outVal: {
                        X: -280.606,
                        Y: -2.911,
                        Z: -65
                    },
                    arriveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    leaveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    rotation: {
                        pitch: 0,
                        yaw: 0,
                        roll: 0
                    },
                    scale: {
                        X: 1,
                        Y: 1,
                        Z: 1
                    },
                    interpMode: 'CIM_Constant'
                },
                {
                    inVal: 1,
                    outVal: {
                        X: -341.844,
                        Y: 392.17,
                        Z: -65
                    },
                    arriveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    leaveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    rotation: {
                        pitch: 0,
                        yaw: 0,
                        roll: 0
                    },
                    scale: {
                        X: 1,
                        Y: 1,
                        Z: 1
                    },
                    interpMode: 'CIM_Constant'
                },
                {
                    inVal: 2,
                    outVal: {
                        X: 767.156,
                        Y: 385.17,
                        Z: -40
                    },
                    arriveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    leaveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    rotation: {
                        pitch: 0,
                        yaw: 0,
                        roll: 0
                    },
                    scale: {
                        X: 1,
                        Y: 1,
                        Z: 1
                    },
                    interpMode: 'CIM_Linear'
                },
                {
                    inVal: 3,
                    outVal: {
                        X: 1296.472,
                        Y: 286.665,
                        Z: -40
                    },
                    arriveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    leaveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    rotation: {
                        pitch: 0,
                        yaw: 0,
                        roll: 0
                    },
                    scale: {
                        X: 1,
                        Y: 1,
                        Z: 1
                    },
                    interpMode: 'CIM_Constant'
                },
                {
                    inVal: 4,
                    outVal: {
                        X: 1312.537,
                        Y: 907.853,
                        Z: -40
                    },
                    arriveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    leaveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    rotation: {
                        pitch: 0,
                        yaw: 0,
                        roll: 0
                    },
                    scale: {
                        X: 1,
                        Y: 1,
                        Z: 1
                    },
                    interpMode: 'CIM_Constant'
                },
                {
                    inVal: 5,
                    outVal: {
                        X: 1725.678,
                        Y: 907.853,
                        Z: -40
                    },
                    arriveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    leaveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    rotation: {
                        pitch: 0,
                        yaw: 0,
                        roll: 0
                    },
                    scale: {
                        X: 1,
                        Y: 1,
                        Z: 1
                    },
                    interpMode: 'CIM_Constant'
                },
                {
                    inVal: 6,
                    outVal: {
                        X: 1299.678,
                        Y: -192.147,
                        Z: -40
                    },
                    arriveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    leaveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    rotation: {
                        pitch: 0,
                        yaw: 0,
                        roll: 0
                    },
                    scale: {
                        X: 1,
                        Y: 1,
                        Z: 1
                    },
                    interpMode: 'CIM_Constant'
                },
                {
                    inVal: 7,
                    outVal: {
                        X: 1553.678,
                        Y: 77.853,
                        Z: -40
                    },
                    arriveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    leaveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    rotation: {
                        pitch: 0,
                        yaw: 0,
                        roll: 0
                    },
                    scale: {
                        X: 1,
                        Y: 1,
                        Z: 1
                    },
                    interpMode: 'CIM_Constant'
                },
                {
                    inVal: 8,
                    outVal: {
                        X: 487.678,
                        Y: 108.853,
                        Z: -40
                    },
                    arriveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    leaveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    rotation: {
                        pitch: 0,
                        yaw: 0,
                        roll: 0
                    },
                    scale: {
                        X: 1,
                        Y: 1,
                        Z: 1
                    },
                    interpMode: 'CIM_Constant'
                },
                {
                    inVal: 9,
                    outVal: {
                        X: 280.678,
                        Y: -738.147,
                        Z: -15
                    },
                    arriveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    leaveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    rotation: {
                        pitch: 0,
                        yaw: 0,
                        roll: 0
                    },
                    scale: {
                        X: 1,
                        Y: 1,
                        Z: 1
                    },
                    interpMode: 'CIM_Constant'
                },
                {
                    inVal: 10,
                    outVal: {
                        X: 1007.678,
                        Y: -170.147,
                        Z: -10.361
                    },
                    arriveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    leaveTangent: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    rotation: {
                        pitch: 0,
                        yaw: 0,
                        roll: 0
                    },
                    scale: {
                        X: 1,
                        Y: 1,
                        Z: 1
                    },
                    interpMode: 'CIM_Constant'
                }
            ],
            searchTagName: 'AmeBozuRootPoint'
        }
    },
    {
        name: 'ValveOnce',
        description: 'ValveOnce ActorParameter',
        source: 'Madori/Cave/Cave011/Cave011_F00/ActorPlacementInfo/AP_Cave011_F00_P_Objects.json#9',
        creatureId: 'ValveOnce',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        bytes: [
            // demoBindName: "GValveOnce03"
            13, 0, 0, 0, 71, 86, 97, 108, 118, 101, 79, 110, 99, 101, 48, 51,
            0,
            // Unmapped tail (ValveAPBytes)
            0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 5, 0, 0, 0,
            78, 111, 110, 101, 0, 5, 0, 0, 0, 78, 111, 110, 101, 0, 0, 0,
            0, 0, 0, 0, 128, 191, 0, 0, 128, 191, 1, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 128, 191,
        ],
        expected: {
            demoBindName: 'GValveOnce03'
        }
    }
];

export const navMeshTriggerReadingFixtures = [
    {
        name: 'NavMeshTriggerClear',
        description: 'NavMeshTriggerClear NavMeshTrigger',
        source: 'Madori/Cave/Cave014/Cave014_F03/ActorPlacementInfo/AP_Cave014_F03_P_Objects.json#20',
        creatureId: 'NavMeshTriggerClear',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        bytes: [
            // overlapBoxExtent: (70, 45, 100)
            0, 0, 140, 66, 0, 0, 52, 66, 0, 0, 200, 66,
            // navCollBoxExtent: (70, 45, 100)
            0, 0, 140, 66, 0, 0, 52, 66, 0, 0, 200, 66,
            // CIDList (count): 2
            2, 0, 0, 0,
            // CIDList[0]: "POISONKOMUSH"
            13, 0, 0, 0, 80, 79, 73, 83, 79, 78, 75, 79, 77, 85, 83, 72,
            0,
            // CIDList[1]: "POISONMUSH"
            11, 0, 0, 0, 80, 79, 73, 83, 79, 78, 77, 85, 83, 72, 0,
            // navMeshTriggerID: "NavMeshTrigger00"
            17, 0, 0, 0, 78, 97, 118, 77, 101, 115, 104, 84, 114, 105, 103, 103,
            101, 114, 48, 48, 0,
        ],
        expected: {
            overlapBoxExtent: {
                X: 70,
                Y: 45,
                Z: 100
            },
            navCollBoxExtent: {
                X: 70,
                Y: 45,
                Z: 100
            },
            CIDList: [
                'POISONKOMUSH',
                'POISONMUSH'
            ],
            navMeshTriggerID: 'NavMeshTrigger00'
        }
    }
];

export const waterTriggerReadingFixtures = [
    {
        name: 'WaterBox',
        description: 'WaterBox WaterTrigger',
        source: 'Madori/Cave/Cave004/Cave004_F00/ActorPlacementInfo/AP_Cave004_F00_P_Objects.json#3',
        creatureId: 'WaterBox',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        bytes: [
            // maxIcePikmins: 5
            5, 0, 0, 0,
            // Unmapped (24 bytes)
            0, 0, 0, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 122, 69, 0, 0, 160, 65,
            // ambientSoundId: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
        ],
        expected: {
            maxIcePikmins: 5,
            ambientSoundId: 'None'
        }
    },
    {
        name: 'SwampBox',
        description: 'SwampBox WaterTrigger',
        source: 'Madori/Cave/Cave016/Cave016_F07/ActorPlacementInfo/AP_Cave016_F07_P_Objects.json#1',
        creatureId: 'SwampBox',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        bytes: [
            // maxIcePikmins: 100
            100, 0, 0, 0,
            // Unmapped (24 bytes)
            0, 0, 0, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 122, 69, 0, 0, 160, 65,
            // ambientSoundId: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // bDisableSink: false
            0, 0, 0, 0,
        ],
        expected: {
            maxIcePikmins: 100,
            ambientSoundId: 'None',
            bDisableSink: 0
        }
    }
];

export const subAIReadingFixtures = [
    {
        name: 'Tateana',
        description: 'Tateana SubAI',
        source: 'Madori/Cave/Cave007/Cave007_F02/ActorPlacementInfo/AP_Cave007_F02_P_Objects.json#16',
        creatureId: 'Tateana',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        bytes: [
            // ActorSpawnAIParameter.OverlapCond.Avatar: true
            1, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapCond.Pikmin: true
            1, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapCond.AvatarAndPikmin: true
            1, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapCond.Carry: true
            1, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapCond.bGenseiControl: false
            0, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapCond.bNotOverlap: false
            0, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapArea.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapArea.HalfHeight: 50
            0, 0, 72, 66,
            // ActorSpawnAIParameter.OverlapArea.Radius: 100
            0, 0, 200, 66,
            // ActorSpawnAIParameter.OverlapArea.Angle: 90
            0, 0, 180, 66,
            // ActorSpawnAIParameter.OverlapArea.SphereRadius: 30
            0, 0, 240, 65,
            // ActorSpawnAIParameter.MotionName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // LocalFlag: true
            1, 0, 0, 0,
            // ActorSpawnAIParameter.SpawnLocation: (0, 0, 20)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 65,
            // ActorSpawnAIParameter.bSpawnAngRand: false
            0, 0, 0, 0,
            // ActorSpawnAIParameter.SpawnAng: 45
            0, 0, 52, 66,
            // ActorSpawnAIParameter.SpawnVel.X: 105
            0, 0, 210, 66,
            // ActorSpawnAIParameter.SpawnVel.Y: 380
            0, 0, 190, 67,
            // ActorSpawnAIParameter.bInfiniteSpawn: false
            0, 0, 0, 0,
            // ActorSpawnAIParameter.SpawnInterval: 1
            0, 0, 128, 63,
            // ActorSpawnAIParameter.MaxAreaNum: 10
            10, 0, 0, 0,
            // ActorSpawnAIParameter.MaxSpawnNum: 1
            1, 0, 0, 0,
            // ActorSpawnAIParameter.bRandomRotation: false
            0, 0, 0, 0,
            // ActorSpawnAIParameter.bNoDropItem: false
            0, 0, 0, 0,
            // ActorSpawnAIParameter.DropSpawnMiniInfo.DropActor: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ActorSpawnAIParameter.DropSpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ActorSpawnAIParameter.DropSpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // ActorSpawnAIParameter.DropSpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // ActorSpawnAIParameter.DropSpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ActorSpawnAIParameter.InvasionStartTimeRatio: 1
            0, 0, 128, 63,
        ],
        expected: {
            parsed: [
                {
                    avatar: 1,
                    pikmin: 1,
                    avatarAndPikmin: 1,
                    carry: 1,
                    bGenseiControl: 0,
                    bNotOverlap: 0,
                    overlapCenterX: 0,
                    overlapCenterY: 0,
                    overlapCenterZ: 0,
                    halfHeight: 50,
                    radius: 100,
                    angle: 90,
                    sphereRadius: 30,
                    fallStart: false,
                    spawnLocationX: 0,
                    spawnLocationY: 0,
                    spawnLocationZ: 20,
                    bSpawnAngRand: 0,
                    spawnAng: 45,
                    spawnVelX: 105,
                    spawnVelY: 380,
                    infiniteSpawn: 0,
                    spawnInterval: 1,
                    maxAreaNum: 10,
                    maxSpawnNum: 1,
                    randomRotation: 0,
                    noDropItem: 0,
                    assetName: 'None',
                    customParameter: 'None',
                    customFloatParameter: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0,
                    invasionStartTimeRatio: 1
                }
            ]
        }
    }
];

export const lifeReadingFixtures = [
    {
        name: 'GateRock175uu',
        description: 'GateRock175uu Life',
        source: 'Madori/Cave/Cave010/Cave010_F01/ActorPlacementInfo/AP_Cave010_F01_P_Objects.json#13',
        creatureId: 'GateRock175uu',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        bytes: [
            // MaxLife: 1120
            0, 0, 140, 68,
            // Life: 1120
            0, 0, 140, 68,
        ],
        expected: {
            maxLife: 1120,
            life: 1120
        }
    }
];

export const affordanceReadingFixtures = [
    {
        name: 'DownWall',
        description: 'DownWall Affordance',
        source: 'Madori/Cave/Cave014/Cave014_F04/ActorPlacementInfo/AP_Cave014_F04_P_Objects.json#14',
        creatureId: 'DownWall',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        bytes: [
            // Unmapped (74 bytes)
            1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
            191, 5, 0, 0, 0, 78, 111, 110, 101, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            // Weight: 100
            100, 0, 0, 0,
        ],
        expected: {
            weight: 100
        }
    }
];
