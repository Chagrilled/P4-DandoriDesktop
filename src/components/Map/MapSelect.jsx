import React, { useEffect, useState, useContext, useCallback } from 'react';
import { MapContext } from './MapContext';

export const MapSelect = ({ }) => {
    const [maps, setMaps] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const { setMapId, mapId: currentMap } = useContext(MapContext);

    const onMapChange = useCallback(newMapId => {
        setMapId(newMapId);
    }, []);

    const handleIPC = (evt, message) => {
        if (message.error) {
            // show a toast or something
        }
        else setMaps(message.maps);
        if (message.caveError) {
            // idk show a toast
        }
        setLoaded(true);
    };

    useEffect(() => {
        window.electron.ipcRenderer.on('getMaps', handleIPC);
        return () => {
            window.electron.ipcRenderer.removeAllListeners('getMaps');
        };
    }, []);

    // Fetch maps if there are none - make this performant if it keeps asking for more maps each render
    if (!maps.length && !loaded) {
        window.electron.ipcRenderer.readMaps();
    }

    const mapLinks = maps.map(mapId => {
        const splitId = mapId.split('_');

        let mapName = IdToNameMap[splitId[0]];
        mapName += splitId[1] ? ' ' + splitId[1] : '';
        return <div key={mapId}>
            <button className={currentMap == mapId ? "font-bold" : ""} onClick={() => { onMapChange(mapId); return false; }}>{mapName} <i>{` (${mapId})`}</i></button>
        </div>;
    });

    return <div className="MapSelect__container">
        {mapLinks}
    </div>;
};

const IdToNameMap = {
    "Cave000": "Burrow of Beginnings",
    "Cave001": "Last-Frost Cavern",
    "Cave002": "Crackling Cauldron",
    "Cave003": "Dandori Day Care",
    "Cave004": "Aquiferous Summit",
    "Cave005": "Industrial Maze",
    "Cave006": "Drafty Gallery",
    "Cave007": "Secluded Courtyard",
    "Cave008": "Hotshock Canyon",
    "Cave009": "Sightless Passage",
    "Cave010": "Kingdom of Beasts",
    "Cave011": "Seafloor Resort",
    "Cave012": "Subzero Sauna",
    "Cave013": "Below-Grade Discotheque",
    "Cave014": "Engulfed Castle",
    "Cave015": "Test Tubs",
    "Cave016": "Cavern for a King",
    "Cave017": "Toggle Training",
    "Cave018": "The Mud Pit",
    "Cave019": "Subterranean Swarm",
    "Cave020": "Cliff-Hanger's Hold",
    "Cave021": "Doppelgänger's Den",
    "Cave022": "Frozen Inferno",
    "Cave023": "Plunder Palace",
    "Cave024": "Ultimate Testing Range",
    "Cave025": "Dream Home",
    "Cave026": "Cradle of the Beast",
    "Cave027": "Aerial Incinerator",
    "Cave028": "Strategic Freezeway",
    "Cave029": "Rockaway Cellars",
    "Cave030": "Planning Pools",
    "Cave031": "Hefty Haulway",
    "Cave032": "Oasis of Order",
    "Cave033": "Hectic Hollows",
    "Cave034": "Ice-Cross Course",
    "Cave035": "Trial of the Sage Leaf",
    "Area001": "Sun-Speckled Terrace",
    "Area002": "Blossoming Arcadia",
    "Area003": "Serene Shores",
    "Area004": "Giant's Hearth",
    "Area006": "Primordial Thicket",
    "Area010": "Hero's Hideaway",
    "Area011": "Hero's Hideaway (Prologue)",
    "Area500": "Rescue Command Post",
    "HeroStory001": "Sun-Speckled Terrace (OST)",
    "HeroStory002": "Blossoming Arcadia (OST)",
    "HeroStory003": "Serene Shores (OST)",
    "HeroStory010": "Hero's Hideaway (OST)",
    "Night001-1": "Sun-Speckled Terrace (Ancient Arches)",
    "Night001-2": "Sun-Speckled Terrace (Rugged Scaffold)",
    "Night001-3": "Sun-Speckled Terrace (Meandering Slope)",
    "Night002-1": "Blossoming Arcadia (Fragrant Ravine)",
    "Night002-2": "Blossoming Arcadia (Sunwashed Plateau)",
    "Night002-3": "Blossoming Arcadia (Misshapen Pond)",
    "Night003-1": "Serene Shores (Blossoming Dunes)",
    "Night003-2": "Serene Shores (Water's Edge)",
    "Night003-3": "Serene Shores (The Sand Keep)",
    "Night010-1": "Hero's Hideaway (Stargazer's Spot)",
    "Night010-2": "Hero's Hideaway (Feasting Center)",
    "Night010-3": "Hero's Hideaway (Foot of the Stairs)",
    "Night004-1": "Giant's Hearth (Line of Logs)",
    "Night004-2": "Giant's Hearth (Abandoned Throne)",
    "Night006-1": "Primordial Thicket (The Sylvan Gate)",
    "Night006-2": "Primordial Thicket (Autumnal Gully)"
};