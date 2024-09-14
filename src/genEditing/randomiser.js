import { CreatureNames, TreasureNames, InfoType, OnionNames, RebirthTypes, ExploreRateTargetType, weirdAIEntities, DandoriChallengeMaps, StartingLevels, FinalFloors, OverworldPortals, PortalDestinations, HazardNames, WorkObjectNames, PikminTypes, OnionToPikminMap, onionWeights, DefaultDrop, DefaultActorSpawnerDrop, ActivityTimes } from "../api/types";
import { readMapData, saveMaps } from "../main";
import { getInfoType, deepCopy, getSubpathFromAsset, getAssetPathFromId, getNameFromAsset, doesEntityHaveDrops, getInfoTypeFromId, mutateAIProperties } from "../utils";
import { randomBytes } from 'crypto';
import logger from "../utils/logger";

const initMarkers = {
    [InfoType.Creature]: [],
    [InfoType.Treasure]: [],
    [InfoType.Gimmick]: [],
    [InfoType.Object]: [],
    [InfoType.WorkObject]: [],
    [InfoType.Pikmin]: [],
    [InfoType.Base]: [],
    [InfoType.Onion]: [],
    [InfoType.Hazard]: [],
    [InfoType.Portal]: [],
    [InfoType.Item]: []
};
const randInt = (max) => Math.floor(Math.random() * max);
const randIntBounded = (min, max) => Math.floor(Math.random() * (parseInt(max) - min + 1)) + min;
const randFloatBounded = (min, max) => parseFloat((Math.random() * (max - min + 1) + min).toFixed(4));
const randIntLowWeight = (min, max) => Math.round(max / (Math.random() * max + min));

const randFunctions = {
    even: randIntBounded,
    lowWeighted: randIntLowWeight
};

const randOnions = Object.keys(OnionNames).filter(k => !["OnyonBootUpRed", "Onyon", "OnyonCarryBoost"].includes(k));

const randomOnion = {
    "infoType": "onion",
    "creatureId": "",
    "transform": {
        "rotation": {
            "X": 0,
            "Y": 0,
            "Z": 0,
            "W": 1
        },
        "translation": {
            "X": 177.73437499999994,
            "Y": -1068.9880479928681,
            "Z": 270
        },
        "scale3D": {
            "X": 1,
            "Y": 1,
            "Z": 1
        }
    },
    "activityTime": "EActivityTime::Allday",
    "exploreRateType": "EExploreRateTargetType::None",
    "birthDay": 0,
    "deadDay": 0,
    "generateNum": 1,
    "generateRadius": 300,
    "rebirthType": "ERebirthType::NoRebirth",
    "rebirthInterval": 0,
    "outlineFolderPath": "Teki/Day",
    "birthCond": [],
    "eraseCond": [],
    "drops": {
        "parsed": []
    },
    "ddId": randomBytes(16).toString('hex'),
    "time": "Permanent"
};

const wildPiks = {
    "type": "object",
    "infoType": "pikmin",
    "creatureId": "",
    "transform": {
        "rotation": {
            "X": 0,
            "Y": 0,
            "Z": 0,
            "W": 1
        },
        "translation": {
            "X": 242.18749999999955,
            "Y": -1194.0116058872995,
            "Z": 270
        },
        "scale3D": {
            "X": 1,
            "Y": 1,
            "Z": 1
        }
    },
    "activityTime": "EActivityTime::Allday",
    "exploreRateType": "EExploreRateTargetType::None",
    "birthDay": 0,
    "deadDay": 0,
    "generateNum": 0,
    "generateRadius": 100,
    "rebirthType": "ERebirthType::NoRebirth",
    "rebirthInterval": 0,
    "outlineFolderPath": "Teki/Day",
    "birthCond": [],
    "eraseCond": [],
    "drops": {
        "parsed": []
    },
    "ddId": randomBytes(16).toString('hex'),
    "time": "Permanent"
};

const hubFlarlic = {
    "infoType": "onion",
    "creatureId": "OnyonCarryBoost",
    "transform": {
        "rotation": {
            "X": 0,
            "Y": 0,
            "Z": 0,
            "W": 1
        },
        "translation": {
            "X": 222.52064519331987,
            "Y": -1199.945836206156,
            "Z": 263.96630859
        },
        "scale3D": {
            "X": 1,
            "Y": 1,
            "Z": 1
        }
    },
    "activityTime": "EActivityTime::Allday",
    "exploreRateType": "EExploreRateTargetType::None",
    "generateNum": 1,
    "generateRadius": 150,
    "rebirthType": "ERebirthType::NoRebirth",
    "rebirthInterval": 0,
    "birthDay": 0,
    "deadDay": 0,
    "birthCond": [],
    "eraseCond": [],
    "drops": {
        "parsed": [],
        "rareDrops": [],
        "parsedSubAI": []
    },
    "ddId": randomBytes(16).toString('hex'),
    "time": "Permanent"
};

