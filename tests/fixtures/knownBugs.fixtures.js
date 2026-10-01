// AUTO-GENERATED from pristine AP_*.json actor placement files (P4 archive/Carrot4/Maps).
// Byte arrays are real ActorSerializeParameter data; every comment labels the bytes that follow it.
// AI.Static labels come from the ai-static layouts (reference parser that parses all 7,640 shipped samples).
import { InfoType } from '../../src/api/types';

const EGG_STATIC_BYTES = [
    // TekiAIParameter.Territory.Center: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // TekiAIParameter.Territory.HalfHeight: 50
    0, 0, 72, 66,
    // TekiAIParameter.Territory.Radius: 100
    0, 0, 200, 66,
    // TekiAIParameter.DropParameter.DropItemParameter (count): 3
    3, 0, 0, 0,
    // ---- DropItemParameter[0] ----
    // UniqueId: 4612248972675776558
    46, 0, 0, 0, 1, 0, 2, 64,
    // MinNum: 1
    1, 0, 0, 0,
    // MaxNum: 1
    1, 0, 0, 0,
    // DropRatio: 0.75
    0, 0, 64, 63,
    // bRegistGenerator: false
    0, 0, 0, 0,
    // DropConditions (count): 0
    0, 0, 0, 0,
    // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Items/GHoney.GHoney_C"
    47, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
    52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 73, 116, 101,
    109, 115, 47, 71, 72, 111, 110, 101, 121, 46, 71, 72, 111, 110, 101, 121,
    95, 67, 0,
    // SpawnMiniInfo.CustomParameter: "None"
    5, 0, 0, 0, 78, 111, 110, 101, 0,
    // SpawnMiniInfo.CustomFloatParameter: 0
    0, 0, 0, 0,
    // SpawnMiniInfo.GameRulePermissionFlag: 271
    15, 1,
    // SpawnMiniInfo.bSetTerritory: false
    0, 0, 0, 0,
    // ---- DropItemParameter[1] ----
    // UniqueId: 4612248972675776559
    47, 0, 0, 0, 1, 0, 2, 64,
    // MinNum: 1
    1, 0, 0, 0,
    // MaxNum: 1
    1, 0, 0, 0,
    // DropRatio: 0.2
    205, 204, 76, 62,
    // bRegistGenerator: false
    0, 0, 0, 0,
    // DropConditions (count): 1
    1, 0, 0, 0,
    // DropCond: 7
    7,
    // DropCondInt: -1
    255, 255, 255, 255,
    // DropCondName: "None"
    5, 0, 0, 0, 78, 111, 110, 101, 0,
    // DropCondDemo: 32
    32,
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
    // SpawnMiniInfo.GameRulePermissionFlag: 15
    15, 0,
    // SpawnMiniInfo.bSetTerritory: false
    0, 0, 0, 0,
    // ---- DropItemParameter[2] ----
    // UniqueId: 4612248972675776560
    48, 0, 0, 0, 1, 0, 2, 64,
    // MinNum: 1
    1, 0, 0, 0,
    // MaxNum: 1
    1, 0, 0, 0,
    // DropRatio: 0.05
    205, 204, 76, 61,
    // bRegistGenerator: false
    0, 0, 0, 0,
    // DropConditions (count): 1
    1, 0, 0, 0,
    // DropCond: 7
    7,
    // DropCondInt: -1
    255, 255, 255, 255,
    // DropCondName: "None"
    5, 0, 0, 0, 78, 111, 110, 101, 0,
    // DropCondDemo: 32
    32,
    // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Items/GHotExtract.GHotExtract_C"
    57, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
    52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 73, 116, 101,
    109, 115, 47, 71, 72, 111, 116, 69, 120, 116, 114, 97, 99, 116, 46, 71,
    72, 111, 116, 69, 120, 116, 114, 97, 99, 116, 95, 67, 0,
    // SpawnMiniInfo.CustomParameter: "None"
    5, 0, 0, 0, 78, 111, 110, 101, 0,
    // SpawnMiniInfo.CustomFloatParameter: 0
    0, 0, 0, 0,
    // SpawnMiniInfo.GameRulePermissionFlag: 15
    15, 0,
    // SpawnMiniInfo.bSetTerritory: false
    0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
    255, 255, 255, 255,
    // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
    5, 0, 0, 0, 78, 111, 110, 101, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 0, 350)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 175, 67,
    // TekiAIParameter.DropParameter.DropActorParameter.RandVel: (25, 25, 25)
    0, 0, 200, 65, 0, 0, 200, 65, 0, 0, 200, 65,
    // TekiAIParameter.DropParameter.DropActorParameter.DropOption: 1
    1, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
    0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
    0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 3
    3, 0, 0, 0,
    // DebugUniqueId: 4612248972675776558
    46, 0, 0, 0, 1, 0, 2, 64,
    // DebugUniqueId: 4612248972675776559
    47, 0, 0, 0, 1, 0, 2, 64,
    // DebugUniqueId: 4612248972675776560
    48, 0, 0, 0, 1, 0, 2, 64,
    // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
    1, 0, 0, 0,
    // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
    0, 0, 72, 66,
    // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 100
    0, 0, 200, 66,
    // TekiAIParameter.SearchAreaOtakaraCarry.Angle: 180
    0, 0, 52, 67,
    // TekiAIParameter.SearchAreaOtakaraCarry.SphereRadius: 30
    0, 0, 240, 65,
    // TekiAIParameter.InvasionParameter.StartTimeRatio: 0
    0, 0, 0, 0,
    // TekiAIParameter.bNotifyCarryNearProWrestlingPikmin: false
    0, 0, 0, 0,
    // TekiAIParameter.bEnableCullSearchEnemy: true
    1, 0, 0, 0,
    // TekiAIParameter.bUseActorLastRenderTime: false
    0, 0, 0, 0,
    // SniffPointParameter.bEnableOptionalPoint: false
    0, 0, 0, 0,
    // SniffPointParameter.OptionalPointOffsets (count): 0
    0, 0, 0, 0,
    // SniffPointParameter.OptionalPointPriorityInfo (count): 0
    0, 0, 0, 0,
    // EggAIParameter.bDropCaveComplete: false
    0, 0, 0, 0,
];

