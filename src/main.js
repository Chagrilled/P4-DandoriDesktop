const { app, BrowserWindow, ipcMain, Menu, dialog, shell, protocol, net } = require('electron');
import { readdir, promises, constants, readFileSync, accessSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, sep } from 'path';
import { randomBytes } from 'crypto';
import swf from 'stringify-with-floats';
import { spawn } from 'child_process';
import { exposedGenVars, InfoType, Times, NightMaps, Messages, AGLs } from './api/types';
import { regenerateAGLEntity } from './genEditing';
import { getReadAIStaticFunc, getReadPortalFunc, getReadAIDynamicFunc, getReadActorParameterFunc, getReadNavMeshTriggerFunc, getReadSubAIStaticFunc, getReadWaterTriggerFunc, getReadPopPlaceFunc } from './genEditing/reading';
import { constructActor } from './genEditing/constructing';
import { protectNumbers, unprotectNumbers, getInfoType, getAvailableTimes, getAvailableAGLs } from './utils';
import { createMenu } from './utils/createMenu';
import { byteArrToInt } from './utils/bytes';
import { updateElectronApp } from 'update-electron-app';
import logger from './utils/logger';
import axios from 'axios';
import AdmZip from "adm-zip";
import { pathToFileURL } from 'node:url';

const CONFIG_PATH = join(`${app.getPath('userData')}`, "config.json");
const TEKI = 'Teki';
const OBJECTS = 'Objects';
const DEFAULT_CONFIG = {
    gameDir: '',
    placeablesDir: '',
    encoderDir: '',
    castocDir: '',
    outputDir: '',
    internalNames: false,
    hideInvisEntities: false,
    showRotation: true,
    disableAutoUpdate: false
};
let config = {};
let mapsCache = {};
let rawData = {};
const cache = {};

protocol.registerSchemesAsPrivileged([
    { scheme: 'map-img', privileges: { secure: true, standard: true, supportFetchAPI: true } }
]);

app.whenReady().then(() => {
    const customMapsDir = join(app.getPath('userData'), 'mapOverrides');
    const appRoot = app.getAppPath();

    if (!existsSync(customMapsDir)) {
        logger.info("Making mapOverrides");
        mkdirSync(customMapsDir, { recursive: true });
    }

    protocol.handle('map-img', (request) => {
        logger.info(`Fetching map protocol for ${request.url}`);
        const fileName = decodeURIComponent(request.url.slice('map-img://'.length));
        const [_, mapId, name] = fileName.match(/images\/maps\/([^\/]+)\/(.+)/);

        const mapPath = join(customMapsDir, mapId, name);
        const bundledPath = app.isPackaged ? join(appRoot, '.webpack', 'renderer', fileName) : join(appRoot, 'src', fileName);
        const override = !mapPath.includes("WaterBox") && existsSync(mapPath);
        logger.info(`overridePath: ${mapPath}`);

        const finalPath = override ? mapPath : bundledPath;
        logger.info(`Fetching map from ${finalPath}`);

        return net.fetch(pathToFileURL(finalPath).toString());
    });
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow = null;

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

/*****************************
 * ***************************
 *   Window Config
 * ***************************
 *****************************/
const createWindow = (id, options = {}) => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1024,
        icon: 'src/images/icons/icon.png',
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            nodeIntegration: true
        },
    });
    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: "deny" };
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    const menu = createMenu(config, CONFIG_PATH, readMaps, getTekis, mainWindow);
    Menu.setApplicationMenu(menu);
    if (!app.isPackaged) mainWindow.webContents.openDevTools();
};

/*****************************
 * ***************************
 *   Node Stocks
 * ***************************
 *****************************/
//#region Get Map Paths
// Anything using path/Node modules has to be in the main process - maybe could go into a nodeUtils file
const getMapPath = (mapId) => {
    const AREA_PATH = join(`${config.gameDir}`, "Maps", "Main", "Area");
    const MADORI_PATH = join(`${config.gameDir}`, "Maps", "Madori");
    let mapPath;

    if (mapId.startsWith('Cave')) {
        const caveId = mapId.split('_')[0];
        mapPath = join(MADORI_PATH, "Cave", caveId, mapId, "ActorPlacementInfo");
    }
    else if (mapId.startsWith('DDB')) {
        if (mapId.includes('-VS')) mapId = mapId.replace('-VS', '');
        mapPath = join(MADORI_PATH, "Ddb", mapId, "ActorPlacementInfo");
    }
    else mapPath = join(AREA_PATH, mapId, "ActorPlacementInfo");
    return mapPath;
};

