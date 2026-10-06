// AUTO-GENERATED from pristine AP_*.json actor placement files (P4 archive/Carrot4/Maps).
// Byte arrays are real ActorSerializeParameter data; every comment labels the bytes that follow it.
// AI.Static labels come from the ai-static layouts (reference parser that parses all 7,640 shipped samples).
import { InfoType } from '../../../src/api/types';

export const tekiReadingFixtures = [
    {
        name: 'AmeBozu',
        description: 'AmeBozu read by parseTekiAI',
        source: 'Madori/Cave/Cave014/Cave014_F00/ActorPlacementInfo/AP_Cave014_F00_P_Teki.json#2',
        creatureId: 'AmeBozu',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + parseAmeBozuAI',
        bytes: [
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
        ],
        expected: {
            parsed: [],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: -35,
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
                bEnableFreezeBothDrop: 0,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 300,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                bAppearSearch: 0,
                searchTagName: 'AmeBozuRootPoint',
                hideTimeMin: 300,
                hideTimeMax: 300,
                bAppearFixedLocation: 0,
                appearSearchRadius: 300,
                walkType: 'Search',
                canAttackLevelFaceMessageName: 'Teki_Announce_AmeBozu_01'
            },
            inventoryEnd: 163
        }
    },
    {
        name: 'Amembo',
        description: 'Amembo read by parseTekiAI',
        source: 'Madori/Cave/Cave021/Cave021_F00/ActorPlacementInfo/AP_Cave021_F00_P_Teki.json#1',
        creatureId: 'Amembo',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + ',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 120
            0, 0, 240, 66,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 90, 375)
            0, 0, 0, 0, 0, 0, 180, 66, 0, 128, 187, 67,
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
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 500
            0, 0, 250, 67,
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
            // AmemboAIParameter.BulletParam.Altitude: 18
            0, 0, 144, 65,
            // AmemboAIParameter.BulletParam.CustomGravityRate: 0.85
            154, 153, 89, 63,
            // AmemboAIParameter.SearchEnemyRadius: 300
            0, 0, 150, 67,
            // AmemboAIParameter.EscapeRadius: 100
            0, 0, 200, 66,
            // AmemboAIParameter.DrinkableRadius: 200
            0, 0, 72, 67,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 120
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 90,
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
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 500,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: []
            },
            inventoryEnd: 159
        }
    },
    {
        name: 'Baby',
        description: 'Baby read by parseTekiAI',
        source: 'Madori/Cave/Cave000/Cave000_F00/ActorPlacementInfo/AP_Cave000_F00_P_Teki.json#1',
        creatureId: 'Baby',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + parseBabyAI',
        bytes: [
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
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "B_j000"
            7, 0, 0, 0, 66, 95, 106, 48, 48, 48, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 5, 350)
            0, 0, 0, 0, 0, 0, 160, 64, 0, 0, 175, 67,
            // TekiAIParameter.DropParameter.DropActorParameter.RandVel: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.DropOption: 1
            1, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 400
            0, 0, 200, 67,
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
            // BabyAIParameter.bPatrolType: true
            1, 0, 0, 0,
            // BabyAIParameter.SearchTagName: "BabyRoutePoint"
            15, 0, 0, 0, 66, 97, 98, 121, 82, 111, 117, 116, 101, 80, 111, 105,
            110, 116, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                },
                boneName: 'B_j000',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 5,
                    Z: 350
                },
                randVel: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                dropOption: 1,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 400,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                bPatrolType: 1,
                searchTagName: 'BabyRoutePoint'
            },
            inventoryEnd: 161
        }
    },
    {
        name: 'BigChappy',
        description: 'BigChappy read by parseTekiAI',
        source: 'Madori/Cave/Cave016/Cave016_F01/ActorPlacementInfo/AP_Cave016_F01_P_Teki.json#7',
        creatureId: 'BigChappy',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + parseBigChappyAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (285, 350, 0)
            0, 128, 142, 67, 0, 0, 175, 67, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 350
            0, 0, 175, 67,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 2
            2, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4616190721861353549
            77, 0, 0, 0, 1, 1, 16, 64,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Otakara/GOtaPaintsRED.GOtaPaintsRED_C"
            71, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 79, 116, 97, 107, 97, 114, 97, 47, 71, 79, 116,
            97, 80, 97, 105, 110, 116, 115, 82, 69, 68, 46, 71, 79, 116, 97, 80,
            97, 105, 110, 116, 115, 82, 69, 68, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[1] ----
            // UniqueId: 4616190721861353550
            78, 0, 0, 0, 1, 1, 16, 64,
            // MinNum: 10
            10, 0, 0, 0,
            // MaxNum: 10
            10, 0, 0, 0,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 170, 375)
            0, 0, 0, 0, 0, 0, 42, 67, 0, 128, 187, 67,
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
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 2
            2, 0, 0, 0,
            // DebugUniqueId: 4616190721861353549
            77, 0, 0, 0, 1, 1, 16, 64,
            // DebugUniqueId: 4616190721861353550
            78, 0, 0, 0, 1, 1, 16, 64,
            // TekiAIParameter.DropParameter.bEnableFreezeBothDrop: true
            1, 0, 0, 0,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 650
            0, 128, 34, 68,
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
            // BigChappyAIParameter.bHideEnter: true
            1, 0, 0, 0,
            // BigChappyAIParameter.HideOffset: (0, -15, 0)
            0, 0, 0, 0, 0, 0, 112, 193, 0, 0, 0, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '4616190721861353549',
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaPaintsRED.GOtaPaintsRED_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                },
                {
                    id: '4616190721861353550',
                    minDrops: 10,
                    maxDrops: 10,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    dropCondition: 6,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                territory: {
                    X: 285,
                    Y: 350,
                    Z: 0,
                    halfHeight: 50,
                    radius: 350
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 170,
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
                bEnableFreezeBothDrop: 1,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 650,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                bHideEnter: 1,
                hideOffset: {
                    X: 0,
                    Y: -15,
                    Z: 0
                }
            },
            inventoryEnd: 450
        }
    },
    {
        name: 'BigUjinko',
        description: 'BigUjinko read by parseTekiAI',
        source: 'Madori/Cave/Cave035/Cave035_F08/ActorPlacementInfo/AP_Cave035_F08_P_Teki.json#1',
        creatureId: 'BigUjinko',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + parseBigUjinkoAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 200
            0, 0, 72, 67,
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
            // TekiAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 0
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
            // UjinkoBaseAIParameter.bNoBurrowType: true
            1, 0, 0, 0,
            // BigUjinkoAIParameter.bPatrolType: true
            1, 0, 0, 0,
            // BigUjinkoAIParameter.SearchTagName: "BigUjinkoRootPoint"
            19, 0, 0, 0, 66, 105, 103, 85, 106, 105, 110, 107, 111, 82, 111, 111,
            116, 80, 111, 105, 110, 116, 0,
            // TekiAIParameter.SearchAreaCaution.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaCaution.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaCaution.Radius: 300
            0, 0, 150, 67,
            // TekiAIParameter.SearchAreaCaution.Angle: 180
            0, 0, 52, 67,
            // TekiAIParameter.SearchAreaCaution.SphereRadius: 30
            0, 0, 240, 65,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 200
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 120,
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
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 600,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                bNoBurrowType: 1,
                bPatrolType: 1,
                searchAreaTag: 'BigUjinkoRootPoint'
            },
            inventoryEnd: 159
        }
    },
    {
        name: 'DamagumoCannon',
        description: 'DamagumoCannon read by parseTekiAI',
        source: 'Madori/Cave/Cave016/Cave016_F08/ActorPlacementInfo/AP_Cave016_F08_P_Teki.json#1',
        creatureId: 'DamagumoCannon',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + parseDamagumoCannonAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 153)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 67,
            // TekiAIParameter.Territory.HalfHeight: 300
            0, 0, 150, 67,
            // TekiAIParameter.Territory.Radius: 350
            0, 0, 175, 67,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 3
            3, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4616198418442747978
            74, 0, 0, 0, 1, 8, 16, 64,
            // MinNum: 2
            2, 0, 0, 0,
            // MaxNum: 2
            2, 0, 0, 0,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Otakara/GOtaFruitsPickYEL.GOtaFruitsPickYEL_C"
            79, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 79, 116, 97, 107, 97, 114, 97, 47, 71, 79, 116,
            97, 70, 114, 117, 105, 116, 115, 80, 105, 99, 107, 89, 69, 76, 46, 71,
            79, 116, 97, 70, 114, 117, 105, 116, 115, 80, 105, 99, 107, 89, 69, 76,
            95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[1] ----
            // UniqueId: 4616198418442747979
            75, 0, 0, 0, 1, 8, 16, 64,
            // MinNum: 3
            3, 0, 0, 0,
            // MaxNum: 3
            3, 0, 0, 0,
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
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[2] ----
            // UniqueId: 4616198418442747980
            76, 0, 0, 0, 1, 8, 16, 64,
            // MinNum: 2
            2, 0, 0, 0,
            // MaxNum: 2
            2, 0, 0, 0,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Otakara/GOtaFruitsPickORN.GOtaFruitsPickORN_C"
            79, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 79, 116, 97, 107, 97, 114, 97, 47, 71, 79, 116,
            97, 70, 114, 117, 105, 116, 115, 80, 105, 99, 107, 79, 82, 78, 46, 71,
            79, 116, 97, 70, 114, 117, 105, 116, 115, 80, 105, 99, 107, 79, 82, 78,
            95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "B_j000"
            7, 0, 0, 0, 66, 95, 106, 48, 48, 48, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (70, 70, 300)
            0, 0, 140, 66, 0, 0, 140, 66, 0, 0, 150, 67,
            // TekiAIParameter.DropParameter.DropActorParameter.RandVel: (10, 10, 10)
            0, 0, 32, 65, 0, 0, 32, 65, 0, 0, 32, 65,
            // TekiAIParameter.DropParameter.DropActorParameter.DropOption: 6
            6, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 3
            3, 0, 0, 0,
            // DebugUniqueId: 4616198418442747978
            74, 0, 0, 0, 1, 8, 16, 64,
            // DebugUniqueId: 4616198418442747979
            75, 0, 0, 0, 1, 8, 16, 64,
            // DebugUniqueId: 4616198418442747980
            76, 0, 0, 0, 1, 8, 16, 64,
            // TekiAIParameter.DropParameter.bEnableFreezeBothDrop: true
            1, 0, 0, 0,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 1200
            0, 0, 150, 68,
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
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 1
            1, 0, 0, 0,
            // OptionalPointOffset: (0, 60, -25)
            0, 0, 0, 0, 0, 0, 112, 66, 0, 0, 200, 193,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // DamagumoBaseAIParameter.SearchTagName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // DamagumoBaseAIParameter.bStraddle: false
            0, 0, 0, 0,
            // DamagumoCannonAIParameter.bAlreadyAppear: false
            0, 0, 0, 0,
            // TekiAIParameter.SearchAreaGoToHome.Center: (0, 0, 153)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 67,
            // TekiAIParameter.SearchAreaGoToHome.HalfHeight: 300
            0, 0, 150, 67,
            // TekiAIParameter.SearchAreaGoToHome.Radius: 500
            0, 0, 250, 67,
            // TekiAIParameter.SearchAreaGoToHome.Angle: 180
            0, 0, 52, 67,
            // TekiAIParameter.SearchAreaGoToHome.SphereRadius: 40
            0, 0, 32, 66,
            // TekiAIParameter.SearchAreaCaution.Center: (0, 0, -120)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 194,
            // TekiAIParameter.SearchAreaCaution.HalfHeight: 150
            0, 0, 22, 67,
            // TekiAIParameter.SearchAreaCaution.Radius: 1000
            0, 0, 122, 68,
            // TekiAIParameter.SearchAreaCaution.Angle: 180
            0, 0, 52, 67,
            // TekiAIParameter.SearchAreaCaution.SphereRadius: 40
            0, 0, 32, 66,
            // TekiAIParameter.SearchAreaRest.Center: (0, 0, -75)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 150, 194,
            // TekiAIParameter.SearchAreaRest.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaRest.Radius: 60
            0, 0, 112, 66,
            // TekiAIParameter.SearchAreaRest.Angle: 180
            0, 0, 52, 67,
            // TekiAIParameter.SearchAreaRest.SphereRadius: 30
            0, 0, 240, 65,
        ],
        expected: {
            parsed: [
                {
                    id: '4616198418442747978',
                    minDrops: 2,
                    maxDrops: 2,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaFruitsPickYEL.GOtaFruitsPickYEL_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                },
                {
                    id: '4616198418442747979',
                    minDrops: 3,
                    maxDrops: 3,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    dropCondition: 6,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Items/GBomb.GBomb_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                },
                {
                    id: '4616198418442747980',
                    minDrops: 2,
                    maxDrops: 2,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaFruitsPickORN.GOtaFruitsPickORN_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 153,
                    halfHeight: 300,
                    radius: 350
                },
                boneName: 'B_j000',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 70,
                    Y: 70,
                    Z: 300
                },
                randVel: {
                    X: 10,
                    Y: 10,
                    Z: 10
                },
                dropOption: 6,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableFreezeBothDrop: 1,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 1200,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 1,
                optionalPointOffsets: [
                    {
                        X: 0,
                        Y: 60,
                        Z: -25
                    }
                ],
                optionalPointPriorityInfo: [],
                searchTagName: 'None',
                bStraddle: 0,
                bAlreadyAppear: 0,
                searchAreaGoToHome: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 153
                    },
                    halfHeight: 300,
                    radius: 500,
                    angle: 180,
                    sphereRadius: 40
                },
                searchAreaCaution: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: -120
                    },
                    halfHeight: 150,
                    radius: 1000,
                    angle: 180,
                    sphereRadius: 40
                },
                searchAreaRest: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: -75
                    },
                    halfHeight: 50,
                    radius: 60,
                    angle: 180,
                    sphereRadius: 30
                }
            },
            inventoryEnd: 602
        }
    },
    {
        name: 'DodoroEgg',
        description: 'DodoroEgg read by parseTekiAI',
        source: 'Main/Area/Area006/ActorPlacementInfo/AP_Area006_P_Teki_Night.json#0',
        creatureId: 'DodoroEgg',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + parseDodoroEggAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 100
            0, 0, 200, 66,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 1
            1, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 1154610367352013939
            115, 4, 0, 0, 3, 0, 6, 16,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Wasurena/GHikariStation.GHikariStation_C"
            74, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 87, 97, 115, 117, 114, 101, 110, 97, 47, 71, 72,
            105, 107, 97, 114, 105, 83, 116, 97, 116, 105, 111, 110, 46, 71, 72, 105,
            107, 97, 114, 105, 83, 116, 97, 116, 105, 111, 110, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 2
            2, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "S_j000"
            7, 0, 0, 0, 83, 95, 106, 48, 48, 48, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
            // DebugUniqueId: 1154610367352013939
            115, 4, 0, 0, 3, 0, 6, 16,
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
            // DodoroEggAIParameter.SplineRoutePathTag: "DodoroRoutePoint001"
            20, 0, 0, 0, 68, 111, 100, 111, 114, 111, 82, 111, 117, 116, 101, 80,
            111, 105, 110, 116, 48, 48, 49, 0,
            // DodoroEggAIParameter.SpawnTimer: 96
            0, 0, 192, 66,
            // DodoroEggAIParameter.bUseParentDropInfo: false
            0, 0, 0, 0,
            // DodoroEggAIParameter.bOnceDodoroAppearDemo: false
            0, 0, 0, 0,
            // DodoroEggAIParameter.SpawnTimerAfterDemo: 60
            0, 0, 112, 66,
            // DodoroEggAIParameter.SubSplineRoutePathTag: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // DodoroEggAIParameter.RefObstacleGenID: -1
            255, 255, 255, 255,
        ],
        expected: {
            parsed: [
                {
                    id: '1154610367352013939',
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/Objects/Wasurena/GHikariStation.GHikariStation_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 2,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                },
                boneName: 'S_j000',
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
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 100,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                splineRoutePathTag: 'DodoroRoutePoint001',
                spawnTimer: 96,
                bUseParentDropInfo: 0,
                bOnceDodoroAppearDemo: 0,
                spawnTimerAfterDemo: 60,
                subSplineRoutePathTag: 'None',
                refObstacleGenID: -1
            },
            inventoryEnd: 294
        }
    },
    {
        name: 'Futakuchi',
        description: 'Futakuchi read by parseTekiAI',
        source: 'Madori/Cave/Cave016/Cave016_F13/ActorPlacementInfo/AP_Cave016_F13_P_Teki.json#1',
        creatureId: 'Futakuchi',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + parseFutakuchiAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 100
            0, 0, 200, 66,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 130, 375)
            0, 0, 0, 0, 0, 0, 2, 67, 0, 128, 187, 67,
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
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 450
            0, 0, 225, 67,
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
            // FutakuchiAIParameter.RockMode: 1
            1,
            // FutakuchiAIParameter.SearchTagName: "FutakuchiRock"
            14, 0, 0, 0, 70, 117, 116, 97, 107, 117, 99, 104, 105, 82, 111, 99,
            107, 0,
            // FutakuchiAIParameter.SplineSearchArea.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // FutakuchiAIParameter.SplineSearchArea.HalfHeight: 50
            0, 0, 72, 66,
            // FutakuchiAIParameter.SplineSearchArea.Radius: 950
            0, 128, 109, 68,
            // FutakuchiAIParameter.SplineSearchArea.Angle: 90
            0, 0, 180, 66,
            // FutakuchiAIParameter.SplineSearchArea.SphereRadius: 30
            0, 0, 240, 65,
            // FutakuchiAIParameter.SearchAreaAttack.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // FutakuchiAIParameter.SearchAreaAttack.HalfHeight: 100
            0, 0, 200, 66,
            // FutakuchiAIParameter.SearchAreaAttack.Radius: 700
            0, 0, 47, 68,
            // FutakuchiAIParameter.SearchAreaAttack.Angle: 6
            0, 0, 192, 64,
            // FutakuchiAIParameter.bFixCautionAreaCenter: false
            0, 0, 0, 0,
            // FutakuchiAIParameter.bDissapearVisibleOff: false
            0, 0, 0, 0,
            // TekiAIParameter.SearchAreaCaution.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaCaution.HalfHeight: 100
            0, 0, 200, 66,
            // TekiAIParameter.SearchAreaCaution.Radius: 220
            0, 0, 92, 67,
            // TekiAIParameter.SearchAreaCaution.Angle: 180
            0, 0, 52, 67,
            // TekiAIParameter.SearchAreaCaution.SphereRadius: 0
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 100,
                    radius: 250
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 130,
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
                bEnableFreezeBothDrop: 0,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 450,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                rockMode: 'ERockMode::Spline',
                searchTagName: 'FutakuchiRock',
                splineSearchArea: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 950,
                    angle: 90,
                    sphereRadius: 30
                },
                searchAreaAttack: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 100,
                    radius: 700,
                    angle: 6
                },
                bFixCautionAreaCenter: 0,
                bDisappearVisibleOff: 0,
                searchAreaCaution: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 100,
                    radius: 220,
                    angle: 180,
                    sphereRadius: 0
                }
            },
            inventoryEnd: 163
        }
    },
    {
        name: 'FutakuchiAdult',
        description: 'FutakuchiAdult read by parseTekiAI',
        source: 'Madori/Cave/Cave016/Cave016_F13/ActorPlacementInfo/AP_Cave016_F13_P_Teki.json#0',
        creatureId: 'FutakuchiAdult',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + parseFutakuchiAdultAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 100
            0, 0, 200, 66,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 2
            2, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4616203916000886842
            58, 0, 0, 0, 1, 13, 16, 64,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Otakara/GOtaEggplant.GOtaEggplant_C"
            69, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 79, 116, 97, 107, 97, 114, 97, 47, 71, 79, 116,
            97, 69, 103, 103, 112, 108, 97, 110, 116, 46, 71, 79, 116, 97, 69, 103,
            103, 112, 108, 97, 110, 116, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[1] ----
            // UniqueId: 4616203916000886843
            59, 0, 0, 0, 1, 13, 16, 64,
            // MinNum: 20
            20, 0, 0, 0,
            // MaxNum: 20
            20, 0, 0, 0,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 170, 375)
            0, 0, 0, 0, 0, 0, 42, 67, 0, 128, 187, 67,
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
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 2
            2, 0, 0, 0,
            // DebugUniqueId: 4616203916000886842
            58, 0, 0, 0, 1, 13, 16, 64,
            // DebugUniqueId: 4616203916000886843
            59, 0, 0, 0, 1, 13, 16, 64,
            // TekiAIParameter.DropParameter.bEnableFreezeBothDrop: true
            1, 0, 0, 0,
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
            // FutakuchiAdultAIParameter.AttackArea.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // FutakuchiAdultAIParameter.AttackArea.HalfHeight: 70
            0, 0, 140, 66,
            // FutakuchiAdultAIParameter.AttackArea.Radius: 1200
            0, 0, 150, 68,
            // FutakuchiAdultAIParameter.AttackArea.Angle: 5
            0, 0, 160, 64,
            // FutakuchiAdultAIParameter.AttackArea.SphereRadius: 30
            0, 0, 240, 65,
            // FutakuchiAdultAIParameter.bSplineType: false
            0, 0, 0, 0,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackLoopWaitSecMin: 1
            0, 0, 128, 63,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackLoopWaitSecMax: 3
            0, 0, 64, 64,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackSignSecMin: 1
            0, 0, 128, 63,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackSignSecMax: 3
            0, 0, 64, 64,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackInterval: 1.5
            0, 0, 192, 63,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackIntervalSuccess: 1.5
            0, 0, 192, 63,
            // FutakuchiAdultAIParameter.SplineParam.SearchTagName: "FutakuchiAdultRock"
            19, 0, 0, 0, 70, 117, 116, 97, 107, 117, 99, 104, 105, 65, 100, 117,
            108, 116, 82, 111, 99, 107, 0,
            // FutakuchiAdultAIParameter.AttackParam.AttackLoopWaitSecMin: 1
            0, 0, 128, 63,
            // FutakuchiAdultAIParameter.AttackParam.AttackLoopWaitSecMax: 1
            0, 0, 128, 63,
            // FutakuchiAdultAIParameter.AttackParam.AttackSignSecMin: 1
            0, 0, 128, 63,
            // FutakuchiAdultAIParameter.AttackParam.AttackSignSecMax: 3
            0, 0, 64, 64,
            // FutakuchiAdultAIParameter.AttackParam.AttackInterval: 0.5
            0, 0, 0, 63,
            // FutakuchiAdultAIParameter.AttackParam.AttackIntervalSuccess: 1.5
            0, 0, 192, 63,
            // FutakuchiAdultAIParameter.bCreateIcicle: true
            1, 0, 0, 0,
            // FutakuchiAdultAIParameter.EscapeSecMin: 5
            0, 0, 160, 64,
            // FutakuchiAdultAIParameter.EscapeSecMax: 5
            0, 0, 160, 64,
            // FutakuchiAdultAIParameter.VacuumHalfHeight: 20
            0, 0, 160, 65,
            // TekiAIParameter.SearchAreaCaution.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaCaution.HalfHeight: 70
            0, 0, 140, 66,
            // TekiAIParameter.SearchAreaCaution.Radius: 1200
            0, 0, 150, 68,
            // TekiAIParameter.SearchAreaCaution.Angle: 5
            0, 0, 160, 64,
            // TekiAIParameter.SearchAreaCaution.SphereRadius: 700
            0, 0, 47, 68,
            // TekiAIParameter.AIWanderParameter.RatioWaitToWander: 0
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '4616203916000886842',
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaEggplant.GOtaEggplant_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                },
                {
                    id: '4616203916000886843',
                    minDrops: 20,
                    maxDrops: 20,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    dropCondition: 6,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 170,
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
                bEnableFreezeBothDrop: 1,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 600,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                attackArea: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 70,
                    radius: 1200,
                    angle: 5,
                    sphereRadius: 30
                },
                bSplineType: 0,
                splineAttackParam: {
                    attackLoopWaitSecMin: 1,
                    attackLoopWaitSecMax: 3,
                    attackSignSecMin: 1,
                    attackSignSecMax: 3,
                    attackInterval: 1.5,
                    attackIntervalSuccess: 1.5
                },
                searchTagName: 'FutakuchiAdultRock',
                attackParam: {
                    attackLoopWaitSecMin: 1,
                    attackLoopWaitSecMax: 1,
                    attackSignSecMin: 1,
                    attackSignSecMax: 3,
                    attackInterval: 0.5,
                    attackIntervalSuccess: 1.5
                },
                bCreateIcicle: 1,
                escapeSecMin: 5,
                escapeSecMax: 5,
                ratioWaitToWander: 0,
                searchAreaCaution: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 70,
                    radius: 1200,
                    angle: 5,
                    sphereRadius: 700
                },
                vacuumHalfHeight: 20
            },
            inventoryEnd: 448
        }
    },
    {
        name: 'HageDamagumo',
        description: 'HageDamagumo read by parseTekiAI',
        source: 'Madori/Cave/Cave016/Cave016_F14/ActorPlacementInfo/AP_Cave016_F14_P_Teki.json#2',
        creatureId: 'HageDamagumo',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + parseHageDamagumoAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 153)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 67,
            // TekiAIParameter.Territory.HalfHeight: 300
            0, 0, 150, 67,
            // TekiAIParameter.Territory.Radius: 250
            0, 0, 122, 67,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 2
            2, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4616205015512514661
            101, 0, 0, 0, 1, 14, 16, 64,
            // MinNum: 10
            10, 0, 0, 0,
            // MaxNum: 10
            10, 0, 0, 0,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Otakara/GOtaButtonMetal.GOtaButtonMetal_C"
            75, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 79, 116, 97, 107, 97, 114, 97, 47, 71, 79, 116,
            97, 66, 117, 116, 116, 111, 110, 77, 101, 116, 97, 108, 46, 71, 79, 116,
            97, 66, 117, 116, 116, 111, 110, 77, 101, 116, 97, 108, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[1] ----
            // UniqueId: 4616205015512514662
            102, 0, 0, 0, 1, 14, 16, 64,
            // MinNum: 20
            20, 0, 0, 0,
            // MaxNum: 20
            20, 0, 0, 0,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "B_j000"
            7, 0, 0, 0, 66, 95, 106, 48, 48, 48, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (20, 0, 0)
            0, 0, 160, 65, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (100, 0, 0)
            0, 0, 200, 66, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.RandVel: (100, 0, -10)
            0, 0, 200, 66, 0, 0, 0, 0, 0, 0, 32, 193,
            // TekiAIParameter.DropParameter.DropActorParameter.DropOption: 4
            4, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 2
            2, 0, 0, 0,
            // DebugUniqueId: 4616205015512514661
            101, 0, 0, 0, 1, 14, 16, 64,
            // DebugUniqueId: 4616205015512514662
            102, 0, 0, 0, 1, 14, 16, 64,
            // TekiAIParameter.DropParameter.bEnableFreezeBothDrop: true
            1, 0, 0, 0,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 700
            0, 0, 47, 68,
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
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 1
            1, 0, 0, 0,
            // OptionalPointOffset: (-90, 0, -140)
            0, 0, 180, 194, 0, 0, 0, 0, 0, 0, 12, 195,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // DamagumoBaseAIParameter.SearchTagName: "HageDamagumoRootPoint"
            22, 0, 0, 0, 72, 97, 103, 101, 68, 97, 109, 97, 103, 117, 109, 111,
            82, 111, 111, 116, 80, 111, 105, 110, 116, 0,
            // DamagumoBaseAIParameter.bStraddle: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaRest.Center: (0, 0, 153)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 67,
            // TekiAIParameter.SearchAreaRest.HalfHeight: 300
            0, 0, 150, 67,
            // TekiAIParameter.SearchAreaRest.Radius: 600
            0, 0, 22, 68,
            // TekiAIParameter.SearchAreaRest.Angle: 180
            0, 0, 52, 67,
            // TekiAIParameter.SearchAreaRest.SphereRadius: 100
            0, 0, 200, 66,
            // HageDamagumoAIParameter.bSplineWalkStart: true
            1, 0, 0, 0,
            // HageDamagumoAIParameter.bUseUniqueLife: true
            1, 0, 0, 0,
            // HageDamagumoAIParameter.UniqueLife: 5500
            0, 224, 171, 69,
            // HageDamagumoAIParameter.bAlreadyAppear: true
            1, 0, 0, 0,
            // DamagumoBaseAIParameter.FightCameraParameter.CameraChangeDistanceXY: 600
            0, 0, 22, 68,
        ],
        expected: {
            parsed: [
                {
                    id: '4616205015512514661',
                    minDrops: 10,
                    maxDrops: 10,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaButtonMetal.GOtaButtonMetal_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 269,
                    bSetTerritory: 0
                },
                {
                    id: '4616205015512514662',
                    minDrops: 20,
                    maxDrops: 20,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    dropCondition: 6,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 153,
                    halfHeight: 300,
                    radius: 250
                },
                boneName: 'B_j000',
                localOffset: {
                    X: 20,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 100,
                    Y: 0,
                    Z: 0
                },
                randVel: {
                    X: 100,
                    Y: 0,
                    Z: -10
                },
                dropOption: 4,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableFreezeBothDrop: 1,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 700,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 1,
                optionalPointOffsets: [
                    {
                        X: -90,
                        Y: 0,
                        Z: -140
                    }
                ],
                optionalPointPriorityInfo: [],
                searchTagName: 'HageDamagumoRootPoint',
                bStraddle: 1,
                searchAreaRest: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 153
                    },
                    halfHeight: 300,
                    radius: 600,
                    angle: 180,
                    sphereRadius: 100
                },
                bSplineWalkStart: 1,
                bUniqueLife: 1,
                uniqueLife: 5500,
                bAlreadyAppear: 1,
                fightCameraChangeDistanceXY: 600
            },
            inventoryEnd: 468
        }
    },
    {
        name: 'KumaChappy',
        description: 'KumaChappy read by parseTekiAI',
        source: 'Madori/Cave/Cave010/Cave010_F04/ActorPlacementInfo/AP_Cave010_F04_P_Teki.json#1',
        creatureId: 'KumaChappy',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + parseKumaChappyAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 40)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 66,
            // TekiAIParameter.Territory.HalfHeight: 60
            0, 0, 112, 66,
            // TekiAIParameter.Territory.Radius: 300
            0, 0, 150, 67,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 2
            2, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4614505170535973056
            192, 0, 0, 0, 1, 4, 10, 64,
            // MinNum: 3
            3, 0, 0, 0,
            // MaxNum: 3
            3, 0, 0, 0,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Otakara/GOtaDice6WHT.GOtaDice6WHT_C"
            69, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 79, 116, 97, 107, 97, 114, 97, 47, 71, 79, 116,
            97, 68, 105, 99, 101, 54, 87, 72, 84, 46, 71, 79, 116, 97, 68, 105,
            99, 101, 54, 87, 72, 84, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[1] ----
            // UniqueId: 4614505170535973057
            193, 0, 0, 0, 1, 4, 10, 64,
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
            // DropCond: 6
            6,
            // DropCondInt: 0
            0, 0, 0, 0,
            // DropCondName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // DropCondDemo: 0
            0,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 170, 375)
            0, 0, 0, 0, 0, 0, 42, 67, 0, 128, 187, 67,
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
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 2
            2, 0, 0, 0,
            // DebugUniqueId: 4614505170535973056
            192, 0, 0, 0, 1, 4, 10, 64,
            // DebugUniqueId: 4614505170535973057
            193, 0, 0, 0, 1, 4, 10, 64,
            // TekiAIParameter.DropParameter.bEnableFreezeBothDrop: true
            1, 0, 0, 0,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 500
            0, 0, 250, 67,
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
            // KumaChappyAIParameter.SearchTagName: "KumaChappyRootPoint"
            20, 0, 0, 0, 75, 117, 109, 97, 67, 104, 97, 112, 112, 121, 82, 111,
            111, 116, 80, 111, 105, 110, 116, 0,
            // KumaChappyAIParameter.GiveupDistance: 400
            0, 0, 200, 67,
        ],
        expected: {
            parsed: [
                {
                    id: '4614505170535973056',
                    minDrops: 3,
                    maxDrops: 3,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaDice6WHT.GOtaDice6WHT_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                },
                {
                    id: '4614505170535973057',
                    minDrops: 5,
                    maxDrops: 5,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    dropCondition: 6,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 40,
                    halfHeight: 60,
                    radius: 300
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 170,
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
                bEnableFreezeBothDrop: 1,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 500,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                searchTagName: 'KumaChappyRootPoint',
                giveUpDistance: 400
            },
            inventoryEnd: 448
        }
    },
    {
        name: 'Kurage',
        description: 'Kurage read by parseTekiAI',
        source: 'Madori/Cave/Cave011/Cave011_F00/ActorPlacementInfo/AP_Cave011_F00_P_Teki.json#0',
        creatureId: 'Kurage',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + parseKurageAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 175
            0, 0, 47, 67,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 1
            1, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4614782247466172442
            26, 0, 0, 0, 1, 0, 11, 64,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "C_j000"
            7, 0, 0, 0, 67, 95, 106, 48, 48, 48, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 100, 450)
            0, 0, 0, 0, 0, 0, 200, 66, 0, 0, 225, 67,
            // TekiAIParameter.DropParameter.DropActorParameter.RandVel: (50, 50, 0)
            0, 0, 72, 66, 0, 0, 72, 66, 0, 0, 0, 0,
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
            // DebugUniqueId: 4614782247466172442
            26, 0, 0, 0, 1, 0, 11, 64,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 700
            0, 0, 47, 68,
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
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 1
            1, 0, 0, 0,
            // OptionalPointOffset: (0, 0, -30)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 193,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // KurageAIParameter.EatOnBirthRange: 50
            0, 0, 72, 66,
            // KurageAIParameter.bFallStart: false
            0, 0, 0, 0,
            // TekiAIParameter.SearchAreaRest.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaRest.HalfHeight: 100
            0, 0, 200, 66,
            // TekiAIParameter.SearchAreaRest.Radius: 100
            0, 0, 200, 66,
            // TekiAIParameter.SearchAreaRest.Angle: 180
            0, 0, 52, 67,
            // TekiAIParameter.SearchAreaRest.SphereRadius: 30
            0, 0, 240, 65,
            // OwnerSubComponentFlag: true
            1, 0, 0, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '4614782247466172442',
                    minDrops: 1,
                    maxDrops: 1,
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
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 175
                },
                boneName: 'C_j000',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 100,
                    Z: 450
                },
                randVel: {
                    X: 50,
                    Y: 50,
                    Z: 0
                },
                dropOption: 0,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 700,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 1,
                optionalPointOffsets: [
                    {
                        X: 0,
                        Y: 0,
                        Z: -30
                    }
                ],
                optionalPointPriorityInfo: [],
                eatOnBirthRange: 50,
                bFallStart: 0,
                searchAreaRest: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 100,
                    radius: 100,
                    angle: 180,
                    sphereRadius: 30
                },
                ownerSubComponentFlag: 1
            },
            inventoryEnd: 300
        }
    },
    {
        name: 'OoPanModoki',
        description: 'OoPanModoki read by parseTekiAI',
        source: 'Madori/Cave/Cave023/Cave023_F04/ActorPlacementInfo/AP_Cave023_F04_P_Teki.json#0',
        creatureId: 'OoPanModoki',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + parsePanModokiAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 100
            0, 0, 200, 66,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 2
            2, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4618164345233211589
            197, 0, 0, 0, 1, 4, 23, 64,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Otakara/GOtaMacaronA.GOtaMacaronA_C"
            69, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 79, 116, 97, 107, 97, 114, 97, 47, 71, 79, 116,
            97, 77, 97, 99, 97, 114, 111, 110, 65, 46, 71, 79, 116, 97, 77, 97,
            99, 97, 114, 111, 110, 65, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[1] ----
            // UniqueId: 4618164345233211590
            198, 0, 0, 0, 1, 4, 23, 64,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 150, 375)
            0, 0, 0, 0, 0, 0, 22, 67, 0, 128, 187, 67,
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
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 2
            2, 0, 0, 0,
            // DebugUniqueId: 4618164345233211589
            197, 0, 0, 0, 1, 4, 23, 64,
            // DebugUniqueId: 4618164345233211590
            198, 0, 0, 0, 1, 4, 23, 64,
            // TekiAIParameter.DropParameter.bEnableFreezeBothDrop: true
            1, 0, 0, 0,
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
            // TekiAIParameter.bEnableCullSearchEnemy: false
            0, 0, 0, 0,
            // TekiAIParameter.bUseActorLastRenderTime: false
            0, 0, 0, 0,
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // PanModokiBaseAIParameter.RouteTag: "PanModokiRoute1"
            16, 0, 0, 0, 80, 97, 110, 77, 111, 100, 111, 107, 105, 82, 111, 117,
            116, 101, 49, 0,
            // PanModokiBaseAIParameter.HideAreaTag: "PanModokiHideArea1"
            19, 0, 0, 0, 80, 97, 110, 77, 111, 100, 111, 107, 105, 72, 105, 100,
            101, 65, 114, 101, 97, 49, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '4618164345233211589',
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaMacaronA.GOtaMacaronA_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                },
                {
                    id: '4618164345233211590',
                    minDrops: 5,
                    maxDrops: 5,
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
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 150,
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
                bEnableFreezeBothDrop: 1,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 100,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 0,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                routeTag: 'PanModokiRoute1',
                hideAreaTag: 'PanModokiHideArea1'
            },
            inventoryEnd: 427
        }
    },
    {
        name: 'Queen',
        description: 'Queen read by parseTekiAI',
        source: 'Madori/Cave/Cave010/Cave010_F02/ActorPlacementInfo/AP_Cave010_F02_P_Teki.json#0',
        creatureId: 'Queen',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + parseQueenAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 120
            0, 0, 240, 66,
            // TekiAIParameter.Territory.Radius: 800
            0, 0, 72, 68,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 2
            2, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4614502971512717335
            23, 0, 0, 0, 1, 2, 10, 64,
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
            // UniqueId: 4614502971512717336
            24, 0, 0, 0, 1, 2, 10, 64,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "H_j000"
            7, 0, 0, 0, 72, 95, 106, 48, 48, 48, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, -50, 150)
            0, 0, 0, 0, 0, 0, 72, 194, 0, 0, 22, 67,
            // TekiAIParameter.DropParameter.DropActorParameter.RandVel: (5, 0, 0)
            0, 0, 160, 64, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.DropOption: 0
            0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 2
            2, 0, 0, 0,
            // DebugUniqueId: 4614502971512717335
            23, 0, 0, 0, 1, 2, 10, 64,
            // DebugUniqueId: 4614502971512717336
            24, 0, 0, 0, 1, 2, 10, 64,
            // TekiAIParameter.DropParameter.bEnableFreezeBothDrop: true
            1, 0, 0, 0,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 1000
            0, 0, 122, 68,
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
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 1
            1, 0, 0, 0,
            // OptionalPointOffset: (0, -350, -80)
            0, 0, 0, 0, 0, 0, 175, 195, 0, 0, 160, 194,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // QueenAIParameter.QueenAIType: 0
            0,
            // QueenAIParameter.RockBallHeightMin: 800
            0, 0, 72, 68,
            // QueenAIParameter.RockBallHeightMax: 1100
            0, 128, 137, 68,
            // QueenAIParameter.RockBallSpawnRadius: 150
            0, 0, 22, 67,
            // QueenAIParameter.RockBallSpawnOffsetY: 200
            0, 0, 72, 67,
            // QueenAIParameter.RockBallHeightMinInOppositeSide: 800
            0, 0, 72, 68,
            // QueenAIParameter.RockBallHeightMaxInOppositeSide: 1100
            0, 128, 137, 68,
            // QueenAIParameter.RockBallSpawnRadiusInOppositeSide: 500
            0, 0, 250, 67,
            // QueenAIParameter.FallBabyHeightMin: 500
            0, 0, 250, 67,
            // QueenAIParameter.FallBabyHeightMax: 800
            0, 0, 72, 68,
            // QueenAIParameter.FallBabySpawnRadius: 500
            0, 0, 250, 67,
            // QueenAIParameter.FallBabySpawnNum: 7
            7, 0, 0, 0,
            // QueenAIParameter.FlickDistXY: 400
            0, 0, 200, 67,
        ],
        expected: {
            parsed: [
                {
                    id: '4614502971512717335',
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Survivor/GSurvivorA.GSurvivorA_C',
                    customParameter: 'SVSleep000',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                },
                {
                    id: '4614502971512717336',
                    minDrops: 5,
                    maxDrops: 5,
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
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 120,
                    radius: 800
                },
                boneName: 'H_j000',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: -50,
                    Z: 150
                },
                randVel: {
                    X: 5,
                    Y: 0,
                    Z: 0
                },
                dropOption: 0,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bEnableFreezeBothDrop: 1,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 1000,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 1,
                optionalPointOffsets: [
                    {
                        X: 0,
                        Y: -350,
                        Z: -80
                    }
                ],
                optionalPointPriorityInfo: [],
                queenAIType: 'SleepStart',
                rockBallHeightMin: 800,
                rockBallHeightMax: 1100,
                rockBallSpawnRadius: 150,
                rockBallSpawnOffsetY: 200,
                rockBallHeightMinInOppositeSide: 800,
                rockBallHeightMaxInOppositeSide: 1100,
                rockBallSpawnRadiusInOppositeSide: 500,
                bornSpeed: 500,
                childSearchRadius: 800,
                fallBabySpawnRadius: 500,
                fallBabySpawnNum: 7,
                flickDistXY: 400
            },
            inventoryEnd: 444
        }
    },
    {
        name: 'Yamashinju',
        description: 'Yamashinju read by parseTekiAI',
        source: 'Madori/Cave/Cave014/Cave014_F01/ActorPlacementInfo/AP_Cave014_F01_P_Teki.json#12',
        creatureId: 'Yamashinju',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + parseYamashinjuAI',
        bytes: [
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
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 130, 375)
            0, 0, 0, 0, 0, 0, 2, 67, 0, 128, 187, 67,
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
            // YamashinjuAIParameter.DropPearlScale: 1
            0, 0, 128, 63,
            // YamashinjuAIParameter.SpawnPearlInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Survivor/GSurvivorA.GSurvivorA_C"
            66, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 83, 117, 114, 118, 105, 118, 111, 114, 47, 71, 83,
            117, 114, 118, 105, 118, 111, 114, 65, 46, 71, 83, 117, 114, 118, 105, 118,
            111, 114, 65, 95, 67, 0,
            // YamashinjuAIParameter.SpawnPearlInfo.CustomParameter: "SV024"
            6, 0, 0, 0, 83, 86, 48, 50, 52, 0,
            // YamashinjuAIParameter.SpawnPearlInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // YamashinjuAIParameter.SpawnPearlInfo.GameRulePermissionFlag: 0
            0, 0,
            // YamashinjuAIParameter.SpawnPearlInfo.bSetTerritory: false
            0, 0, 0, 0,
            // YamashinjuAIParameter.bNoTargetDownShell: false
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 130,
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
                bEnableFreezeBothDrop: 0,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 300,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                dropPearlScale: 1,
                dropActor: '/Game/Carrot4/Placeables/Objects/Survivor/GSurvivorA.GSurvivorA_C',
                customParameter: 'SV024'
            },
            inventoryEnd: 163
        }
    },
    {
        name: 'Patroller',
        description: 'Patroller read by parseTekiAI',
        source: 'Madori/Cave/Cave016/Cave016_F10/ActorPlacementInfo/AP_Cave016_F10_P_Teki.json#3',
        creatureId: 'Patroller',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + parseKumaChappyAI',
        bytes: [
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
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 130, 375)
            0, 0, 0, 0, 0, 0, 2, 67, 0, 128, 187, 67,
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
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 0
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
            // PatrollerAIParameter.SearchTagName: "PatrollerRootPoint001"
            22, 0, 0, 0, 80, 97, 116, 114, 111, 108, 108, 101, 114, 82, 111, 111,
            116, 80, 111, 105, 110, 116, 48, 48, 49, 0,
            // PatrollerAIParameter.GiveupDistance: 700
            0, 0, 47, 68,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 130,
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
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 300,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                searchTagName: 'PatrollerRootPoint001',
                giveUpDistance: 700
            },
            inventoryEnd: 159
        }
    },
    {
        name: 'YukiFutakuchi',
        description: 'YukiFutakuchi read by parseTekiAI',
        source: 'Madori/Cave/Cave012/Cave012_F01/ActorPlacementInfo/AP_Cave012_F01_P_Teki.json#5',
        creatureId: 'YukiFutakuchi',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + parseFutakuchiAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 100
            0, 0, 200, 66,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 130, 375)
            0, 0, 0, 0, 0, 0, 2, 67, 0, 128, 187, 67,
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
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 450
            0, 0, 225, 67,
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
            // FutakuchiAIParameter.RockMode: 0
            0,
            // FutakuchiAIParameter.SearchTagName: "FutakuchiRock"
            14, 0, 0, 0, 70, 117, 116, 97, 107, 117, 99, 104, 105, 82, 111, 99,
            107, 0,
            // FutakuchiAIParameter.SplineSearchArea.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // FutakuchiAIParameter.SplineSearchArea.HalfHeight: 50
            0, 0, 72, 66,
            // FutakuchiAIParameter.SplineSearchArea.Radius: 100
            0, 0, 200, 66,
            // FutakuchiAIParameter.SplineSearchArea.Angle: 90
            0, 0, 180, 66,
            // FutakuchiAIParameter.SplineSearchArea.SphereRadius: 30
            0, 0, 240, 65,
            // FutakuchiAIParameter.SearchAreaAttack.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // FutakuchiAIParameter.SearchAreaAttack.HalfHeight: 100
            0, 0, 200, 66,
            // FutakuchiAIParameter.SearchAreaAttack.Radius: 700
            0, 0, 47, 68,
            // FutakuchiAIParameter.SearchAreaAttack.Angle: 6
            0, 0, 192, 64,
            // FutakuchiAIParameter.bFixCautionAreaCenter: false
            0, 0, 0, 0,
            // FutakuchiAIParameter.bDissapearVisibleOff: false
            0, 0, 0, 0,
            // TekiAIParameter.SearchAreaCaution.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaCaution.HalfHeight: 100
            0, 0, 200, 66,
            // TekiAIParameter.SearchAreaCaution.Radius: 400
            0, 0, 200, 67,
            // TekiAIParameter.SearchAreaCaution.Angle: 180
            0, 0, 52, 67,
            // TekiAIParameter.SearchAreaCaution.SphereRadius: 0
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 100,
                    radius: 250
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 130,
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
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 450,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                rockMode: 'ERockMode::Straight',
                searchTagName: 'FutakuchiRock',
                splineSearchArea: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 100,
                    angle: 90,
                    sphereRadius: 30
                },
                searchAreaAttack: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 100,
                    radius: 700,
                    angle: 6
                },
                bFixCautionAreaCenter: 0,
                bDisappearVisibleOff: 0,
                searchAreaCaution: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 100,
                    radius: 400,
                    angle: 180,
                    sphereRadius: 0
                }
            },
            inventoryEnd: 159
        }
    },
    {
        name: 'OoKurage',
        description: 'OoKurage read by parseTekiAI',
        source: 'Madori/Cave/Cave011/Cave011_F01/ActorPlacementInfo/AP_Cave011_F01_P_Teki.json#0',
        creatureId: 'OoKurage',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + parseKurageAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 30
            0, 0, 240, 65,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 1
            1, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4614783346977800222
            30, 0, 0, 0, 1, 1, 11, 64,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "C_j000"
            7, 0, 0, 0, 67, 95, 106, 48, 48, 48, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, -100, 500)
            0, 0, 0, 0, 0, 0, 200, 194, 0, 0, 250, 67,
            // TekiAIParameter.DropParameter.DropActorParameter.RandVel: (25, 25, 30)
            0, 0, 200, 65, 0, 0, 200, 65, 0, 0, 240, 65,
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
            // DebugUniqueId: 4614783346977800222
            30, 0, 0, 0, 1, 1, 11, 64,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 700
            0, 0, 47, 68,
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
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 1
            1, 0, 0, 0,
            // OptionalPointOffset: (0, -150, -30)
            0, 0, 0, 0, 0, 0, 22, 195, 0, 0, 240, 193,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // KurageAIParameter.EatOnBirthRange: 100
            0, 0, 200, 66,
            // KurageAIParameter.bFallStart: false
            0, 0, 0, 0,
            // TekiAIParameter.SearchAreaRest.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaRest.HalfHeight: 100
            0, 0, 200, 66,
            // TekiAIParameter.SearchAreaRest.Radius: 100
            0, 0, 200, 66,
            // TekiAIParameter.SearchAreaRest.Angle: 180
            0, 0, 52, 67,
            // TekiAIParameter.SearchAreaRest.SphereRadius: 30
            0, 0, 240, 65,
            // OwnerSubComponentFlag: true
            1, 0, 0, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '4614783346977800222',
                    minDrops: 1,
                    maxDrops: 1,
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
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 30
                },
                boneName: 'C_j000',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: -100,
                    Z: 500
                },
                randVel: {
                    X: 25,
                    Y: 25,
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
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 700,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 1,
                optionalPointOffsets: [
                    {
                        X: 0,
                        Y: -150,
                        Z: -30
                    }
                ],
                optionalPointPriorityInfo: [],
                eatOnBirthRange: 100,
                bFallStart: 0,
                searchAreaRest: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 100,
                    radius: 100,
                    angle: 180,
                    sphereRadius: 30
                },
                ownerSubComponentFlag: 1
            },
            inventoryEnd: 300
        }
    },
    {
        name: 'PanModoki',
        description: 'PanModoki read by parseTekiAI',
        source: 'Madori/Cave/Cave023/Cave023_F00/ActorPlacementInfo/AP_Cave023_F00_P_Teki.json#0',
        creatureId: 'PanModoki',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + parsePanModokiAI',
        bytes: [
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
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 100, 375)
            0, 0, 0, 0, 0, 0, 200, 66, 0, 128, 187, 67,
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
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
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
            // TekiAIParameter.bEnableCullSearchEnemy: false
            0, 0, 0, 0,
            // TekiAIParameter.bUseActorLastRenderTime: false
            0, 0, 0, 0,
            // SniffPointParameter.bEnableOptionalPoint: false
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 0
            0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // PanModokiBaseAIParameter.RouteTag: "PanModokiRoute1"
            16, 0, 0, 0, 80, 97, 110, 77, 111, 100, 111, 107, 105, 82, 111, 117,
            116, 101, 49, 0,
            // PanModokiBaseAIParameter.HideAreaTag: "PanModokiHideArea1"
            19, 0, 0, 0, 80, 97, 110, 77, 111, 100, 111, 107, 105, 72, 105, 100,
            101, 65, 114, 101, 97, 49, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 100,
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
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 100,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 0,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                routeTag: 'PanModokiRoute1',
                hideAreaTag: 'PanModokiHideArea1'
            },
            inventoryEnd: 159
        }
    },
    {
        name: 'YukiFutakuchiAdult',
        description: 'YukiFutakuchiAdult read by parseTekiAI',
        source: 'Madori/Cave/Cave016/Cave016_F03/ActorPlacementInfo/AP_Cave016_F03_P_Teki.json#3',
        creatureId: 'YukiFutakuchiAdult',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + parseFutakuchiAdultAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 30
            0, 0, 240, 65,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 2
            2, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4616192920884609131
            107, 0, 0, 0, 1, 3, 16, 64,
            // MinNum: 3
            3, 0, 0, 0,
            // MaxNum: 3
            3, 0, 0, 0,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Otakara/GOtaGolfBall.GOtaGolfBall_C"
            69, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 79, 116, 97, 107, 97, 114, 97, 47, 71, 79, 116,
            97, 71, 111, 108, 102, 66, 97, 108, 108, 46, 71, 79, 116, 97, 71, 111,
            108, 102, 66, 97, 108, 108, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[1] ----
            // UniqueId: 4616192920884609132
            108, 0, 0, 0, 1, 3, 16, 64,
            // MinNum: 3
            3, 0, 0, 0,
            // MaxNum: 3
            3, 0, 0, 0,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Items/GIceBomb.GIceBomb_C"
            51, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 73, 116, 101,
            109, 115, 47, 71, 73, 99, 101, 66, 111, 109, 98, 46, 71, 73, 99, 101,
            66, 111, 109, 98, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 150, 375)
            0, 0, 0, 0, 0, 0, 22, 67, 0, 128, 187, 67,
            // TekiAIParameter.DropParameter.DropActorParameter.RandVel: (0, -15, 30)
            0, 0, 0, 0, 0, 0, 112, 193, 0, 0, 240, 65,
            // TekiAIParameter.DropParameter.DropActorParameter.DropOption: 64
            64, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 2
            2, 0, 0, 0,
            // DebugUniqueId: 4616192920884609131
            107, 0, 0, 0, 1, 3, 16, 64,
            // DebugUniqueId: 4616192920884609132
            108, 0, 0, 0, 1, 3, 16, 64,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: false
            0, 0, 0, 0,
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
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 1
            1, 0, 0, 0,
            // OptionalPointOffset: (-260, 0, -60)
            0, 0, 130, 195, 0, 0, 0, 0, 0, 0, 112, 194,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // FutakuchiAdultAIParameter.AttackArea.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // FutakuchiAdultAIParameter.AttackArea.HalfHeight: 90
            0, 0, 180, 66,
            // FutakuchiAdultAIParameter.AttackArea.Radius: 250
            0, 0, 122, 67,
            // FutakuchiAdultAIParameter.AttackArea.Angle: 10
            0, 0, 32, 65,
            // FutakuchiAdultAIParameter.AttackArea.SphereRadius: 30
            0, 0, 240, 65,
            // FutakuchiAdultAIParameter.bSplineType: true
            1, 0, 0, 0,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackLoopWaitSecMin: 0
            0, 0, 0, 0,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackLoopWaitSecMax: 0
            0, 0, 0, 0,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackSignSecMin: 0
            0, 0, 0, 0,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackSignSecMax: 0
            0, 0, 0, 0,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackInterval: 0
            0, 0, 0, 0,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackIntervalSuccess: 0
            0, 0, 0, 0,
            // FutakuchiAdultAIParameter.SplineParam.SearchTagName: "FutakuchiAdultRock"
            19, 0, 0, 0, 70, 117, 116, 97, 107, 117, 99, 104, 105, 65, 100, 117,
            108, 116, 82, 111, 99, 107, 0,
            // FutakuchiAdultAIParameter.AttackParam.AttackLoopWaitSecMin: 3
            0, 0, 64, 64,
            // FutakuchiAdultAIParameter.AttackParam.AttackLoopWaitSecMax: 3.5
            0, 0, 96, 64,
            // FutakuchiAdultAIParameter.AttackParam.AttackSignSecMin: 3
            0, 0, 64, 64,
            // FutakuchiAdultAIParameter.AttackParam.AttackSignSecMax: 3.5
            0, 0, 96, 64,
            // FutakuchiAdultAIParameter.AttackParam.AttackInterval: 2
            0, 0, 0, 64,
            // FutakuchiAdultAIParameter.AttackParam.AttackIntervalSuccess: 3.5
            0, 0, 96, 64,
            // FutakuchiAdultAIParameter.bCreateIcicle: false
            0, 0, 0, 0,
            // FutakuchiAdultAIParameter.EscapeSecMin: 0
            0, 0, 0, 0,
            // FutakuchiAdultAIParameter.EscapeSecMax: 0
            0, 0, 0, 0,
            // TekiAIParameter.SearchAreaCaution.Center: (0, -30, 0)
            0, 0, 0, 0, 0, 0, 240, 193, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaCaution.HalfHeight: 120
            0, 0, 240, 66,
            // TekiAIParameter.SearchAreaCaution.Radius: 1800
            0, 0, 225, 68,
            // TekiAIParameter.SearchAreaCaution.Angle: 40
            0, 0, 32, 66,
            // TekiAIParameter.SearchAreaCaution.SphereRadius: 240
            0, 0, 112, 67,
            // TekiAIParameter.AIWanderParameter.RatioWaitToWander: 0
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '4616192920884609131',
                    minDrops: 3,
                    maxDrops: 3,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaGolfBall.GOtaGolfBall_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                },
                {
                    id: '4616192920884609132',
                    minDrops: 3,
                    maxDrops: 3,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    dropCondition: 6,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Items/GIceBomb.GIceBomb_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 30
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 150,
                    Z: 375
                },
                randVel: {
                    X: 0,
                    Y: -15,
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
                bCalcSearchAreaOtakaraCarryWithTerritory: 0,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 600,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 1,
                optionalPointOffsets: [
                    {
                        X: -260,
                        Y: 0,
                        Z: -60
                    }
                ],
                optionalPointPriorityInfo: [],
                attackArea: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 90,
                    radius: 250,
                    angle: 10,
                    sphereRadius: 30
                },
                bSplineType: 1,
                splineAttackParam: {
                    attackLoopWaitSecMin: 0,
                    attackLoopWaitSecMax: 0,
                    attackSignSecMin: 0,
                    attackSignSecMax: 0,
                    attackInterval: 0,
                    attackIntervalSuccess: 0
                },
                searchTagName: 'FutakuchiAdultRock',
                attackParam: {
                    attackLoopWaitSecMin: 3,
                    attackLoopWaitSecMax: 3.5,
                    attackSignSecMin: 3,
                    attackSignSecMax: 3.5,
                    attackInterval: 2,
                    attackIntervalSuccess: 3.5
                },
                bCreateIcicle: 0,
                escapeSecMin: 0,
                escapeSecMax: 0,
                ratioWaitToWander: 0,
                searchAreaCaution: {
                    center: {
                        X: 0,
                        Y: -30,
                        Z: 0
                    },
                    halfHeight: 120,
                    radius: 1800,
                    angle: 40,
                    sphereRadius: 240
                }
            },
            inventoryEnd: 439
        }
    }
];

