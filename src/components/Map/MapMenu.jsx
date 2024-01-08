import React from 'react';

import { Menu, Item, Separator, Submenu } from 'react-contexify';
import { RebirthTypes, DefaultActorSpawnerDrop } from '../../api/types';

export const MapMenu = ({ }) => {

    const getDefaultId = (id) => {
        return {
            Creature: 'Kochappy',
            ActorSpawner: 'ActorSpawner',
            GroupDropManager: 'GroupDropManager'
        }[id];
    };

    const handleItemClick = ({ id, event, props: { mapMarkerData, setMapData, coords } }) => {
        const newMarker = {
            type: 'creature',
            infoType: id === 'GroupDropManager' ? 'gimmick' : 'creature',
            creatureId: getDefaultId(id),
            ...(id === 'GroupDropManager' && {
                groupingRadius: 300.0,
                ignoreList: []
            }),
            transform: {
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
                parsed: []
            }
        };

        if (id === 'ActorSpawner') newMarker.drops.parsed[0] = DefaultActorSpawnerDrop;
        if (id === 'GroupDropManager') newMarker.infoType = 'gimmick';
        setMapData({
            ...mapMarkerData,
            creature: [
                ...mapMarkerData.creature,
                newMarker
            ]
        });
    };

    return (
        <div>
            <Menu id={'MAP_MENU'}>
                <Item id="Creature" onClick={handleItemClick}>Creature</Item>
                <Item id="ActorSpawner" onClick={handleItemClick}>ActorSpawner</Item>
                <Item id="GroupDropManager" onClick={handleItemClick}>GroupDropManager</Item>
                <Separator />
                <Submenu label="Foobar">
                    <Item id="reload" onClick={handleItemClick}>Reload</Item>
                    <Item id="something" onClick={handleItemClick}>Do something else</Item>
                </Submenu>
            </Menu>
        </div>
    );
};