const getFilePath = (mapId, type, baseFile = false) => {
    const specialMaps = mapId.startsWith('HeroStory') || mapId.startsWith('Cave') || mapId === 'Area011' || mapId.startsWith('DDB');
    if (specialMaps && baseFile) return false; // Otherwise caves/etc will read the same file twice and duplicate features

    let areaId = ["HeroStory"].some(p => mapId.startsWith(p)) ? `Area${mapId.slice(-3)}` : mapId;
    areaId = areaId.replace('Night', 'Area').replace(/-\d/, '').replace('-VS', ''); // Change Night003-1 back to Area003

    const hero = mapId.startsWith('HeroStory') ? '_Hero' : '';
    const mapPath = getMapPath(areaId);
    const lvs = mapId.includes('-VS') ? '_LVS' : '';
    const day = specialMaps ? '' : mapId.includes('Night') ? '_Night' : '_Day';
    return join(mapPath, `AP_${areaId}_P${hero}${lvs}_${type}${baseFile ? '' : day}.json`);
};

const getBaseFilePath = (mapId, type) => {
    let areaId = ["HeroStory"].some(p => mapId.startsWith(p)) ? `Area${mapId.slice(-3)}` : mapId;
    areaId = areaId.replace('Night', 'Area').replace(/-\d/, '').replace('-VS', '');

    const mapPath = getMapPath(areaId);
    const hero = mapId.startsWith('HeroStory') ? '_Hero' : '';
    const lvs = mapId.includes('-VS') ? '_LVS' : '';

    return join(mapPath, `AP_${areaId}_P${hero}${lvs}_${type}.json`);
};

const getAGLPath = (mapId, agl) => {
    const specialMaps = mapId.startsWith('HeroStory') || mapId.startsWith('Cave') || mapId === 'Area011' || mapId.startsWith('DDB');
    const baseFile = [AGLs.Objects_Perm, AGLs.Teki_Perm, AGLs.Objects_VS].includes(agl);

    let areaId = ["HeroStory"].some(p => mapId.startsWith(p)) ? `Area${mapId.slice(-3)}` : mapId;
    areaId = areaId.replace('Night', 'Area').replace(/-\d/, '').replace('-VS', ''); // Change Night003-1 back to Area003

    const hero = mapId.startsWith('HeroStory') ? '_Hero' : '';
    const mapPath = getMapPath(areaId);
    const lvs = mapId.includes('-VS') ? '_LVS' : '';
    const day = specialMaps ? '' : mapId.includes('Night') ? '_Night' : '_Day';
    const type = agl.includes('Teki') ? 'Teki' : 'Objects';

    return join(mapPath, `AP_${areaId}_P${hero}${lvs}_${type}${baseFile ? '' : day}.json`);
};

/*****************************
 * ***************************
 *   IPC Handlers
 * ***************************
 *****************************/
//#region Save Placeables
ipcMain.on('saveEntities', (event, entityData) => {
    const floats = {};

    Object.keys(entityData).forEach(ent => {
        // "(.+)": -?\d+\.0(?:,|$)
        const filePath = join(config.gameDir, 'Placeables', 'Teki', `G${ent}.json`);
        const originalContents = readFileSync(filePath, { encoding: 'utf-8' });
        const tekiContent = JSON.parse(protectNumbers(originalContents));

        const newContent = tekiContent.Content.map(genVar => {
            const param = exposedGenVars.find(param => genVar.Name.includes(`${param}_GEN_VARIABLE`));
            if (param) {
                const { Name, ...rest } = entityData[ent][param];
                return {
                    TrueIndex: genVar.TrueIndex,
                    Name: genVar.Name,
                    Properties: {
                        ...rest
                    }
                };
            }
            return genVar;
        });
        Array.from(originalContents.matchAll(/"(.+)": -?\d+\.0,?/g)).forEach(m => floats[m[1]] = 'float');

        const stringData = unprotectNumbers(swf(floats)({ Content: newContent, Extra: tekiContent.Extra }, null, 2));

        writeFileSync(filePath, stringData, { encoding: "utf-8" });
    });

    return mainWindow.webContents.send(Messages.SUCCESS, 'Saved all entities');
});

