import { InfoType, Times, defaultAIProperties, defaultTriggerAI, defaultSprinklerAI, defaultValveAI, defaultCreatureAI, weirdAIEntities, ActorPlacementCondition, DefaultActorSpawnerDrop, WaterBoxTextures, AmbientSoundIDs, defaultVector, defaultSplinePoint, RockModes } from "../api/types";
import { internalAssetNames } from "../api/assetList";

export const getNameFromAsset = assetName => {
    if (assetName === 'None') return assetName;
    return assetName.match(/\.G(.+)_C/)[1];
};
// Huge numbers like DropOwnerDebugUniqueId that are in JSON as numbers
// exceed MAX_SAFE_INTEGER, so as soon as JS parses them as numbers they're truncated.
// This can be identified in a 21~-length number that ends in 2000 usually.
// Wrap them as strings while we have the data as a string, then re-regex them back to 
// numbers after stringifying
// You'd think you could just replace /[0-9]{16,}/ but there are negatives, decimals, and 
// also BlobOfData that is just a super long STRING of numbers. So I stuck with this.
export const protectNumbers = string => {
    // ["OuterIndex", "ClassIndex", "SuperIndex", "GlobalImportIndex", "PublicExportHash", "DropOwnerDebugUniqueId", "DebugUniqueId"].forEach(key => {
    //     const regex = new RegExp(`${key}": ([0-9]+)(,)?`);
    //     string = string.replace(regex, `${key}": "$1"$2`);
    // });
    string = string.replace(/ (-?[0-9]{16,})/g, ' "$1"');
    return string;
};

export const unprotectNumbers = string => {
    // string = string.replace(/\s\"(-?[0-9]{16,22})\"/g, ' $1');
    string = string.replace(/(?<!"UnknownImport":)\s\"(-?[0-9]{16,22})\"/g, ' $1');
    return string;
};

export const setFloats = (obj) => {
    const newObj = {};
    Object.entries(obj).forEach(([key, val]) => newObj[key] = parseFloat(val));
    return newObj;
};

export const findMarkerById = (ddId, mapMarkerData) => {
    let marker;
    let type;
    Object.entries(mapMarkerData).forEach(([key, val]) => {
        const target = val.find(marker => marker.ddId === ddId);
        if (target) {
            marker = target;
            type = key;
        }
    });
    return {
        marker,
        type
    };
};

export const getAngleRotation = (q) => {
    const norm = Math.sqrt(q.W ** 2 + q.X ** 2 + q.Y ** 2 + q.Z ** 2);

    const angle = 2 * Math.acos(q.W / norm);
    return q.Z / norm < 0 ? -angle : angle;
};

export const getInfoType = subPath => {
    let infoType = InfoType.Object;
    if (subPath.includes('Objects/Otakara')) infoType = InfoType.Treasure;
    if (subPath.includes('Gimmicks/')) infoType = InfoType.Gimmick;
    if (subPath.includes('WorkObjects')) infoType = InfoType.WorkObject;
    if (subPath === 'Pikmin') infoType = InfoType.Pikmin;
    if (subPath.includes('/Camp')) infoType = InfoType.Base;
    if (subPath.includes('Onyon')) infoType = InfoType.Onion;
    if (["/Hiba", "/StickyFloor", "/Mush", "/FireFloor"].some(s => subPath.includes(s))) infoType = InfoType.Hazard;
    if (subPath.includes('/Portal')) infoType = InfoType.Portal;
    if (subPath.includes('/Madori')) infoType = InfoType.Portal;
    if (subPath.includes('/Charcoal')) infoType = InfoType.Hazard;
    if (subPath === 'Teki') infoType = InfoType.Creature;
    if (subPath === 'Items') infoType = InfoType.Item;
    if (subPath === 'Items/RockBall') infoType = InfoType.Item;
    if (subPath === 'Gimmicks/WarpCarry') infoType = InfoType.WorkObject;
    if (subPath === 'Gimmicks/ActorSpawner') infoType = InfoType.Creature;
    if (subPath === 'Objects/Egg') infoType = InfoType.Creature;
    if (subPath.includes('Spline')) infoType = InfoType.Creature;
    return infoType;
};

export const getSubpathFromAsset = asset => {
    if (asset === 'None') return asset;
    return asset.match(/Placeables\/(.+)\/G/)[1];
};

export const capitalise = string => string.charAt(0).toUpperCase() + string.slice(1);

export const getAssetPathFromId = id => id === 'None' ? "None" : internalAssetNames.find(asset => asset.includes(`G${id}_C`));

export const getInfoTypeFromId = id => getInfoType(getSubpathFromAsset(getAssetPathFromId(id)));

export const getAvailableTimes = mapId => {
    if (['HeroStory', 'Cave', 'Area011', 'Area500'].some(area => mapId.includes(area))) return [Times.PERM];
    if (mapId.includes('Night')) return [Times.NIGHT, Times.PERM];
    return [Times.DAY, Times.PERM];
};

export const findObjectKey = (object, target) => Object.keys(object).find(key => key === target);

export const findObjectKeyByValue = (object, target) => Object.keys(object).find(key => object[key] === target);

export const doesEntityHaveDrops = entity => {
    if (weirdAIEntities.some(e => e === entity.creatureId)) return false;
    if (entity.infoType === InfoType.Creature) return true;

    if (["Mush", "PoisonMush"].some(e => e === entity.creatureId)) return true; // Mush is a substring of several other entities that aren't ready yet
    return [
        "NoraSpawner",
        "CrackP",
        "GroupDropManager",
        "CrushJelly",
        "Gate",
        "Tateana",
        "Komush",
        "MushS",
        "MushL",
        "StickyMush",
        "StickyFloor"
    ].some(asset => entity.creatureId.includes(asset));
};

export const doesEntityHaveRareDrops = entity => {
    return ["Gate"].some(asset => entity.creatureId.includes(asset));
};

export const getObjectAIOffset = generatorVersion => generatorVersion === 8626647386 ? 0 : 4;

export const shouldIconRotate = creatureId => {
    if (creatureId.includes('Gate')) return true;
    if (creatureId.includes('TriggerDoor')) return true;
    if (creatureId.includes('Fence')) return true;
    if (creatureId.includes('HandleBoard')) return true;
    if (creatureId.includes('YBox')) return true;
    if (creatureId.includes('XBox')) return true;
    if (creatureId.includes('Flexible')) return true;
    if (creatureId.includes('Switch')) return true;
    if (creatureId.includes('Slope')) return true;
    if (creatureId.includes('PullNekko')) return true;
    if (['DownWall', 'Conveyor265uu', 'SpaceBus'].some(asset => asset === creatureId)) return true;
};

export const findSequenceStartIndex = (array, offset, sequence) => {
    for (let i = offset; i <= array.length - sequence.length; i++) {
        if (array.slice(i, i + sequence.length).every((value, index) => value === sequence[index])) {
            return i;
        }
    }
    return -1;
};

export const deepCopy = obj => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof Array) {
        return obj.reduce((arr, item, i) => {
            arr[i] = deepCopy(item);
            return arr;
        }, []);
    }

    if (obj instanceof Object) {
        return Object.keys(obj).reduce((newObj, key) => {
            newObj[key] = deepCopy(obj[key]);
            return newObj;
        }, {});
    }
};