const BIGUJINKO_STATIC_BYTES = [
    // TekiAIParameter.Territory.Center: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // TekiAIParameter.Territory.HalfHeight: 50
    0, 0, 72, 66,
    // TekiAIParameter.Territory.Radius: 250
    0, 0, 122, 67,
    // TekiAIParameter.DropParameter.DropItemParameter (count): 0
    0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
    255, 255, 255, 255,
    // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
    5, 0, 0, 0, 78, 111, 110, 101, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 120, 375)
    0, 0, 0, 0, 0, 0, 240, 66, 0, 128, 187, 67,
    // TekiAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
    0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
    // TekiAIParameter.DropParameter.DropActorParameter.DropOption: 64
    64, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
    0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
    0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 0
    0, 0, 0, 0,
    // TekiAIParameter.DropParameter.bEnableFreezeBothDrop: false
    0, 0, 0, 0,
    // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
    1, 0, 0, 0,
    // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
    0, 0, 72, 66,
    // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 600
    0, 0, 22, 68,
    // TekiAIParameter.SearchAreaOtakaraCarry.Angle: 180
    0, 0, 52, 67,
    // TekiAIParameter.SearchAreaOtakaraCarry.SphereRadius: 30
    0, 0, 240, 65,
    // TekiAIParameter.InvasionParameter.StartTimeRatio: 0
    0, 0, 0, 0,
    // TekiAIParameter.bNotifyCarryNearProWrestlingPikmin: false
    0, 0, 0, 0,
    // TekiAIParameter.bEnableCullSearchEnemy: true
    1, 0, 0, 0,
    // TekiAIParameter.bUseActorLastRenderTime: false
    0, 0, 0, 0,
    // SniffPointParameter.bEnableOptionalPoint: false
    0, 0, 0, 0,
    // SniffPointParameter.OptionalPointOffsets (count): 0
    0, 0, 0, 0,
    // SniffPointParameter.OptionalPointPriorityInfo (count): 0
    0, 0, 0, 0,
    // UjinkoBaseAIParameter.bNoBurrowType: false
    0, 0, 0, 0,
    // BigUjinkoAIParameter.bPatrolType: false
    0, 0, 0, 0,
    // BigUjinkoAIParameter.SearchTagName: "BigUjinkoRootPoint"
    19, 0, 0, 0, 66, 105, 103, 85, 106, 105, 110, 107, 111, 82, 111, 111,
    116, 80, 111, 105, 110, 116, 0,
    // TekiAIParameter.SearchAreaCaution.Center: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // TekiAIParameter.SearchAreaCaution.HalfHeight: 50
    0, 0, 72, 66,
    // TekiAIParameter.SearchAreaCaution.Radius: 275
    0, 128, 137, 67,
    // TekiAIParameter.SearchAreaCaution.Angle: 180
    0, 0, 52, 67,
    // TekiAIParameter.SearchAreaCaution.SphereRadius: 30
    0, 0, 240, 65,
];

