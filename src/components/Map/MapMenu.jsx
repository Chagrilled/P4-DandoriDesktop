import React, { useContext } from 'react';

import { Menu, Item, Separator, Submenu } from 'react-contexify';
import { RebirthTypes, DefaultActorSpawnerDrop, InfoType, DefaultPortalTrigger, defaultBaseAIProperties, defaultCreatureAI, ActivityTimes, ActorPlacementCondition, ExploreRateTargetType, defaultTreasureAI, PikminTypes } from '../../api/types';
import { deepCopy, getAvailableTimes } from '../../utils';
import { MapContext } from './MapContext';

const { Creature, Treasure, Gimmick, Object, WorkObject, Pikmin, Base, Onion, Hazard, Portal } = InfoType;

export const MapMenu = ({ }) => {
    const { mapMarkerData, setMapData, mapId } = useContext(MapContext);

    const getDefaultId = (id) => {
        return {
            [Creature]: 'Kochappy',
            ActorSpawner: 'ActorSpawner',
            GroupDropManager: 'GroupDropManager',
            [Base]: 'OnyonCamp',
            [Gimmick]: 'CrackPotL',
            [Hazard]: 'Hiba',
            [Onion]: 'OnyonCarryBoost',
            [Object]: 'Pellet1',
            [Portal]: 'MadoriRuins',
            [WorkObject]: 'PiecePick',
            [Pikmin]: 'PikminRed',
            [Treasure]: 'OtaBanana',
            [InfoType.Item]: 'Bomb'
        }[id];
    };

    const handleItemClick = ({ id, event, props: { coords } }) => {
        const infoType = id === 'GroupDropManager' ? Gimmick : id === 'ActorSpawner' ? Creature : id;

        const newMarker = {
            infoType,
            creatureId: getDefaultId(id),
            transform: {
                rotation: {
                    X: 0.0,
                    Y: 0.0,
                    Z: 0.0,
                    W: 1.0
                },
                translation: {
                    X: coords.x,
                    Y: coords.y,
                    Z: 100.0
                },
                scale3D: {
                    X: 1.0,
                    Y: 1.0,
                    Z: 1.0
                }
            },
            ...(id === 'GroupDropManager' && {
                groupingRadius: 300.0,
                ignoreList: []
            }),
            activityTime: ActivityTimes.Allday,
            exploreRateType: ExploreRateTargetType.None,
            generateNum: 1,
            generateRadius: 300,
            rebirthType: RebirthTypes.NoRebirth,
            rebirthInterval: 0,
            birthDay: 0,
            deadDay: 0,
            ddId: window.crypto.randomUUID(),
            birthCond: [],
            eraseCond: [],
            sleepCond: [],
            wakeCond: [],
            drops: {
                parsed: [],
                rareDrops: [],
                parsedSubAI: [],
            }
            // Leave generatorVersion off here so we don't influence the offsets when constructing AI
            // as the entData[0] might be a long or short OAIP so GeneratorVersion should also be derived from that
        };

        if (id === 'ActorSpawner') newMarker.drops.parsed[0] = deepCopy(DefaultActorSpawnerDrop);
        if (id === 'GroupDropManager') {
            newMarker.infoType = InfoType.Gimmick;
            newMarker.ignoreList = "[]";
            newMarker.groupingRadius = 300;
        }
        if (id === Portal) newMarker.PortalTrigger = deepCopy(DefaultPortalTrigger);
        if (id !== Creature) newMarker.time = getAvailableTimes(mapId)[0];
        if (id === Base) newMarker.AIProperties = deepCopy(defaultBaseAIProperties);
        if (id === Creature) {
            newMarker.AIProperties = deepCopy(defaultCreatureAI);
            if (mapId.includes("Night")) newMarker.birthCond.push({
                Condition: ActorPlacementCondition.NightAdventurePattern,
                CondInt: parseInt(mapId.slice(-1)) - 1,
                CondName: "None",
                CondPikminColor: "EPikminColor::Undef"
            });
            newMarker.rebirthType = RebirthTypes.RebirthLater;
            newMarker.rebirthInterval = 4;
        }
        if (id === Treasure) newMarker.AIProperties = deepCopy(defaultTreasureAI);
        if (id === Object) newMarker.AIProperties = { colour: PikminTypes[0] };

        setMapData({
            ...mapMarkerData,
            [infoType]: [
                ...mapMarkerData[infoType],
                newMarker
            ]
        });
    };

    return (
        <div>
            <Menu id={'MAP_MENU'}>
                <Item id={InfoType.Creature} onClick={handleItemClick}>Creature</Item>
                <Item id="ActorSpawner" onClick={handleItemClick}>ActorSpawner</Item>
                <Item id="GroupDropManager" onClick={handleItemClick}>GroupDropManager</Item>
                <Separator />
                <Submenu label="Objects">
                    <Item id={Gimmick} onClick={handleItemClick}>Gimmick</Item>
                    <Item id={Object} onClick={handleItemClick}>Object</Item>
                    <Item id={WorkObject} onClick={handleItemClick}>WorkObject</Item>
                    <Item id={Pikmin} onClick={handleItemClick}>Pikmin</Item>
                    <Item id={Base} onClick={handleItemClick}>Base</Item>
                    <Item id={Onion} onClick={handleItemClick}>Onion</Item>
                    <Item id={Hazard} onClick={handleItemClick}>Hazard</Item>
                    <Item id={Portal} onClick={handleItemClick}>Portal</Item>
                    <Item id={Treasure} onClick={handleItemClick}>Treasure</Item>
                    <Item id={InfoType.Item} onClick={handleItemClick}>Item</Item>

                </Submenu>
            </Menu>
        </div>
    );
};