// This is for "Open in IDE" callbacks. The request comes from the menu bar which is a main process thing
// which sends a message to the owning window to send the react state's filename through to open
ipcMain.on('fileNameRequest', (event, fileName) => {
    let filePath = '';
    if (fileName.startsWith('G')) {
        // Teki
        filePath = join(config.gameDir, 'Placeables', 'Teki', `${fileName}.json`);
    } if (fileName.includes('DT_')) {
        // Teki
        filePath = join(config.gameDir, `${fileName}.json`);
    }
    else {
        const path = getFilePath(fileName, TEKI);
        filePath = path.split(sep).slice(0, -1).join(sep);
    }

    if (process.platform === 'win32') {
        // Workround
        spawn('explorer.exe', [filePath]);
    } else {
        shell.openPath(filePath);
    }
});

//#region IPC 
ipcMain.on('openFolder', (event) => {
    dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] }).then(result => {
        if (result.filePaths && !result.canceled)
            event.sender.send('mapsFolder', result.filePaths[0]);
    });
});

ipcMain.on('getConfig', (event) => {
    return event.sender.send('getConfig', config);
});

ipcMain.on('getTekis', (event) => {
    console.log("detected getTekis IPC");
    getTekis();
});

ipcMain.on('readMaps', (event) => {
    console.log("detected readMaps IPC");
    readMaps(false, event.sender);
});

ipcMain.on('getConfigs', event => {
    console.log("detected getConfigs IPC");
    getConfigs();
});

//#region Get DT_s
ipcMain.handle('getConfigData', async (event, configFile) => {
    return getConfigData(configFile);
});

export const getConfigData = async configFile => {
    const filePath = join(config.gameDir, configFile.folder, `${configFile.name}.json`);
    let contents;

    try {
        contents = await promises.readFile(filePath, { encoding: 'utf-8' });
    } catch (err) {
        logger.error(`Error reading config file ${filePath}: ${err.stack}`);
        return mainWindow.webContents.send(Messages.ERROR, `Failed to read from ${filePath}`, err.stack);
    }

    rawData[configFile.name] = JSON.parse(protectNumbers(contents));
    return rawData[configFile.name].Content[1].Rows;
};

const getConfigs = async () => {
    const configs = [];
    try {
        [{
            path: `${join(config.gameDir, 'Core', 'GActor')}`,
            folder: 'Core/GActor'
        },
        {
            path: `${join(config.gameDir, 'Core', 'Shop')}`,
            folder: 'Core/Shop'
        },
        {
            path: `${join(config.gameDir, 'Core', 'Cave')}`,
            folder: 'Core/Cave'
        }
        ].forEach(read => {
            const actorConfigs = readdirSync(read.path);
            actorConfigs.forEach((fileName) => {
                try {
                    if (fileName.includes(".json")) {
                        const name = fileName.split('.')[0];
                        if ([
                            "DT_TekiParameter",
                            "DT_OtakaraParameter",
                            "DT_OrimaEquipParameter",
                            "DT_HappyEquipParameter",
                            "DT_PikminProperty",
                            // "DT_MoveSpeedRate",
                            "DT_NpcInfo",
                            "DT_NpcRole",
                            "CaveOtakaraCollectRankTable",
                            "DT_DDBHandicapTable",
                            "DT_Shop"
                        ].includes(name))
                            configs.push({
                                name,
                                folder: read.folder
                            });
                    }
                } catch (e) { }
            });
        });

        mainWindow.webContents.send('getConfigs', configs);
    } catch (error) {
        logger.error(error.stack);
        return mainWindow.webContents.send(Messages.ERROR, `Failed to read from config folders: ${error}`, error.stack);
    }
};