const OTADICE12_STATIC_BYTES = [
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
    // SniffPointParameter.bEnableOptionalPoint: false
    0, 0, 0, 0,
    // SniffPointParameter.OptionalPointOffsets (count): 1
    1, 0, 0, 0,
    // OptionalPointOffset: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // SniffPointParameter.OptionalPointPriorityInfo (count): 0
    0, 0, 0, 0,
];

const GROUPDROPMANAGER_STATIC_BYTES = [
    // GroupDropManagerAIParameter.GroupingRadius: 50
    0, 0, 72, 66,
    // GroupDropManagerAIParameter.IgnoreCIDList (count): 0
    0, 0, 0, 0,
    // GroupDropManagerAIParameter.DropParameter.DropItemParameter (count): 1
    1, 0, 0, 0,
    // ---- DropItemParameter[0] ----
    // UniqueId: 18446744073709551615
    255, 255, 255, 255, 255, 255, 255, 255,
    // MinNum: 5
    5, 0, 0, 0,
    // MaxNum: 5
    5, 0, 0, 0,
    // DropRatio: 1
    0, 0, 128, 63,
    // bRegistGenerator: false
    0, 0, 0, 0,
    // DropConditions (count): 1
    1, 0, 0, 0,
    // DropCond: 4
    4,
    // DropCondInt: -1
    255, 255, 255, 255,
    // DropCondName: "OTAHEROPARTSP"
    14, 0, 0, 0, 79, 84, 65, 72, 69, 82, 79, 80, 65, 82, 84, 83,
    80, 0,
    // DropCondDemo: 0
    0,
    // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Pikmin/GPikminRed.GPikminRed_C"
    56, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
    52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 80, 105, 107,
    109, 105, 110, 47, 71, 80, 105, 107, 109, 105, 110, 82, 101, 100, 46, 71,
    80, 105, 107, 109, 105, 110, 82, 101, 100, 95, 67, 0,
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
    // GroupDropManagerAIParameter.DropParameter.DropActorParameter.Vel: (0, -200, 300)
    0, 0, 0, 0, 0, 0, 72, 195, 0, 0, 150, 67,
    // GroupDropManagerAIParameter.DropParameter.DropActorParameter.RandVel: (50, 50, 30)
    0, 0, 72, 66, 0, 0, 72, 66, 0, 0, 240, 65,
    // GroupDropManagerAIParameter.DropParameter.DropActorParameter.DropOption: 2
    2, 0,
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
];

