import { MarkerIcon } from '../MarkerIcon';
import React, { useContext } from 'react';
import { CreatureNames, InfoType, ObjectNames, PikminNames, TreasureNames, WorkObjectNames } from '../../api/types';
import { ConfigContext } from './ConfigContext';

export const ConfigPropertyList = () => {
    const { appConfig, config, configData, selectedRow, setSelectedRow } = useContext(ConfigContext);

    if (!config || !configData[config?.name]) return null;

    // Most of the DT files have their object keys upper case for some reason
    // so we need to turn our names to upper to map the English name
    const upperNames = {
        ...Object.fromEntries(Object.entries(CreatureNames).map(([k, v]) => [k.toUpperCase(), v])),
        ...Object.fromEntries(Object.entries(TreasureNames).map(([k, v]) => [k.toUpperCase(), v])),
        ...Object.fromEntries(Object.entries(ObjectNames).map(([k, v]) => [k.toUpperCase(), v])),
        ...Object.fromEntries(Object.entries(WorkObjectNames).map(([k, v]) => [k.toUpperCase(), v]))
    };

    // These could probably be individual components like the parameter ones are
    // but oh well
    const rowChildren = {
        "DT_TekiParameter": (key, value) => {
            if (key.includes("_NIGHT")) key = `NIGHT${key}`.replace("_NIGHT", "");

            const typeRemap = {
                PELLET1: "object",
                PELLET5: "object",
                PELLET10: "object",
                KINKAICARRY: "workobject",
                KINKAIPICK: "workobject"
            };
            const type = typeRemap[key] || InfoType.Creature;

            const iconRemap = {
                NISEBOSSOTAKARA: "NiseBoss",
                NISEZAKOOTAKARA: "NiseZako",
                PATROLLERCARCASS01: "Patroller",
                KEMEKUJICARCASS01: "Kemekuji",
                KINKAICARRY: "KinkaiPick",
            };
            const iconId = iconRemap[key] || key;

            const nameRemaps = {
                NISEBOSSOTAKARA: "Gildemander Treasure",
                NISEZAKOOTAKARA: "Gildemandwee Treasure",
                PATROLLERCARCASS01: "Bloomcap Bloyster Carcass",
                KEMEKUJICARCASS01: "Toady Bloyster Carcass",
                KINKAICARRY: "Gold Nugget?",
                BOSSINU: "Ancient Sirehound",
                MARIGUMO: "Arachnode"
            };
            const englishName = upperNames[key] || nameRemaps[key];

            // Some of these entities are missing like the ones above
            // They are valid assets, but putting them in the name list has some implications
            // That makes them spawnable (and need to be ignored by randomiser)
            // But because they aren't natural spawns we have no construction data for them
            // Nor any idea what to default-assign them. Maybe they just work with any if their params are empty.
            // For now they are left excluded and manually remapped as config editing doesn't have to affect the map system.
            return <>
                <MarkerIcon type={type} id={iconId.toLowerCase()} />
                {appConfig.internalNames ? key : englishName} ({appConfig.internalNames ? englishName : key})
            </>;
        },
        DT_OtakaraParameter: (key, value) => {
            const iconRemap = {
                VSDROPSTAR: "vsdropstars",
                OTARAILWAYLINEUNI: "otarailwaylinea",
                OTAPUZZLEUNI: "otapuzzlea",
                OTAGBASPUNI: "otagbasp",
                OTAGBMICROUNI: "otagbmicrofc",
                OTAMATDOLLSUNI: "otamatdollsa",
                OTAMATDOLLMUNI: "otamatdollsa",
                OTAMATDOLLLUNI: "otamatdollsa"
            };
            const iconId = iconRemap[key] || key;

            const nameRemaps = {
                VSDROPSTAR: "Vs Bomb Drop",
                VSDROPSTARS: "Vs Bomb Drop S",
                VSDROPSTARM: "Vs Bomb Drop M",
                VSDROPSTARL: "Vs Bomb Drop L",
                VSSPBOMB: "Vs Sneak Bomb",
                OTAROBOUNI: "Robot (Full)",
                OTADUCKB: "Duck",
                OTAVSGLD: "Vs Gold Pear",
                OTAKENDAMAUNI: "Kendama (Full)",
                OTARAILWAYLINEUNI: "Railway (Full)",
                OTAPUZZLEUNI: "Puzzle (Full)",
                GBASPUNI: "GBA SP (Full)",
                GBMICROUNI: "GB Micro (Full)",
                MATDOLLSUNI: "Dolls (Full)",
                MATDOLLMUNI: "Dolls (Full)?",
                MATDOLLLUNI: "Dolls (Full)?"
            };
            const englishName = upperNames[key] || nameRemaps[key];

            return <>
                <MarkerIcon type={"treasure"} id={iconId.toLowerCase()} />
                {appConfig.internalNames ? key : englishName} ({appConfig.internalNames ? englishName : key})
            </>;
        },
        DT_PikminProperty: (key, value) => {
            const iconRemap = {
                Bean: "default",
                Undef: "default",
                Ninjin: "default",
                DrkMinion: "default"
            };
            const iconId = iconRemap[key] ? iconRemap[key] : `pikmin${key}`;
            const type = iconId === "default" ? "object" : "pikmin";

            const nameRemaps = {
                Bean: "",
                Undef: "",
                Ninjin: "",
                DrkMinion: ""
            };
            const englishName = PikminNames[`Pikmin${key}`] || nameRemaps[key];

            return <>
                <MarkerIcon type={type} id={iconId.toLowerCase()} />
                {appConfig.internalNames ? key : englishName} ({appConfig.internalNames ? englishName : key})
            </>;
        },
        DT_OrimaEquipParameter: (key, value) => {
            return <>
                <MarkerIcon type={"object"} id={"piecepick"} />
                0
            </>;
        },
        DT_HappyEquipParameter: (key, value) => {
            return <>
                <MarkerIcon type={"object"} id={"happy"} />
                0
            </>;
        },
        DT_NpcInfo: (key, value) => {
            const overrides = {
                SVSleep000: "survivora",
                LFSleep020: "survivora",
                TEST: "survivora"
            }
            return <>
                <MarkerIcon type={"object"} id={overrides[key] || key} />
                {key}
            </>;
        },
        DT_NpcRole: (key, value) => {
            const overrides = {
                CaptainOlimar: "olimar"
            }

            return <>
                <MarkerIcon type={"object"} id={overrides[key] || value.NpcInfoKey} />
                {key}
            </>;
        },
        CaveOtakaraCollectRankTable: (key, value) => {
            return <>
                <MarkerIcon type={"portal"} id="madoriruins" />
                {key}
            </>;
        },
        DT_DDBHandicapTable: (key, value) => {
            return <>
                <MarkerIcon type={"object"} id="default" />
                {key}
            </>;
        },
        DT_Shop: (key, value) => {
            return <>
                <MarkerIcon type={"item"} id={key} />
                {key}
            </>;
        }
    };

    const configProperties = Object.entries(configData[config.name]).map(([key, value]) => {
        return <div key={key} className='flex'>
            <button
                className={selectedRow == key ? "font-bold" : ""}
                onClick={() => {
                    setSelectedRow(key);
                    return false;
                }}
            >
                {rowChildren[config.name](key, value)}
            </button>
            {selectedRow === key ? <img
                className={'w-6 h-6 inline self-center ml-auto'}
                src={'../images/icons/arrow.png'}
            /> : ''}
        </div>;
    });

    return <div className="MapSelect__container p-4 overflow-auto bg-sky-1100">
        {configProperties}
    </div>;
};