export const tekiEdgeCases = {
    teki_empty_15a: {
        name: 'teki_empty_15a',
        description: 'Teki base, no drops, 8626647386: no bEnableFreezeBothDrop after the DropParameter',
        source: 'Madori/Cave/Cave021/Cave021_F00/ActorPlacementInfo/AP_Cave021_F00_P_Teki.json#1',
        creatureId: 'Amembo',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + ',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 120
            0, 0, 240, 66,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 90, 375)
            0, 0, 0, 0, 0, 0, 180, 66, 0, 128, 187, 67,
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
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 0
            0, 0, 0, 0,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 500
            0, 0, 250, 67,
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
            // AmemboAIParameter.BulletParam.Altitude: 18
            0, 0, 144, 65,
            // AmemboAIParameter.BulletParam.CustomGravityRate: 0.85
            154, 153, 89, 63,
            // AmemboAIParameter.SearchEnemyRadius: 300
            0, 0, 150, 67,
            // AmemboAIParameter.EscapeRadius: 100
            0, 0, 200, 66,
            // AmemboAIParameter.DrinkableRadius: 200
            0, 0, 72, 67,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 120
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 90,
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
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 500,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: []
            },
            inventoryEnd: 159
        }
    },
    teki_empty_17a: {
        name: 'teki_empty_17a',
        description: 'Teki base, no drops, 8626647418: bEnableFreezeBothDrop follows the DropParameter',
        source: 'Madori/Cave/Cave014/Cave014_F01/ActorPlacementInfo/AP_Cave014_F01_P_Teki.json#5',
        creatureId: 'FireOtakara',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + ',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 200
            0, 0, 72, 67,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 0
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 90, 375)
            0, 0, 0, 0, 0, 0, 180, 66, 0, 128, 187, 67,
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
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 400
            0, 0, 200, 67,
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
            // DweevilAIParameter.OtakaraParam.bInitShoulder: false
            0, 0, 0, 0,
            // DweevilAIParameter.OtakaraParam.bEnableWallClimb: true
            1, 0, 0, 0,
            // DweevilAIParameter.OtakaraParam.bUpdateTerritoryWhenShoulder: false
            0, 0, 0, 0,
            // DweevilAIParameter.OtakaraParam.OtakaraSearchArea.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // DweevilAIParameter.OtakaraParam.OtakaraSearchArea.HalfHeight: 200
            0, 0, 72, 67,
            // DweevilAIParameter.OtakaraParam.OtakaraSearchArea.Radius: 300
            0, 0, 150, 67,
            // DweevilAIParameter.OtakaraParam.bUseNewTerritoryWhenShoulder: true
            1, 0, 0, 0,
            // DweevilAIParameter.OtakaraParam.NewTerritoryPos: (128.218, 633.37, -140.927)
            208, 55, 0, 67, 179, 87, 30, 68, 48, 237, 12, 195,
            // DweevilAIParameter.EscapeParam.bEnableWallCheck: true
            1, 0, 0, 0,
        ],
        expected: {
            parsed: [],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 200
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 90,
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
                bEnableFreezeBothDrop: 0,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 400,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: []
            },
            inventoryEnd: 163
        }
    },
    teki_multi_drops: {
        name: 'teki_multi_drops',
        description: 'Teki with several drop slots, u64 UniqueIds and a matching DebugUniqueIdList',
        source: 'Madori/Cave/Cave007/Cave007_F02/ActorPlacementInfo/AP_Cave007_F02_P_Teki.json#2',
        creatureId: 'BigEgg',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + ',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 100
            0, 0, 200, 66,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 3
            3, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4613658546582585389
            45, 0, 0, 0, 1, 2, 7, 64,
            // MinNum: 3
            3, 0, 0, 0,
            // MaxNum: 3
            3, 0, 0, 0,
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
            // UniqueId: 4613658546582585390
            46, 0, 0, 0, 1, 2, 7, 64,
            // MinNum: 10
            10, 0, 0, 0,
            // MaxNum: 10
            10, 0, 0, 0,
            // DropRatio: 0.2
            205, 204, 76, 62,
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
            // SpawnMiniInfo.GameRulePermissionFlag: 15
            15, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[2] ----
            // UniqueId: 4613658546582585391
            47, 0, 0, 0, 1, 2, 7, 64,
            // MinNum: 3
            3, 0, 0, 0,
            // MaxNum: 3
            3, 0, 0, 0,
            // DropRatio: 0.05
            205, 204, 76, 61,
            // bRegistGenerator: false
            0, 0, 0, 0,
            // DropConditions (count): 0
            0, 0, 0, 0,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (75, 0, 350)
            0, 0, 150, 66, 0, 0, 0, 0, 0, 0, 175, 67,
            // TekiAIParameter.DropParameter.DropActorParameter.RandVel: (25, 0, 70)
            0, 0, 200, 65, 0, 0, 0, 0, 0, 0, 140, 66,
            // TekiAIParameter.DropParameter.DropActorParameter.DropOption: 5
            5, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 3
            3, 0, 0, 0,
            // DebugUniqueId: 4613658546582585389
            45, 0, 0, 0, 1, 2, 7, 64,
            // DebugUniqueId: 4613658546582585390
            46, 0, 0, 0, 1, 2, 7, 64,
            // DebugUniqueId: 4613658546582585391
            47, 0, 0, 0, 1, 2, 7, 64,
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
        ],
        expected: {
            parsed: [
                {
                    id: '4613658546582585389',
                    minDrops: 3,
                    maxDrops: 3,
                    dropChance: 0.75,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/Items/GHoney.GHoney_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 271,
                    bSetTerritory: 0
                },
                {
                    id: '4613658546582585390',
                    minDrops: 10,
                    maxDrops: 10,
                    dropChance: 0.2,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 15,
                    bSetTerritory: 0
                },
                {
                    id: '4613658546582585391',
                    minDrops: 3,
                    maxDrops: 3,
                    dropChance: 0.05,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/Items/GHotExtract.GHotExtract_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 15,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 75,
                    Y: 0,
                    Z: 350
                },
                randVel: {
                    X: 25,
                    Y: 0,
                    Z: 70
                },
                dropOption: 5,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 100,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: []
            },
            inventoryEnd: 508
        }
    },
    teki_dropcond: {
        name: 'teki_dropcond',
        description: 'Teki drop slot carrying one DropConditionParameter (u8 cond, i32 int, FName, u8 demo)',
        source: 'Madori/Cave/Cave014/Cave014_F04/ActorPlacementInfo/AP_Cave014_F04_P_Teki.json#0',
        creatureId: 'AmeBozu',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + parseAmeBozuAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 100
            0, 0, 200, 66,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 2
            2, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4615631070442815519
            31, 0, 0, 0, 1, 4, 14, 64,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Otakara/GOtaDisc.GOtaDisc_C"
            61, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 79, 116, 97, 107, 97, 114, 97, 47, 71, 79, 116,
            97, 68, 105, 115, 99, 46, 71, 79, 116, 97, 68, 105, 115, 99, 95, 67,
            0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[1] ----
            // UniqueId: 4615631070442815520
            32, 0, 0, 0, 1, 4, 14, 64,
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
            // TekiAIParameter.DropParameter.DropActorParameter.DropOption: 64
            64, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 2
            2, 0, 0, 0,
            // DebugUniqueId: 4615631070442815519
            31, 0, 0, 0, 1, 4, 14, 64,
            // DebugUniqueId: 4615631070442815520
            32, 0, 0, 0, 1, 4, 14, 64,
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
            // AmeBozuAIParameter.bAppearSearch: true
            1, 0, 0, 0,
            // AmeBozuAIParameter.SearchTagName: "AmeBozuRootPoint"
            17, 0, 0, 0, 65, 109, 101, 66, 111, 122, 117, 82, 111, 111, 116, 80,
            111, 105, 110, 116, 0,
            // AmeBozuAIParameter.HideTimeMin: 275
            0, 128, 137, 67,
            // AmeBozuAIParameter.HideTimeMax: 325
            0, 128, 162, 67,
            // AmeBozuAIParameter.bAppearFixedLocation: false
            0, 0, 0, 0,
            // AmeBozuAIParameter.AppearSearchRadius: 300
            0, 0, 150, 67,
            // AmeBozuAIParameter.WalkType: 1
            1,
            // AmeBozuAIParameter.CanAttackLevelFaceMessageName: "Teki_Announce_AmeBozu_01"
            25, 0, 0, 0, 84, 101, 107, 105, 95, 65, 110, 110, 111, 117, 110, 99,
            101, 95, 65, 109, 101, 66, 111, 122, 117, 95, 48, 49, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '4615631070442815519',
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaDisc.GOtaDisc_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                },
                {
                    id: '4615631070442815520',
                    minDrops: 5,
                    maxDrops: 5,
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
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: -35,
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
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 300,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: [],
                bAppearSearch: 1,
                searchTagName: 'AmeBozuRootPoint',
                hideTimeMin: 275,
                hideTimeMax: 325,
                bAppearFixedLocation: 0,
                appearSearchRadius: 300,
                walkType: 'Search',
                canAttackLevelFaceMessageName: 'Teki_Announce_AmeBozu_01'
            },
            inventoryEnd: 415
        }
    },
    teki_dropcondname: {
        name: 'teki_dropcondname',
        description: 'Teki drop condition with a non-None DropCondName',
        source: 'Madori/Cave/Cave019/Cave019_F02/ActorPlacementInfo/AP_Cave019_F02_P_Teki.json#0',
        creatureId: 'FutakuchiAdult',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + parseFutakuchiAdultAI',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 150
            0, 0, 22, 67,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 2
            2, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4617036246303113256
            40, 0, 0, 0, 1, 2, 19, 64,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Objects/Otakara/GOtaSFCMouse.GOtaSFCMouse_C"
            69, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 79, 98, 106,
            101, 99, 116, 115, 47, 79, 116, 97, 107, 97, 114, 97, 47, 71, 79, 116,
            97, 83, 70, 67, 77, 111, 117, 115, 101, 46, 71, 79, 116, 97, 83, 70,
            67, 77, 111, 117, 115, 101, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // ---- DropItemParameter[1] ----
            // UniqueId: 4617036246303113257
            41, 0, 0, 0, 1, 2, 19, 64,
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
            // DropCond: 6
            6,
            // DropCondInt: 0
            0, 0, 0, 0,
            // DropCondName: "GOtaBanana"
            11, 0, 0, 0, 71, 79, 116, 97, 66, 97, 110, 97, 110, 97, 0,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 170, 375)
            0, 0, 0, 0, 0, 0, 42, 67, 0, 128, 187, 67,
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
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 2
            2, 0, 0, 0,
            // DebugUniqueId: 4617036246303113256
            40, 0, 0, 0, 1, 2, 19, 64,
            // DebugUniqueId: 4617036246303113257
            41, 0, 0, 0, 1, 2, 19, 64,
            // TekiAIParameter.DropParameter.bEnableFreezeBothDrop: true
            1, 0, 0, 0,
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
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 1
            1, 0, 0, 0,
            // OptionalPointOffset: (-130, -240, -60)
            0, 0, 2, 195, 0, 0, 112, 195, 0, 0, 112, 194,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
            // FutakuchiAdultAIParameter.AttackArea.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // FutakuchiAdultAIParameter.AttackArea.HalfHeight: 70
            0, 0, 140, 66,
            // FutakuchiAdultAIParameter.AttackArea.Radius: 300
            0, 0, 150, 67,
            // FutakuchiAdultAIParameter.AttackArea.Angle: 5
            0, 0, 160, 64,
            // FutakuchiAdultAIParameter.AttackArea.SphereRadius: 30
            0, 0, 240, 65,
            // FutakuchiAdultAIParameter.bSplineType: false
            0, 0, 0, 0,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackLoopWaitSecMin: 1
            0, 0, 128, 63,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackLoopWaitSecMax: 3
            0, 0, 64, 64,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackSignSecMin: 1
            0, 0, 128, 63,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackSignSecMax: 3
            0, 0, 64, 64,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackInterval: 1.5
            0, 0, 192, 63,
            // FutakuchiAdultAIParameter.SplineParam.AttackParam.AttackIntervalSuccess: 1.5
            0, 0, 192, 63,
            // FutakuchiAdultAIParameter.SplineParam.SearchTagName: "FutakuchiAdultRock"
            19, 0, 0, 0, 70, 117, 116, 97, 107, 117, 99, 104, 105, 65, 100, 117,
            108, 116, 82, 111, 99, 107, 0,
            // FutakuchiAdultAIParameter.AttackParam.AttackLoopWaitSecMin: 1
            0, 0, 128, 63,
            // FutakuchiAdultAIParameter.AttackParam.AttackLoopWaitSecMax: 1
            0, 0, 128, 63,
            // FutakuchiAdultAIParameter.AttackParam.AttackSignSecMin: 1
            0, 0, 128, 63,
            // FutakuchiAdultAIParameter.AttackParam.AttackSignSecMax: 3
            0, 0, 64, 64,
            // FutakuchiAdultAIParameter.AttackParam.AttackInterval: 0.5
            0, 0, 0, 63,
            // FutakuchiAdultAIParameter.AttackParam.AttackIntervalSuccess: 1.5
            0, 0, 192, 63,
            // FutakuchiAdultAIParameter.bCreateIcicle: true
            1, 0, 0, 0,
            // FutakuchiAdultAIParameter.EscapeSecMin: 5
            0, 0, 160, 64,
            // FutakuchiAdultAIParameter.EscapeSecMax: 5
            0, 0, 160, 64,
            // FutakuchiAdultAIParameter.VacuumHalfHeight: 20
            0, 0, 160, 65,
            // TekiAIParameter.SearchAreaCaution.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaCaution.HalfHeight: 70
            0, 0, 140, 66,
            // TekiAIParameter.SearchAreaCaution.Radius: 300
            0, 0, 150, 67,
            // TekiAIParameter.SearchAreaCaution.Angle: 110
            0, 0, 220, 66,
            // TekiAIParameter.SearchAreaCaution.SphereRadius: 30
            0, 0, 240, 65,
            // TekiAIParameter.AIWanderParameter.RatioWaitToWander: 0.7
            51, 51, 51, 63,
        ],
        expected: {
            parsed: [
                {
                    id: '4617036246303113256',
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 1,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Otakara/GOtaSFCMouse.GOtaSFCMouse_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                },
                {
                    id: '4617036246303113257',
                    minDrops: 5,
                    maxDrops: 5,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    dropCondition: 6,
                    dropCondInt: 0,
                    dropCondName: 'GOtaBanana',
                    assetName: '/Game/Carrot4/Placeables/Items/GHoney.GHoney_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 150
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 170,
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
                bEnableFreezeBothDrop: 1,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 600,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 1,
                optionalPointOffsets: [
                    {
                        X: -130,
                        Y: -240,
                        Z: -60
                    }
                ],
                optionalPointPriorityInfo: [],
                attackArea: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 70,
                    radius: 300,
                    angle: 5,
                    sphereRadius: 30
                },
                bSplineType: 0,
                splineAttackParam: {
                    attackLoopWaitSecMin: 1,
                    attackLoopWaitSecMax: 3,
                    attackSignSecMin: 1,
                    attackSignSecMax: 3,
                    attackInterval: 1.5,
                    attackIntervalSuccess: 1.5
                },
                searchTagName: 'FutakuchiAdultRock',
                attackParam: {
                    attackLoopWaitSecMin: 1,
                    attackLoopWaitSecMax: 1,
                    attackSignSecMin: 1,
                    attackSignSecMax: 3,
                    attackInterval: 0.5,
                    attackIntervalSuccess: 1.5
                },
                bCreateIcicle: 1,
                escapeSecMin: 5,
                escapeSecMax: 5,
                searchAreaCaution: {
                    center: {
                        X: 20,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 0,
                    radius: 70,
                    angle: 300,
                    sphereRadius: 110
                }
            },
            inventoryEnd: 445
        }
    },
    teki_territory_drop: {
        name: 'teki_territory_drop',
        description: 'Teki drop slot with bSetTerritory = true and its territory cylinder',
        source: 'Madori/Cave/Cave007/Cave007_F02/ActorPlacementInfo/AP_Cave007_F02_P_Teki.json#4',
        creatureId: 'BigEgg',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + ',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 100
            0, 0, 200, 66,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 1
            1, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4613658546582585392
            48, 0, 0, 0, 1, 2, 7, 64,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Teki/GMiniMochi.GMiniMochi_C"
            54, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 84, 101, 107,
            105, 47, 71, 77, 105, 110, 105, 77, 111, 99, 104, 105, 46, 71, 77, 105,
            110, 105, 77, 111, 99, 104, 105, 95, 67, 0,
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
            // SpawnMiniInfo.Territory.Radius: 100
            0, 0, 200, 66,
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (75, 0, 350)
            0, 0, 150, 66, 0, 0, 0, 0, 0, 0, 175, 67,
            // TekiAIParameter.DropParameter.DropActorParameter.RandVel: (25, 0, 70)
            0, 0, 200, 65, 0, 0, 0, 0, 0, 0, 140, 66,
            // TekiAIParameter.DropParameter.DropActorParameter.DropOption: 5
            5, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.FixedHotExtractDropNum: 0
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.bOverrideInitLocation: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.OverrideInitLocation: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 1
            1, 0, 0, 0,
            // DebugUniqueId: 4613658546582585392
            48, 0, 0, 0, 1, 2, 7, 64,
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
        ],
        expected: {
            parsed: [
                {
                    id: '4613658546582585392',
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    assetName: '/Game/Carrot4/Placeables/Teki/GMiniMochi.GMiniMochi_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 1,
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                }
            ],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 100
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 75,
                    Y: 0,
                    Z: 350
                },
                randVel: {
                    X: 25,
                    Y: 0,
                    Z: 70
                },
                dropOption: 5,
                fixedHotExtractDropNum: 0,
                bOverrideInitLocation: 0,
                overrideInitLocation: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 100,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: []
            },
            inventoryEnd: 292
        }
    },
    teki_customparam: {
        name: 'teki_customparam',
        description: 'Teki drop slot with a non-None CustomParameter',
        source: 'Madori/Cave/Cave019/Cave019_F04/ActorPlacementInfo/AP_Cave019_F04_P_Teki.json#3',
        creatureId: 'BigKingChappy',
        infoType: InfoType.Creature,
        generatorVersion: 8626647418,
        reader: 'parseTekiAI + ',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, -90)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 180, 194,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 380
            0, 0, 190, 67,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 2
            2, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4617038445326368865
            97, 0, 0, 0, 1, 4, 19, 64,
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
            // UniqueId: 4617038445326368866
            98, 0, 0, 0, 1, 4, 19, 64,
            // MinNum: 20
            20, 0, 0, 0,
            // MaxNum: 20
            20, 0, 0, 0,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 200, 375)
            0, 0, 0, 0, 0, 0, 72, 67, 0, 128, 187, 67,
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
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 2
            2, 0, 0, 0,
            // DebugUniqueId: 4617038445326368865
            97, 0, 0, 0, 1, 4, 19, 64,
            // DebugUniqueId: 4617038445326368866
            98, 0, 0, 0, 1, 4, 19, 64,
            // TekiAIParameter.DropParameter.bEnableFreezeBothDrop: true
            1, 0, 0, 0,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 800
            0, 0, 72, 68,
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
            // KingChappyBaseAIParameter.WarCryParameter.ChooseRatio: 500
            0, 0, 250, 67,
            // KingChappyBaseAIParameter.AttackParameter.TangueColiisionScopeRatio: -1
            0, 0, 128, 191,
            // KingChappyBaseAIParameter.AttackParameter.bTangueCollisionOnlyWall: true
            1, 0, 0, 0,
            // KingChappyBaseAIParameter.WarCryParameter.bTriggerByAppear: false
            0, 0, 0, 0,
            // KingChappyBaseAIParameter.PressParameter.bSinkFloor: false
            0, 0, 0, 0,
            // KingChappyBaseAIParameter.AppearParameter.bSinkFloor: false
            0, 0, 0, 0,
            // BigKingChappyAIParameter.BigJumpParameter.bSinkFloor: false
            0, 0, 0, 0,
            // BigKingChappyAIParameter.BigJumpParameter.bWithFallRock: true
            1, 0, 0, 0,
            // BigKingChappyAIParameter.BigJumpParameter.FallRockParameter.bSinkFloor: false
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '4617038445326368865',
                    minDrops: 1,
                    maxDrops: 1,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    dropCondition: 5,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/Objects/Survivor/GSurvivorA.GSurvivorA_C',
                    customParameter: 'SVSleep000',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                },
                {
                    id: '4617038445326368866',
                    minDrops: 20,
                    maxDrops: 20,
                    dropChance: 1,
                    bRegistGenerator: 0,
                    dropCondition: 6,
                    dropCondInt: 0,
                    dropCondName: 'None',
                    assetName: '/Game/Carrot4/Placeables/WorkObjects/Shizai/GPiecePick.GPiecePick_C',
                    customParameter: 'None',
                    customFloatParam: 0,
                    gameRulePermissionFlag: 0,
                    bSetTerritory: 0
                }
            ],
            AIProperties: {
                territory: {
                    X: 0,
                    Y: 0,
                    Z: -90,
                    halfHeight: 50,
                    radius: 380
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 200,
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
                bEnableFreezeBothDrop: 1,
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 800,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 0,
                optionalPointOffsets: [],
                optionalPointPriorityInfo: []
            },
            inventoryEnd: 451
        }
    },
    teki_optional_points: {
        name: 'teki_optional_points',
        description: 'Teki with an Oatchi sniff OptionalPointOffset',
        source: 'Main/Area/Area003/ActorPlacementInfo/AP_Area003_P_Teki_Day.json#59',
        creatureId: 'Arikui',
        infoType: InfoType.Creature,
        generatorVersion: 8626647386,
        reader: 'parseTekiAI + ',
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 200
            0, 0, 72, 67,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 1
            1, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 1153765938126913778
            242, 0, 0, 0, 2, 0, 3, 16,
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
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 170, 375)
            0, 0, 0, 0, 0, 0, 42, 67, 0, 128, 187, 67,
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
            // DebugUniqueId: 1153765938126913778
            242, 0, 0, 0, 2, 0, 3, 16,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 500
            0, 0, 250, 67,
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
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 1
            1, 0, 0, 0,
            // OptionalPointOffset: (-800, -1250, -270)
            0, 0, 72, 196, 0, 64, 156, 196, 0, 0, 135, 195,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 0
            0, 0, 0, 0,
        ],
        expected: {
            parsed: [
                {
                    id: '1153765938126913778',
                    minDrops: 1,
                    maxDrops: 1,
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
                territory: {
                    X: 0,
                    Y: 0,
                    Z: 0,
                    halfHeight: 50,
                    radius: 200
                },
                boneName: 'None',
                localOffset: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                vel: {
                    X: 0,
                    Y: 170,
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
                bCalcSearchAreaOtakaraCarryWithTerritory: 1,
                searchAreaOtakaraCarry: {
                    center: {
                        X: 0,
                        Y: 0,
                        Z: 0
                    },
                    halfHeight: 50,
                    radius: 500,
                    angle: 180,
                    sphereRadius: 30
                },
                invasionStartTimeRatio: 0,
                bNotifyCarryNearProWrestlingPikmin: 0,
                bEnableCullSearchEnemy: 1,
                bUseActorLastRenderTime: 0,
                bEnableOptionalPoint: 1,
                optionalPointOffsets: [
                    {
                        X: -800,
                        Y: -1250,
                        Z: -270
                    }
                ],
                optionalPointPriorityInfo: []
            },
            inventoryEnd: 298
        }
    }
};