const CRUSHJELLY_M_STATIC_BYTES = [
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
    // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Survivor/GSurvivorA.GSurvivorA_C"
    66, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
    52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
    101, 99, 116, 115, 47, 83, 117, 114, 118, 105, 118, 111, 114, 47, 71, 83,
    117, 114, 118, 105, 118, 111, 114, 65, 46, 71, 83, 117, 114, 118, 105, 118,
    111, 114, 65, 95, 67, 0,
    // SpawnMiniInfo.CustomParameter: "SVSleep000"
    11, 0, 0, 0, 83, 86, 83, 108, 101, 101, 112, 48, 48, 48, 0,
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
    // ObjectAIParameter.DropParameter.DropActorParameter.Vel: (0, -90, 375)
    0, 0, 0, 0, 0, 0, 180, 194, 0, 128, 187, 67,
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
    // CrushJellyAIParameter.bFreezeStart: false
    0, 0, 0, 0,
    // SearchCIDList (count): 0
    0, 0, 0, 0,
];

const AMEBOZU_STATIC_BYTES = [
    // TekiAIParameter.Territory.Center: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // TekiAIParameter.Territory.HalfHeight: 50
    0, 0, 72, 66,
    // TekiAIParameter.Territory.Radius: 100
    0, 0, 200, 66,
    // TekiAIParameter.DropParameter.DropItemParameter (count): 0
    0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
    255, 255, 255, 255,
    // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
    5, 0, 0, 0, 78, 111, 110, 101, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, -35, 0)
    0, 0, 0, 0, 0, 0, 12, 194, 0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 75, 375)
    0, 0, 0, 0, 0, 0, 150, 66, 0, 128, 187, 67,
    // TekiAIParameter.DropParameter.DropActorParameter.RandVel: (0, 15, 30)
    0, 0, 0, 0, 0, 0, 112, 65, 0, 0, 240, 65,
    // TekiAIParameter.DropParameter.DropActorParameter.DropOption: 0
    0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
    0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
    0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 1
    1, 0, 0, 0,
    // DebugUniqueId: 4615629970931187759
    47, 0, 0, 0, 1, 3, 14, 64,
    // TekiAIParameter.DropParameter.bEnableFreezeBothDrop: false
    0, 0, 0, 0,
    // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
    1, 0, 0, 0,
    // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
    0, 0, 72, 66,
    // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 300
    0, 0, 150, 67,
    // TekiAIParameter.SearchAreaOtakaraCarry.Angle: 180
    0, 0, 52, 67,
    // TekiAIParameter.SearchAreaOtakaraCarry.SphereRadius: 30
    0, 0, 240, 65,
    // TekiAIParameter.InvasionParameter.StartTimeRatio: 0
    0, 0, 0, 0,
    // TekiAIParameter.bNotifyCarryNearProWrestlingPikmin: false
    0, 0, 0, 0,
    // TekiAIParameter.bEnableCullSearchEnemy: true
    1, 0, 0, 0,
    // TekiAIParameter.bUseActorLastRenderTime: false
    0, 0, 0, 0,
    // SniffPointParameter.bEnableOptionalPoint: false
    0, 0, 0, 0,
    // SniffPointParameter.OptionalPointOffsets (count): 0
    0, 0, 0, 0,
    // SniffPointParameter.OptionalPointPriorityInfo (count): 0
    0, 0, 0, 0,
    // AmeBozuAIParameter.bAppearSearch: false
    0, 0, 0, 0,
    // AmeBozuAIParameter.SearchTagName: "AmeBozuRootPoint"
    17, 0, 0, 0, 65, 109, 101, 66, 111, 122, 117, 82, 111, 111, 116, 80,
    111, 105, 110, 116, 0,
    // AmeBozuAIParameter.HideTimeMin: 300
    0, 0, 150, 67,
    // AmeBozuAIParameter.HideTimeMax: 300
    0, 0, 150, 67,
    // AmeBozuAIParameter.bAppearFixedLocation: false
    0, 0, 0, 0,
    // AmeBozuAIParameter.AppearSearchRadius: 300
    0, 0, 150, 67,
    // AmeBozuAIParameter.WalkType: 1
    1,
    // AmeBozuAIParameter.CanAttackLevelFaceMessageName: "Teki_Announce_AmeBozu_01"
    25, 0, 0, 0, 84, 101, 107, 105, 95, 65, 110, 110, 111, 117, 110, 99,
    101, 95, 65, 109, 101, 66, 111, 122, 117, 95, 48, 49, 0,
];

