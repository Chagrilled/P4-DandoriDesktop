
import React, { createContext, useState, useEffect } from 'react';
import { Legends } from '../../api/types';

const MapContext = createContext();

const InitialFilter = Object.values(Legends).reduce((filter, type) => {
    filter[type] = true;
    return filter;
}, {});

const MapProvider = ({ children }) => {
    const [mapMarkerData, setMapData] = useState(null);
    const [filter, setFilter] = useState(InitialFilter);
    const [mapId, setMapId] = useState();
    const [config, setConfig] = useState();

    useEffect(() => {
        window.electron.ipcRenderer.on('getConfig', (evt, message) => { setConfig(message); console.log("received context config message"); });
        return () => { window.electron.ipcRenderer.removeAllListeners('getConfig'); console.log("removed all listeners"); };
    }, []);

    if (config === undefined) {
        window.electron.ipcRenderer.getConfig();
    }

    return (
        <MapContext.Provider value={{ mapMarkerData, setMapData, filter, setFilter, mapId, setMapId, config }}>
            {children}
        </MapContext.Provider>
    );
};

export { MapContext, MapProvider };