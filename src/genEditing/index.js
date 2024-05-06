
import { setFloats, getAssetPathFromId } from '../utils';
import deepEqual from 'deep-equal';
import { getReadAIDynamicFunc, getReadAIStaticFunc, getReadPortalFunc } from './reading';
import { getConstructAIStaticFunc, getConstructPortalTriggerFunc, writeLifeDynamic, writeAffordanceWeight, getConstructDynamicFunc, getConstructActorParamFunc, ASP_FIELDS, getConstructNavMeshTriggerFunc } from './constructing';
import { default as entityData } from '../api/entityData.json';
import { TeamIDs } from '../api/types';

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
    const entData = entityData[actor.creatureId];
    const assetPathName = getAssetPathFromId(actor.creatureId) || `/Game/Carrot4/Placeables/${getSubpath(actor.creatureId)}/G${actor.creatureId}.G${actor.creatureId}_C`;
    const newAsset = assetPathName !== aglData.SoftRefActorClass.AssetPathName;
    console.log("is it different?", newAsset);
    const originalAI = asp.AI.Static;
    const originalAI_Dynamic = asp.AI.Dynamic;
    const { parsed, inventoryEnd, AIProperties: staticAI, rareDrops } = getReadAIStaticFunc(actor.creatureId, actor.infoType)(originalAI);
    const dynamicAI = getReadAIDynamicFunc(actor.creatureId, actor.infoType)(originalAI_Dynamic);
    const AIProperties = { ...staticAI, ...dynamicAI };

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
    console.log("Is AI equal?", isAIEqual);
    if (!isAIEqual || newAsset) {
        console.log(actor.creatureId, "constructing new AI");
        // If an object or enemy is changed in-place to another type, its existing AI in the AGL will be used as a base
        // Which means we'll be modifying the AI of something else, in-place, assuming it's the same type we're constructing
        // i.e constructing a NoraSpawner using the existing bytes of a Gate. Not good.
        // if the asset has changed, regenerate using the defaults.
        const aiStatic = newAsset ? entData.AI[0].Static : originalAI;
        const aiDynamic = newAsset ? entData.AI[0].Dynamic : originalAI_Dynamic;
        newAI = {
            AI: {
                Static: getConstructAIStaticFunc(actor.creatureId, actor.infoType)(actor.drops, aiStatic, {
                    inventoryEnd,
                    groupingRadius: actor.groupingRadius,
                    ignoreList: actor.ignoreList,
                    AIProperties: actor.AIProperties,
                    transform: transforms.Translation
                }),
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
        console.log(actor.creatureId, "constructing new PortalTrigger");
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

    if (actor.ActorParameter) {
        newAP.ActorParameter.Static = getConstructActorParamFunc(actor.creatureId)(newAP.ActorParameter.Static, actor.ActorParameter);
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

        },
        RebirthInfo: {
            ...aglData.RebirthInfo,
            RebirthType: actor.rebirthType,
            RebirthInterval: parseInt(actor.rebirthInterval) || 0,
            BirthDay: parseInt(actor.birthDay) || 0,
            DeadDay: parseInt(actor.deadDay) || 0
        },
        ActorSerializeParameter: {
            ...newASP,
            ...newAI,
            ...newPT,
            ...newAP,
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
            }
        },
        LastNavPos: transforms.Translation,
        TeamId: actor.creatureId.startsWith('NavMeshTrigger') ? TeamIDs.A : TeamIDs.No
    };
    // console.log("regenerated:", newEntity.DropActorInfo.DropOwnerDebugUniqueId);
    delete newEntity.ddId;
    // console.log(newEntity);
    return newEntity;
};