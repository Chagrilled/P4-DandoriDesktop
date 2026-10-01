// AUTO-GENERATED from pristine AP_*.json actor placement files (P4 archive/Carrot4/Maps).
// Byte arrays are real ActorSerializeParameter data; every comment labels the bytes that follow it.
// AI.Static labels come from the ai-static layouts (reference parser that parses all 7,640 shipped samples).
import { InfoType } from '../../../src/api/types';

export const objectReadingFixtures = [
    {
        name: 'ActorSpawner',
        description: 'ActorSpawner read by parseActorSpawnerDrops',
        source: 'Madori/Cave/Cave006/Cave006_F02/ActorPlacementInfo/AP_Cave006_F02_P_Teki.json#5',
        creatureId: 'ActorSpawner',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseActorSpawnerDrops + ',
        bytes: [
            // ActorSpawnAIParameter.OverlapCond.Avatar: true
            1, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapCond.Pikmin: true
            1, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapCond.AvatarAndPikmin: true
            1, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapCond.Carry: true
            1, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapCond.bGenseiControl: true
            1, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapCond.bNotOverlap: false
            0, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapArea.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ActorSpawnAIParameter.OverlapArea.HalfHeight: 100
            0, 0, 200, 66,
            // ActorSpawnAIParameter.OverlapArea.Radius: 100
            0, 0, 200, 66,
            // ActorSpawnAIParameter.OverlapArea.Angle: 180
            0, 0, 52, 67,
            // ActorSpawnAIParameter.OverlapArea.SphereRadius: 100
            0, 0, 200, 66,
            // ActorSpawnAIParameter.MotionName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // LocalFlag: true
            1, 0, 0, 0,
            // ActorSpawnAIParameter.SpawnLocation: (0, 0, 550)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 9, 68,
            // ActorSpawnAIParameter.bSpawnAngRand: false
            0, 0, 0, 0,
            // ActorSpawnAIParameter.SpawnAng: 0
            0, 0, 0, 0,
            // ActorSpawnAIParameter.SpawnVel.X: 0
            0, 0, 0, 0,
            // ActorSpawnAIParameter.SpawnVel.Y: 0
            0, 0, 0, 0,
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
            // ActorSpawnAIParameter.DropSpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Egg/GEgg.GEgg_C"
            49, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 69, 103, 103, 47, 71, 69, 103, 103, 46, 71, 69,
            103, 103, 95, 67, 0,
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
                    bGenseiControl: 1,
                    bNotOverlap: 0,
                    overlapCenterX: 0,
                    overlapCenterY: 0,
                    overlapCenterZ: 0,
                    halfHeight: 100,
                    radius: 100,
                    angle: 180,
                    sphereRadius: 100,
                    fallStart: false,
                    spawnLocationX: 0,
                    spawnLocationY: 0,
                    spawnLocationZ: 550,
                    bSpawnAngRand: 0,
                    spawnAng: 0,
                    spawnVelX: 0,
                    spawnVelY: 0,
                    infiniteSpawn: 0,
                    spawnInterval: 1,
                    maxAreaNum: 10,
                    maxSpawnNum: 1,
                    randomRotation: 0,
                    noDropItem: 0,
                    assetName: '/Game/Carrot4/Placeables/Objects/Egg/GEgg.GEgg_C',
                    customParameter: 'None',
                    customFloatParameter: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0,
                    invasionStartTimeRatio: 1
                }
            ]
        }
    },
    {
        name: 'Branch_Long',
        description: 'Branch_Long read by parseBranchAI',
        source: 'Madori/Cave/Cave007/Cave007_F01/ActorPlacementInfo/AP_Cave007_F01_P_Objects.json#3',
        creatureId: 'Branch_Long',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseBranchAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // BranchAIParameter.JumpHeight: 35
            0, 0, 12, 66,
            // BranchAIParameter.NavLinkRightOffset: (0, -240, 100)
            0, 0, 0, 0, 0, 0, 112, 195, 0, 0, 200, 66,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                jumpHeight: 35,
                navLinkRight: {
                    X: 0,
                    Y: -240,
                    Z: 100
                }
            }
        }
    },
    {
        name: 'Circulator',
        description: 'Circulator read by parseCirculatorAI',
        source: 'Madori/Cave/Cave013/Cave013_F02/ActorPlacementInfo/AP_Cave013_F02_P_Objects.json#9',
        creatureId: 'Circulator',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseCirculatorAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // CirculatorAIParameter.SwitchID: "switch01"
            9, 0, 0, 0, 115, 119, 105, 116, 99, 104, 48, 49, 0,
            // CirculatorAIParameter.bWindLong: false
            0, 0, 0, 0,
            // NavLinkRightOffset: (275, 0, 150)
            0, 128, 137, 67, 0, 0, 0, 0, 0, 0, 22, 67,
        ],
        expected: {
            AIProperties: {
                switchID: 'switch01',
                bWindLong: 0,
                navLinkRight: {
                    X: 275,
                    Y: 0,
                    Z: 150
                }
            },
            parsed: []
        }
    },
    {
        name: 'Conveyor265uu',
        description: 'Conveyor265uu read by parseTriggerDoorAI',
        source: 'Madori/Cave/Cave005/Cave005_F00/ActorPlacementInfo/AP_Cave005_F00_P_Objects.json#6',
        creatureId: 'Conveyor265uu',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseTriggerDoorAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // ConveyorBaseAIParameter.SwitchID: "switch00"
            9, 0, 0, 0, 115, 119, 105, 116, 99, 104, 48, 48, 0,
            // ConveyorBaseAIParameter.DriveSpeed: 100
            0, 0, 200, 66,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                switchID: 'switch00',
                CIDList: []
            }
        }
    },
    {
        name: 'CrackPlanter',
        description: 'CrackPlanter read by parsePotDrops',
        source: 'Main/Area/Area010/ActorPlacementInfo/AP_Area010_P_Hero_Objects.json#123',
        creatureId: 'CrackPlanter',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parsePotDrops',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 70)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 140, 66,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 320)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 0, 160, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 30, 30)
            0, 0, 0, 0, 0, 0, 240, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 4
            4, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // CrackPotAIParameter.bSendBreakEvent: false
            0, 0, 0, 0,
            // CrackPotAIParameter.bHiddenBRMesh: false
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            inventoryEnd: 8
        }
    },
    {
        name: 'DownWall',
        description: 'DownWall read by parseDownWallAI',
        source: 'Madori/Cave/Cave014/Cave014_F04/ActorPlacementInfo/AP_Cave014_F04_P_Objects.json#14',
        creatureId: 'DownWall',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        reader: 'parseDownWallAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // bDisableAirWall: false
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                bDisableAirWall: 0
            }
        }
    },
    {
        name: 'Geyser',
        description: 'Geyser read by parseGeyserAI',
        source: 'Madori/Cave/Cave005/Cave005_F01/ActorPlacementInfo/AP_Cave005_F01_P_Objects.json#3',
        creatureId: 'Geyser',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseGeyserAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // GeyserAIParameter.bSetCrystal: false
            0, 0, 0, 0,
            // GeyserAIParameter.StopQueenDistXY: -1
            0, 0, 128, 191,
            // NavLinks (count): 1
            1, 0, 0, 0,
            // Left: (0, -1, 0)
            0, 0, 0, 0, 0, 0, 128, 191, 0, 0, 0, 0,
            // Right: (-337, -4, 106)
            0, 128, 168, 195, 0, 0, 128, 192, 0, 0, 212, 66,
            // LeftProjectHeight: 0
            0, 0, 0, 0,
            // MaxFallDownLength: 1000
            0, 0, 122, 68,
            // Direction: 1
            1,
            // SnapRadius: 30
            0, 0, 240, 65,
            // SnapHeight: 50
            0, 0, 72, 66,
            // SupportedAgentsBits: -1
            255, 255, 255, 255,
            // bUseSnapHeight: 1
            1,
            // bSnapToCheapestArea: 1
            1,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 75,
                    Z: 375
                },
                randVel: {
                    X: 0,
                    Y: 15,
                    Z: 30
                },
                dropOption: 0,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [],
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                bSetCrystal: 0,
                stopQueenDistXY: -1,
                navLinkLeft: {
                    X: 0,
                    Y: -1,
                    Z: 0
                },
                navLinkRight: {
                    X: -337,
                    Y: -4,
                    Z: 106
                },
                leftProjectHeight: 0,
                maxFallDownLength: 1000,
                direction: 'LeftToRight',
                snapRadius: 30,
                snapHeight: 50,
                bUseSnapHeight: 1,
                bSnapToCheapestArea: 1
            }
        }
    },
    {
        name: 'GroupDropManager',
        description: 'GroupDropManager read by parseGDMDrops',
        source: 'Madori/Cave/Cave001/Cave001_F00/ActorPlacementInfo/AP_Cave001_F00_P_Teki.json#1',
        creatureId: 'GroupDropManager',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseGDMDrops',
        bytes: [
            // GroupDropManagerAIParameter.GroupingRadius: 125
            0, 0, 250, 66,
            // GroupDropManagerAIParameter.IgnoreCIDList (count): 2
            2, 0, 0, 0,
            // IgnoreCID: "Kochappy"
            9, 0, 0, 0, 75, 111, 99, 104, 97, 112, 112, 121, 0,
            // IgnoreCID: "Mush"
            5, 0, 0, 0, 77, 117, 115, 104, 0,
            // GroupDropManagerAIParameter.DropParameter.DropItemParameter (count): 1
            1, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 3
            3, 0, 0, 0,
            // MaxNum: 3
            3, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C"
            68, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 87, 111, 114,
            107, 79, 98, 106, 101, 99, 116, 115, 47, 83, 104, 105, 122, 97, 105, 47,
            71, 80, 105, 101, 99, 101, 80, 105, 99, 107, 46, 71, 80, 105, 101, 99,
            101, 80, 105, 99, 107, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // GroupDropManagerAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // GroupDropManagerAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // GroupDropManagerAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 70)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 140, 66,
            // GroupDropManagerAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 320)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 0, 160, 67,
            // GroupDropManagerAIParameter.DropParameter.DropActorParameter.RandVel: (0, 30, 30)
            0, 0, 0, 0, 0, 0, 240, 65, 0, 0, 240, 65,
            // GroupDropManagerAIParameter.DropParameter.DropActorParameter.DropOption: 4
            4, 0,
            // GroupDropManagerAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // GroupDropManagerAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // GroupDropManagerAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // GroupDropManagerAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // GroupDropManagerAIParameter.DropTiming: 1
            1,
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [
                {
                    id: 1,
                    minDrops: 3,
                    maxDrops: 3,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                }
            ],
            inventoryEnd: 157,
            groupingRadius: 125,
            ignoreList: [
                'Kochappy',
                'Mush'
            ]
        }
    },
    {
        name: 'HandleBoard',
        description: 'HandleBoard read by parseHandleBoardAI',
        source: 'Madori/Cave/Cave006/Cave006_F02/ActorPlacementInfo/AP_Cave006_F02_P_Objects.json#15',
        creatureId: 'HandleBoard',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        reader: 'parseHandleBoardAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // HandleBoardAIParameter.WorkNum: 20
            20, 0, 0, 0,
            // NavLinks (count): 1
            1, 0, 0, 0,
            // LeftPoint: (0, 340, -20)
            0, 0, 0, 0, 0, 0, 170, 67, 0, 0, 160, 193,
            // RightPoint: (-27, -110, -20)
            0, 0, 216, 193, 0, 0, 220, 194, 0, 0, 160, 193,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                workNum: 20,
                pointLinks: {
                    left: {
                        X: 0,
                        Y: 340,
                        Z: -20
                    },
                    right: {
                        X: -27,
                        Y: -110,
                        Z: -20
                    }
                }
            }
        }
    },
    {
        name: 'HappyDoor',
        description: 'HappyDoor read by parseWarpAI',
        source: 'Madori/Cave/Cave008/Cave008_F00/ActorPlacementInfo/AP_Cave008_F00_P_Objects.json#26',
        creatureId: 'HappyDoor',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseWarpAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // HappyDoorAIParameter.HappyDoorID: "HappyDoorID_0"
            14, 0, 0, 0, 72, 97, 112, 112, 121, 68, 111, 111, 114, 73, 68, 95,
            48, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                warpID: 'HappyDoorID_0'
            }
        }
    },
    {
        name: 'Mizunuki',
        description: 'Mizunuki read by parseMizunukiAI',
        source: 'Main/Area/Area003/ActorPlacementInfo/AP_Area003_P_Objects.json#21',
        creatureId: 'Mizunuki',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseMizunukiAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // WaterBoxID: "WaterBox_Off_2"
            15, 0, 0, 0, 87, 97, 116, 101, 114, 66, 111, 120, 95, 79, 102, 102,
            95, 50, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                waterBoxId: 'WaterBox_Off_2'
            }
        }
    },
    {
        name: 'MoveFloor',
        description: 'MoveFloor read by parseMoveFloorAI',
        source: 'Madori/Cave/Cave013/Cave013_F01/ActorPlacementInfo/AP_Cave013_F01_P_Objects.json#5',
        creatureId: 'MoveFloor',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseMoveFloorAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // MoveFloorAIParameter.WaitTime: 2
            0, 0, 0, 64,
            // MoveFloorAIParameter.MoveSpeed: 100
            0, 0, 200, 66,
            // MoveFloorAIParameter.bEnableWarpActor: false
            0, 0, 0, 0,
            // MoveFloorAIParameter.WarpOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // SplinePoints (count): 2
            2, 0, 0, 0,
            // InputKey: 0
            0, 0, 0, 0,
            // Position: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ArriveTangent: (325, 0, 0)
            0, 128, 162, 67, 0, 0, 0, 0, 0, 0, 0, 0,
            // LeaveTangent: (325, 0, 0)
            0, 128, 162, 67, 0, 0, 0, 0, 0, 0, 0, 0,
            // Rotation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // Scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // Type: 1
            1,
            // InputKey: 1
            0, 0, 128, 63,
            // Position: (325, 0, 0)
            0, 128, 162, 67, 0, 0, 0, 0, 0, 0, 0, 0,
            // ArriveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // LeaveTangent: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // Rotation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // Scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // Type: 4
            4,
            // FloorRotation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                waitTime: 2,
                moveSpeed: 100,
                bEnableWarpActor: 0,
                warpOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                splinePoints: [
                    {
                        inVal: 0,
                        outVal: {
                            X: 0,
                            Y: 0,
                            Z: 0
                        },
                        arriveTangent: {
                            X: 325,
                            Y: 0,
                            Z: 0
                        },
                        leaveTangent: {
                            X: 325,
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
                        inVal: 1,
                        outVal: {
                            X: 325,
                            Y: 0,
                            Z: 0
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
                        interpMode: 'CIM_CurveUser'
                    }
                ]
            }
        }
    },
    {
        name: 'NoraSpawnerHeadLock',
        description: 'NoraSpawnerHeadLock read by parseNoraSpawnerAI',
        source: 'Madori/Cave/Cave002/Cave002_F00/ActorPlacementInfo/AP_Cave002_F00_P_Objects.json#4',
        creatureId: 'NoraSpawnerHeadLock',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseNoraSpawnerAI',
        bytes: [
            // NoraSpawnerAIParam.SpawnNum: 5
            5, 0, 0, 0,
            // NoraSpawnerAIParam.SpawnRadius: 30
            0, 0, 240, 65,
            // NoraSpawnerAIParam.NoSpawnRadius: 28
            0, 0, 224, 65,
            // NoraSpawnerAIParam.PikminColor: 2
            2,
            // NoraSpawnerAIParam.bMabikiEnable: true
            1, 0, 0, 0,
            // NoraSpawnerAIParam.SpawnHeadLeaves: 2
            2,
            // NoraSpawnerAIParam.MabikiNumFromFollow: 50
            50, 0, 0, 0,
            // NoraSpawnerAIParam.MabikiNumFromAll: -1
            255, 255, 255, 255,
            // NoraSpawnerAIParam.bMabikiPongashi: false
            0, 0, 0, 0,
            // NoraSpawnerAIParam.PongashiChangeColorFollowNum: -1
            255, 255, 255, 255,
            // NoraSpawnerAIParam.PongashiChangeColorFromFollow: 0
            0,
            // NoraSpawnerAIParam.bReservedBirth: false
            0, 0, 0, 0,
            // NoraSpawnerAIParam.bDisableForcePongashi: true
            1, 0, 0, 0,
            // NoraSpawnerAIParam.bProWrestling: false
            0, 0, 0, 0,
            // NoraSpawnerAIParam.PongashiColor: 2
            2,
            // NoraSpawnerAIParam.NoraIdlingPresetId: "NoraDefault01"
            14, 0, 0, 0, 78, 111, 114, 97, 68, 101, 102, 97, 117, 108, 116, 48,
            49, 0,
            // NoraSpawnerAIParam.bEnablePointLight: true
            1, 0, 0, 0,
            // NoraSpawnerAIParam.GroupIdlingType: 0
            0,
            // NoraSpawnerAIParam.bExcludesFue: false
            0, 0, 0, 0,
            // NoraSpawnerAIParam.MabikiPongashiOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // NoraSpawnerAIParam.AIWaitTime: -1
            0, 0, 128, 191,
            // NoraSpawnerAIParam.RandomActorSpawnList (count): 1
            1, 0, 0, 0,
            // ---- DropSpawnMiniInfo[0] ----
            // DropActor: "/Game/Carrot4/Placeables/Objects/Egg/GEgg.GEgg_C"
            49, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 69, 103, 103, 47, 71, 69, 103, 103, 46, 71, 69,
            103, 103, 95, 67, 0,
            // CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // CustomFloatParameter: 0
            0, 0, 0, 0,
            // GameRulePermissionFlag: 0
            0, 0,
            // bSetTerritory: false
            0, 0, 0, 0,
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
        ],
        expected: {
            AIProperties: {
                spawnNum: 5,
                spawnRadius: 30,
                noSpawnRadius: 28,
                pikminType: 'PikminYellow',
                bMabikiEnable: 1,
                spawnHeadLeaves: 'Flower',
                mabikiNumFromFollow: 50,
                mabikiNumFromAll: -1,
                bMabikiPongashi: 0,
                pongashiChangeColorFollowNum: -1,
                pongashiChangeColorFromFollow: 'PikminRed',
                bReservedBirth: 0,
                bDisableForcePongashi: 1,
                bProWrestling: 0,
                pongashiColor: 'PikminYellow',
                noraIdlingPreset: 'NoraDefault01',
                bEnablePointLight: 1,
                groupIdlingType: 'None',
                bExcludesFue: 0,
                mabikiPongashiOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                aiWaitTime: -1,
                bEnableOptionalPoint: 0
            },
            parsed: [
                {
                    id: 1,
                    assetName: '/Game/Carrot4/Placeables/Objects/Egg/GEgg.GEgg_C',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                }
            ]
        }
    },
    {
        name: 'OnyonCamp',
        description: 'OnyonCamp read by parseBaseAI',
        source: 'Main/Area/Area001/ActorPlacementInfo/AP_Area001_P_Hero_Objects.json#80',
        creatureId: 'OnyonCamp',
        infoType: InfoType.Base,
        generatorVersion: 8626647626,
        reader: 'parseBaseAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.bEnableFreezeBothDrop: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // BaseCampId: 0
            0, 0, 0, 0,
            // bDeactivateByExit: false
            0, 0, 0, 0,
            // AreaBaseCampParameter.SafeAreaBound.Radius: 400
            0, 0, 200, 67,
            // AreaBaseCampParameter.SafeAreaOffset: (123.5, -2, 0)
            0, 0, 247, 66, 0, 0, 0, 192, 0, 0, 0, 0,
            // AreaBaseCampParameter.SearchBound.HalfX: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // AreaBaseCampParameter.ForceFloweringRadius: 1000
            0, 0, 122, 68,
            // AreaBaseCampParameter.StateChangeDelayTime: 0.7
            51, 51, 51, 63,
            // AreaBaseCampParameter.GuruguruDist: 0
            0, 0, 0, 0,
            // AreaBaseCampParameter.CIDList (count): 0
            0, 0, 0, 0,
        ],
        expected: {
            AIProperties: {
                baseCampId: 0,
                bDeactivateByExit: 0,
                safeRadius: 400,
                safeAreaOffsetX: 123.5,
                safeAreaOffsetY: -2,
                safeAreaOffsetZ: 0,
                searchBoundX: 0,
                searchBoundY: 0,
                searchBoundZ: 0,
                stateChangeDelayTime: 0.7,
                guruguruDist: 0,
                CIDList: []
            },
            parsed: []
        }
    },
    {
        name: 'Ota3DMegane',
        description: 'Ota3DMegane read by parseOtakaraAI',
        source: 'Madori/Cave/Cave023/Cave023_F01/ActorPlacementInfo/AP_Cave023_F01_P_Objects.json#2',
        creatureId: 'Ota3DMegane',
        infoType: InfoType.Treasure,
        generatorVersion: 8626647386,
        reader: 'parseOtakaraAI',
        bytes: [
            // AIParameter.bUseArrowFace: false
            0, 0, 0, 0,
            // AIParameter.bChangeCrushImpactMoveDir: false
            0, 0, 0, 0,
            // AIParameter.bReceiveCrushImpactEventFromOtakara: false
            0, 0, 0, 0,
            // AIParameter.bSendCrushImpactEventToOtakara: false
            0, 0, 0, 0,
            // AIParameter.CrushImpactMoveRot: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // AIParameter.bUseCrushDDB: false
            0, 0, 0, 0,
            // AIParameter.DDBPikminHeightType: 0
            0,
            // bDDBSurvivorLeaf: false
            0, 0, 0, 0,
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 1
            1, 0, 0, 0,
            // OptionalPointOffset: (260, 810, -130)
            0, 0, 130, 67, 0, 128, 74, 68, 0, 0, 2, 195,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
        ],
        expected: {
            AIProperties: {
                bChangeCrushImpactMoveDir: 0,
                bReceiveCrushImpactEvent: 0,
                bSendCrushImpactEvent: 0,
                crushImpactMoveRot: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bDDBSurvivorLeaf: 0,
                bEnableOptionalPoint: 1,
                optionalPointOffsets: [
                    {
                        X: 260,
                        Y: 810,
                        Z: -130
                    }
                ],
                optionalPointPriorityInfo: []
            },
            parsed: []
        }
    },
    {
        name: 'PressFloor',
        description: 'PressFloor read by parsePressFloorAI',
        source: 'Madori/Cave/Cave011/Cave011_F03/ActorPlacementInfo/AP_Cave011_F03_P_Objects.json#4',
        creatureId: 'PressFloor',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parsePressFloorAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // PressFloorParam.Height: -40
            0, 0, 32, 194,
            // PressFloorParam.MaxHeightSpeed: 100
            0, 0, 200, 66,
            // PressFloorParam.Radius: 200
            0, 0, 72, 67,
            // PressFloorParam.MaxRadiusSpeed: 20
            0, 0, 160, 65,
            // PressFloorParam.WaterBoxID: "press00"
            8, 0, 0, 0, 112, 114, 101, 115, 115, 48, 48, 0,
            // PressFloorParam.CreateNavBoxRange: (500, 500, 100)
            0, 0, 250, 67, 0, 0, 250, 67, 0, 0, 200, 66,
            // PressFloorParam.CreateNavBoxOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 75,
                    Z: 375
                },
                randVel: {
                    X: 0,
                    Y: 15,
                    Z: 30
                },
                dropOption: 0,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [],
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                height: -40,
                maxHeightSpeed: 100,
                radius: 200,
                maxRadiusSpeed: 20,
                waterBoxId: 'press00',
                createNavBoxRange: {
                    X: 500,
                    Y: 500,
                    Z: 100
                },
                createNavBoxOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                }
            }
        }
    },
    {
        name: 'RopeFishing',
        description: 'RopeFishing read by parseRopeFishingAI',
        source: 'Madori/Cave/Cave011/Cave011_F00/ActorPlacementInfo/AP_Cave011_F00_P_Objects.json#12',
        creatureId: 'RopeFishing',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        reader: 'parseRopeFishingAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (-135, 0, 0)
            0, 0, 7, 195, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (250, 0, 500)
            0, 0, 122, 67, 0, 0, 0, 0, 0, 0, 250, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 0, 30)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // RopeFishingAIParameter.JumpForceXY: 500
            0, 0, 250, 67,
            // RopeFishingAIParameter.JumpForceZ: 1500
            0, 128, 187, 68,
            // RopeFishingAIParameter.RopeAng: -30
            0, 0, 240, 193,
            // RopeFishingAIParameter.ManualWorkNum: 5
            5, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: -135,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 250,
                    Y: 0,
                    Z: 500
                },
                randVel: {
                    X: 0,
                    Y: 0,
                    Z: 30
                },
                dropOption: 0,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [],
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                jumpForceXY: 500,
                jumpForceZ: 1500,
                ropeAng: -30,
                manualWorkNum: 5
            }
        }
    },
    {
        name: 'StickyFloor',
        description: 'StickyFloor read by parseStickyFloorAI',
        source: 'Madori/Cave/Cave014/Cave014_F03/ActorPlacementInfo/AP_Cave014_F03_P_Objects.json#37',
        creatureId: 'StickyFloor',
        infoType: InfoType.Hazard,
        generatorVersion: 8626647386,
        reader: 'parseStickyFloorAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // StickyFloorAIParameter.bAutoSpawnMush: false
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 75,
                    Z: 375
                },
                randVel: {
                    X: 0,
                    Y: 15,
                    Z: 30
                },
                dropOption: 0,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [],
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                bAutoSpawnMush: 0
            }
        }
    },
    {
        name: 'String',
        description: 'String read by parseStringAI',
        source: 'Madori/Cave/Cave003/Cave003_F00/ActorPlacementInfo/AP_Cave003_F00_P_Objects.json#9',
        creatureId: 'String',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        reader: 'parseStringAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // StringAIParameter.FallHeight: 150
            0, 0, 22, 67,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                fallHeight: 150
            }
        }
    },
    {
        name: 'SwampBox',
        description: 'SwampBox read by parseWaterBoxAI',
        source: 'Madori/Cave/Cave016/Cave016_F07/ActorPlacementInfo/AP_Cave016_F07_P_Objects.json#1',
        creatureId: 'SwampBox',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseWaterBoxAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // WaterBoxAIParameter.WaterLevel.WaterBoxSwitchID: "null"
            5, 0, 0, 0, 110, 117, 108, 108, 0,
            // WaterBoxAIParameter.WaterLevel.WaterLevelChangeDist: 50
            0, 0, 72, 66,
            // WaterBoxAIParameter.WaterLevel.WaterLevelChangeTime: 5
            0, 0, 160, 64,
            // WaterBoxAIParameter.WaterLevel.WaterLevelChangeInterval: -1
            0, 0, 128, 191,
            // WaterBoxAIParameter.WaterLevel.bInitWaterLevelDown: true
            1, 0, 0, 0,
            // WaterBoxAIParameter.WaterLevel.GeneratorIndex: -1
            255, 255, 255, 255,
            // WaterBoxAIParameter.WaterLevel.bUseSunMeter: false
            0, 0, 0, 0,
            // WaterBoxAIParameter.WaterLevel.WaterLevelChangeStartTime: 0.5
            0, 0, 0, 63,
            // WaterBoxAIParameter.WaterLevel.bPlayDemo: false
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                waterBoxSwitchId: 'null',
                waterLevelChangeDist: 50,
                waterLevelChangeTime: 5,
                generatorIndex: -1,
                bUseSunMeter: 0,
                bPlayDemo: 0
            }
        }
    },
    {
        name: 'SwitchOff',
        description: 'SwitchOff read by parseTriggerDoorAI',
        source: 'Madori/Cave/Cave004/Cave004_F01/ActorPlacementInfo/AP_Cave004_F01_P_Objects.json#5',
        creatureId: 'SwitchOff',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647418,
        reader: 'parseTriggerDoorAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.bEnableFreezeBothDrop: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // SwitchBaseAIParameter.SwitchID: "switch00"
            9, 0, 0, 0, 115, 119, 105, 116, 99, 104, 48, 48, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                switchID: 'switch00',
                CIDList: []
            }
        }
    },
    {
        name: 'TriggerDoor',
        description: 'TriggerDoor read by parseTriggerDoorAI',
        source: 'Madori/Cave/Cave006/Cave006_F03/ActorPlacementInfo/AP_Cave006_F03_P_Objects.json#2',
        creatureId: 'TriggerDoor',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseTriggerDoorAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // TriggerDoorAIParameter.SwitchID: "switch00"
            9, 0, 0, 0, 115, 119, 105, 116, 99, 104, 48, 48, 0,
            // TriggerDoorAIParameter.CompleteUIType: 13
            13, 0, 0, 0,
            // TriggerDoorAIParameter.OpenWaitTime: 0
            0, 0, 0, 0,
            // TriggerDoorAIParameter.bEnableAirWall: true
            1, 0, 0, 0,
            // TriggerDoorAIParameter.bNoCollisionAirWall: false
            0, 0, 0, 0,
            // TriggerBoxRotation: (0, 0, 0, 1)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63,
            // TriggerBoxLocation: (50.2426, -709.017, 57.1062)
            115, 248, 72, 66, 20, 65, 49, 196, 200, 108, 100, 66,
            // TriggerBoxScale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // TriggerBoxExtent: (152.901, 180.614, 150)
            174, 230, 24, 67, 58, 157, 52, 67, 0, 0, 22, 67,
            // TriggerDoorAIParameter.CIDList (count): 1
            1, 0, 0, 0,
            // CID: "MAR"
            4, 0, 0, 0, 77, 65, 82, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                switchID: 'switch00',
                CIDList: [
                    'MAR'
                ]
            }
        }
    },
    {
        name: 'ValveOnce',
        description: 'ValveOnce read by parseValveAI',
        source: 'Madori/Cave/Cave011/Cave011_F00/ActorPlacementInfo/AP_Cave011_F00_P_Objects.json#9',
        creatureId: 'ValveOnce',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        reader: 'parseValveAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // EntranceOffset: 100
            0, 0, 200, 66,
            // PiecePerPanel: 1
            1, 0, 0, 0,
            // ValveAIParam.ValveID: "valve0"
            7, 0, 0, 0, 118, 97, 108, 118, 101, 48, 0,
            // ValveAIParam.BuiltWorkType: 6
            6, 0, 0, 0,
            // ValveAIParam.DemoID: 2
            2, 0, 0, 0,
        ],
        expected: {
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 75,
                    Z: 375
                },
                randVel: {
                    X: 0,
                    Y: 15,
                    Z: 30
                },
                dropOption: 0,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [],
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                entranceOffset: 100,
                piecePerPanel: 1,
                valveID: 'valve0',
                builtWorkType: 'Once',
                demoID: 2
            },
            parsed: []
        }
    },
    {
        name: 'VarGateBomb',
        description: 'VarGateBomb read by parseGateAI',
        source: 'Main/Area/Area002/ActorPlacementInfo/AP_Area002_P_Hero_Objects.json#23',
        creatureId: 'VarGateBomb',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        reader: 'parseGateAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0.1, 40, 0)
            205, 204, 204, 61, 0, 0, 32, 66, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 100, 250)
            0, 0, 0, 0, 0, 0, 200, 66, 0, 0, 122, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (100, 75, 75)
            0, 0, 200, 66, 0, 0, 150, 66, 0, 0, 150, 66,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 34
            34, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // RareDropParameter (count): 3
            3, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 0
            0, 0, 0, 0,
            // MaxNum: 0
            0, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C"
            68, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 87, 111, 114,
            107, 79, 98, 106, 101, 99, 116, 115, 47, 83, 104, 105, 122, 97, 105, 47,
            71, 80, 105, 101, 99, 101, 80, 105, 99, 107, 46, 71, 80, 105, 101, 99,
            101, 80, 105, 99, 107, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[1] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 0
            0, 0, 0, 0,
            // MaxNum: 0
            0, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C"
            68, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 87, 111, 114,
            107, 79, 98, 106, 101, 99, 116, 115, 47, 83, 104, 105, 122, 97, 105, 47,
            71, 80, 105, 101, 99, 101, 80, 105, 99, 107, 46, 71, 80, 105, 101, 99,
            101, 80, 105, 99, 107, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[2] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 0
            0, 0, 0, 0,
            // MaxNum: 0
            0, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C"
            68, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 87, 111, 114,
            107, 79, 98, 106, 101, 99, 116, 115, 47, 83, 104, 105, 122, 97, 105, 47,
            71, 80, 105, 101, 99, 101, 80, 105, 99, 107, 46, 71, 80, 105, 101, 99,
            101, 80, 105, 99, 107, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            rareDrops: [
                {
                    id: 1,
                    minDrops: 0,
                    maxDrops: 0,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                },
                {
                    id: 2,
                    minDrops: 0,
                    maxDrops: 0,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                },
                {
                    id: 3,
                    minDrops: 0,
                    maxDrops: 0,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: 0.1,
                    Y: 40,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 100,
                    Z: 250
                },
                randVel: {
                    X: 100,
                    Y: 75,
                    Z: 75
                },
                dropOption: 34,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [],
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: []
            }
        }
    },
    {
        name: 'WaterBoxNav',
        description: 'WaterBoxNav read by parseWaterBoxNavAI',
        source: 'Madori/Cave/Cave004/Cave004_F00/ActorPlacementInfo/AP_Cave004_F00_P_Objects.json#13',
        creatureId: 'WaterBoxNav',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseWaterBoxNavAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // bUseHappyOnly: true
            1, 0, 0, 0,
            // RightOffset: (-100, 0, 80)
            0, 0, 200, 194, 0, 0, 0, 0, 0, 0, 160, 66,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                bUseHappyOnly: 1,
                rightOffset: {
                    X: -100,
                    Y: 0,
                    Z: 80
                }
            }
        }
    },
    {
        name: 'ZiplineSplineMesh',
        description: 'ZiplineSplineMesh read by parseZiplineAI',
        source: 'Madori/Cave/Cave013/Cave013_F02/ActorPlacementInfo/AP_Cave013_F02_P_Objects.json#12',
        creatureId: 'ZiplineSplineMesh',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseZiplineAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // ZiplineAIParameter.GoalOffset: (51.6125, 0, 0)
            63, 115, 78, 66, 0, 0, 0, 0, 0, 0, 0, 0,
            // ZiplineAIParameter.StartTargetSpeed: 200
            0, 0, 72, 67,
            // ZiplineAIParameter.MaxMoveSpeed: 900
            0, 0, 97, 68,
            // ZiplineAIParameter.MinMoveSpeed: 195
            0, 0, 67, 67,
            // ZiplineAIParameter.Acceleration: 1200
            0, 0, 150, 68,
            // ZiplineAIParameter.Deceleration: 70
            0, 0, 140, 66,
            // SplinePoints (count): 9
            9, 0, 0, 0,
            // InputKey: 0
            0, 0, 0, 0,
            // Position: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ArriveTangent: (43.8014, 0, 0)
            173, 52, 47, 66, 130, 168, 123, 55, 0, 0, 0, 0,
            // LeaveTangent: (43.8014, 0, 0)
            173, 52, 47, 66, 130, 168, 123, 55, 0, 0, 0, 0,
            // Rotation: (0, 0, 0)
            0, 0, 0, 0, 49, 152, 164, 55, 0, 0, 0, 0,
            // Scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // Type: 0
            0,
            // InputKey: 1
            0, 0, 128, 63,
            // Position: (43.8014, 0, 0)
            173, 52, 47, 66, 130, 168, 123, 55, 0, 0, 0, 0,
            // ArriveTangent: (43.8014, 0, 0)
            173, 52, 47, 66, 130, 168, 123, 55, 0, 0, 0, 0,
            // LeaveTangent: (43.8014, 0, 0)
            173, 52, 47, 66, 130, 168, 123, 55, 0, 0, 0, 0,
            // Rotation: (0, 0, 0)
            0, 0, 0, 0, 49, 152, 164, 55, 0, 0, 0, 0,
            // Scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // Type: 1
            1,
            // InputKey: 2
            0, 0, 0, 64,
            // Position: (115.593, -3.9567, -2.4894)
            162, 47, 231, 66, 224, 58, 125, 192, 192, 82, 31, 192,
            // ArriveTangent: (169.047, -10.4443, -2.1777)
            6, 12, 41, 67, 238, 27, 39, 193, 32, 96, 11, 192,
            // LeaveTangent: (169.047, -10.4443, -2.1777)
            6, 12, 41, 67, 238, 27, 39, 193, 32, 96, 11, 192,
            // Rotation: (-0.7367, -3.5354, 0)
            245, 149, 60, 191, 175, 68, 98, 192, 187, 51, 101, 49,
            // Scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // Type: 4
            4,
            // InputKey: 3
            0, 0, 64, 64,
            // Position: (464.715, -88.2559, -6.7448)
            119, 91, 232, 67, 4, 131, 176, 194, 128, 213, 215, 192,
            // ArriveTangent: (161.835, -161.672, -10.8369)
            168, 213, 33, 67, 240, 171, 33, 195, 192, 99, 45, 193,
            // LeaveTangent: (161.835, -161.672, -10.8369)
            168, 213, 33, 67, 240, 171, 33, 195, 192, 99, 45, 193,
            // Rotation: (-2.7123, -44.9711, 0)
            233, 149, 45, 192, 113, 226, 51, 194, 173, 112, 101, 52,
            // Scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // Type: 4
            4,
            // InputKey: 4
            0, 0, 128, 64,
            // Position: (459.828, -345.524, -19.5851)
            10, 234, 229, 67, 32, 195, 172, 195, 80, 174, 156, 193,
            // ArriveTangent: (-178.708, -228.872, -21.2166)
            63, 181, 50, 195, 65, 223, 100, 195, 152, 187, 169, 193,
            // LeaveTangent: (-178.708, -228.872, -21.2166)
            63, 181, 50, 195, 65, 223, 100, 195, 152, 187, 169, 193,
            // Rotation: (-4.1789, -127.983, -0)
            185, 185, 133, 192, 129, 247, 255, 194, 71, 203, 101, 180,
            // Scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // Type: 4
            4,
            // InputKey: 5
            0, 0, 160, 64,
            // Position: (254.491, -326.249, -27.1952)
            194, 125, 126, 67, 224, 31, 163, 195, 184, 143, 217, 193,
            // ArriveTangent: (-99.4383, 176.779, -6.452)
            105, 224, 198, 194, 126, 199, 48, 67, 112, 118, 206, 192,
            // LeaveTangent: (-99.4383, 176.779, -6.452)
            105, 224, 198, 194, 126, 199, 48, 67, 112, 118, 206, 192,
            // Rotation: (-1.822, 119.358, 0)
            51, 54, 233, 191, 42, 183, 238, 66, 216, 79, 143, 52,
            // Scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // Type: 4
            4,
            // InputKey: 6
            0, 0, 192, 64,
            // Position: (250.987, -78.9023, -47.9768)
            172, 252, 122, 67, 250, 205, 157, 194, 72, 232, 63, 194,
            // ArriveTangent: (169.297, 161.41, -38.538)
            37, 76, 41, 67, 214, 104, 33, 67, 228, 38, 26, 194,
            // LeaveTangent: (169.297, 161.41, -38.538)
            37, 76, 41, 67, 214, 104, 33, 67, 228, 38, 26, 194,
            // Rotation: (-9.3557, 43.6337, 0)
            227, 176, 21, 193, 220, 136, 46, 66, 211, 69, 232, 52,
            // Scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // Type: 4
            4,
            // InputKey: 7
            0, 0, 224, 64,
            // Position: (630.699, -35.6514, -93.83)
            197, 172, 29, 68, 16, 155, 14, 194, 244, 168, 187, 194,
            // ArriveTangent: (42.8879, -7.3769, -6.8355)
            42, 141, 43, 66, 168, 15, 236, 192, 16, 188, 218, 192,
            // LeaveTangent: (42.8879, -7.3769, -6.8355)
            42, 141, 43, 66, 168, 15, 236, 192, 16, 188, 218, 192,
            // Rotation: (-8.9267, -9.7597, -0)
            183, 211, 14, 193, 138, 39, 28, 193, 58, 254, 231, 179,
            // Scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // Type: 4
            4,
            // InputKey: 8
            0, 0, 0, 65,
            // Position: (716.864, -80.1924, -127.793)
            71, 55, 51, 68, 128, 98, 160, 194, 252, 149, 255, 194,
            // ArriveTangent: (3.8319, -40.5643, -37.3309)
            150, 62, 117, 64, 224, 65, 34, 194, 214, 82, 21, 194,
            // LeaveTangent: (3.8319, -40.5643, -37.3309)
            150, 62, 117, 64, 224, 65, 34, 194, 214, 82, 21, 194,
            // Rotation: (-42.4962, -84.6035, -0)
            30, 252, 41, 194, 255, 52, 169, 194, 120, 106, 27, 182,
            // Scale: (1, 1, 1)
            0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
            // Type: 4
            4,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 75,
                    Z: 375
                },
                randVel: {
                    X: 0,
                    Y: 15,
                    Z: 30
                },
                dropOption: 0,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [],
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                goalOffset: {
                    X: 51.613,
                    Y: 0,
                    Z: 0
                },
                startTargetSpeed: 200,
                maxMoveSpeed: 900,
                minMoveSpeed: 195,
                acceleration: 1200,
                deceleration: 70,
                splinePoints: [
                    {
                        inVal: 0,
                        outVal: {
                            X: 0,
                            Y: 0,
                            Z: 0
                        },
                        arriveTangent: {
                            X: 43.801,
                            Y: 0,
                            Z: 0
                        },
                        leaveTangent: {
                            X: 43.801,
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
                        interpMode: 'CIM_CurveAuto'
                    },
                    {
                        inVal: 1,
                        outVal: {
                            X: 43.801,
                            Y: 0,
                            Z: 0
                        },
                        arriveTangent: {
                            X: 43.801,
                            Y: 0,
                            Z: 0
                        },
                        leaveTangent: {
                            X: 43.801,
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
                        inVal: 2,
                        outVal: {
                            X: 115.593,
                            Y: -3.957,
                            Z: -2.489
                        },
                        arriveTangent: {
                            X: 169.047,
                            Y: -10.444,
                            Z: -2.178
                        },
                        leaveTangent: {
                            X: 169.047,
                            Y: -10.444,
                            Z: -2.178
                        },
                        rotation: {
                            pitch: -0.737,
                            yaw: -3.535,
                            roll: 0
                        },
                        scale: {
                            X: 1,
                            Y: 1,
                            Z: 1
                        },
                        interpMode: 'CIM_CurveUser'
                    },
                    {
                        inVal: 3,
                        outVal: {
                            X: 464.715,
                            Y: -88.256,
                            Z: -6.745
                        },
                        arriveTangent: {
                            X: 161.835,
                            Y: -161.672,
                            Z: -10.837
                        },
                        leaveTangent: {
                            X: 161.835,
                            Y: -161.672,
                            Z: -10.837
                        },
                        rotation: {
                            pitch: -2.712,
                            yaw: -44.971,
                            roll: 0
                        },
                        scale: {
                            X: 1,
                            Y: 1,
                            Z: 1
                        },
                        interpMode: 'CIM_CurveUser'
                    },
                    {
                        inVal: 4,
                        outVal: {
                            X: 459.828,
                            Y: -345.524,
                            Z: -19.585
                        },
                        arriveTangent: {
                            X: -178.708,
                            Y: -228.872,
                            Z: -21.217
                        },
                        leaveTangent: {
                            X: -178.708,
                            Y: -228.872,
                            Z: -21.217
                        },
                        rotation: {
                            pitch: -4.179,
                            yaw: -127.983,
                            roll: -0
                        },
                        scale: {
                            X: 1,
                            Y: 1,
                            Z: 1
                        },
                        interpMode: 'CIM_CurveUser'
                    },
                    {
                        inVal: 5,
                        outVal: {
                            X: 254.491,
                            Y: -326.249,
                            Z: -27.195
                        },
                        arriveTangent: {
                            X: -99.438,
                            Y: 176.779,
                            Z: -6.452
                        },
                        leaveTangent: {
                            X: -99.438,
                            Y: 176.779,
                            Z: -6.452
                        },
                        rotation: {
                            pitch: -1.822,
                            yaw: 119.358,
                            roll: 0
                        },
                        scale: {
                            X: 1,
                            Y: 1,
                            Z: 1
                        },
                        interpMode: 'CIM_CurveUser'
                    },
                    {
                        inVal: 6,
                        outVal: {
                            X: 250.987,
                            Y: -78.902,
                            Z: -47.977
                        },
                        arriveTangent: {
                            X: 169.297,
                            Y: 161.41,
                            Z: -38.538
                        },
                        leaveTangent: {
                            X: 169.297,
                            Y: 161.41,
                            Z: -38.538
                        },
                        rotation: {
                            pitch: -9.356,
                            yaw: 43.634,
                            roll: 0
                        },
                        scale: {
                            X: 1,
                            Y: 1,
                            Z: 1
                        },
                        interpMode: 'CIM_CurveUser'
                    },
                    {
                        inVal: 7,
                        outVal: {
                            X: 630.7,
                            Y: -35.651,
                            Z: -93.83
                        },
                        arriveTangent: {
                            X: 42.888,
                            Y: -7.377,
                            Z: -6.835
                        },
                        leaveTangent: {
                            X: 42.888,
                            Y: -7.377,
                            Z: -6.835
                        },
                        rotation: {
                            pitch: -8.927,
                            yaw: -9.76,
                            roll: -0
                        },
                        scale: {
                            X: 1,
                            Y: 1,
                            Z: 1
                        },
                        interpMode: 'CIM_CurveUser'
                    },
                    {
                        inVal: 8,
                        outVal: {
                            X: 716.864,
                            Y: -80.192,
                            Z: -127.793
                        },
                        arriveTangent: {
                            X: 3.832,
                            Y: -40.564,
                            Z: -37.331
                        },
                        leaveTangent: {
                            X: 3.832,
                            Y: -40.564,
                            Z: -37.331
                        },
                        rotation: {
                            pitch: -42.496,
                            yaw: -84.604,
                            roll: -0
                        },
                        scale: {
                            X: 1,
                            Y: 1,
                            Z: 1
                        },
                        interpMode: 'CIM_CurveUser'
                    }
                ]
            }
        }
    },
    {
        name: 'Sprinkler',
        description: 'Sprinkler read by parseSprinklerAI',
        source: 'Madori/Cave/Cave011/Cave011_F00/ActorPlacementInfo/AP_Cave011_F00_P_Objects.json#5',
        creatureId: 'Sprinkler',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        reader: 'parseSprinklerAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "NavMeshTrigger00"
            17, 0, 0, 0, 78, 97, 118, 77, 101, 115, 104, 84, 114, 105, 103, 103,
            101, 114, 48, 48, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // ValveID: "valve0"
            7, 0, 0, 0, 118, 97, 108, 118, 101, 48, 0,
            // SprinklerAIParameter+0x50: (-517.955, 144.383, -14.9999)
            28, 125, 1, 196, 7, 98, 16, 67, 138, 255, 111, 193,
            // SprinklerAIParameter.WaterRange: 225
            0, 0, 97, 67,
            // SprinklerAIParameter.OpenTime: 5
            0, 0, 160, 64,
            // SprinklerAIParameter.bUseFlatEffect: true
            1, 0, 0, 0,
            // SprinklerAIParameter.FlatEffectOffsetZ: 0
            0, 0, 0, 0,
            // SprinklerAIParameter.bSprinklerOnly: false
            0, 0, 0, 0,
        ],
        expected: {
            AIProperties: {
                navMeshTriggerID: 'NavMeshTrigger00',
                valveID: 'valve0',
                waterRange: 225,
                openTime: 5,
                flatEffectOffsetZ: 0,
                bSprinklerOnly: 0
            },
            parsed: []
        }
    },
    {
        name: 'DownWallSidecut',
        description: 'DownWallSidecut read by parseDownWallAI',
        source: 'Madori/Cave/Cave006/Cave006_F02/ActorPlacementInfo/AP_Cave006_F02_P_Objects.json#21',
        creatureId: 'DownWallSidecut',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        reader: 'parseDownWallAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // bDisableAirWall: true
            1, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                bDisableAirWall: 1
            }
        }
    },
    {
        name: 'Tateana',
        description: 'Tateana read by parsePotDrops',
        source: 'Madori/Cave/Cave020/Cave020_F00/ActorPlacementInfo/AP_Cave020_F00_P_Objects.json#13',
        creatureId: 'Tateana',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parsePotDrops',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 1
            1, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 1
            1, 0, 0, 0,
            // MaxNum: 1
            1, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Items/GBomb.GBomb_C"
            45, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 73, 116, 101,
            109, 115, 47, 71, 66, 111, 109, 98, 46, 71, 66, 111, 109, 98, 95, 67,
            0,
            // SpawnMiniInfo.CustomParameter: "Bomb"
            5, 0, 0, 0, 66, 111, 109, 98, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 0, 350)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 175, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (100, 100, 100)
            0, 0, 200, 66, 0, 0, 200, 66, 0, 0, 200, 66,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 4
            4, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // TateanaAIParameter.TimeDigWork: 30
            0, 0, 240, 65,
        ],
        expected: {
            parsed: [
                {
                    id: 1,
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/Items/GBomb.GBomb_C',
                    customParameter: 'Bomb',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                }
            ],
            inventoryEnd: 104
        }
    }
];