const MOVEFLOORHOVER_STATIC_BYTES = [
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
    // MoveFloorAIParameter.MoveSpeed: 50
    0, 0, 72, 66,
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
    // ArriveTangent: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // LeaveTangent: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // Rotation: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // Scale: (1, 1, 1)
    0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
    // Type: 0
    0,
    // InputKey: 1
    0, 0, 128, 63,
    // Position: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // ArriveTangent: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // LeaveTangent: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // Rotation: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // Scale: (1, 1, 1)
    0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
    // Type: 0
    0,
    // FloorRotation: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // NavLinks (count): 1
    1, 0, 0, 0,
    // LeftPoint: (0, 0, 20)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 65,
    // RightPoint: (170.975, 0, -50)
    119, 249, 42, 67, 0, 0, 0, 0, 0, 0, 72, 194,
];

const TRIGGERDOOR_STATIC_BYTES = [
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
    // TriggerBoxLocation: (326.497, -984.002, 147)
    142, 63, 163, 67, 38, 0, 118, 196, 0, 0, 19, 67,
    // TriggerBoxScale: (1, 1, 1)
    0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63,
    // TriggerBoxExtent: (350, 400, 150)
    0, 0, 175, 67, 0, 0, 200, 67, 0, 0, 22, 67,
    // TriggerDoorAIParameter.CIDList (count): 1
    1, 0, 0, 0,
    // CID: "OTAGOLFBALL"
    12, 0, 0, 0, 79, 84, 65, 71, 79, 76, 70, 66, 65, 76, 76, 0,
];

const INVISIBLEWALLFORWARPCARRY_STATIC_BYTES = [
    // Empty: this actor has no AI.Static data at all
];

const VARGATESOFTNOPILLAR_DYNAMIC_BYTES = [
    // Unmapped (12 bytes)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // Unmapped: -1
    255, 255, 255, 255,
    // startValidWallIndex: -1
    255, 255, 255, 255,
    // Unmapped: 1
    1, 0, 0, 0,
];

const WATERBOX_ACTORPARAMETER_BYTES = [
    // ActorParameter header (unmapped)
    5, 0, 0, 0, 78, 111, 110, 101, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 0, 5, 0, 0, 0, 78, 111, 110, 101, 0, 5, 0,
    0, 0, 78, 111, 110, 101, 0, 0, 0, 0, 0, 0, 0, 128, 191, 0,
    0, 128, 191, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 128, 191,
    // unknownInt: 0
    0,
    // radarMapWBTexture: "/Game/Carrot4/UI/InGame/RadarMap/UMG/Map/HeroStory003/T_ui_Map_HeroStory003_WaterBox01_Hero_D.T_ui_Map_HeroStory003_WaterBox01_Hero_D"
    134, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
    52, 47, 85, 73, 47, 73, 110, 71, 97, 109, 101, 47, 82, 97, 100, 97,
    114, 77, 97, 112, 47, 85, 77, 71, 47, 77, 97, 112, 47, 72, 101, 114,
    111, 83, 116, 111, 114, 121, 48, 48, 51, 47, 84, 95, 117, 105, 95, 77,
    97, 112, 95, 72, 101, 114, 111, 83, 116, 111, 114, 121, 48, 48, 51, 95,
    87, 97, 116, 101, 114, 66, 111, 120, 48, 49, 95, 72, 101, 114, 111, 95,
    68, 46, 84, 95, 117, 105, 95, 77, 97, 112, 95, 72, 101, 114, 111, 83,
    116, 111, 114, 121, 48, 48, 51, 95, 87, 97, 116, 101, 114, 66, 111, 120,
    48, 49, 95, 72, 101, 114, 111, 95, 68, 0,
    // radarMapWBChangeDistTexture: "/Game/Carrot4/UI/InGame/RadarMap/UMG/Map/HeroStory003/T_ui_Map_HeroStory003_Hero_WaterBox01_ChangeDist_D.T_ui_Map_HeroStory003_Hero_WaterBox01_ChangeDist_D"
    156, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
    52, 47, 85, 73, 47, 73, 110, 71, 97, 109, 101, 47, 82, 97, 100, 97,
    114, 77, 97, 112, 47, 85, 77, 71, 47, 77, 97, 112, 47, 72, 101, 114,
    111, 83, 116, 111, 114, 121, 48, 48, 51, 47, 84, 95, 117, 105, 95, 77,
    97, 112, 95, 72, 101, 114, 111, 83, 116, 111, 114, 121, 48, 48, 51, 95,
    72, 101, 114, 111, 95, 87, 97, 116, 101, 114, 66, 111, 120, 48, 49, 95,
    67, 104, 97, 110, 103, 101, 68, 105, 115, 116, 95, 68, 46, 84, 95, 117,
    105, 95, 77, 97, 112, 95, 72, 101, 114, 111, 83, 116, 111, 114, 121, 48,
    48, 51, 95, 72, 101, 114, 111, 95, 87, 97, 116, 101, 114, 66, 111, 120,
    48, 49, 95, 67, 104, 97, 110, 103, 101, 68, 105, 115, 116, 95, 68, 0,
    // Unmapped
    205, 204, 76, 65,
];

