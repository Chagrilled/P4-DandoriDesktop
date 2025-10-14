
import { setFloats, getAssetPathFromId } from '../utils';
import deepEqual from 'deep-equal';
import { getReadAIDynamicFunc, getReadAIStaticFunc, getReadPortalFunc } from './reading';
import { getConstructAIStaticFunc, getConstructPortalTriggerFunc, writeLifeDynamic, writeAffordanceWeight, getConstructDynamicFunc, getConstructActorParamFunc, ASP_FIELDS, getConstructNavMeshTriggerFunc, getConstructSubAIStaticFunc, getConstructWaterTriggerFunc } from './constructing';
import { default as entityData } from '../api/entityData.json';
import { TeamIDs, InfoType } from '../api/types';
import logger from '../utils/logger';

export const getSubpath = creatureId => {
    if (creatureId === 'ActorSpawner') return 'Gimmicks/ActorSpawner';
    if (creatureId === 'GroupDropManager') return 'Gimmicks/GroupDropManager';
    if (creatureId.includes('Egg')) return 'Objects/Egg';
    return 'Teki';
};

export const regenerateAGLEntity = (actor, aglData) => {
    // console.log("AGL ID:", aglData.ddId);
    const transforms = {
        Rotation: setFloats(actor.transform.rotation),
        Translation: setFloats(actor.transform.translation),
        Scale3D: setFloats(actor.transform.scale3D)
    };
    const asp = aglData.ActorSerializeParameter;
    let entData = entityData[actor.creatureId];

    if (!entData && actor.infoType === InfoType.Treasure) {
        // see constructing.js for why
        entData = entityData.OtaPaintsAQU;
    }
    if (!entData && actor.infoType === InfoType.Pikmin) {
        entData = entityData.PikminRed;
    }
    if (!entData && actor.creatureId === "NightBaby") {
        entData = entityData.Baby;
    }
    if (!entData && actor.creatureId === "Dodoro") {
        entData = entityData.Kochappy;
    }
    if (!entData && actor.creatureId === "PoisonKomush") {
        entData = entityData.PoisonKomushS;
    }
    if (!entData && actor.creatureId === "OnyonCarryRed") {
        entData = entityData.OnyonCarryYellow;
    }
    if (!entData && actor.infoType === InfoType.Item) {
        entData = entityData.Bomb;
    }

    const assetPathName = getAssetPathFromId(actor.creatureId) || `/Game/Carrot4/Placeables/${getSubpath(actor.creatureId)}/G${actor.creatureId}.G${actor.creatureId}_C`;
    const newAsset = assetPathName !== aglData.SoftRefActorClass.AssetPathName;
    console.log("is it different?", newAsset);
    const generatorVersion = newAsset ? entData.GeneratorVersion[0] : aglData.GeneratorVersion;
    const assetVersion = newAsset ? entData.AssetVersion[0] : aglData.AssetVersion;

    const originalAI = asp.AI.Static;
    const originalAI_Dynamic = asp.AI.Dynamic;

    const aiStatic = newAsset ? entData.AI[0].Static : originalAI;
    const aiDynamic = newAsset ? entData.AI[0].Dynamic : originalAI_Dynamic;

    // If the asset has changed, don't use the existing AGL ASP as it will likely be wrong
    const { parsed, inventoryEnd, AIProperties: existingAIP, rareDrops } = getReadAIStaticFunc(actor.creatureId, actor.infoType)(aiStatic, generatorVersion, actor.creatureId);
    const dynamicAI = getReadAIDynamicFunc(actor.creatureId, actor.infoType)(aiDynamic);
    const AIProperties = { ...existingAIP, ...dynamicAI };

    logger.info(`Generating new actor ${actor.creatureId}from the following properties:`);
    logger.info(JSON.stringify(AIProperties));

    const isAIEqual = deepEqual({
        parsed,
        rareDrops,
        AIProperties
    }, {
        parsed: actor.drops.parsed,
        rareDrops: actor.drops.rareDrops,
        AIProperties: actor.AIProperties
    });
    let newAI = {};
    logger.info(`Is AI equal? ${isAIEqual}`);
    if (!isAIEqual || newAsset) {
        logger.info(`${actor.creatureId}: constructing new AI: at ${JSON.stringify(actor.transform.translation)}`);
        // If an object or enemy is changed in-place to another type, its existing AI in the AGL will be used as a base
        // Which means we'll be modifying the AI of something else, in-place, assuming it's the same type we're constructing
        // i.e constructing a NoraSpawner using the existing bytes of a Gate. Not good.
        // if the asset has changed, regenerate using the defaults.

        newAI = {
            AI: {
                Static: getConstructAIStaticFunc(actor.creatureId, actor.infoType)(actor.drops, aiStatic, {
                    inventoryEnd,
                    groupingRadius: actor.groupingRadius,
                    ignoreList: actor.ignoreList,
                    AIProperties: actor.AIProperties,
                    transform: transforms.Translation
                }, generatorVersion, actor.creatureId),
                Dynamic: getConstructDynamicFunc(actor.creatureId, actor.infoType)(aiDynamic, {
                    AIProperties: actor.AIProperties
                })
            }
        };
    }
    else console.log(actor.creatureId, "AI is unchanged");

    const originalPT = asp.PortalTrigger.Static;
    const { PortalTrigger } = getReadPortalFunc(actor.infoType)(asp.PortalTrigger.Static);
    const isPTUnchanged = deepEqual({
        PortalTrigger,
        transform: aglData.Transform.Translation
    }, {
        PortalTrigger: actor.PortalTrigger,
        transform: transforms.Translation
    });
    let newPT = {};
    if (!isPTUnchanged) {
        logger.info(`${actor.creatureId}: constructing new PortalTrigger from, ${JSON.stringify(actor.PortalTrigger)}`);
        newPT = {
            PortalTrigger: {
                Static: getConstructPortalTriggerFunc(actor.infoType)(actor, originalPT),
                Dynamic: asp.PortalTrigger.Dynamic
            }
        };
    }

    const newAP = {
        ActorParameter: {
            Static: newAsset ? entData.ActorParameter[0].Static : asp.ActorParameter.Static,
            Dynamic: newAsset ? entData.ActorParameter[0].Dynamic : asp.ActorParameter.Dynamic
        }
    };

    const newWT = {
        WaterTrigger: {
            Static: newAsset ? entData.WaterTrigger[0].Static : asp.WaterTrigger.Static,
            Dynamic: newAsset ? entData.WaterTrigger[0].Dynamic : asp.WaterTrigger.Dynamic
        }
    };

    // Only tateanas seem to use SubAI for an AS gen var, so jank the func to work with that.
    let subAI = {};
    if (actor.creatureId.includes('Tateana')) subAI = {
        SubAI: {
            Static: getConstructSubAIStaticFunc(actor.creatureId)({ parsed: actor.drops.parsedSubAI }),
            Dynamic: []
        }
    };

    if (actor.ActorParameter) {
        newAP.ActorParameter.Static = getConstructActorParamFunc(actor.creatureId)(newAP.ActorParameter.Static, actor.ActorParameter);
    }

    if (actor.WaterTrigger) {
        newWT.WaterTrigger.Static = getConstructWaterTriggerFunc(actor.creatureId)(newWT.WaterTrigger.Static, actor.WaterTrigger);
    }

    const newASP = {
        ...asp
    };

    // If the asset has swapped, default ALL ASP fields
    if (newAsset) {
        ASP_FIELDS.forEach(field => newASP[field] = entData[field][0]);
    }

    const newEntity = {
        ...aglData,
        GeneratorVersion: generatorVersion,
        AssetVersion: assetVersion,
        SoftRefActorClass: {
            ...aglData.SoftRefActorClass,
            AssetPathName: assetPathName,
        },
        InitTransform: transforms,
        Transform: transforms,
        GenerateInfo: {
            ...aglData.GenerateInfo,
            GenerateNum: parseInt(actor.generateNum),
            GenerateRadius: parseFloat(actor.generateRadius),
            bOnceWakeCond: actor.bOnceWakeCond,
            bNoChkCondWhenDead: actor.bNoChkCondWhenDead,
            SleepCond: actor.sleepCond.map(cond => ({
                ...cond,
                Condition: cond.Condition,
                CondInt: parseInt(cond.CondInt),
            })),
            WakeCond: actor.wakeCond.map(cond => ({
                ...cond,
                Condition: cond.Condition,
                CondInt: parseInt(cond.CondInt),
            }))
        },
        ExploreRateType: actor.exploreRateType,
        RebirthInfo: {
            ...aglData.RebirthInfo,
            ActivityTime: actor.activityTime,
            RebirthType: actor.rebirthType,
            CurrNum: parseInt(actor.generateNum),
            RebirthInterval: parseInt(actor.rebirthInterval) || 0,
            BirthDay: parseInt(actor.birthDay) || 0,
            DeadDay: parseInt(actor.deadDay) || 0,
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
        ActorSerializeParameter: {
            ...newASP,
            ...newAI,
            ...newPT,
            ...newAP,
            ...newWT,
            Life: {
                Static: asp.Life.Static,
                Dynamic: actor.Life ? writeLifeDynamic(actor.Life) : newAsset ? asp.Life.Dynamic : asp.Life.Dynamic
            },
            Affordance: {
                Static: actor.weight ? writeAffordanceWeight(actor.weight, asp.Affordance) : newAsset ? asp.Affordance.Static : asp.Affordance.Static,
                Dynamic: asp.Affordance.Dynamic
            },
            NavMeshTrigger: {
                Static: getConstructNavMeshTriggerFunc(actor.creatureId)(newAsset ? entData.NavMeshTrigger[0].Static : asp.NavMeshTrigger.Static, actor.NavMeshTrigger),
                Dynamic: newAsset ? entData.NavMeshTrigger[0].Dynamic : asp.NavMeshTrigger.Dynamic
            },
            ...subAI
        },
        LastNavPos: transforms.Translation,
        TeamId: actor.creatureId.startsWith('NavMeshTrigger') ? TeamIDs.A : TeamIDs.No
    };
    // console.log("regenerated:", newEntity.DropActorInfo.DropOwnerDebugUniqueId);
    delete newEntity.ddId;
    // console.log(newEntity);
    return newEntity;
};