//#region Get Placeable Data
ipcMain.handle('getEntityData', async (event, entityId) => {
    const filePath = join(config.gameDir, 'Placeables', 'Teki', `G${entityId}.json`);
    let contents;

    try {
        contents = await promises.readFile(filePath, { encoding: 'utf-8' });
    } catch (err) {
        return mainWindow.webContents.send(Messages.ERROR, `Failed to read from ${filePath}`, err.stack);
    }
    const tekiContent = JSON.parse(protectNumbers(contents)).Content;
    const params = {};

    tekiContent.forEach((genVar) => {
        const param = exposedGenVars.find(param => genVar.Name.includes(`${param}_GEN_VARIABLE`));
        if (param) {
            params[param] = {
                Name: genVar.Name,
                ...genVar.Properties
            };
        }
    });
    // TODO: cache this
    return params;
});

//#region Save Configs/DTs
ipcMain.handle('saveConfig', async (event, configFile, data) => {
    saveConfigs(event, configFile, data);
});

export const saveConfigs = async (event, configFile, data) => {
    try {
        if (!data || !configFile) return;
        const floats = {};
        // see saveMaps for reason
        [
            "FlashBangRate",
            "FreezeDamageRatio",
            "BombHit",
            "BombInsideHit",
            "PoisonHit",
            "PurpleDirectHit",
            "PressHit",
            "IceBombHit",
            "IceBombInsideHit",
            "FreezeHit",
            "FreezeInsideHit",
            "FreezeDamageRatio",
            "CrushHit",
            "FrozenCrushDamageRate",
            "SnowBallDamage",
            "StoneDamage",
            "CrushKnockBackSpeed",
            "PlayerDamage",
            "OtherDamage",
            "FlashBangTargetWeight",
            "CrushStopTime",
            "ThunderStopTime",
            "BoostAntenna1",
            "SensorRadius1",
            "BoostAntenna2",
            "SensorRadius2",
            "BoostAntenna3",
            "SensorRadius3",
            "VitalSystem1",
            "VitalSystem2",
            "VitalSystem3",
            "MetalSystem1",
            "MetalSystem2",
            "MetalSystem3",
            "DashBoots1",
            "DashBoots2",
            "DashBoots3",
            "HeadLampNoneIntensity",
            "HeadLampNoneAttenuationRadius",
            "HeadLampNoneLightFalloffExponent",
            "HeadLamp1Intensity",
            "HeadLamp1AttenuationRadius",
            "HeadLamp1LightFalloffExponent",
            "HeadLamp2Intensity",
            "HeadLamp2AttenuationRadius",
            "HeadLamp2LightFalloffExponent",
            "RecoveryKitRate",
            "RecoveryKitInvincibleTime",
            "LeafSpeed",
            "BudSpeed",
            "FlowerSpeed",
            "DopeSpeed",
            "ArriveTimer"
        ].forEach(k => floats[k] = 'float');

        const newJson = {
            Content: [
                rawData[configFile.name].Content[0],
                {
                    Rows: data
                }
            ],
            Extra: rawData[configFile.name].Extra
        };

        const filePath = join(config.gameDir, configFile.folder, `${configFile.name}.json`);
        const stringData = unprotectNumbers(swf(floats)(newJson, null, 2));

        try {
            await promises.writeFile(filePath, stringData);
            return 0; //idk return status codes or something
        } catch (e) {
            logger.error(`Error saving ${configFile.name}: ${e.stack}`);
            if (event) event.sender.send(Messages.ERROR, `Couldn't write to file: ${e}`, e.stack);
            return e; // ??
        }
    } catch (e) {
        logger.error(e.stack);
        return e;
    }
};

//#region Save Maps
ipcMain.handle('saveMaps', async (event, mapId, data) => {
    try {
        await saveMaps(mapId, data, event.sender);
    } catch (e) {
        logger.error(e.stack);
        return e;
    }
});

