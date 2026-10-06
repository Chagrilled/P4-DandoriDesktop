import { InfoType, defaultAIProperties, defaultTriggerAI, defaultSprinklerAI, defaultValveAI, defaultCreatureAI, DefaultActorSpawnerDrop, WaterBoxTextures, AmbientSoundIDs, defaultVector, defaultSplinePoint, RockModes, defaultTreasureAI, PikminTypes, QueenAIType, PopObjectType, PopPlaceActorSpareBytes, DDBPikminHeightType, defaultObjectAI, NavLinkDirection } from "../api/types";

export const entityDefaults = [
    {
        parsed: [],
        parsedSubAI: [{
            ...DefaultActorSpawnerDrop,
            assetName: "None"
        }],
        AIProperties: {
            numDig: 1
        },
        ents: ['Tateana', 'TateanaBaby'],
    },
    {
        parsed: [{
            ...DefaultActorSpawnerDrop,
        }],
        AIProperties: {
            numDig: 1
        },
        ents: ['ActorSpawner'],
    },
    {
        infoTypes: [InfoType.Creature],
        AIProperties: defaultCreatureAI,
        ents: ['Mush', 'Komush'],
        moddedLife: {
            maxLife: 0,
            startingLife: 0,
            regenPercent: 0.3
        }
    },
    {
        infoTypes: [InfoType.Object],
        ents: [],
        AIProperties: defaultObjectAI
    },
    {
        ents: ['TriggerDoor', 'Switch', 'Conveyor265uu'],
        AIProperties: defaultTriggerAI
    },
    {
        ents: ['NoraSpawner', "Pikmin"],
        AIProperties: defaultAIProperties
    },
    {
        ents: ['Tunnel', 'WarpCarry', 'HappyDoor'],
        AIProperties: { warpID: 'TunnelID_1' }
    },
    {
        ents: ['Sprinkler'],
        AIProperties: defaultSprinklerAI,
        ActorParameter: {
            demoBindName: 'GSprinkler01'
        }
    },
    {
        ents: ['Valve'],
        AIProperties: {
            ...defaultObjectAI,
            ...defaultValveAI,
        },
        ActorParameter: {
            demoBindName: 'GValveOnce00'
        }
    },
    {
        ents: ['StickyFloor'],
        AIProperties: {
            ...defaultObjectAI,
            bAutoSpawnMush: false
        }
    },
    {
        ents: ['NavMeshTrigger'],
        NavMeshTrigger: {
            overlapBoxExtent: {
                X: 137.5,
                Y: 137.5,
                Z: 137.5,
            },
            navCollBoxExtent: {
                X: 100.0,
                Y: 100.0,
                Z: 100.0,
            },
            CIDList: [],
            navMeshTriggerID: 'NavMeshTrigger00'
        }
    },
    {
        ents: ['Geyser'],
        AIProperties: {
            ...defaultObjectAI,
            bSetCrystal: false,
            stopQueenDistXY: -1,
            navLinkLeft: {
                X: 1.0,
                Y: 0.0,
                Z: 0.0
            },
            navLinkRight: {
                X: 100.0,
                Y: 0.0,
                Z: 10.0
            },
            leftProjectHeight: 0.0,
            maxFallDownLength: 1000.0,
            direction: NavLinkDirection[1],
            snapRadius: 30.0,
            snapHeight: 30.0,
            bUseSnapHeight: false,
            bSnapToCheapestArea: true
        }
    },
    {
        ents: ["BridgeStation", "HikariStation", "KinkaiStation"],
        AIProperties: {
            pieceNum: 15
        }
    },
    {
        ents: ["Circulator"],
        AIProperties: {
            bWindLong: false,
            switchID: "CirculatorSwitch01",
            navLinkRight: {
                X: 100.0,
                Y: 100.0,
                Z: 100.0
            }
        }
    },
    {
        ents: ['WaterBox'],
        AIProperties: {
            waterBoxSwitchId: "null",
            waterLevelChangeDist: 0.0,
            waterLevelChangeTime: -1,
            generatorIndex: -1,
            bUseSunMeter: false,
            bPlayDemo: false,
            afterMaxIcePikmins: 20
        },
        WaterTrigger: {
            maxIcePikmins: 20,
            ambientSoundId: AmbientSoundIDs[0]
        },
        ActorParameter: {
            radarMapWBTexture: WaterBoxTextures[0],
            radarMapWBChangeDistTexture: "None"
        }
    },
    {
        ents: ['SwampBox'],
        AIProperties: {
            waterBoxSwitchId: "null",
            waterLevelChangeDist: 0.0,
            waterLevelChangeTime: -1,
            generatorIndex: -1,
            bUseSunMeter: false,
            bPlayDemo: false,
            afterMaxIcePikmins: 20,
            bDisableSink: false
        },
        WaterTrigger: {
            maxIcePikmins: 20,
            ambientSoundId: AmbientSoundIDs[0]
        },
        ActorParameter: {
            radarMapWBTexture: WaterBoxTextures[0],
            radarMapWBChangeDistTexture: "None"
        }
    },
    {
        ents: ["PopPlaceActor"],
        PopPlace: {
            popObjectType: PopObjectType[1],
            groupId: 1,
            isTerritorySetting: 0,
            bNoSearchOuterTerritory: 0,
            territory: {
                ...defaultVector,
                halfHeight: 50,
                radius: 100
            },
            string: "FutakuchiRock",
            spareBytes: PopPlaceActorSpareBytes,
            isOtakaraSetting: 0,
            bChangeCrushImpactMoveDir: 0,
            bReceiveCrushImpactEvent: 0,
            crushImpactMoveRot: {
                roll: 0,
                pitch: 0,
                yaw: 0
            },
            bUseCrushDDB: false,
            crushDDBPoint: defaultVector,
            DDBPikminHeightType: DDBPikminHeightType[2]
        }
    },
    {
        // WaterBoxNav will get caught by the above object
        // So we have to overwrite it here to avoid either writing a "Not" filter
        // or being explicit for every ent by removing the .includes(), which I don't want to do
        ents: ['WaterBoxNav'],
        AIProperties: {
            bUseHappyOnly: false,
            rightOffset: {
                X: 0.0,
                Y: 0.0,
                Z: 0.0
            }
        }
    },
    {
        ents: ['Mizunuki'],
        AIProperties: {
            waterBoxId: 'Water00'
        }
    },
    {
        ents: ['HandleBoard'],
        AIProperties: {
            linkNarrowSpaceBoxID: "None",
            linkWarpTriggerID: "None",
            navMeshTriggerID: "None",
            workNum: 10,
            pointLinks: {
                left: {
                    X: 0.0,
                    Y: 0.0,
                    Z: 0.0
                },
                right: {
                    X: 0.0,
                    Y: 0.0,
                    Z: 0.0
                }
            }
        }
    },
    {
        ents: ['MoveFloor'],
        AIProperties: {
            waitTime: 1.5,
            moveSpeed: 100.0,
            bEnableWarpActor: false,
            warpOffset: defaultVector,
            splinePoints: [defaultSplinePoint]
        }
    },
    {
        ents: ['Spline'],
        ActorParameter: {
            splinePoints: [defaultSplinePoint],
            searchTagName: "SplineRootPoint"
        }
    },
    {
        // Object for overrides to stay as empty
        ents: ['MoveFloorSlowTrigger']
    },
    {
        ents: ['Branch_Long'],
        AIProperties: {
            jumpHeight: 35,
            navLinkRight: defaultVector
        }
    },
    {
        ents: ["DownWall"],
        AIProperties: {
            bDisableAirWall: true
        }
    },
    {
        ents: ["String"],
        AIProperties: {
            bFalled: false,
            fallHeight: 20
        }
    },
    {
        infoTypes: [InfoType.Treasure],
        ents: [],
        AIProperties: defaultTreasureAI
    },
    {
        ents: ["Survivor"],
        AIProperties: {
            npcInfoKey: "SVSleep00",
            ...defaultTreasureAI
        }
    },
    {
        ents: ["Pellet"],
        AIProperties: {
            colour: PikminTypes[0]
        }
    },
    {
        ents: ["RopeFishing"],
        AIProperties: {
            ...defaultObjectAI,
            jumpForceXY: 300,
            jumpForceZ: 300,
            ropeAng: -30,
            manualWorkNum: 10
        }
    },
    {
        ents: ["ZiplineSplineMesh", 'ZiplineAnother'],
        AIProperties: {
            ...defaultObjectAI,
            goalOffset: defaultVector,
            startTargetSpeed: 150,
            maxMoveSpeed: 200,
            minMoveSpeed: 100,
            acceleration: 600,
            deceleration: 70,
            splinePoints: [defaultSplinePoint]
        }
    },
    {
        ents: ["PressFloor"],
        AIProperties: {
            ...defaultObjectAI,
            height: -40.0,
            maxHeightSpeed: 100.0,
            radius: 144.0,
            maxRadiusSpeed: 20.0,
            waterBoxId: "press000",
            createNavBoxRange: defaultVector,
            createNavBoxOffset: defaultVector
        }
    },
    {
        ents: ["Gate"],
        rareDrops: [],
        AIProperties: {
            startValidWallIndex: -1
        },
        Life: {
            maxLife: 8000,
            life: 8000
        }
    },
    {
        ents: ["Hiba", "Charcoal"],
        Life: {
            maxLife: 8000,
            life: 8000
        }
    }
];

