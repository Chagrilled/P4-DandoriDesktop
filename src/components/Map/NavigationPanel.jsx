import * as React from 'react';
import { MapSelect } from './MapSelect';
import { Legend } from './Legend';
import { Tabs, Tab } from './Tabs';
import { HackingTools } from '../HackingTools/HackingTools';

export const NavigationPanel = ({ onMapChange, mapId }) => {

    return (
        <div className="flex flex-col items-center gap-1 overflow-hidden NavigationPanel__container" style={{ 'marginBlock': '0.25rem' }}>
            <Tabs>
                <Tab id="maps" label="Maps">
                    <MapSelect onSelect={onMapChange} currentMap={mapId} />
                </Tab>
                <Tab id="legend" label="Legend">
                    <Legend />
                </Tab>
                <Tab id="tools" label="Tools">
                    <HackingTools />
                </Tab>
            </Tabs>
        </div>
    );
};