export const objectEdgeCases = {
    obj_empty_15a: {
        name: 'obj_empty_15a',
        description: 'ObjectAIParameter, no drops, 8626647386',
        source: 'Madori/Cave/Cave005/Cave005_F01/ActorPlacementInfo/AP_Cave005_F01_P_Objects.json#3',
        creatureId: 'Geyser',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        reader: 'parseGeyserAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // GeyserAIParameter.bSetCrystal: false
            0, 0, 0, 0,
            // GeyserAIParameter.StopQueenDistXY: -1
            0, 0, 128, 191,
            // NavLinks (count): 1
            1, 0, 0, 0,
            // Left: (0, -1, 0)
            0, 0, 0, 0, 0, 0, 128, 191, 0, 0, 0, 0,
            // Right: (-337, -4, 106)
            0, 128, 168, 195, 0, 0, 128, 192, 0, 0, 212, 66,
            // LeftProjectHeight: 0
            0, 0, 0, 0,
            // MaxFallDownLength: 1000
            0, 0, 122, 68,
            // Direction: 1
            1,
            // SnapRadius: 30
            0, 0, 240, 65,
            // SnapHeight: 50
            0, 0, 72, 66,
            // SupportedAgentsBits: -1
            255, 255, 255, 255,
            // bUseSnapHeight: 1
            1,
            // bSnapToCheapestArea: 1
            1,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 75,
                    Z: 375
                },
                randVel: {
                    X: 0,
                    Y: 15,
                    Z: 30
                },
                dropOption: 0,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [],
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                bSetCrystal: 0,
                stopQueenDistXY: -1,
                navLinkLeft: {
                    X: 0,
                    Y: -1,
                    Z: 0
                },
                navLinkRight: {
                    X: -337,
                    Y: -4,
                    Z: 106
                },
                leftProjectHeight: 0,
                maxFallDownLength: 1000,
                direction: 'LeftToRight',
                snapRadius: 30,
                snapHeight: 50,
                bUseSnapHeight: 1,
                bSnapToCheapestArea: 1
            }
        }
    },
    obj_empty_17a: {
        name: 'obj_empty_17a',
        description: 'ObjectAIParameter, no drops, 8626647418 (bEnableFreezeBothDrop present)',
        source: 'Main/Area/Area003/ActorPlacementInfo/AP_Area003_P_Objects_Day.json#12',
        creatureId: 'RopeFishing',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647418,
        reader: 'parseRopeFishingAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (-135, 0, 0)
            0, 0, 7, 195, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (250, 0, 500)
            0, 0, 122, 67, 0, 0, 0, 0, 0, 0, 250, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 0, 30)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.bEnableFreezeBothDrop: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // RopeFishingAIParameter.JumpForceXY: 600
            0, 0, 22, 68,
            // RopeFishingAIParameter.JumpForceZ: 325
            0, 128, 162, 67,
            // RopeFishingAIParameter.RopeAng: -20
            0, 0, 160, 193,
            // RopeFishingAIParameter.ManualWorkNum: -1
            255, 255, 255, 255,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: -135,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 250,
                    Y: 0,
                    Z: 500
                },
                randVel: {
                    X: 0,
                    Y: 0,
                    Z: 30
                },
                dropOption: 0,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableFreezeBothDrop: 0,
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [],
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                jumpForceXY: 600,
                jumpForceZ: 325,
                ropeAng: -20,
                manualWorkNum: -1
            }
        }
    },
    obj_two_drops: {
        name: 'obj_two_drops',
        description: 'ObjectAIParameter with two drop slots including a DropCondition',
        source: 'Madori/Cave/Cave016/Cave016_F12/ActorPlacementInfo/AP_Cave016_F12_P_Objects.json#3',
        creatureId: 'StickyFloorPoison',
        infoType: InfoType.Hazard,
        generatorVersion: 8626647386,
        reader: 'parseStickyFloorAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 2
            2, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 1
            1, 0, 0, 0,
            // MaxNum: 1
            1, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: true
            1, 0, 0, 0,
            // DropConditions (count): 1
            1, 0, 0, 0,
            // DropCond: 5
            5,
            // DropCondInt: 0
            0, 0, 0, 0,
            // DropCondName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // DropCondDemo: 0
            0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Otakara/GOtaPuzzleG.GOtaPuzzleG_C"
            67, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 79, 116, 97, 107, 97, 114, 97, 47, 71, 79, 116,
            97, 80, 117, 122, 122, 108, 101, 71, 46, 71, 79, 116, 97, 80, 117, 122,
            122, 108, 101, 71, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[1] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 1
            1, 0, 0, 0,
            // MaxNum: 1
            1, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 1
            1, 0, 0, 0,
            // DropCond: 6
            6,
            // DropCondInt: 0
            0, 0, 0, 0,
            // DropCondName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // DropCondDemo: 0
            0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Items/GHoney.GHoney_C"
            47, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 73, 116, 101,
            109, 115, 47, 71, 72, 111, 110, 101, 121, 46, 71, 72, 111, 110, 101, 121,
            95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 64
            64, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 3
            3, 0, 0, 0,
            // OptionalPointOffset: (440, 205, 0)
            0, 0, 220, 67, 0, 0, 77, 67, 0, 0, 0, 0,
            // OptionalPointOffset: (165, -430, 0)
            0, 0, 37, 67, 0, 0, 215, 195, 0, 0, 0, 0,
            // OptionalPointOffset: (-80, 260, 0)
            0, 0, 160, 194, 0, 0, 130, 67, 0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // StickyFloorAIParameter.bAutoSpawnMush: false
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '1',
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaPuzzleG.GOtaPuzzleG_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                },
                {
                    id: '2',
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    dropCondition: 6,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Items/GHoney.GHoney_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 75,
                    Z: 375
                },
                randVel: {
                    X: 0,
                    Y: 15,
                    Z: 30
                },
                dropOption: 64,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [],
                bEnableOptionalPoint: 1,
                optionalPointOffsets: [
                    {
                        X: 440,
                        Y: 205,
                        Z: 0
                    },
                    {
                        X: 165,
                        Y: -430,
                        Z: 0
                    },
                    {
                        X: -80,
                        Y: 260,
                        Z: 0
                    }
                ],
                optionalPointPriorityInfo: [],
                bAutoSpawnMush: 0
            }
        }
    },
    obj_territory_drop: {
        name: 'obj_territory_drop',
        description: 'ObjectAIParameter drop slot with a territory cylinder',
        source: 'Main/Area/Area003/ActorPlacementInfo/AP_Area003_P_Objects_Day.json#0',
        creatureId: 'RopeFishing',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647418,
        reader: 'parseRopeFishingAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 1
            1, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 1
            1, 0, 0, 0,
            // MaxNum: 1
            1, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: true
            1, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Teki/GKanitama.GKanitama_C"
            52, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 84, 101, 107,
            105, 47, 71, 75, 97, 110, 105, 116, 97, 109, 97, 46, 71, 75, 97, 110,
            105, 116, 97, 109, 97, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: true
            1, 0, 0, 0,
            // SpawnMiniInfo.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // SpawnMiniInfo.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // SpawnMiniInfo.Territory.Radius: 170
            0, 0, 42, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (-120, 0, -40)
            0, 0, 240, 194, 0, 0, 0, 0, 0, 0, 32, 194,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, -300, 800)
            0, 0, 0, 0, 0, 0, 150, 195, 0, 0, 72, 68,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 0, 30)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.bEnableFreezeBothDrop: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // RopeFishingAIParameter.JumpForceXY: 375
            0, 128, 187, 67,
            // RopeFishingAIParameter.JumpForceZ: 325
            0, 128, 162, 67,
            // RopeFishingAIParameter.RopeAng: -20
            0, 0, 160, 193,
            // RopeFishingAIParameter.ManualWorkNum: 7
            7, 0, 0, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '1',
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    assetName: '/Game/Carrot4/Placeables/Teki/GKanitama.GKanitama_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 1,
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 170
                }
            ],
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: -120,
                    Y: 0,
                    Z: -40
                },
                vel: {
                    X: 0,
                    Y: -300,
                    Z: 800
                },
                randVel: {
                    X: 0,
                    Y: 0,
                    Z: 30
                },
                dropOption: 0,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableFreezeBothDrop: 0,
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [],
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                jumpForceXY: 375,
                jumpForceZ: 325,
                ropeAng: -20,
                manualWorkNum: 7
            }
        }
    },
    obj_optional_points: {
        name: 'obj_optional_points',
        description: 'ObjectAIParameter with an OptionalPointOffset in the sniff block',
        source: 'Madori/Cave/Cave019/Cave019_F02/ActorPlacementInfo/AP_Cave019_F02_P_Objects.json#3',
        creatureId: 'StickyFloor',
        infoType: InfoType.Hazard,
        generatorVersion: 8626647386,
        reader: 'parseStickyFloorAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 1
            1, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 2
            2, 0, 0, 0,
            // MaxNum: 2
            2, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C"
            68, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 87, 111, 114,
            107, 79, 98, 106, 101, 99, 116, 115, 47, 83, 104, 105, 122, 97, 105, 47,
            71, 80, 105, 101, 99, 101, 80, 105, 99, 107, 46, 71, 80, 105, 101, 99,
            101, 80, 105, 99, 107, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 1
            1, 0, 0, 0,
            // OptionalPointOffset: (0, -250, 0)
            0, 0, 0, 0, 0, 0, 122, 195, 0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // StickyFloorAIParameter.bAutoSpawnMush: true
            1, 0, 0, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '1',
                    minDrops: 2,
                    maxDrops: 2,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 75,
                    Z: 375
                },
                randVel: {
                    X: 0,
                    Y: 15,
                    Z: 30
                },
                dropOption: 0,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [],
                bEnableOptionalPoint: 1,
                optionalPointOffsets: [
                    {
                        X: 0,
                        Y: -250,
                        Z: 0
                    }
                ],
                optionalPointPriorityInfo: [],
                bAutoSpawnMush: 1
            }
        }
    },
    obj_escape_points: {
        name: 'obj_escape_points',
        description: 'Gate whose ObjectAIParameter has escape points, followed by its RareDropParameter',
        source: 'Madori/Cave/Cave010/Cave010_F01/ActorPlacementInfo/AP_Cave010_F01_P_Objects.json#14',
        creatureId: 'GateRock175uu',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        reader: 'parseGateAI',
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 3
            3, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 0
            0, 0, 0, 0,
            // MaxNum: 0
            0, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C"
            68, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 87, 111, 114,
            107, 79, 98, 106, 101, 99, 116, 115, 47, 83, 104, 105, 122, 97, 105, 47,
            71, 80, 105, 101, 99, 101, 80, 105, 99, 107, 46, 71, 80, 105, 101, 99,
            101, 80, 105, 99, 107, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[1] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 0
            0, 0, 0, 0,
            // MaxNum: 0
            0, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C"
            68, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 87, 111, 114,
            107, 79, 98, 106, 101, 99, 116, 115, 47, 83, 104, 105, 122, 97, 105, 47,
            71, 80, 105, 101, 99, 101, 80, 105, 99, 107, 46, 71, 80, 105, 101, 99,
            101, 80, 105, 99, 107, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[2] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 6
            6, 0, 0, 0,
            // MaxNum: 6
            6, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C"
            68, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 87, 111, 114,
            107, 79, 98, 106, 101, 99, 116, 115, 47, 83, 104, 105, 122, 97, 105, 47,
            71, 80, 105, 101, 99, 101, 80, 105, 99, 107, 46, 71, 80, 105, 101, 99,
            101, 80, 105, 99, 107, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0.1, 40, 0)
            205, 204, 204, 61, 0, 0, 32, 66, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 100, 250)
            0, 0, 0, 0, 0, 0, 200, 66, 0, 0, 122, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (100, 75, 75)
            0, 0, 200, 66, 0, 0, 150, 66, 0, 0, 150, 66,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 34
            34, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 2
            2,
            // EscapePoints: 2 entries (count is not serialized)
            // EscapePointLocation: (-550, -745, 10)
            0, 128, 9, 196, 0, 64, 58, 196, 0, 0, 32, 65,
            // EscapePointLocation: (-550, -605, 10)
            0, 128, 9, 196, 0, 64, 23, 196, 0, 0, 32, 65,
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // RareDropParameter (count): 3
            3, 0, 0, 0,
            // ---- DropItemParameter[3] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 0
            0, 0, 0, 0,
            // MaxNum: 0
            0, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C"
            68, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 87, 111, 114,
            107, 79, 98, 106, 101, 99, 116, 115, 47, 83, 104, 105, 122, 97, 105, 47,
            71, 80, 105, 101, 99, 101, 80, 105, 99, 107, 46, 71, 80, 105, 101, 99,
            101, 80, 105, 99, 107, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[4] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 0
            0, 0, 0, 0,
            // MaxNum: 0
            0, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C"
            68, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 87, 111, 114,
            107, 79, 98, 106, 101, 99, 116, 115, 47, 83, 104, 105, 122, 97, 105, 47,
            71, 80, 105, 101, 99, 101, 80, 105, 99, 107, 46, 71, 80, 105, 101, 99,
            101, 80, 105, 99, 107, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[5] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 0
            0, 0, 0, 0,
            // MaxNum: 0
            0, 0, 0, 0,
            // DropRatio: 1
            0, 0, 128, 63,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C"
            68, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 87, 111, 114,
            107, 79, 98, 106, 101, 99, 116, 115, 47, 83, 104, 105, 122, 97, 105, 47,
            71, 80, 105, 101, 99, 101, 80, 105, 99, 107, 46, 71, 80, 105, 101, 99,
            101, 80, 105, 99, 107, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '1',
                    minDrops: 0,
                    maxDrops: 0,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                },
                {
                    id: '2',
                    minDrops: 0,
                    maxDrops: 0,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                },
                {
                    id: '3',
                    minDrops: 6,
                    maxDrops: 6,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                }
            ],
            rareDrops: [
                {
                    id: 1,
                    minDrops: 0,
                    maxDrops: 0,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                },
                {
                    id: 2,
                    minDrops: 0,
                    maxDrops: 0,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                },
                {
                    id: 3,
                    minDrops: 0,
                    maxDrops: 0,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                boneName: 'None',
                localOffset: {
                    X: 0.1,
                    Y: 40,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 100,
                    Z: 250
                },
                randVel: {
                    X: 100,
                    Y: 75,
                    Z: 75
                },
                dropOption: 34,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bIgnoreLaterTask: 0,
                bIgnoreCompleteUI: 0,
                completeUIOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableOptimizeWaterBoxContext: 1,
                bDisableSoftEdge: 0,
                bDisableSoftEdgeOnlyFrom: 0,
                bDisableSoftEdgeOnlyTo: 0,
                linkNarrowSpaceBoxID: 'None',
                linkWarpTriggerID: 'None',
                navMeshTriggerID: 'None',
                escapePoints: [
                    {
                        X: -550,
                        Y: -745,
                        Z: 10
                    },
                    {
                        X: -550,
                        Y: -605,
                        Z: 10
                    }
                ],
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: []
            }
        }
    }
};