// Synthetic arrays: built by an independent encoder from the layouts, validated against the reference parser.
export const tekiSynthetic = {
    tekiAllSections: {
        name: 'tekiAllSections',
        creatureId: 'Amembo',
        generatorVersion: 8626647418,
        bytes: [
            // TekiAIParameter.Territory.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.Territory.Radius: 120
            0, 0, 240, 66,
            // TekiAIParameter.DropParameter.DropItemParameter (count): 2
            2, 0, 0, 0,
            // ---- DropItemParameter[0] ----
            // UniqueId: 4614504071024345149
            61, 0, 0, 0, 1, 3, 10, 64,
            // MinNum: 2
            2, 0, 0, 0,
            // MaxNum: 3
            3, 0, 0, 0,
            // DropRatio: 0.5
            0, 0, 0, 63,
            // bRegistGenerator: true
            1, 0, 0, 0,
            // DropConditions (count): 1
            1, 0, 0, 0,
            // DropCond: 6
            6,
            // DropCondInt: 0
            0, 0, 0, 0,
            // DropCondName: "OtaBanana"
            10, 0, 0, 0, 79, 116, 97, 66, 97, 110, 97, 110, 97, 0,
            // DropCondDemo: 0
            0,
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Survivor/GSurvivorA.GSurvivorA_C"
            58, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 83, 117, 114,
            118, 105, 118, 111, 114, 47, 71, 83, 117, 114, 118, 105, 118, 111, 114, 65,
            46, 71, 83, 117, 114, 118, 105, 118, 111, 114, 65, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "SVSleep000"
            11, 0, 0, 0, 83, 86, 83, 108, 101, 101, 112, 48, 48, 48, 0,
            // SpawnMiniInfo.CustomFloatParameter: 1.5
            0, 0, 192, 63,
            // SpawnMiniInfo.GameRulePermissionFlag: 269
            13, 1,
            // SpawnMiniInfo.bSetTerritory: true
            1, 0, 0, 0,
            // SpawnMiniInfo.Territory.Center: (10, -20, 30)
            0, 0, 32, 65, 0, 0, 160, 193, 0, 0, 240, 65,
            // SpawnMiniInfo.Territory.HalfHeight: 50
            0, 0, 72, 66,
            // SpawnMiniInfo.Territory.Radius: 100
            0, 0, 200, 66,
            // ---- DropItemParameter[1] ----
            // UniqueId: 1
            1, 0, 0, 0, 0, 0, 0, 0,
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
            // SpawnMiniInfo.DropActor: "/Game/Carrot4/Placeables/Teki/GKochappy.GKochappy_C"
            52, 0, 0, 0, 47, 71, 97, 109, 101, 47, 67, 97, 114, 114, 111, 116,
            52, 47, 80, 108, 97, 99, 101, 97, 98, 108, 101, 115, 47, 84, 101, 107,
            105, 47, 71, 75, 111, 99, 104, 97, 112, 112, 121, 46, 71, 75, 111, 99,
            104, 97, 112, 112, 121, 95, 67, 0,
            // SpawnMiniInfo.CustomParameter: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // SpawnMiniInfo.CustomFloatParameter: 0
            0, 0, 0, 0,
            // SpawnMiniInfo.GameRulePermissionFlag: 0
            0, 0,
            // SpawnMiniInfo.bSetTerritory: false
            0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Index: -1
            255, 255, 255, 255,
            // TekiAIParameter.DropParameter.DropActorParameter.BoneName: "None"
            5, 0, 0, 0, 78, 111, 110, 101, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.LocalOffset: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.DropActorParameter.Vel: (0, 90, 375)
            0, 0, 0, 0, 0, 0, 180, 66, 0, 128, 187, 67,
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
            // TekiAIParameter.DropParameter.DebugUniqueIdList (count): 2
            2, 0, 0, 0,
            // DebugUniqueId: 4614504071024345149
            61, 0, 0, 0, 1, 3, 10, 64,
            // DebugUniqueId: 1
            1, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.DropParameter.bEnableFreezeBothDrop: true
            1, 0, 0, 0,
            // TekiAIParameter.bCalcSearchAreaOtakaraCarryWithTerritory: true
            1, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.Center: (0, 0, 0)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // TekiAIParameter.SearchAreaOtakaraCarry.HalfHeight: 50
            0, 0, 72, 66,
            // TekiAIParameter.SearchAreaOtakaraCarry.Radius: 500
            0, 0, 250, 67,
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
            // SniffPointParameter.bEnableOptionalPoint: true
            1, 0, 0, 0,
            // SniffPointParameter.OptionalPointOffsets (count): 2
            2, 0, 0, 0,
            // OptionalPointOffset: (0, 0, -30)
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 193,
            // OptionalPointOffset: (12.5, 5, 0)
            0, 0, 72, 65, 0, 0, 160, 64, 0, 0, 0, 0,
            // SniffPointParameter.OptionalPointPriorityInfo (count): 2
            2, 0, 0, 0,
            // OptionalPointPriority: 2
            2, 0, 0, 0,
            // OptionalPointPriority: 1
            1, 0, 0, 0,
            // AmemboAIParameter.BulletParam.Altitude: 18
            0, 0, 144, 65,
            // AmemboAIParameter.BulletParam.CustomGravityRate: 0.85
            154, 153, 89, 63,
            // AmemboAIParameter.SearchEnemyRadius: 300
            0, 0, 150, 67,
            // AmemboAIParameter.EscapeRadius: 100
            0, 0, 200, 66,
            // AmemboAIParameter.DrinkableRadius: 200
            0, 0, 72, 67,
        ],
        parsed: [
            {
                id: '4614504071024345149',
                minDrops: 2,
                maxDrops: 3,
                dropChance: 0.5,
                bRegistGenerator: 1,
                dropCondition: 6,
                dropCondInt: 0,
                dropCondName: 'OtaBanana',
                assetName: '/Game/Carrot4/Placeables/Survivor/GSurvivorA.GSurvivorA_C',
                customParameter: 'SVSleep000',
                customFloatParam: 1.5,
                gameRulePermissionFlag: 269,
                bSetTerritory: 1,
                X: 10,
                Y: -20,
                Z: 30,
                halfHeight: 50,
                radius: 100
            },
            {
                id: '1',
                minDrops: 1,
                maxDrops: 1,
                dropChance: 1,
                bRegistGenerator: 0,
                assetName: '/Game/Carrot4/Placeables/Teki/GKochappy.GKochappy_C',
                customParameter: 'None',
                customFloatParam: 0,
                gameRulePermissionFlag: 0,
                bSetTerritory: 0
            }
        ],
        AIProperties: {
            territory: {
                X: 0,
                Y: 0,
                Z: 0,
                halfHeight: 50,
                radius: 120
            },
            boneName: 'None',
            localOffset: {
                X: 0,
                Y: 0,
                Z: 0
            },
            vel: {
                X: 0,
                Y: 90,
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
            bCalcSearchAreaOtakaraCarryWithTerritory: 1,
            searchAreaOtakaraCarry: {
                center: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
                halfHeight: 50,
                radius: 500,
                angle: 180,
                sphereRadius: 30
            },
            invasionStartTimeRatio: 0,
            bNotifyCarryNearProWrestlingPikmin: 0,
            bEnableCullSearchEnemy: 1,
            bUseActorLastRenderTime: 0,
            bEnableOptionalPoint: 1,
            optionalPointOffsets: [
                {
                    X: 0,
                    Y: 0,
                    Z: -30
                },
                {
                    X: 12.5,
                    Y: 5,
                    Z: 0
                }
            ],
            optionalPointPriorityInfo: [2, 1],
            bEnableFreezeBothDrop: 1
        },
        inventoryEnd: 159
    }
};
