
import { setFloats, getAssetPathFromId } from '../utils';
import deepEqual from 'deep-equal';
import { getReadAIFunc, getReadPortalFunc } from './reading';
import { getConstructAIFunc, getConstructPortalTriggerFunc, writeLifeDynamic, writeAffordanceWeight } from './constructing';

export const getSubpath = creatureId => {
    if (creatureId === 'ActorSpawner') return 'Gimmicks/ActorSpawner';
    if (creatureId === 'GroupDropManager') return 'Gimmicks/GroupDropManager';
    if (creatureId.includes('Egg')) return 'Objects/Egg';
    return 'Teki';
};

export const regenerateAGLEntity = (actor, aglData) => {
    console.log("AGL ID:", aglData.ddId);
    // There are non-tekis in the teki AGL - leave them be
    // Tekis/G is because splines are Teki/Other/Spline/GSpline....
    // const editables = ['Placeables/Teki/G', 'Gimmicks/ActorSpawner', 'Objects/Egg'];
    // if (!editables.some(asset => aglData.SoftRefActorClass.AssetPathName.includes(asset))) {
    //     const newEntity = {
    //         ...aglData
    //     };
    //     delete newEntity.ddId;
    //     return newEntity;
    // }
    const transforms = {
        Rotation: setFloats(actor.transform.rotation),
        Translation: setFloats(actor.transform.translation),
        Scale3D: setFloats(actor.transform.scale3D)
    };
    const originalAI = aglData.ActorSerializeParameter.AI.Static;
    const { parsed, inventoryEnd, AIProperties, rareDrops } = getReadAIFunc(actor.creatureId, actor.infoType)(originalAI);
    const isAIUnchanged = deepEqual({
        parsed,
        rareDrops,
        AIProperties
    }, {
        parsed: actor.drops.parsed,
        rareDrops: actor.drops.rareDrops,
        AIProperties: actor.AIProperties
    });
    let newAI = {};
    if (!isAIUnchanged) {
        console.log(actor.creatureId, "constructing new AI");
        newAI = {
            AI: {
                Static: getConstructAIFunc(actor.creatureId, actor.infoType)(actor.drops, originalAI, {
                    inventoryEnd,
                    groupingRadius: actor.groupingRadius,
                    ignoreList: actor.ignoreList,
                    AIProperties: actor.AIProperties
                }),
                Dynamic: aglData.ActorSerializeParameter.AI.Dynamic
            }
        };
    }
    else console.log(actor.creatureId, "AI is unchanged");

    const originalPT = aglData.ActorSerializeParameter.AI.Static;
    const { PortalTrigger } = getReadPortalFunc(actor.infoType)(aglData.ActorSerializeParameter.PortalTrigger.Static);
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
                Dynamic: aglData.ActorSerializeParameter.PortalTrigger.Dynamic
            }
        };
    }
    else console.log(actor.creatureId, "PT is unchanged");

    const newEntity = {
        ...aglData,
        SoftRefActorClass: {
            ...aglData.SoftRefActorClass,
            AssetPathName: getAssetPathFromId(actor.creatureId) || `/Game/Carrot4/Placeables/${getSubpath(actor.creatureId)}/G${actor.creatureId}.G${actor.creatureId}_C`,
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
            ...aglData.ActorSerializeParameter,
            ...newAI,
            ...newPT,
            Life: {
                Static: aglData.ActorSerializeParameter.Life.Static,
                Dynamic: actor.Life ? writeLifeDynamic(actor.Life) : aglData.ActorSerializeParameter.Life.Dynamic
            },
            Affordance: {
                Static: actor.weight ? writeAffordanceWeight(actor.weight, aglData.ActorSerializeParameter.Affordance) : aglData.ActorSerializeParameter.Affordance.Static,
                Dynamic: aglData.ActorSerializeParameter.Affordance.Dynamic
            }
        }
    };
    // console.log("regenerated:", newEntity.DropActorInfo.DropOwnerDebugUniqueId);
    delete newEntity.ddId;
    // console.log(newEntity);
    return newEntity;
};