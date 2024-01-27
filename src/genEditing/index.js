
import { setFloats, getAssetPathFromId } from '../utils/utils';
import deepEqual from 'deep-equal';
import { getReadAIFunc } from './reading';
import { getConstructAIFunc } from './constructing';

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
        Rotation: setFloats(aglData.InitTransform.Rotation),
        Translation: setFloats(actor.transform.translation),
        Scale3D: setFloats(actor.transform.scale3D)
    };
    const originalAI = aglData.ActorSerializeParameter.AI.Static;
    const { parsed, inventoryEnd, AIProperties } = getReadAIFunc(actor.creatureId, actor.infoType)(originalAI);
    const isAIUnchanged = deepEqual({
        parsed,
        AIProperties
    }, {
        parsed: actor.drops.parsed,
        AIProperties: actor.AIProperties
    });
    let newAI = {};
    if (!isAIUnchanged) {
        console.log(actor.creatureId, "constructing new AI");
        newAI = {
            AI: {
                Static: getConstructAIFunc(actor.creatureId, actor.infoType)(actor.drops.parsed, originalAI, {
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
            ...newAI
        }
    };
    // console.log("regenerated:", newEntity.DropActorInfo.DropOwnerDebugUniqueId);
    delete newEntity.ddId;
    // console.log(newEntity);
    return newEntity;
};