// This list filters out things we don't want to randomise or be randomised into
const randCreatures = Object.keys(CreatureNames).filter(k => ![
    "BossInu",
    "BossInu2",
    "Chaser",
    "GroupDropManager",
    "PikminRed",
    "PikminYellow",
    "PikminBlue",
    "PikminRock",
    "PikminWing",
    "PikminPurple",
    "PikminPhoton",
    "PikminWhite",
    "PikminIce",
    "GroupDropManager",
    "Queen", // Crashes if game can't place her in spaces - GenerateRadius doens't seem to help
    "AmeBozu", // Probably crashes without his spline,
].includes(k));

const bosses = [
    // 'AmeBozu',
    'BigFrog',
    'BigKingChappy',
    'BokeNameko',
    'DamagumoCannon',
    'Demejako',
    'DiscoDamagumo',
    'Dodoro',
    'DodoroEgg',
    'DokuNameko',
    'FutakuchiAdult',
    'HageDamagumo',
    'Hari',
    'KingChappy',
    'Mar',
    'MitsuMochi',
    'NiseBoss',
    'OoPanModoki',
    // 'Queen',
    'Sakadachi',
    'Shippo',
    'SnakeCrow',
    'YukiFutakuchiAdult',
    'Yukimushi'
];
const nonBosses = randCreatures.filter(c => !bosses.includes(c));
const nonDropList = [
    'ActorSpawner',
    'Kajiokoshi',
    'KinoKajiokoshi', // the slugs seem crashy for some reason, on some drops
    "MarigumoNet",
    "MarigumoNet_Low",
    // These two are possibly crashy - haven't replicated though
    // "Kanitama",
    // "Kogani"
];
const fillTreasureArray = excludeShips => Object.keys(TreasureNames).filter(t => excludeShips ^ t.includes('OtaHeroParts'));
const remainingTreasures = fillTreasureArray(true);
const remainingShipParts = fillTreasureArray(false);

// First level of each cave - tutorial excluded, I don't think we want people being able to go there
const startingLevels = [...StartingLevels];
const overworldPortals = [...OverworldPortals];
const portalDestinations = [...PortalDestinations];

const hazards = Object.keys(HazardNames).filter(h => !["Charcoal"].includes(h));
const objectsToRand = [
    "BikkuriGikuPlant",
    "BikkuriKinokoPlant",
    "Ooinu",
    "StickyFloor",
    "Mush",
    "Hikarikinoko",
    "Komush",
    "KomushS",
    "KomushL",
    "PoisonKomush",
    "PoisonKomushS",
    "PoisonKomushL",
    "PoisonKomush",
    "StickyFloor",
    "StickyFloor175uu",
    "StickyFloor525uu",
    "StickyMushPoison",
    "StickyMushC",
    "StickyMush",
    "StickyMushB",
    "ExcavationS",
    "ExcavationM",
    "ExcavationL"
];
const gimmicksToRand = [
    "CrackPotL",
    "CrackPotLAnother",
    "CrackPotS",
    "CrackPlanter",
    "CrackPotSAnother",
    "CrushJelly_S",
    "CrushJelly_M",
    "CrushJelly_L"
];
const objectRandFullList = [
    ...objectsToRand,
    ...gimmicksToRand,
    ...hazards
];

const objectRandLfLList = [
    ...objectsToRand,
    ...gimmicksToRand,
    ...hazards
];
const gates = Object.keys(WorkObjectNames).filter(w => w.includes('Gate'));
const pikminList = Object.values(PikminTypes).filter(p => !["PikminPhoton", "Not set (PongashiColor only)"].includes(p));
let appendCreatures;

const ignoreList = [
    "Chaser",
    "SplineChaser_LivingRoom",
    "SplineChaser_Kitchen",
    "AmeBozu",
    "Queen",
    "OtaPocketWatch",
    "OtaBankCardC",
    "OtaPinBadgeE"
    // All splines are added in this list already
];

const overworldPortalLinks = [];
const entrancePairMaps = [
    "Cave004_F01",
    "Cave009_F00",
    "Cave022_F03",
    "Cave014_F04"
];
// const overworldPortalTransforms = [
//     {
//         entrance: "Area001",
//         portalId: 6,
//         newPortalId: 7,
//     },
//     {
//         entrance: "Area002",
//         portalId: 58,
//         newPortalId: 53,
//     },
//     {
//         entrance: "Area003",
//         portalId: 52,
//         newPortalId: 55,
//     },
//     {
//         entrance: "Area010",
//         portalId: 56,
//         newPortalId: 51,
//     }
// ];

const pikminDropList = [
    "PikminRed",
    "PikminYellow",
    "PikminBlue",
    "PikminRock",
    "PikminWing",
    "PikminPurple",
    "PikminPhoton",
    "PikminWhite",
    "PikminIce"
];

const miscDropList = [
    "Bomb",
    "IceBomb",
    "Honey",
    "HomingBomb",
    "SearchBomb",
    "YuudouEsa",
    "DogFood",
    "PhotonBall",
    "ShugoFlag",
    "HotExtract",
    "PiecePick"
];