export const saveMaps = async (mapId, data, webContents) => {
    // console.log(rawData.teki.Content[0].ActorGeneratorList);
    if (!data) return;
    const agls = getAvailableAGLs(mapId);
    console.log("Available AGLs: ", agls);

    const outputAGLs = Object.fromEntries(agls.map(k => ([k, []])));
    console.log(Object.keys(rawData));
    Object.entries(data).forEach(([typeName, typeArray]) => {
        // This get added for the map projection - this should be changed really
        // but for now, ignore them here as they're nothing to do with game entities.
        if (typeName === 'water') return;

        console.log("typename", typeName);

        // Use regenerateAGLEntity later on to de-dupe this once AI is sorted across the board
        typeArray.forEach(actor => {
            // Search both rawData arrays in case an actor is swapped from one to the other - we can still find its AGL entry
            const agl = [AGLs.Teki_Day, AGLs.Teki_Night, AGLs.Teki_Perm].includes(actor.originalAGL) ? 'teki' : actor.originalAGL;
            console.log("Actor is ", actor.creatureId, " ", actor.aglFile, " chosen agl is ", agl, " original is ", actor.originalAGL);
            const outputArray = outputAGLs[actor.aglFile];
            let aglData = rawData[agl].Content[0].ActorGeneratorList.find(gameActor => gameActor.ddId == actor.ddId);

            if (aglData) outputArray.push(regenerateAGLEntity(actor, aglData));
            // New actor not in the AGL - construct it
            else outputArray.push(constructActor(actor, mapId));
        });
    });

    // We have an object of the AGL file types and need to work out how to write them properly
    // ideally we derived the map path from the AGL type rather than all this base file stuff
    // teki is always written to rawData.teki while objects are written to their corresponding [AGL]

    const aglPromises = agls.map(agl => {
        if ([AGLs.Teki_Day, AGLs.Teki_Night, AGLs.Teki_Perm].includes(agl))
            return writeAGL(rawData.teki, outputAGLs[agl], mapId, agl, webContents);
        return writeAGL(rawData[agl], outputAGLs[agl], mapId, agl, webContents);
    });

    await Promise.all(aglPromises);
    // Write to a new object - assigning back to the main cache strips the ddIds, so 
    // subsequent writes try to generate everything as new
};

const writeAGL = async (originalRaw, newAGL, mapId, agl, webContents) => {
    const newJson = {
        Content: [
            {
                ...originalRaw.Content[0],
                ActorGeneratorList: newAGL
            }
        ],
        Extra: originalRaw.Extra
    };

    const mapPath = getAGLPath(mapId, agl);

    const floats = {};
    // JS truncates the .0 from a float as soon as it touches it 
    // Because there are no floats in JS, just "number", decimals included, so 4 == 4.0
    // However that means our data will get changed, and P4 _probably_
    // wants its floats to still be floats, unlike JS. Therefore do some 
    // really janky string replacing to keep the precision on x.0 floats
    ["X", "Y", "Z", "W", "GenerateRadius", "OriginalPhysicsRadiusZ"].forEach(k => floats[k] = 'float');

    const stringData = unprotectNumbers(swf(floats)(newJson, null, 2));
    try {
        await promises.writeFile(mapPath, stringData);
        return 0; //idk return status codes or something
    } catch (e) {
        logger.error(e.stack);
        if (webContents) webContents.send(Messages.ERROR, `Couldn't write to file: ${e}`, e.stack);
        return e; // ??
    }
};

//#region Read Map Data
ipcMain.handle('readMapData', async (event, mapId) => {
    return readMapData(mapId, event.sender);
});

