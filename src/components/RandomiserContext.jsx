
import React, { createContext, useState, useEffect } from 'react';
import { PikminNames, randCreatures } from '../api/types';

const RandomiserContext = createContext();

const RandomiserProvider = ({ children }) => {
    const pikminList = Object.keys(PikminNames);
    const randInt = (max) => Math.floor(Math.random() * max);

    const [pikminState, setPikminState] = useState({
        leftIconImage: pikminList[randInt(pikminList.length)],
        rightIconImage: pikminList[randInt(pikminList.length)],
        flip: false
    });
    const [appConfig, setAppConfig] = useState();
    const [state, setState] = useState({
        randCreatures: true, // ✅
        randEnemyDrops: true, // ✅
        allCreaturesDrop: true, // ✅
        randMaxDrops: 3, // ✅
        dropLimitMax: 2, // ✅
        creatureDropChance: 100,
        randGenerateNumLimit: 4, // ✅
        randBossGenerateNumLimit: 2, // ✅
        randGenerateNums: true, // ✅
        randBossGenerateNums: true,
        objectsKeepGenerateNum: true, // ✅
        retainSpawners: true, // ✅
        creaturesLfL: true,
        retainNonBosses: false, // ✅
        retainBosses: true, // ✅
        allBosses: false, // ✅
        asInfiniteChance: 40, // ✅
        asLimit: 5, // ✅
        asIntervalLimit: 30, // ✅
        randTreasures: true, // ✅
        treasuresLfL: true,
        randPortals: true, // ✅
        randOverworldOnly: true, // ✅
        randPileAmounts: false,
        randDisabled: false, // ✅
        randObjects: true, // ✅
        hazardsLfL: false, // ✅
        // gatesLfL: false,
        excludeGates: true,
        allObjectsDrop: true, // ✅
        objectDropChance: 100,
        randStartingOnion: true, // ✅
        randAllOnions: true, // ✅
        retainMaterials: true,
        retainWildPikmin: true, // ✅
        randObjectDrops: true,
        objectsLfL: true, // ✅
        startingFlarlics: 3, // ✅
        bossesCanDrop: true, // ✅
        rebirthInterval: 5, // ✅
        randIntFunction: 'even', // ✅
        forceCaves: false, // ✅
        noOverworldSnowfake: true,
        retainExits: true, // add tests for these later V
        randomiseNight: true,
        bossDropChance: 25,
        gatesDrop: false,
        retainOSTOnions: true,
        randMaterialPiles: 0,
        sproutMultiplier: [100, 100],
        creatureWeightMultiplier: [100, 100],
        purpleDirectHitMultiplier: [100, 100],
        poisonDamageMultiplier: [100, 100],
        healthMultiplier: [100, 100],
        freezeMultiplier: [100, 100],
        shopMultiplier: [100, 100],
        shopUnlockMultiplier: [100, 100],
        treasureWeightMultiplier: [100, 100],
        creatureSparkliumMultiplier: [100, 100],
        freezeDamageMultiplier: [100, 100],
        weights: Object.fromEntries(randCreatures.map(c => [c, 1]))
    });


    useEffect(() => {
        window.electron.ipcRenderer.on('getConfig', (evt, message) => { setAppConfig(message); console.log("received context config message"); });
        return () => { window.electron.ipcRenderer.removeAllListeners('getConfig'); console.log("removed all listeners"); };
    }, []);

    if (appConfig === undefined) {
        console.log("Requesting config");
        window.electron.ipcRenderer.getConfig();
    }

    return (
        <RandomiserContext.Provider value={{ appConfig, state, setState, pikminState, setPikminState }}>
            {children}
        </RandomiserContext.Provider>
    );
};

export { RandomiserContext, RandomiserProvider };