const nightCreatureList = [
    ...Object.keys(CreatureNames).filter(c => c.startsWith('Night')),
    "KareHambo",
    "BigKingChappy",
    "HageDamagumo",
    "KingChappy",
    "Arikui",
    "Chappy",
    "BigChappy",
    "IceChappy",
    "Kochappy",
    "KinoKochappy",
    "IceKochappy",
    "TenKochappy",
    "TentenChappy",
    "Baby",
    "Kemekuji",
    "Rusher",
    "Kajiokoshi",
    "KinoKajiokoshi",
    "IceMar",
    "Namazu",
    "KumaChappy",
    "KumaKochappy",
    "Dodoro",
    "DodoroEgg",
    "UjinkoB"
];

export const randomiser = async (config) => {
    logger.info(`randomiser config: ${JSON.stringify(config)}`);
    appendCreatures = config.allBosses ? bosses
        : config.retainNonBosses ? nonBosses : randCreatures;
    objectRandFullList.push(...appendCreatures);
    hubFlarlic.generateNum = parseInt(config.startingFlarlics);

    for (let i = 0; i < config.maps.length; i++) {
        let map = config.maps[i];
        // return Promise.all(config.maps.map(async map => {
        logger.info(`Randomising ${map}`);
        const markerData = await readMapData(map);
        let randomMarkers = deepCopy(initMarkers);
        //#region Randomise Hub
        if (map === 'Area500') {
            randomMarkers = deepCopy(markerData);
            randomMarkers[InfoType.Onion].push(hubFlarlic);

            if (!config.randStartingOnion) {
                await saveMaps(map, randomMarkers);
                continue;
            }
            logger.info("Randomising the hub");
            //For Area500 we just need to replace and randomise the start onion and place the required number of piks to collect it
            const onionIndex = randomMarkers[InfoType.Onion].findIndex(actor => actor.creatureId === "OnyonBootUpRed");
            const [startingOnion] = randOnions.splice([randInt(randOnions.length)], 1);
            if (!randOnions.length) randOnions.push(...Object.keys(OnionNames).filter(o => ["Onyon", "OnyonCarryBoost", "OnyonBootUpRed"].includes(o)));
            logger.info(`The starting onion has randomised to: ${startingOnion}`);

            randomMarkers[InfoType.Onion].splice(onionIndex, 1);

            randomMarkers[InfoType.Onion].push({
                ...randomOnion,
                creatureId: startingOnion
            });

            randomMarkers[InfoType.Pikmin].push({
                ...wildPiks,
                creatureId: OnionToPikminMap[startingOnion],
                generateNum: onionWeights[startingOnion]
            });
        }
        else if (DandoriChallengeMaps.includes(map)) continue;
        else if (map === 'Cave016_F19') continue;
        else if (map === 'Area011') continue;
        // Don't make the tutorial cave impossible
        else if (map === 'Cave000_F00') continue;

        else {
            // ActorSpawner drop ✅
            // Tateana SubAI drop ✅
            // Regular creatures ✅
            // bosses stay as they are ✅
            // Normals stay as they are ✅
            // Randomise or add drops ✅
            // Ignore things in the weird list  ✅
            // Eggs ✅?
            // Treasures ✅
            // Objects ✅
            // Gates ✅
            // Onions ✅
            // GDMs become a rando that drops the original drop? 

            //#region Randomise Creatures
            if (config.randCreatures) markerData[InfoType.Creature].forEach(creature => {
                if (map.startsWith('Night') && (!config.randomiseNight || creature.activityTime !== ActivityTimes.Nighttime))
                    return randomMarkers[InfoType.Creature].push(creature);

                logger.info(`Randomise creature: ${creature.creatureId}`);
                if (config.retainSpawners && "ActorSpawner" === creature.creatureId) {
                    logger.info(`Randomising ActorSpawner that has a translation of: ${JSON.stringify(creature.transform.translation)}`);
                    const actorSpawner = randomiseActorSpawnerDrop(creature, config, map);
                    logger.info(`ActorSpawner creation: ${JSON.stringify(actorSpawner)}`);
                    randomMarkers[InfoType.Creature].push(actorSpawner);
                }
                else if (weirdAIEntities.includes(creature.creatureId) || ignoreList.includes(creature.creatureId) || creature.creatureId.includes('Spline')) {
                    // ignore and push straight onto markers
                    randomMarkers[creature.infoType].push(creature);
                }
                else if (creature.creatureId.includes("Egg")) {
                    logger.info("Randomising egg drops");
                    randomiseRegularDrops(creature, config, map);

                    assignRebirth(creature, config);
                    randomMarkers[InfoType.Creature].push(creature);
                }
                // else if (creature.creatureId === 'GroupDropManager') {
                //     // GDMs could go on unchanged because they IGNORE things, not include them in the group
                //     // But there's a chance the things around it can rando into the ignored entities and make 
                //     // the GDM undroppable
                //     randomMarkers[InfoType.Creature].push(creature);
                // }
                else {
                    const creatureList = getCreatureList(creature.creatureId, config, false, map);
                    const creatureId = creatureList[randInt(creatureList.length)];
                    logger.info(`Creature ${creature.creatureId} has been randomised to: ${creatureId}`);
                    const infoType = getInfoTypeFromId(creatureId);

                    let randCreature = {
                        ...creature,
                        rebirthType: RebirthTypes.RebirthLater,
                        rebirthInterval: parseInt(config.rebirthInterval),
                        creatureId,
                        infoType
                    };
                    randCreature.generateNum = getGenerateNum(randCreature, config, InfoType.Creature);

                    // DodoroEgg's spawn centre is half inside the egg, so it usually spawns in the floor and clips through
                    // So we can boost him up so he drops on the actual floor
                    if ('DodoroEgg' === creatureId) randCreature.transform.translation.Z += 150;
                    if ('Yamashinju' === creatureId) randCreature.transform.translation.Z += 25;

                    mutateAIProperties(randCreature, infoType === InfoType.Creature ? infoType : creatureId);
                    // TODO: if things randomise into breadbugs/demejako/shako, spawn their burrows alongside so they function?
                    // GDMs retain their drops as a different entity
                    // if (randCreature.creatureId !== 'GroupDropManager') {
                    if (["Tateana", "ActorSpawner"].some(c => creatureId.includes(c)))
                        randCreature = randomiseActorSpawnerDrop(randCreature, config, map);
                    else randomiseRegularDrops(randCreature, config, map);
                    // }
                    randomMarkers[infoType].push(randCreature);
                }
            });
            else randomMarkers[InfoType.Creature] = markerData[InfoType.Creature];

            //#region Randomise Treasures
            if (config.randTreasures) markerData[InfoType.Treasure].forEach(treasure => {
                if (map.startsWith('Night'))
                    return randomMarkers[InfoType.Treasure].push(treasure);

                if (!ignoreList.includes(treasure.creatureId)) {
                    logger.info(`${treasure.creatureId} has been randomised to: `);
                    treasure.creatureId = randomiseTreasure(map);
                }
                randomMarkers[InfoType.Treasure].push(treasure);
            });
            else randomMarkers[InfoType.Treasure] = markerData[InfoType.Treasure];

            //#region Randomise Portals
            if (config.randPortals) markerData[InfoType.Portal].forEach(portal => {
                if (map.startsWith('Night'))
                    return randomMarkers[InfoType.Portal].push(portal);

                if (portal.PortalTrigger.toLevelName.includes('Cave016')) return randomMarkers[InfoType.Portal].push(portal);

                if (config.retainExits && portal.creatureId === 'DungeonExit') {
                    const cave = map.split('_')[0];
                    const overworldDestination = overworldPortalLinks.find(p => p.cave === cave);

                    // Ensure portals lead back to where they came from - except if it's a cave pair
                    if (overworldDestination && !entrancePairMaps.includes(map)) {
                        portal.PortalTrigger.toPortalId = overworldDestination.portalId;
                        portal.PortalTrigger.toLevelName = overworldDestination.entrance;
                    }

                    // This all works - except if two of the entrance-pairs randomise to the same cave
                    // the one of the pair's part of the map becomes inaccessible 

                    // From the overworld portal map, find the portal that:
                    // - leads to this cave
                    // - is from the area that has an entrance-pair
                    // - is from the portal with the ID that should go to the corresponding pair
                    // const overworldStart = overworldPortalLinks.find(p => p.cave === cave && overworldPortalTransforms.find(oP => oP.entrance === p.entrance && oP.portalId === p.portalId));

                    // // Even if multiple overworld caves lead to one cave
                    // // it'll be remapped to the hill pair if any of its entrances are from the pair
                    // if (overworldStart) {
                    //     const overworldOverride = overworldPortalTransforms.find(p => p.entrance === overworldStart.entrance);
                    //     portal.PortalTrigger.toPortalId = overworldOverride.newPortalId;
                    //     portal.PortalTrigger.toLevelName = overworldOverride.entrance;
                    // }
                }

                if (map.includes('Area') && portal.creatureId === 'MadoriRuins') {
                    // Overworld map, only randomise to a cave starting floor
                    //todo: make sure levels can't randomise to themselves
                    const [toLevelName] = startingLevels.splice(randInt(startingLevels.length), 1);
                    // I think there are more portals than starting levels as some caves double back
                    // so refill the array I guess? Entrances back will no longer go back to where you came
                    if (!startingLevels.length) startingLevels.push(...StartingLevels);
                    logger.info(`Overworld ${portal.creatureId} at ${JSON.stringify(portal.transform.translation)} has had its level randomised to: ${toLevelName}`);
                    logger.info(`Portals left: ${JSON.stringify(startingLevels)}`);
                    // This will result in all exits leading to the same exit hole 
                    // either transformed or original, unless we track and differentiate which one is that entrance portal
                    overworldPortalLinks.push({
                        entrance: map,
                        portalId: portal.PortalTrigger.portalNumber,
                        cave: toLevelName.split('_')[0]
                    });

                    randomMarkers[InfoType.Portal].push({
                        ...portal,
                        PortalTrigger: {
                            ...portal.PortalTrigger,
                            toLevelName,
                            disablePikminFlags: config.randDisabled ? randomiseDisableFlags() : portal.PortalTrigger.disablePikminFlags,
                            toBaseCampId: -1,
                            toPortalId: 0,
                            bDeactivateByExit: false
                        }
                    });
                }
                else if (!config.randOverworldOnly) {
                    // Cave portals randomise to any remaining floor - 
                    // cave ending floors will need to rando to overworlds 
                    if (FinalFloors.includes(map) && portal.creatureId === 'DungeonExit') {
                        // Map each exit to a corresponding exit portal ID in each area
                        // rest floors and mid-cave exits will probably goof the array length
                        // so it will need resetting
                        const [{ toLevelName, portalNumber }] = overworldPortals.splice(randInt(overworldPortals.length), 1);
                        if (!overworldPortals.length) overworldPortals.push(...OverworldPortals);
                        logger.info(`Final floor ${portal.creatureId} at ${JSON.stringify(portal.transform.translation)} has had its level randomised to: ${toLevelName}/${portalNumber}`);

                        randomMarkers[InfoType.Portal].push({
                            ...portal,
                            PortalTrigger: {
                                ...portal.PortalTrigger,
                                toLevelName,
                                toBaseCampId: -1,
                                toPortalId: portalNumber,
                                bDeactivateByExit: false
                            }
                        });
                    }
                    else if (portal.creatureId === 'DownPortal') {
                        // Splice from a list without the current map, so we can't randomise a portal to its own level
                        // Then remove it from the real array
                        const portalsWithoutMe = portalDestinations.filter(p => p !== map);
                        const [toLevelName] = portalsWithoutMe.splice(randInt(portalsWithoutMe.length), 1);
                        portalDestinations.splice(portalDestinations.findIndex(p => p === map), 1);
                        logger.info(`Cave ${portal.creatureId} at ${JSON.stringify(portal.transform.translation)} has had its level randomised to: ${toLevelName}`);

                        if (!portalDestinations.length) portalDestinations.push(...PortalDestinations);
                        randomMarkers[InfoType.Portal].push({
                            ...portal,
                            PortalTrigger: {
                                ...portal.PortalTrigger,
                                toLevelName,
                                toBaseCampId: -1,
                                toPortalId: 0
                            }
                        });
                    }
                    else randomMarkers[InfoType.Portal].push(portal);
                }
                else randomMarkers[InfoType.Portal].push(portal);
            });
            else randomMarkers[InfoType.Portal] = markerData[InfoType.Portal];

            //#region Randomise Objects
            if (config.randObjects) {
                let objectList = config.objectsLfL ? objectRandLfLList : objectRandFullList;
                if (map.match(/Area|Hero/) && config.noOverworldSnowfake) objectList = objectList.filter(e => e !== 'Yukimushi');

                markerData[InfoType.Object].forEach(object => {
                    if (objectsToRand.includes(object.creatureId)) {
                        if (map.startsWith('Night') && (!config.randomiseNight || object.activityTime !== ActivityTimes.Nighttime))
                            return randomMarkers[InfoType.Object].push(object);

                        const newObject = objectList[randInt(objectList.length)];
                        const newEnt = (map.includes('Cave') && config.forceCaves) || map.match(/Area|Hero/) ? newObject : object.creatureId;

                        const infoType = morphObject(object, config, newEnt, map);
                        randomMarkers[infoType].push(object);
                    }
                    else randomMarkers[InfoType.Object].push(object);
                });

                //#region Randomise Gimmicks
                markerData[InfoType.Gimmick].forEach(gimmick => {
                    if (map.startsWith('Night') && (!config.randomiseNight || gimmick.activityTime !== ActivityTimes.Nighttime))
                        return randomMarkers[InfoType.Gimmick].push(gimmick);

                    if (gimmicksToRand.includes(gimmick.creatureId)) {
                        const newObject = objectList[randInt(objectList.length)];
                        const newEnt = (map.includes('Cave') && config.forceCaves)
                            || !gimmick.creatureId.includes('CrushJelly')
                            && map.match(/Area|Hero/)
                            ? newObject : gimmick.creatureId;

                        const infoType = morphObject(gimmick, config, newEnt, map);
                        randomMarkers[infoType].push(gimmick);
                    }
                    else if (gimmick.creatureId.includes('NoraSpawner') && !config.retainWildPikmin) {
                        const newPikmin = pikminList[randInt(pikminList.length)];
                        gimmick.AIProperties.pikminType = newPikmin;
                        randomMarkers[InfoType.Gimmick].push(gimmick);
                    }
                    else if (config.retainSpawners && ["Tateana"].some(c => gimmick.creatureId.includes(c))) {
                        logger.info(`Randomising Tateana that has a translation of: ${JSON.stringify(gimmick.transform.translation)}`);
                        const actorSpawner = randomiseActorSpawnerDrop(gimmick, config, map);
                        randomMarkers[InfoType.Gimmick].push(actorSpawner);
                    }
                    else randomMarkers[InfoType.Gimmick].push(gimmick);
                });

                //#region Randomise workObjects
                markerData[InfoType.WorkObject].forEach(workObject => {
                    if (map.startsWith('Night') && (!config.randomiseNight || workObject.activityTime !== ActivityTimes.Nighttime))
                        return randomMarkers[InfoType.WorkObject].push(workObject);

                    if (workObject.creatureId.includes('Gate')) {
                        if (!config.excludeGates) workObject.creatureId = gates[randInt(gates.length)];
                        randomiseRegularDrops(workObject, config, map);
                    }
                    randomMarkers[InfoType.WorkObject].push(workObject);
                });

                //#region Randomise Hazards
                markerData[InfoType.Hazard].forEach(hazard => {
                    if (map.startsWith('Night') && (!config.randomiseNight || hazard.activityTime !== ActivityTimes.Nighttime))
                        return randomMarkers[InfoType.Hazard].push(hazard);

                    let newHazard;
                    if (config.hazardsLfL) {
                        newHazard = hazards[randInt(hazards.length)];
                    }
                    else newHazard = objectList[randInt(objectList.length)];
                    const newEnt = (map.includes('Cave') && config.forceCaves) || map.match(/Area|Hero/) ? newHazard : hazard.creatureId;

                    const infoType = morphObject(hazard, config, newEnt, map);
                    randomMarkers[infoType].push(hazard);
                });
            }
            else {
                randomMarkers[InfoType.Object] = markerData[InfoType.Object];
                randomMarkers[InfoType.Hazard] = markerData[InfoType.Hazard];
                randomMarkers[InfoType.Gimmick] = markerData[InfoType.Gimmick];
                randomMarkers[InfoType.WorkObject] = markerData[InfoType.WorkObject];
            }

            //#region Randomise Onions
            if (config.randAllOnions) {
                markerData[InfoType.Onion].forEach(onion => {
                    if (['Onyon', 'OnyonCarryBoost'].includes(onion.creatureId)) return randomMarkers[InfoType.Onion].push(onion);

                    const creatureId = randOnions.splice(randInt(randOnions.length), 1)[0];
                    logger.info(`${onion.creatureId} has been randomised to: ${creatureId}`);
                    onion.creatureId = creatureId;
                    if (!randOnions.length) randOnions.push(...Object.keys(OnionNames).filter(o => !["Onyon", "OnyonCarryBoost", "OnyonBootUpRed"].includes(o)));
                    randomMarkers[InfoType.Onion].push(onion);
                });
            }
            else randomMarkers[InfoType.Onion] = markerData[InfoType.Onion];

            randomMarkers[InfoType.Pikmin] = markerData[InfoType.Pikmin];
            randomMarkers[InfoType.Water] = markerData[InfoType.Water];
            randomMarkers[InfoType.Item] = markerData[InfoType.Item];
            randomMarkers[InfoType.Base] = markerData[InfoType.Base];
        }
        logger.info(`Saving ${map}`);

        // Remove any entities that disappear upon clearing caves to reduce walling
        if (config.randPortals) {
            randomMarkers[InfoType.Object] = randomMarkers[InfoType.Object]
                .filter(obj => !obj.eraseCond.some(cond => cond.CondName.includes("Quest_Generator_ClearCave")));
        }

        await saveMaps(map, randomMarkers);
    }
};