// Synthetic arrays: built by an independent encoder from the layouts, validated against the reference parser.
export const objectSynthetic = {
    objectAllSections: {
        name: 'objectAllSections',
        creatureId: 'StickyFloor',
        generatorVersion: 8626647418,
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 1
            1, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 18446744073709551615
            255, 255, 255, 255, 255, 255, 255, 255,
            // MinNum: 1
            1, 0, 0, 0,
            // MaxNum: 2
            2, 0, 0, 0,
            // DropRatio: 0.75
            0, 0, 64, 63,
            // bRegistGenerator: true
            1, 0, 0, 0,
            // DropConditions (count): 1
            1, 0, 0, 0,
            // DropCond: 4
            4,
            // DropCondInt: 0
            0, 0, 0, 0,
            // DropCondName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // DropCondDemo: 0
            0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Items/GBomb.GBomb_C"
            45, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 73, 116, 101,
            109, 115, 47, 71, 66, 111, 109, 98, 46, 71, 66, 111, 109, 98, 95, 67,
            0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: true
            1, 0, 0, 0,
            // SpawnMiniInfo.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // SpawnMiniInfo.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // SpawnMiniInfo.Territory.Radius: 170
            0, 0, 42, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.bEnableFreezeBothDrop: true
            1, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: true
            1, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 120)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 66,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "NarrowSpace00"
            14, 0, 0, 0, 78, 97, 114, 114, 111, 119, 83, 112, 97, 99, 101, 48,
            48, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "WarpTrigger01"
            14, 0, 0, 0, 87, 97, 114, 112, 84, 114, 105, 103, 103, 101, 114, 48,
            49, 0,
            // ObjectAIParameter.NavMeshTriggerID: "NavMeshTrigger02"
            17, 0, 0, 0, 78, 97, 118, 77, 101, 115, 104, 84, 114, 105, 103, 103,
            101, 114, 48, 50, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 2
            2,
            // EscapePoints: 2 entries (count is not serialized)
            // EscapePointLocation: (100, 0, 0)
            0, 0, 200, 66, 0, 0, 0, 0, 0, 0, 0, 0,
            // EscapePointLocation: (-100, 50, 0)
            0, 0, 200, 194, 0, 0, 72, 66, 0, 0, 0, 0,
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 1
            1, 0, 0, 0,
            // OptionalPointOffset: (0, 0, 25)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 65,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 1
            1, 0, 0, 0,
            // OptionalPointPriority: 3
            3, 0, 0, 0,
            // StickyFloorAIParameter.bAutoSpawnMush: true
            1, 0, 0, 0,
        ],
        parsed: [
            {
                id: '1',
                minDrops: 1,
                maxDrops: 2,
                dropChance: 0.75,
                bRegistGenerator: 1,
                dropCondition: 4,
                dropCondInt: 0,
                dropCondName: 'None',
                assetName: '/Game/Carrot4/Placeables/Items/GBomb.GBomb_C',
                customParameter: 'None',
                customFloatParam: 0,
                gameRulePermissionFlag: 0,
                bSetTerritory: 1,
                X: 0,
                Y: 0,
                Z: 0,
                halfHeight: 50,
                radius: 170
            }
        ],
        AIProperties: {
            boneName: 'None',
            localOffset: {
                X: 0,
                Y: 0,
                Z: 0
            },
            vel: {
                X: 0,
                Y: 75,
                Z: 375
            },
            randVel: {
                X: 0,
                Y: 15,
                Z: 30
            },
            dropOption: 0,
            fixedHotExtractDropNum: 0,
            bOverrideInitLocation: 0,
            overrideInitLocation: {
                X: 0,
                Y: 0,
                Z: 0
            },
            bIgnoreLaterTask: 1,
            bIgnoreCompleteUI: 0,
            completeUIOffset: {
                X: 0,
                Y: 0,
                Z: 120
            },
            bEnableOptimizeWaterBoxContext: 1,
            bDisableSoftEdge: 1,
            bDisableSoftEdgeOnlyFrom: 0,
            bDisableSoftEdgeOnlyTo: 0,
            linkNarrowSpaceBoxID: 'NarrowSpace00',
            linkWarpTriggerID: 'WarpTrigger01',
            navMeshTriggerID: 'NavMeshTrigger02',
            escapePoints: [
                {
                    X: 100,
                    Y: 0,
                    Z: 0
                },
                {
                    X: -100,
                    Y: 50,
                    Z: 0
                }
            ],
            bEnableOptionalPoint: 1,
            optionalPointOffsets: [
                {
                    X: 0,
                    Y: 0,
                    Z: 25
                }
            ],
            optionalPointPriorityInfo: [3],
            bAutoSpawnMush: 1,
            bEnableFreezeBothDrop: 1
        }
    },
    objectVersionGate: {
        name: 'objectVersionGate',
        creatureId: 'Geyser',
        generatorVersion: 8626647418,
        bytes: [
            // ObjectAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // ObjectAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
            0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
            // ObjectAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
            0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
            // ObjectAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // ObjectAIParameter.DropParameter.bEnableFreezeBothDrop: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreLaterTask: false
            0, 0, 0, 0,
            // ObjectAIParameter.bIgnoreCompleteUI: false
            0, 0, 0, 0,
            // ObjectAIParameter.CompleteUIOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // ObjectAIParameter.bEnableOptimizeWaterBoxContext: true
            1, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdge: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyFrom: false
            0, 0, 0, 0,
            // ObjectAIParameter.bDisableSoftEdgeOnlyTo: false
            0, 0, 0, 0,
            // ObjectAIParameter.LinkNarrowSpaceBoxID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.LinkWarpTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.NavMeshTriggerID: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // ObjectAIParameter.EscapePointSerializeNum: 0
            0,
            // EscapePoints: 0 entries (count is not serialized)
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // GeyserAIParameter.bSetCrystal: false
            0, 0, 0, 0,
            // GeyserAIParameter.StopQueenDistXY: -1
            0, 0, 128, 191,
            // NavLinks (count): 1
            1, 0, 0, 0,
            // Left: (0, -1, 0)
            0, 0, 0, 0, 0, 0, 128, 191, 0, 0, 0, 0,
            // Right: (-337, -4, 106)
            0, 128, 168, 195, 0, 0, 128, 192, 0, 0, 212, 66,
            // LeftProjectHeight: 0
            0, 0, 0, 0,
            // MaxFallDownLength: 1000
            0, 0, 122, 68,
            // Direction: 1
            1,
            // SnapRadius: 30
            0, 0, 240, 65,
            // SnapHeight: 50
            0, 0, 72, 66,
            // SupportedAgentsBits: -1
            255, 255, 255, 255,
            // bUseSnapHeight: 1
            1,
            // bSnapToCheapestArea: 1
            1,
        ],
        parsed: [],
        AIProperties: {
            boneName: 'None',
            localOffset: {
                X: 0,
                Y: 0,
                Z: 0
            },
            vel: {
                X: 0,
                Y: 75,
                Z: 375
            },
            randVel: {
                X: 0,
                Y: 15,
                Z: 30
            },
            dropOption: 0,
            fixedHotExtractDropNum: 0,
            bOverrideInitLocation: 0,
            overrideInitLocation: {
                X: 0,
                Y: 0,
                Z: 0
            },
            bIgnoreLaterTask: 0,
            bIgnoreCompleteUI: 0,
            completeUIOffset: {
                X: 0,
                Y: 0,
                Z: 0
            },
            bEnableOptimizeWaterBoxContext: 1,
            bDisableSoftEdge: 0,
            bDisableSoftEdgeOnlyFrom: 0,
            bDisableSoftEdgeOnlyTo: 0,
            linkNarrowSpaceBoxID: 'None',
            linkWarpTriggerID: 'None',
            navMeshTriggerID: 'None',
            escapePoints: [],
            bEnableOptionalPoint: 0,
            optionalPointOffsets: [],
            optionalPointPriorityInfo: [],
            bSetCrystal: 0,
            stopQueenDistXY: -1,
            navLinkLeft: {
                X: 0,
                Y: -1,
                Z: 0
            },
            navLinkRight: {
                X: -337,
                Y: -4,
                Z: 106
            },
            leftProjectHeight: 0,
            maxFallDownLength: 1000,
            direction: 'LeftToRight',
            snapRadius: 30,
            snapHeight: 50,
            bUseSnapHeight: 1,
            bSnapToCheapestArea: 1
        }
    }
};