export const readMapData = async (mapId, webContents) => {
    const mapPath = getFilePath(mapId, TEKI);
    const features = {
        [InfoType.Creature]: [],
        [InfoType.Treasure]: [],
        [InfoType.Gimmick]: [],
        [InfoType.Object]: [],
        [InfoType.WorkObject]: [],
        [InfoType.Pikmin]: [],
        [InfoType.Base]: [],
        [InfoType.Onion]: [],
        [InfoType.Hazard]: [],
        [InfoType.Portal]: [],
        [InfoType.Item]: [],
    };
    // Randomiser will loop through all maps calling thus func, which if not strictly in sync
    // will overwrite this global object - consider making each map an index of it
    rawData = {};

    //#region Object Reading
    const objectProcessor = (object, fileType) => {
        const ddId = randomBytes(16).toString('hex');
        object.ddId = ddId;
        const asp = object.ActorSerializeParameter;
        const entityId = object.SoftRefActorClass?.AssetPathName?.split('.')[1].slice(1, -2);

        const subPath = object.SoftRefActorClass?.AssetPathName?.match(/(?:Placeables|Core)\/(.+)\/G/)[1];

        const infoType = getInfoType(subPath);
        console.log(`About to read a ${entityId} at X position ${object.InitTransform.Translation.X}`);
        const { parsed, AIProperties: staticAI, rareDrops, spareBytes, groupingRadius, inventoryEnd, ignoreList } = getReadAIStaticFunc(entityId, infoType)(asp.AI.Static, object.GeneratorVersion, entityId);

        const dynamicAI = getReadAIDynamicFunc(entityId, infoType)(asp.AI.Dynamic);
        const { PortalTrigger } = getReadPortalFunc(infoType)(asp.PortalTrigger.Static);
        const { PopPlace } = getReadPopPlaceFunc(entityId)(asp.PopPlace.Static);
        const ActorParameter = getReadActorParameterFunc(entityId)(asp.ActorParameter.Static);
        const NavMeshTrigger = getReadNavMeshTriggerFunc(entityId)(asp.NavMeshTrigger.Static);
        const WaterTrigger = getReadWaterTriggerFunc(entityId)(asp.WaterTrigger.Static);
        const AIProperties = { ...staticAI, ...dynamicAI };
        const { parsed: parsedSubAI } = getReadSubAIStaticFunc(entityId, infoType)(asp.SubAI.Static);
        const Life = entityId.includes('Gate') ? parseFloat(new Float32Array(new Uint8Array(asp.Life.Dynamic.slice(0, 4)).buffer)[0]) : null;
        const weight = entityId.includes('DownWall') ? byteArrToInt(asp.Affordance.Static.slice(-4).reverse()) : null;
        // console.log("AIProperties", AIProperties);

        features[infoType].push({
            infoType,
            creatureId: entityId, // rename later
            transform: {
                rotation: object.InitTransform.Rotation,
                translation: object.InitTransform.Translation,
                scale3D: object.InitTransform.Scale3D
            },
            ...(Object.keys(AIProperties).length !== 0 && { AIProperties }),
            ...(PortalTrigger && { PortalTrigger }),
            ...(Life && { Life }),
            ...(weight && { weight }),
            ...(ActorParameter && { ActorParameter }),
            ...(PopPlace && { PopPlace }),
            ...(NavMeshTrigger && { NavMeshTrigger }),
            ...(WaterTrigger && { WaterTrigger }),
            ...(groupingRadius && { groupingRadius }),
            ...(ignoreList && { ignoreList }),
            activityTime: object.RebirthInfo.ActivityTime,
            exploreRateType: object.ExploreRateType,
            birthDay: object.RebirthInfo.BirthDay,
            deadDay: object.RebirthInfo.DeadDay,
            generateNum: parseInt(object.GenerateInfo.GenerateNum),
            generateRadius: parseFloat(object.GenerateInfo.GenerateRadius), // sometimes these decide to be strings. Persuade them not to be.
            rebirthType: object.RebirthInfo.RebirthType,
            rebirthInterval: object.RebirthInfo.RebirthInterval,
            outlineFolderPath: object.OutlineFolderPath, // Handle these better than including them then excluding them
            birthCond: object.RebirthInfo.BirthCond,
            eraseCond: object.RebirthInfo.EraseCond,
            sleepCond: object.GenerateInfo.SleepCond,
            wakeCond: object.GenerateInfo.WakeCond,
            bOnceWakeCond: object.GenerateInfo.bOnceWakeCond,
            bNoChkCondWhenDead: object.GenerateInfo.bNoChkCondWhenDead,
            drops: {
                parsed,
                rareDrops,
                spareBytes,
                parsedSubAI,
                inventoryEnd
            },
            ddId,
            originalAGL: fileType,
            aglFile: fileType,
            // time: fileType,
            generatorVersion: object.GeneratorVersion
        });
    };

    let tekiFile;
    try {
        tekiFile = await promises.readFile(mapPath, { encoding: 'utf-8' });
        tekiFile = JSON.parse(protectNumbers(tekiFile));
        // console.log(tekiFile.Content[0].ActorGeneratorList);
        rawData.teki = tekiFile;

        // Catch people with weird teki files. I think this is when they export raw JSON rather than decode a uasset
        if (!Array.isArray(rawData.teki.Content)) {
            if (webContents) webContents.send(Messages.ERROR, 'Couldn\'t read JSON - Map is missing the Content array. Export the RAW uasset and decode it');
            // return features;
        }

        let agl = AGLs.Teki_Day;
        if (mapId.includes('Hero')) agl = AGLs.Teki_Perm;
        if (mapId.includes('Night')) agl = AGLs.Teki_Night;
        if (mapId.includes('Cave')) agl = AGLs.Teki_Perm;
        if (mapId.includes('DDB')) agl = AGLs.Teki_Perm;
        if (mapId.includes('-VS')) agl = AGLs.Objects_VS;

        rawData.teki.Content[0].ActorGeneratorList.forEach(actor => objectProcessor(actor, agl));
    } catch (e) {
        if (webContents && !["Cave004_F00", "Cave013_F02", "Area500", "DDB_"].some(m => mapId.includes(m))) {
            logger.error(e.stack);
            webContents.send(Messages.ERROR, `Failed reading teki data from: ${mapPath}`, e.stack);
        }
    }

    let baseObjectFile;
    try {
        console.log("Fetching base object for ", mapId);
        const baseObjectPath = getBaseFilePath(mapId, OBJECTS);
        baseObjectFile = await getFileData(baseObjectPath);
    } catch (e) { logger.error(e.stack); }

    if (baseObjectFile) {
        let agl = AGLs.Objects_Perm;
        if (mapId.includes('-VS')) agl = AGLs.Objects_VS;
        console.log("Assigning raw object AGL");
        rawData[agl] = baseObjectFile;
        rawData[agl].Content[0].ActorGeneratorList.forEach(actor => objectProcessor(actor, agl));
    }

    // This is getting really dumb.
    if (!['HeroStory', 'Cave', 'Area011', 'Area500', 'DDB'].some(area => mapId.includes(area))) {
        let objectFile;
        try {
            const objectPath = getFilePath(mapId, OBJECTS);
            objectFile = await getFileData(objectPath);
            if (!objectFile) return features;
        } catch (e) { logger.error(e.stack); }
        let agl = mapId.includes('Night') ? AGLs.Objects_Night : AGLs.Objects_Day;
        rawData[agl] = objectFile;
        rawData[agl].Content[0].ActorGeneratorList.forEach(actor => objectProcessor(actor, agl));
    }

    return features;
};
/*****************************
 * ***************************
 *   Functions
 * ***************************
 *****************************/
