import * as React from 'react';
import { TekiSelect } from './TekiSelect';
import { Tabs, Tab } from '../Map/Tabs';

export const NavigationPanel = ({ onEntChange, currentEnt }) => {

    return (
        <div className="flex flex-col items-center gap-1 overflow-hidden NavigationPanel__container" style={{ 'marginBlock': '0.25rem' }}>
            <Tabs>
                <Tab id="maps" label="Tekis">
                    <TekiSelect onEntChange={onEntChange} currentEnt={currentEnt} />
                </Tab>
                <Tab id="objects" label="Objects?">
                </Tab>
            </Tabs>
        </div>
    );
};