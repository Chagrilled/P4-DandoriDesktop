import React, { useEffect, useContext } from 'react';
import { PanelLayout } from '../components/Map/PanelLayout';
import { toast } from 'react-hot-toast';
import { ConfigFileSelect } from '../components/Config/ConfigFileSelect';
import { ConfigPropertyList } from '../components/Config/ConfigPropertyList';
import { ConfigContext } from '../components/Config/ConfigContext';
import { TekiParameter } from '../components/Config/DTFiles/TekiParameter';
import { Home } from '../components/Home';
import { OtakaraParameter } from '../components/Config/DTFiles/OtakaraParameter';
import { PikminProperty } from '../components/Config/DTFiles/PikminProperty';
import { OrimaEquipParameter } from '../components/Config/DTFiles/OrimaEquipParameter';
import { HappyEquipParameter } from '../components/Config/DTFiles/HappyEquipParameter';
import { NpcInfo } from '../components/Config/DTFiles/NpcInfo';
import { NpcRole } from '../components/Config/DTFiles/NpcRole';
import { CaveOtakaraCollectRankTable } from '../components/Config/DTFiles/CaveOtakaraCollectRankTable';
import { DDBHandicapTable } from '../components/Config/DTFiles/DDBHandicapTable';
import { Shop } from '../components/Config/DTFiles/Shop';

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
            if (configData[config.name])
                if (smallFiles.includes(config.name)) setSelectedRow("0");
                else return;

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

    // Adding configs works like so:
    // Main.js has to have the file whitelisted for reading presence
    // ConfigFileSelect has to know how to display it in the first panel layer
    // ConfigPropertyList needs a function to know how to render each of that file's rows in the second panel
    // The config needs its own UI component to render the contents, and then added here.
    const editorComponents = {
        DT_TekiParameter: <TekiParameter />,
        DT_OtakaraParameter: <OtakaraParameter />,
        DT_PikminProperty: <PikminProperty />,
        DT_OrimaEquipParameter: <OrimaEquipParameter />,
        DT_HappyEquipParameter: <HappyEquipParameter />,
        DT_NpcInfo: <NpcInfo />,
        DT_NpcRole: <NpcRole />,
        CaveOtakaraCollectRankTable: <CaveOtakaraCollectRankTable />,
        DT_DDBHandicapTable: <DDBHandicapTable />,
        DT_Shop: <Shop />
    };

    // Todo list:
    // MoveSpeedRate
    // NpcInfo - UI/Common/Icon/SourceImages for NPC faces
    // NpcRole
    // 
    // /Characters/HappySkill
    // HappySkillGroup
    // HappyRegeneration


    console.log("Config:", config);
    console.log("selectedRow", selectedRow);
    console.log("configData", configData);

    return (
        <div className='h-full w-full'>
            <PanelLayout
                leftPanel={<ConfigFileSelect />}
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