const getFileData = async fileName => {
    try {
        const fileData = await promises.readFile(fileName, { encoding: 'utf-8' });
        return JSON.parse(protectNumbers(fileData));
    } catch (e) {
        mainWindow.webContents.send(Messages.ERROR, `Failed reading data from: ${fileName}`, e.stack);
        return undefined;
    }
};

const getTekis = () => {
    const entities = [];
    readdir(`${join(config.gameDir, 'Placeables', 'Teki')}`, (err, files) => {
        if (err) {
            logger.error(err.stack);
            return mainWindow.webContents.send(Messages.ERROR, `Failed to read from Placeaebles/Teki: ${err}`, err.stack);
        }
        files.forEach((fileName) => {
            if (fileName.includes(".json")) {
                const name = fileName.split('.')[0];
                entities.push(name.slice(1, name.length));
                // if Base or Other, read those too, but not now
            }
        });
        mainWindow.webContents.send('getTekis', entities);
    });
};

//#region Read Maps
const readMaps = (force, window = mainWindow) => {
    if (!config.gameDir) return;
    if (config.gameDir == mapsCache.gameDir && !force) return window.send('getMaps', { maps: mapsCache.maps });

    logger.info("Reading maps");
    const AREA_PATH = join(`${config.gameDir}`, "Maps", "Main", "Area");
    const MADORI_PATH = join(`${config.gameDir}`, "Maps", "Madori");
    const maps = [];

    readdir(AREA_PATH, async (err, areaMaps) => {
        if (err) {
            logger.error(err);
            // TOOD: return error toast
            window.send(Messages.NONBLOCKING, `Failed to read main area maps from: ${AREA_PATH}`);
            // return mainWindow.webContents.send('getMaps', { maps: [] });
        }

        areaMaps.forEach(map => {
            const files = readdirSync(join(AREA_PATH, map, 'ActorPlacementInfo'));
            files.forEach(file => {
                if (file.includes('Hero') && !maps.includes(`HeroStory${map.slice(-3)}`)) {
                    if (map !== 'Area500') maps.push(`HeroStory${map.slice(-3)}`);
                }
                else if (file.match(/_P_(?:Teki|Objects)/) && !maps.includes(map)) {
                    maps.push(map);
                }
                if (file.includes('Night') && !maps.includes(`Night${map.slice(-3)}-1`)) {
                    maps.push(...NightMaps[map]);
                }
            });
        });
        try {
            const caveMaps = readdirSync(join(MADORI_PATH, 'Cave'));
            const caves = await Promise.all([...caveMaps.map(path => promises.readdir(join(MADORI_PATH, 'Cave', path)))]);
            maps.push(...caves.flat());
        } catch (e) {
            console.log(e);
            window.send('nonBlockingNotify', `Failed to read caves from: ${MADORI_PATH}/Cave`);
        }

        try {
            const ddbMaps = readdirSync(join(MADORI_PATH, 'Ddb'));
            ddbMaps.forEach(map => {
                const files = readdirSync(join(MADORI_PATH, 'Ddb', map, 'ActorPlacementInfo'));
                files.forEach(file => {
                    if (file.includes('LVS') && !maps.includes(`${map}-VS`)) {
                        maps.push(`${map}-VS`);
                    }
                    else if (!maps.includes(map)) {
                        maps.push(map);
                    }
                });
            });
        } catch (e) {
            console.log(e);
            window.send('nonBlockingNotify', `Failed to read Dandori battles from: ${MADORI_PATH}/Ddb`);
        }
        mapsCache = {
            maps,
            gameDir: config.gameDir
        };
        return window.send('getMaps', { maps });
    });
};


