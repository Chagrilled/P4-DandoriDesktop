import React, { useState, useCallback, useEffect } from 'react';
import { NavigationPanel } from '../components/Map/NavigationPanel';
import { PanelLayout } from '../components/Map/PanelLayout';
import { InfoPanel } from '../components/Map/InfoPanel';
import { getMarkerData } from '../api/MapAPI';
import { MapContainer } from '../components/Map/MapContainer';
import { toast } from 'react-hot-toast';

export const Maps = () => {
    const [mapId, setMapId] = useState();
    const [selectedMarker, setSelectedMarker] = useState();
    const [mapMarkerData, setMapData] = useState(null);
    const onMapChange = useCallback(newMapId => {
        setMapId(newMapId);
    }, []);
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
        window.electron.ipcRenderer.on('saveRequest', async () => {
            const res = await window.electron.ipcRenderer.saveMaps(mapId, mapMarkerData);
            if (res) {
                toast(`Error while saving entities: ${res}`, {
                    duration: 7000,
                    icon: '❌',
                    style: {
                        color: '#bd2626',
                        'max-width': 'fit-content'
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
        };
    });

    const navPanel = <NavigationPanel onMapChange={onMapChange} mapId={mapId} />;
    const infoPanel = <InfoPanel marker={selectedMarker} mapMarkerData={mapMarkerData} setMapData={setMapData} />;
    return (
        <div className='h-full w-full'>
            <PanelLayout leftPanel={navPanel} width={"30%"} rightPanel={infoPanel}>
                <MapContainer mapId={mapId} onSelect={setSelectedMarker} mapMarkerData={mapMarkerData} setMapData={setMapData} />
            </PanelLayout>
        </div>
    );
};