// This function has become huge and warrants its own file now
// Takes in the entity object and fetches defaults for a creature/infoType passed in
export const mutateAIProperties = (creature, newCreatureId, newInfoType = '') => {
    const aiEnts = ['Camp'];

    [
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
            AIProperties: defaultValveAI,
            ActorParameter: {
                demoBindName: 'GValveOnce00'
            }
        },
        {
            ents: ['StickyFloor'],
            AIProperties: { bAutoSpawnMush: false }
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
                bEnableCustomSoftEdge: true,
                bDisableSoftEdge: false,
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
                snapRadius: 30.0,
                snapHeight: 30.0,
                bUseSnapHeight: false
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
        }
    ].forEach(o => {
        aiEnts.push(...o.ents);
        if (o.ents.some(e => newCreatureId.includes(e)) || o.infoTypes?.some(e => newInfoType.includes(e))) { // There was an && !creature.AIProperties here, I forget why
            ["AIProperties", "ActorParameter", "NavMeshTrigger", "WaterTrigger"].forEach(prop => {
                if (o[prop]) creature[prop] = { ...deepCopy(o[prop]) };
                else delete creature[prop];
            });

            ["parsed", "parsedSubAI"].forEach(prop => {
                if (o[prop]) creature.drops[prop] = deepCopy(o[prop]);
            });
        }
    });

    // Layer creature-specific AIProps over the top
    if (creature.infoType === InfoType.Creature)
        [
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
                    "searchDistance?": 300,
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
                    bDissapearVisibleOff: false,
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
                ents: ["FutakuchiAdult", "YukiFutakuchiAdult"],
                AIProperties: {
                    searchTagName: 'FutakuchiAdultRock',
                    bSplineType: false,
                    escapeSecMin: 0.0,
                    escapeSecMax: 1.0,
                    bCreateIcicle: true,
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
                        sphereRadius: 0.69
                    }
                }
            },
            {
                ents: ["HageDamagumo"],
                AIProperties: {
                    searchTagName: 'HageDamagumoRootPoint',
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
                    searchAreaTag: "BabyRoutePoint"
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
        ].forEach(o => {
            if (o.ents.some(e => newCreatureId === e)) {
                creature.AIProperties = {
                    ...creature.AIProperties,
                    ...o.AIProperties
                };
            }
        });

    if (!aiEnts.some(e => newCreatureId.includes(e)) && creature.AIProperties && creature.infoType != InfoType.Creature) {
        delete creature.AIProperties;
        delete creature.NavMeshTrigger;
        delete creature.ActorParameter;
        delete creature.WaterTrigger;
    }
};

// An entity should show on night maps if: 
// - it has no birth conditions (caught by [].every()) 
// - none of its birth condiions are NightAdventurePattern
// - For NightAdventurePattern, it's CondInt is equal to the mission ID (night map ID - 1)
export const isEntityOnNightMap = (entity, mapId) => {
    const nightStage = mapId.slice(-1);

    const nonNightCondition = entity.birthCond.every(cond => cond.Condition !== ActorPlacementCondition.NightAdventurePattern);
    return nonNightCondition || entity.birthCond.some(cond =>
        cond.Condition === ActorPlacementCondition.NightAdventurePattern && parseInt(cond.CondInt) + 1 == nightStage
    );
};