const SPLINEDOKUNAMEKO_ACTORPARAMETER_BYTES = [
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
    // splinePoints (count): 4
    4, 0, 0, 0,
    // ---- splinePoints[0] ----
    // inVal: 0
    0, 0, 0, 0,
    // outVal: (1.4013e-45, 1.4013e-45, 0)
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    // arriveTangent: (2.8026e-45, 1.4013e-45, 4.2039e-45)
    2, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0,
    // leaveTangent: (1.4013e-45, 5.60519e-45, 0)
    1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0,
    // rotation (pitch, yaw, roll): (169.269, -137.377, -254.061)
    248, 68, 41, 67, 144, 96, 9, 195, 190, 15, 126, 195,
    // scale: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // interpMode: 0
    0,
    // ---- splinePoints[1] ----
    // inVal: 0
    0, 0, 0, 0,
    // outVal: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // arriveTangent: (0, 0, 5.83155e-39)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0,
    // leaveTangent: (5.83155e-39, 1.40692e-37, 1)
    0, 128, 63, 0, 0, 128, 63, 2, 0, 0, 128, 63,
    // rotation (pitch, yaw, roll): (270.91, -567.149, -254.061)
    122, 116, 135, 67, 140, 201, 13, 196, 190, 15, 126, 195,
    // scale: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // interpMode: 0
    0,
    // ---- splinePoints[2] ----
    // inVal: 0
    0, 0, 0, 0,
    // outVal: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // arriveTangent: (0, 0, 5.83155e-39)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0,
    // leaveTangent: (5.83155e-39, 1.40692e-37, 2)
    0, 128, 63, 0, 0, 128, 63, 2, 0, 0, 0, 64,
    // rotation (pitch, yaw, roll): (-144.962, -693.19, -254.061)
    102, 246, 16, 195, 48, 76, 45, 196, 190, 15, 126, 195,
    // scale: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // interpMode: 0
    0,
    // ---- splinePoints[3] ----
    // inVal: 0
    0, 0, 0, 0,
    // outVal: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // arriveTangent: (0, 0, 5.83155e-39)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0,
    // leaveTangent: (5.83155e-39, 1.40692e-37, 3)
    0, 128, 63, 0, 0, 128, 63, 2, 0, 0, 64, 64,
    // rotation (pitch, yaw, roll): (-261.286, -286.787, -254.061)
    166, 164, 130, 195, 196, 100, 143, 195, 190, 15, 126, 195,
    // scale: (0, 0, 0)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // interpMode: 0
    0,
    // Unmapped (12 bytes)
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // searchTagName: ""
    0, 0, 0, 0,
    // Unmapped
    0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 128, 63, 0,
    0, 128, 63, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    24, 0, 0, 0, 68, 111, 107, 117, 78, 97, 109, 101, 107, 111, 71, 101,
    110, 101, 114, 97, 116, 101, 80, 111, 105, 110, 116, 0,
];