//#region Creature Defaults
export const creatureDefaults = [
    {
        ents: ["KumaChappy"],
        AIProperties: {
            searchTagName: 'KumaChappyRootPoint',
            giveUpDistance: 300
        }
    },
    {
        ents: ["Patroller"],
        AIProperties: {
            searchTagName: 'PatrollerRootPoint',
            giveUpDistance: 300
        }
    },
    {
        ents: ['AmeBozu'],
        AIProperties: {
            bAppearSearch: false,
            searchTagName: 'AmeBozuRootPoint',
            hideTimeMin: 300,
            hideTimeMax: 300,
            bAppearFixedLocation: false,
            appearSearchRadius: 300,
            canAttackLevelFaceMessageName: "Teki_Announce_AmeBozu_01"
        }
    },
    {
        ents: ["Futakuchi", "YukiFutakuchi"],
        AIProperties: {
            rockMode: RockModes[0],
            searchTagName: 'FutakuchiRock',
            splineSearchArea: {
                center: defaultVector,
                halfHeight: 50,
                radius: 100,
                angle: 90,
                sphereRadius: 100
            },
            searchAreaAttack: {
                center: defaultVector,
                halfHeight: 100,
                radius: 700,
                angle: 6,
            },
            bFixCautionAreaCenter: false,
            bDisappearVisibleOff: false,
            searchAreaCaution: {
                center: defaultVector,
                halfHeight: 100,
                radius: 700,
                angle: 180,
                sphereRadius: 0
            }
        }
    },
    {
        ents: ["FutakuchiAdult"],
        AIProperties: {
            searchTagName: 'FutakuchiAdultRock',
            bSplineType: false,
            escapeSecMin: 0.0,
            escapeSecMax: 1.0,
            bCreateIcicle: 1,
            ratioWaitToWander: 0,
            vacuumHalfHeight: 20,
            attackArea: {
                center: defaultVector,
                halfHeight: 50,
                radius: 100,
                angle: 90,
                sphereRadius: 100
            },
            splineAttackParam: {
                attackLoopWaitSecMin: 1.0,
                attackLoopWaitSecMax: 1.5,
                attackSignSecMin: 1.0,
                attackSignSecMax: 3.0,
                attackInterval: 2.0,
                attackIntervalSuccess: 1.5
            },
            attackParam: {
                attackLoopWaitSecMin: 1.0,
                attackLoopWaitSecMax: 1.5,
                attackSignSecMin: 1.0,
                attackSignSecMax: 3.0,
                attackInterval: 2.0,
                attackIntervalSuccess: 1.5
            },
            searchAreaCaution: {
                center: defaultVector,
                halfHeight: 100,
                radius: 700,
                angle: 180,
                sphereRadius: 100
            }
        }
    },
    {
        ents: ["YukiFutakuchiAdult"],
        AIProperties: {
            searchTagName: 'FutakuchiAdultRock',
            bSplineType: false,
            escapeSecMin: 0.0,
            escapeSecMax: 1.0,
            bCreateIcicle: 1,
            ratioWaitToWander: 0,
            attackArea: {
                center: defaultVector,
                halfHeight: 50,
                radius: 100,
                angle: 90,
                sphereRadius: 100
            },
            splineAttackParam: {
                attackLoopWaitSecMin: 1.0,
                attackLoopWaitSecMax: 1.5,
                attackSignSecMin: 1.0,
                attackSignSecMax: 3.0,
                attackInterval: 2.0,
                attackIntervalSuccess: 1.5
            },
            attackParam: {
                attackLoopWaitSecMin: 1.0,
                attackLoopWaitSecMax: 1.5,
                attackSignSecMin: 1.0,
                attackSignSecMax: 3.0,
                attackInterval: 2.0,
                attackIntervalSuccess: 1.5
            },
            searchAreaCaution: {
                center: defaultVector,
                halfHeight: 100,
                radius: 700,
                angle: 180,
                sphereRadius: 100
            }
        }
    },
    {
        ents: ["HageDamagumo"],
        AIProperties: {
            searchTagName: 'HageDamagumoRootPoint',
            bStraddle: true,
            bSplineWalkStart: false,
            searchAreaRest: {
                center: {
                    ...defaultVector,
                    Z: 153
                },
                halfHeight: 300,
                radius: 600,
                angle: 180,
                sphereRadius: 100
            },
            bStraddle: false,
            bUniqueLife: false,
            uniqueLife: 5000,
            bAlreadyAppear: false,
            fightCameraChangeDistanceXY: 600
        }
    },
    {
        ents: ["DamagumoCannon"],
        AIProperties: {
            searchTagName: "None",
            bStraddle: false,
            bAlreadyAppear: true,
            searchAreaGoToHome: {
                center: {
                    ...defaultVector,
                    Z: 153
                },
                halfHeight: 300,
                radius: 600,
                angle: 180,
                sphereRadius: 100
            },
            searchAreaCaution: {
                center: {
                    ...defaultVector,
                    Z: 153
                },
                halfHeight: 300,
                radius: 600,
                angle: 180,
                sphereRadius: 100
            },
            searchAreaRest: {
                center: {
                    ...defaultVector,
                    Z: 153
                },
                halfHeight: 300,
                radius: 600,
                angle: 180,
                sphereRadius: 100
            }
        }
    },
    {
        ents: ["Yamashinju"],
        AIProperties: {
            dropPearlScale: 0.5,
            dropActor: "/Game/Carrot4/Placeables/Objects/Otakara/GOtaYamashinju.GOtaYamashinju_C",
            customParameter: "None"
        }
    },
    {
        ents: ["BigChappy"],
        AIProperties: {
            bHideEnter: true,
            hideOffset: {
                ...defaultVector
            }
        }
    },
    {
        ents: ["PanModoki", "OoPanModoki"],
        AIProperties: {
            routeTag: "PanModokiRoute1",
            hideAreaTag: "PanModokiHideArea1"
        }
    },
    {
        ents: ["Baby"],
        AIProperties: {
            bPatrolType: false,
            searchTagName: "BabyRoutePoint"
        }
    },
    {
        ents: ["BigUjinko"],
        AIProperties: {
            bPatrolType: false,
            bNoBurrowType: false,
            searchAreaTag: "BigUjinkoRootPoint"
        }
    },
    {
        ents: ["DodoroEgg"],
        AIProperties: {
            splineRoutePathTag: "DodoroRoutePoint010",
            subSplineRoutePathTag: "GsplineDodoro_test",
            spawnTimer: 60,
            bUseParentDropInfo: true,
            bOnceDodoroAppearDemo: false,
            spawnTimerAfterDemo: 0.1,
            refObstacleGenID: -1
        }
    },
    {
        ents: ["Queen"],
        AIProperties: {
            queenAIType: QueenAIType[0],
            rockBallHeightMin: 800,
            rockBallHeightMax: 1100,
            rockBallSpawnRadius: 150,
            rockBallSpawnOffsetY: 200,
            rockBallHeightMinInOppositeSide: 800,
            rockBallSpawnRadiusInOppositeSide: 1100,
            bornSpeed: 500,
            childSearchRadius: 400,
            fallBabySpawnRadius: 100,
            fallBabySpawnNum: 10,
            flickDistXY: 500
        }
    },
    {
        ents: ["Kurage", "OoKurage"],
        AIProperties: {
            eatOnBirthRange: 50.0,
            bFallStart: false,
            ownerSubComponentFlag: true,
            searchAreaRest: {
                center: {
                    ...defaultVector,
                },
                halfHeight: 100,
                radius: 350,
                angle: 180,
                sphereRadius: 30
            }
        },
    },
    {
        ents: ["Kogane", "OoKogane", "GasKogane"],
        dropLists: [],
        AIProperties: {
            canDieDropIndex: -1,
            bAppearRotatorFixed: false,
            turnAngleMin: 20.0,
            turnAngleMax: 30.0,
            searchAreaCaution: {
                center: {
                    ...defaultVector,
                },
                halfHeight: 100,
                radius: 350,
                angle: 180,
                sphereRadius: 30
            }
        }
    }
];