const randomiseObjectDrop = (creature, newId, config, map) => {
    const infoType = getInfoTypeFromId(newId);
    logger.info(`Object: ${creature.creatureId} (${creature.ddId}) has been randomised to: ${newId}`);
    creature.creatureId = newId;
    if (doesEntityHaveDrops({ creatureId: newId, infoType }))
        ["ActorSpawner", "Tateana", "TateanaBaby"].includes(newId) ?
            randomiseActorSpawnerDrop(creature, config, map) : randomiseRegularDrops(creature, config, map);
};

const randomiseDisableFlags = () => Object.fromEntries(Array.from({ length: 16 }, (_, i) => [i, Math.random() >= 0.5]));

const randomiseTreasure = (map) => {
    const isHero = map.includes('Hero');
    const treasureList = isHero ? remainingShipParts : remainingTreasures;
    const [newTreasure] = treasureList.splice(randInt(treasureList.length), 1);
    if (!treasureList.length) treasureList.push(...fillTreasureArray(isHero ? false : true));
    logger.info(`Random treasure selected: ${newTreasure}`);
    return newTreasure;
};

//#region Randomise Drops
export const randomiseRegularDrops = (randCreature, config, map) => {
    let parsed = randCreature?.drops?.parsed;
    if (!parsed) {
        randCreature.drops = { parsed: [] };
        parsed = randCreature.drops.parsed;
    }

    let lastDropId = 0;
    const isCreature = randCreature.infoType === InfoType.Creature;
    const objectDroppable = [InfoType.Object, InfoType.Gimmick, InfoType.Hazard, InfoType.WorkObject].includes(randCreature.infoType);

    // Object DropParameters don't have the flags number - so when a StickyFloor randos to
    // a creature, it's drops need to be adjusted to slot in as teki drops
    // Also accounts for Mush types which for some reason use the creature inventory
    // If a pot randomises to a creature or something, we need to ensure the existing drops are given flags
    // Treasyres aren't a big deal because they won't randomise into non-treasures
    parsed.forEach(drop => {
        if ((randCreature.infoType === InfoType.Creature || randCreature.creatureId.match(/Mush/i))) {
            if (!drop.flags) drop.flags = [1, 8, 16, 64];
            if (typeof drop.dropCondition === 'undefined') drop.dropCondition = 0;
        }
    });

    if ((config.randEnemyDrops && isCreature) || (objectDroppable && config.randObjectDrops)) {
        logger.info(`Randomising drops for ${randCreature.creatureId}`);

        const dropMutator = drop => {
            const infoType = getInfoType(getSubpathFromAsset(drop.assetName));
            lastDropId = drop.id;
            const name = getNameFromAsset(drop.assetName);

            // Creatures are turned into creatures
            if (infoType === InfoType.Creature) {
                mutateCreatureDrop(drop, config, map);
            }
            // Treasures into treasures
            else if (infoType === InfoType.Treasure) {
                const randTreasure = randomiseTreasure(map);
                drop.assetName = getAssetPathFromId(randTreasure);
            }
            // If configured, wild piks will randomise into other tpyes
            else if (name.startsWith('Pikmin') && !config.retainWildPikmin) {
                const newPikmin = pikminList[randInt(pikminList.length)];
                const newAsset = getAssetPathFromId(newPikmin);
                drop.assetName = newAsset;
            }
            // 90% chance that friendly drops are mutated on objects
            // 50/50 creature or a new misc (which itself is 50/50 to include pikmin)
            else if (
                ["Honey", "PiecePick", "HotExtract", "PiecePick"].includes(name)
                && (randCreature.creatureId.includes("Egg") || [InfoType.Gimmick, InfoType.Hazard].includes(randCreature.infoType))
            ) {
                if (Math.random() <= 0.5) mutateCreatureDrop(drop, config, map);
                else mutateMiscDrop(drop, config);
            }
            // Piecepick inflation, or 50% chance to override to a creature
            else if (name === 'PiecePick') {
                if (Math.random() < 0.5) {
                    drop.maxDrops = randIntBounded(4, 9);
                }
                else {
                    mutateCreatureDrop(drop, config, map);
                }
            }
            // 75% chance for honey/spicy in creatures to become creatures
            else if (
                ["Honey", "HotExtract"].includes(name)
                && Math.random() < 0.8
                && randCreature.infoType === InfoType.Creature
                && !["Egg", "Tateana"].includes(randCreature.creatureId)
            ) {
                mutateCreatureDrop(drop, config, map);
            }
            else if (!map.includes('Night') && name === 'HikariStation') {
                if (Math.random() <= 0.75) mutateCreatureDrop(drop, config, map);
                else mutateMiscDrop(drop, config);
            }

            // if honey/spicy are remaining drops, 40% chance they get randomised into other consumables
            if (
                ["Honey", "HotExtract"].includes(name)
                && Math.random() < 0.4
            ) {
                mutateMiscDrop(drop, config);
            }

            // Buff low drop chances so eggs do more.
            if (drop.dropChance <= 0.4) drop.dropChance += 0.3;
            // Prevent things like 5 material being randomised to 5-3 dumples.
            drop.minDrops = Math.min(drop.minDrops, drop.maxDrops);
        };

        parsed.forEach(dropMutator);
        if (randCreature.creatureId.includes('Gate')) randCreature.drops.rareDrops.forEach(dropMutator);

    }
    if ((config.allCreaturesDrop && isCreature) || (objectDroppable && config.allObjectsDrop)) {
        const invSize = randFunctions[config.randIntFunction](1, config.dropLimitMax);
        logger.info(`Padding inventory size to ${invSize} for ${randCreature.creatureId}`);
        while (parsed.length < invSize) {
            parsed.push(generateCreatureDrop(config, lastDropId += 1, randCreature, map));
        }
    }
};

