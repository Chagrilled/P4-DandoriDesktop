
import React, { createContext, useState } from 'react';
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

    return (
        <MapContext.Provider value={{ mapMarkerData, setMapData, filter, setFilter, mapId, setMapId }}>
            {children}
        </MapContext.Provider>
    );
};

export { MapContext, MapProvider };