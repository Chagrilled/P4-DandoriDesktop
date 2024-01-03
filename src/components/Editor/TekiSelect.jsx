import { MarkerIcon } from '../Icon';
import React, { useEffect, useState } from 'react';
import { CreatureNames } from '../../api/types';
import { MarkerType } from '../../api/types';

export const TekiSelect = ({ onEntChange, currentEnt }) => {
    const [tekis, setTekis] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const handleIPC = (evt, message) => {
        if (message.error) {
            // show a toast or something
        }
        else setTekis(message);
        setLoaded(true);
    };

    useEffect(() => {
        window.electron.ipcRenderer.on('getTekis', handleIPC);
        return () => {
            window.electron.ipcRenderer.removeAllListeners('getTekis');
        };
    }, [
    ]);

    // Fetch maps if there are none - make this performant if it keeps asking for more maps each render
    if (!tekis.length && !loaded) {
        window.electron.ipcRenderer.getTekis();
    }

    const tekiLinks = tekis.map(tekiId => {
        let tekiName = CreatureNames[tekiId];
        // TODO: Add night creatures to the types list
        // console.log(tekiName)
        return <div key={tekiId}>
            <MarkerIcon size="small" type={MarkerType.Creature} id={tekiId} />
            <button className={currentEnt == tekiId ? "font-bold" : ""} onClick={() => { onEntChange(tekiId); return false; }}>{`${tekiId} (${CreatureNames[tekiId]})`}</button>
        </div>;
    }, [onEntChange]);

    return <div className="MapSelect__container">
        {tekiLinks}
    </div>;
};