const OTAKARAZUKANPORTAL_PORTALTRIGGER_BYTES = [
    // portalType (EPortalType): 12
    12,
    // portalNumber: 98
    98, 0, 0, 0,
    // toLevelName: "None"
    5, 0, 0, 0, 78, 111, 110, 101, 0,
    // toSubLevelName: "Zukan"
    6, 0, 0, 0, 90, 117, 107, 97, 110, 0,
    // toPortalId: 1
    1, 0, 0, 0,
    // Unmapped bool (always 1): false
    0, 0, 0, 0,
    // demoPlayParamEnter: "None"
    5, 0, 0, 0, 78, 111, 110, 101, 0,
    // Unmapped
    0, 0, 0, 0,
    // demoPlayParamExit: "None"
    5, 0, 0, 0, 78, 111, 110, 101, 0,
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
    // playAnimDist: 300
    0, 0, 150, 67,
    // Unmapped
    0, 0, 0, 0,
    // pankuzuPriority: 0
    0, 0, 0, 0,
    // disablePikminFlags (bitfield): 0
    0, 0, 0, 0,
    // bDisableIsFlareGuard: false
    0, 0, 0, 0,
];

const POPPLACEACTOR_POPPLACE_BYTES = [
    // popObjectType (EVsPopObjectType): 2
    2,
    // groupId: 0
    0, 0, 0, 0,
    // maxObjectNumInRange: 0
    0, 0, 0, 0,
    // Unmapped float (not read): 350
    0, 0, 175, 67,
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
];

