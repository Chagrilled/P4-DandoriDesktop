import React, { useEffect, useContext } from 'react';
import { PanelLayout } from '../components/Map/PanelLayout';
import { toast } from 'react-hot-toast';
import { ConfigSelect } from '../components/Config/ConfigSelect';
import { ConfigPropertyList } from '../components/Config/ConfigPropertyList';
import { ConfigContext } from '../components/Config/ConfigContext';
import { TekiParameter } from '../components/Config/TekiParameter';
import { Home } from '../components/Home';
import { OtakaraParameter } from '../components/Config/OtakaraParameter';
import { PikminProperty } from '../components/Config/PikminProperty';
import { OrimaEquipParameter } from '../components/Config/OrimaEquipParameter';
import { HappyEquipParameter } from '../components/Config/HappyEquipParameter';

// These are single-row files so should be selected by default to reduce clicks
const smallFiles = [
    "DT_HappyEquipParameter",
    "DT_OrimaEquipParameter",
];

export const Config = () => {
    const { config, configData, selectedRow, setConfigData, setSelectedRow } = useContext(ConfigContext);

    useEffect(() => {
        const load = async () => {
            if (!config) return;
            if (configData[config.name]) return;

            const data = await window.electron.ipcRenderer.getConfigData(config);
            setConfigData({
                ...configData,
                [config.name]: data
            });
            if (smallFiles.includes(config.name)) setSelectedRow("0");

        };
        load();
    }, [config]);

    useEffect(() => {
        window.electron.ipcRenderer.on('fileNameRequest', () => window.electron.ipcRenderer.sendFileName(`${config.folder}/${config.name}`));
        window.electron.ipcRenderer.on('saveRequest', async () => {
            const res = await window.electron.ipcRenderer.saveConfig(config, configData[config.name]);
            if (res) {
                toast(`Error while saving config: ${res}`, {
                    duration: 7000,
                    icon: '❌',
                    style: {
                        color: '#bd2626',
                        'maxWidth': 'fit-content'
                    }
                });
            }
            else {
                toast(`Saved current config file`, {
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

    const editorComponents = {
        DT_TekiParameter: <TekiParameter />,
        DT_OtakaraParameter: <OtakaraParameter />,
        DT_PikminProperty: <PikminProperty />,
        DT_OrimaEquipParameter: <OrimaEquipParameter />,
        DT_HappyEquipParameter: <HappyEquipParameter />
    };

    // Todo list:
    // MoveSpeedRate

    console.log("Config:", config);
    console.log("selectedRow", selectedRow);
    console.log("configData", configData);

    return (
        <div className='h-full w-full'>
            <PanelLayout
                leftPanel={<ConfigSelect />}
                width={"30%"}
                invert={true}
                rightPanel={config ? <ConfigPropertyList /> : null}
                panelAuto={true}
            >
                {selectedRow ? editorComponents[config.name] : null}
            </PanelLayout>
            <Home />
        </div>
    );
};