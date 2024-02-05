import React from 'react';

import { Menu, Item, Separator, Submenu } from 'react-contexify';
import { RebirthTypes, DefaultActorSpawnerDrop, InfoType, DefaultPortalTrigger, GateMiddleBytes } from '../../api/types';
import { getAvailableTimes } from '../../utils';

const { Creature, Treasure, Gimmick, Object, WorkObject, Pikmin, Base, Onion, Hazard, Portal } = InfoType;

export const MapMenu = ({ }) => {

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
            [WorkObject]: 'Burning',
            [Pikmin]: 'PikminRed',
            [Treasure]: 'OtaBanana'
        }[id];
    };

    const handleItemClick = ({ id, event, props: { mapMarkerData, setMapData, mapId, coords } }) => {
        const infoType = id === 'GroupDropManager' ? Gimmick : id === 'ActorSpawner' ? Creature : id;

        const newMarker = {
            type: 'creature',
            infoType,
            creatureId: getDefaultId(id),
            ...(id === 'GroupDropManager' && {
                groupingRadius: 300.0,
                ignoreList: []
            }),
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
            generateNum: 1,
            generateRadius: 300,
            rebirthType: RebirthTypes.AlwaysRebirth,
            rebirthInterval: 0,
            birthDay: 0,
            deadDay: 0,
            ddId: window.crypto.randomUUID(),
            drops: {
                parsed: [],
                rareDrops: []
            }
        };

        if (id === 'ActorSpawner') newMarker.drops.parsed[0] = DefaultActorSpawnerDrop;
        if (id === 'GroupDropManager') {
            newMarker.infoType = InfoType.Gimmick;
            newMarker.ignoreList = "[]";
            newMarker.groupingRadius = 300;
        }
        if (id === Portal) newMarker.PortalTrigger = DefaultPortalTrigger;
        if (id !== Creature) newMarker.time = getAvailableTimes(mapId)[0];
        if (id === WorkObject) newMarker.drops.spareBytes = GateMiddleBytes;
        
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
                </Submenu>
            </Menu>
        </div>
    );
};