const mutateMiscDrop = (drop, config) => {
    let list = miscDropList;
    if (Math.random() < 0.4) list = list.concat(pikminDropList);

    const newCreature = list[randInt(list.length)];
    const newAsset = getAssetPathFromId(newCreature);
    drop.assetName = newAsset;
    drop.maxDrops = parseInt(config.randMaxDrops);
};

const mutateCreatureDrop = (drop, config, map) => {
    const name = getNameFromAsset(drop.assetName);
    const creatureList = getCreatureList(name, config, true, map);
    const newCreature = creatureList[randInt(creatureList.length)];
    const newAsset = getAssetPathFromId(newCreature);
    drop.assetName = newAsset;
    drop.maxDrops = parseInt(config.randMaxDrops);
};

const generateCreatureDrop = (config, id, creature, map) => {
    let list = getCreatureList(creature.creatureId, config, true, map);

    if (["Egg", "BigEgg", 'Komush', 'Mush', 'CrackP'].includes(creature.creatureId) && Math.random() < 0.35) {
        list = miscDropList;
        if (Math.random() < 0.3) list = list.concat(pikminDropList);
    }
    if (creature.creatureId.includes('Gate') && Math.random() < 0.7) {
        list = miscDropList;
        if (Math.random() < 0.3) list = list.concat(pikminDropList);
    }

    return {
        ...DefaultDrop,
        assetName: getAssetPathFromId(list[randInt(list.length)]),
        id,
        maxDrops: parseInt(config.randMaxDrops)
    };
};