// Real samples that do not round-trip because of a diagnosed reader/writer bug.
// constructing.test.js runs these with test.fails - fix the bug, then move the case into a normal test.
export const knownBugFixtures = [
    {
        name: 'Egg',
        kind: 'static',
        bug: 'DropCondDemo (32) is skipped on read and written back as 0',
        source: 'Madori/Cave/Cave002/Cave002_F00/ActorPlacementInfo/AP_Cave002_F00_P_Teki.json#2',
        creatureId: 'Egg',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        bytes: EGG_STATIC_BYTES
    },
    {
        name: 'BigUjinko',
        kind: 'static',
        bug: 'constructBigUjinkoAI writes a hard-coded SearchAreaCaution instead of the value read from the actor',
        source: 'Madori/Cave/Cave018/Cave018_F00/ActorPlacementInfo/AP_Cave018_F00_P_Teki.json#1',
        creatureId: 'BigUjinko',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        bytes: BIGUJINKO_STATIC_BYTES
    },
    {
        name: 'OtaDice12',
        kind: 'static',
        bug: 'constructOtakaraAI zero-fills OptionalPointPriorityInfo and only writes offsets when enabled',
        source: 'Madori/Cave/Cave035/Cave035_F02/ActorPlacementInfo/AP_Cave035_F02_P_Objects.json#19',
        creatureId: 'OtaDice12',
        infoType: InfoType.Treasure,
        generatorVersion: 8626647386,
        bytes: OTADICE12_STATIC_BYTES
    },
    {
        name: 'AmeBozu',
        kind: 'static',
        bug: 'DebugUniqueIdList is rebuilt from the drop slots, losing stale entries the game wrote',
        source: 'Madori/Cave/Cave014/Cave014_F03/ActorPlacementInfo/AP_Cave014_F03_P_Teki.json#10',
        creatureId: 'AmeBozu',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        bytes: AMEBOZU_STATIC_BYTES
    },
    {
        name: 'MoveFloorHover',
        kind: 'static',
        bug: 'constructMoveFloorAI appends 12 zero bytes after the spline; MoveFloorHover has 40',
        source: 'Madori/Cave/Cave005/Cave005_F01/ActorPlacementInfo/AP_Cave005_F01_P_Objects.json#19',
        creatureId: 'MoveFloorHover',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        bytes: MOVEFLOORHOVER_STATIC_BYTES
    },
    {
        name: 'TriggerDoor',
        kind: 'static',
        bug: 'constructTriggerDoorAI writes the switchID twice when the template lacks the CIDList block',
        source: 'Madori/Cave/Cave035/Cave035_F05/ActorPlacementInfo/AP_Cave035_F05_P_Objects.json#8',
        creatureId: 'TriggerDoor',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647418,
        bytes: TRIGGERDOOR_STATIC_BYTES
    },
    {
        name: 'InvisibleWallForWarpCarry',
        kind: 'static',
        bug: 'constructWarpAI writes an empty FString into an actor that has no AI.Static at all',
        source: 'Madori/Cave/Cave013/Cave013_F02/ActorPlacementInfo/AP_Cave013_F02_P_Objects.json#57',
        creatureId: 'InvisibleWallForWarpCarry',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        bytes: INVISIBLEWALLFORWARPCARRY_STATIC_BYTES
    },
    {
        name: 'VarGateSoftNoPillar',
        kind: 'dynamic',
        bug: 'constructGateAI_Dynamic hard-codes the trailing int to 0',
        source: 'Madori/Cave/Cave015/Cave015_F00/ActorPlacementInfo/AP_Cave015_F00_P_Objects.json#3',
        creatureId: 'VarGateSoftNoPillar',
        infoType: InfoType.WorkObject,
        generatorVersion: 8626647386,
        bytes: VARGATESOFTNOPILLAR_DYNAMIC_BYTES
    },
    {
        name: 'WaterBox',
        kind: 'ActorParameter',
        bug: 'constructWaterBoxActorParam derives the radar folder from the texture name, which is wrong for Hero ChangeDist textures',
        source: 'Main/Area/Area003/ActorPlacementInfo/AP_Area003_P_Hero_Objects.json#3',
        creatureId: 'WaterBox',
        infoType: InfoType.Gimmick,
        generatorVersion: 8626647386,
        bytes: WATERBOX_ACTORPARAMETER_BYTES
    },
    {
        name: 'SplineDokuNameko',
        kind: 'ActorParameter',
        bug: 'constructSplineActorParameter writes a fixed trailer and drops the data after searchTagName',
        source: 'Madori/Cave/Cave016/Cave016_F00/ActorPlacementInfo/AP_Cave016_F00_P_Teki.json#5',
        creatureId: 'SplineDokuNameko',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        bytes: SPLINEDOKUNAMEKO_ACTORPARAMETER_BYTES
    },
    {
        name: 'OtakaraZukanPortal',
        kind: 'PortalTrigger',
        bug: 'constructPortalTrigger writes None demo params as /Game/.../None.None and hard-codes the unmapped bool to 1',
        source: 'Ending/Ending_Area500/ActorPlacementInfo/AP_Ending_Area500_P_Objects.json#0',
        creatureId: 'OtakaraZukanPortal',
        infoType: InfoType.Portal,
        generatorVersion: 8626647386,
        bytes: OTAKARAZUKANPORTAL_PORTALTRIGGER_BYTES,
        translation: {
            X: 611.4682006835938,
            Y: -1437.66748046875,
            Z: 250.0751190185547
        }
    },
    {
        name: 'PopPlaceActor',
        kind: 'PopPlace',
        bug: 'the float at byte 9 is skipped on read and written back as 0',
        source: 'Madori/Ddb/DDB_AI003/ActorPlacementInfo/AP_DDB_AI003_P_LVS_Objects.json#36',
        creatureId: 'PopPlaceActor',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        bytes: POPPLACEACTOR_POPPLACE_BYTES
    }
];
