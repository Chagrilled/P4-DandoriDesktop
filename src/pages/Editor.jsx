import React, { useState, useCallback, useEffect } from 'react';
import { NavigationPanel } from '../components/Editor/NavigationPanel';
import { PanelLayout } from '../components/Map/PanelLayout';
import { toast } from 'react-hot-toast';
import { ParameterDisplay } from '../components/Editor/ParameterDisplay';
import { Home } from '../components/Home';

export const Editor = () => {
    const [entityId, setEntityId] = useState();
    const [entityData, setEntityData] = useState({});

    const onEntChange = useCallback(newEntId => {
        setEntityId(newEntId);
    }, []);

    useEffect(() => {
        const load = async () => {
            console.log("useEffect", entityData, entityId);
            if (!entityId) return;
            if (entityData[entityId]) return;

            const entData = await window.electron.ipcRenderer.getEntityData(entityId);
            console.log(entData);
            setEntityData({
                ...entityData,
                [entityId]: entData
            });
        };
        load();
    }, [entityId]);

    useEffect(() => {
        window.electron.ipcRenderer.on('fileNameRequest', () => window.electron.ipcRenderer.sendFileName(`G${entityId}`));
        window.electron.ipcRenderer.on('saveRequest', async () => {
            const res = await window.electron.ipcRenderer.saveEntities(entityData);
            if (res) {
                toast(`Error while saving entities: ${res}`, {
                    duration: 7000,
                    icon: '❌',
                    style: {
                        color: '#bd2626',
                        'maxWidth': 'fit-content'
                    }
                });
            }
            else {
                toast(`Saved entities`, {
                    duration: 5000,
                    icon: '✅',
                    style: {
                        color: '#62cc80'
                    }
                });
            }
        });
        return () => {
            window.electron.ipcRenderer.removeAllListeners('fileNameRequest');
            window.electron.ipcRenderer.removeAllListeners('saveRequest');
        };
    });

    const navPanel = <NavigationPanel onEntChange={onEntChange} currentEnt={entityId} />;
    return (
        <div className='h-full w-full'>
            <PanelLayout leftPanel={navPanel} width={"30%"}>
                <ParameterDisplay entityData={entityData} setEntityData={setEntityData} entityId={entityId} />
            </PanelLayout>
            <Home />
        </div>
    );
};