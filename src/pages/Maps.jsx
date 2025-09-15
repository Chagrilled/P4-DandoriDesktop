import React, { useState, useEffect, useContext } from 'react';
import { NavigationPanel } from '../components/Map/NavigationPanel';
import { PanelLayout } from '../components/Map/PanelLayout';
import { InfoPanel } from '../components/Map/InfoPanel';
import { getMarkerData } from '../api/MapAPI';
import { MapContainer } from '../components/Map/MapContainer';
import { toast } from 'react-hot-toast';
import { MapContext } from '../components/Map/MapContext';
import { Home } from '../components/Home';

export const Maps = () => {
    const [selectedMarker, setSelectedMarker] = useState();
    const { mapMarkerData, setMapData, mapId } = useContext(MapContext);

    useEffect(() => {
        const load = async () => {
            if (!mapId) return;
            const mapData = await getMarkerData(mapId);
            console.log("mapData", mapData);
            setMapData(mapData);
        };
        load();
    }, [mapId]);

    useEffect(() => {
        // Hack to doubly ensure we don't stack event listeners
        // The issue here is that the callback retains stale state and sends old/undefined mapData/mapIDs to main - very bad.
        // should probably use useCallback for this, but seems like more effort.
        // While testing, I didn't _seem_ to get any duplicate listeners despite having mapData as a dep
        // but just in case to prevent a big leak.
        window.electron.ipcRenderer.removeAllListeners('saveRequest');
        window.electron.ipcRenderer.removeAllListeners('fileNameRequest');

        window.electron.ipcRenderer.on('fileNameRequest', () => window.electron.ipcRenderer.sendFileName(mapId));
        window.electron.ipcRenderer.on('saveRequest', async () => {
            const res = await window.electron.ipcRenderer.saveMaps(mapId, mapMarkerData);
            if (res) {
                toast(`Error while saving entities: ${res}`, {
                    duration: 7000,
                    icon: '❌',
                    style: {
                        color: '#bd2626',
                        maxWidth: 'fit-content'
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
            window.electron.ipcRenderer.removeAllListeners('saveRequest');
            window.electron.ipcRenderer.removeAllListeners('fileNameRequest');
        };
    }, [mapMarkerData]);

    const navPanel = <NavigationPanel />;

    const infoPanel = <InfoPanel
        marker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
    />;

    return (
        <div className='h-full w-full'>
            <PanelLayout leftPanel={navPanel} width={"20%"} rightPanel={infoPanel}>
                <MapContainer
                    onSelect={setSelectedMarker}
                />
            </PanelLayout>
            <Home />
        </div>
    );
};