//#region ActorSpawner Drop
const randomiseActorSpawnerDrop = (creature, config, map) => {
    const dropProperty = creature.creatureId === 'ActorSpawner' ? "parsed" : "parsedSubAI";
    // Only modify the enemy component for now of tateanas

    if (!creature.drops) creature.drops = { parsed: [], parsedSubAI: [] };
    if (!creature.drops.parsed) creature.drops.parsed = [];

    let drop = creature.drops[dropProperty][0];
    let dropList;

    if (drop) {
        const droppedCreature = getNameFromAsset(drop.assetName);
        dropList = getCreatureList(droppedCreature, config, true, map);
    }
    // If something turns into an AS, it might have no drop, or the wrong type of drop
    // not an else if - it can already have a valid drop, but from a teki or object slot
    if (!drop || drop.infiniteSpawn === undefined) {
        drop = creature.drops[dropProperty][0] = deepCopy(DefaultActorSpawnerDrop);
        dropList = appendCreatures;
    }

    const newCreature = dropList[randInt(dropList.length)];
    logger.info(`${creature.creatureId}'s drop in ${dropProperty} has been randomised to: ${newCreature}`);

    const newAssetDrop = getAssetPathFromId(newCreature);
    let customParameter = drop.customParameter;
    if (newCreature.includes('Otakara') && Math.random() < 0.25) customParameter = "ShoulderBomb";

    const actorSpawner = {
        ...creature,
        rebirthType: RebirthTypes.RebirthLater,
        rebirthInterval: parseInt(config.rebirthInterval),
        drops: {
            ...creature.drops,
            [dropProperty]: [
                {
                    ...drop,
                    assetName: newAssetDrop,
                    customParameter,
                    infiniteSpawn: Math.random() < (parseFloat(config.asInfiniteChance) / 100) ? 1 : 0,
                    spawnLimit: randFunctions[config.randIntFunction](1, parseInt(config.asLimit)),
                    spawnInterval: randFloatBounded(1, parseFloat(config.asIntervalLimit))
                }
            ]
        }
    };

    if (creature.creatureId.includes('Tateana')) {
        randomiseRegularDrops(actorSpawner, config, map);
    }
    return actorSpawner;
};