/*****************************
 * ***************************
 *   Config Reading
 * ***************************
 *****************************/
//#region Config Reading
try {
    accessSync(CONFIG_PATH, constants.F_OK);
    const data = readFileSync(CONFIG_PATH, { encoding: "utf-8" });
    // if (err) mainWindow.webContents.send(Messages.ERROR, `Could not read from config: ${e}`);
    config = JSON.parse(data);
} catch (err) {
    logger.warn(`${CONFIG_PATH} does not exist, generating`);
    writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 4), { encoding: "utf-8" });
    config = DEFAULT_CONFIG;
}

if (!config.disableAutoUpdate) updateElectronApp();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

//#region Randomiser
ipcMain.on('randomise', async (event, config) => {
    try {
        event.sender.send(Messages.PROGRESS, `Randomising maps!`);
        const { randomiser } = await import('./genEditing/randomiser');

        const err = await randomiser(config);
        logger.info("All done randomising!");
        if (err) event.sender.send(Messages.NONBLOCKING, `Failed to randomise ${err.failed}: ${err.e.stack}`);
        return event.sender.send(Messages.SUCCESS, "Randomised all maps! Don't forget to deploy.");
    } catch (e) {
        logger.error(`Error randomising: ${e.stack}`);
        event.sender.send(Messages.ERROR, `Failed to randomise - review the log file in the app's install folder`, e.stack);
        throw e;
    }
});

//#region Force Encoder Update
try {
    if (config.encoderDir) {
        const namePath = join(config.encoderDir, "P4UassetEditor", "name_classes.json");
        const nameContents = readFileSync(namePath, { encoding: 'utf-8' });

        // They have an old version of name_classes, force upgrade
        if (!nameContents.includes("bIsForcePopBuriedPoint")) {
            logger.info("Force upgrading name_classes.json");
            const toolingZip = await axios.get('https://github.com/Chagrilled/P4-Utils/raw/master/tooling/P4UassetEditor.zip', { responseType: 'arraybuffer' });
            // renameSync(namePath, join(config.encoderDir, "P4UassetEditor", "name_classes_old.json"));
            new AdmZip(Buffer.from(toolingZip.data, 'binary')).extractEntryTo("P4UassetEditor/P4UassetEditor/name_classes.json", join(config.encoderDir, "P4UassetEditor"), false, true);
            logger.info("Force upgraded name_classes.json");
            setTimeout(() => {
                if (mainWindow?.webContents) mainWindow.webContents.send(Messages.SUCCESS, "Force upgraded the encoder to fix DT_ files");
            }, 3000);
        }
    }
} catch (err) {
    logger.error(`Error upgrading encoder file: ${err.stack}`);
    console.error(err);
}
