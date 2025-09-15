import { MarkerIcon } from '../MarkerIcon';
import React, { useEffect, useState, useContext } from 'react';
import { InfoType } from '../../api/types';
import { ConfigContext } from './ConfigContext';

export const ConfigSelect = ({ }) => {
    const { config: currentConfig, setSelectedRow, setConfig } = useContext(ConfigContext);

    const [configs, setConfigs] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const handleIPC = (evt, message) => {
        if (message.error) {
            // show a toast or something
        }
        else setConfigs(message);
        setLoaded(true);
    };

    useEffect(() => {
        window.electron.ipcRenderer.on('getConfigs', handleIPC);
        return () => {
            window.electron.ipcRenderer.removeAllListeners('getConfigs');
        };
    }, []);

    if (!configs.length && !loaded) {
        window.electron.ipcRenderer.getConfigs();
    }

    const imgProps = {
        "DT_TekiParameter": {
            type: InfoType.Creature,
        },
        "DT_OtakaraParameter": {
            type: InfoType.Treasure,
        },
        "DT_OrimaEquipParameter": {
            type: InfoType.Object,
            id: 'survivorolimarleaf'
        },
        "DT_HappyEquipParameter": {
            type: InfoType.Object,
            id: "happy"
        },
        "DT_PikminProperty": {
            type: InfoType.Pikmin,
            id: 'pikminred'
        },
        "DT_MoveSpeedRate": {
            type: InfoType.Item,
            id: 'dashboots'
        },
        "DT_NpcInfo": {
            type: InfoType.Object,
            id: 'survivora'
        },
    };

    const configLinks = configs.map(config => <div key={config.name}>
        <button
            className={currentConfig?.name == config.name ? "font-bold" : ""}
            onClick={() => {
                setConfig(config);
                setSelectedRow(undefined); // Deselect when another is clicked
                return false;
            }}
        >
            <MarkerIcon size="small" {...imgProps[config.name]} />
            {`${config.name}`}
        </button>
        {currentConfig?.name == config.name ? <img className={'w-6 h-6 inline self-center'} src={'../images/icons/arrow.png'} /> : ''}
    </div>);

    return <div className="MapSelect__container p-4 ">
        {configLinks}
    </div>;
};