//#region Creature List
const getCreatureList = (creature, config, isDrop, map) => {
    const isBoss = bosses.includes(creature);
    let list;

    // 15% for non-night enemies to be chucked into the mix
    if (map.startsWith('Night') && Math.random() <= 0.85) list = nightCreatureList;
    else if (config.allBosses) list = bosses;
    else if (isDrop && !config.bossesCanDrop) list = nonBosses;
    else if (isDrop && config.bossesCanDrop && Math.random() < (parseFloat(config.bossDropChance) / 100)) list = randCreatures;
    else if (isBoss) {
        if (config.retainBosses) list = bosses;
        else list = randCreatures;
    }
    else if (config.retainNonBosses) list = nonBosses;
    else list = randCreatures;

    if (map.match(/Area|Hero/) && config.noOverworldSnowfake) list = list.filter(e => e !== 'Yukimushi');

    // Let pikmin be in the drop pool sometimes so people have a lower chance of getting progression-locked
    // also includes consumables
    if (isDrop && Math.random() < 0.65) list = list.concat(miscDropList, pikminDropList);

    // Filter night enemies out of the pool so they don't occupy two slots for basically the same mob
    if (!map.startsWith('Night')) list = list.filter(i => !i.startsWith('Night'));

    // We don't want to drop ActorSpawners, but they should be spawnable
    return isDrop ? list.filter(e => !nonDropList.includes(e)) : list;
};

const assignRebirth = (ent, config, previousInfoType) => {
    if (ent.infoType === InfoType.Creature) {
        ent.generateNum = getGenerateNum(ent, config, previousInfoType);
        ent.rebirthType = RebirthTypes.RebirthLater;
        ent.rebirthInterval = parseInt(config.rebirthInterval);
    }
};

// Takes an entity, mutates a bunch of params, and returns the new infoType so it can be pushed onto the right arrau
const morphObject = (object, config, newObject, map) => {
    const previousInfoType = object.infoType;
    const infoType = getInfoTypeFromId(newObject);
    object.infoType = infoType;
    if ('DodoroEgg' === newObject) object.transform.translation.Z += 150;
    if ('Yamashinju' === newObject) object.transform.translation.Z += 25;

    // Allday bjects that morph into enemies on the overworld should stay on daytime only
    if (map.includes('Area') && infoType === InfoType.Creature && object.activityTime == ActivityTimes.Allday)
        object.activityTime = ActivityTimes.Daytime;

    mutateAIProperties(object, infoType === InfoType.Creature ? infoType : newObject);
    randomiseObjectDrop(object, newObject, config, map);
    assignRebirth(object, config, previousInfoType);
    return infoType;
};

const getGenerateNum = (ent, config, previousInfoType) => {
    const randFunction = randFunctions[config.randIntFunction];

    if (previousInfoType !== InfoType.Creature && config.objectsKeepGenerateNum)
        return ent.generateNum;
    return bosses.includes(ent.creatureId)
        ? (config.randBossGenerateNums ? randFunction(1, config.randBossGenerateNumLimit) : ent.generateNum)
        : (config.randGenerateNums ? randFunction(1, config.randGenerateNumLimit) : ent.generateNum);
};

// I can't randomise a subsection of the game because:
// we have no idea which items have already been placed in the game
// we're going to need to keep an array of every important item and splice from it
// upon placing things so we place everything at least once
// do we place some rules about progression like onions stay onions?