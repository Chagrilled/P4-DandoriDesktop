const { app, BrowserWindow, ipcMain, Menu, dialog, shell } = require('electron');
import { readdir, promises, constants, writeFile, readFileSync, accessSync, writeFileSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';
import swf from 'stringify-with-floats';
import { spawn } from 'child_process';
import { exposedGenVars } from './api/types';
import deepEqual from 'deep-equal';
import { getReadAIFunc, getConstructAIFunc, getSubpath, constructTeki } from './utils/genEditing';
import { protectNumbers, unprotectNumbers, setFloats } from './utils/utils';
import { version } from '../package.json';

const CONFIG_PATH = join(`${app.getPath('userData')}`, "config.json");

const DEFAULT_CONFIG = {
    gameDir: '',
    placeablesDir: '',
    encoderDir: '',
    castocDir: '',
    outputDir: '',
    internalNames: false
};
let config = {};
let mapsCache = {};
const rawData = {};
const cache = {};

const isMac = process.platform === 'darwin';

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

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    const menu = Menu.buildFromTemplate([
        ...(isMac
            ? [{
                label: app.name,
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    { role: 'services' },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideOthers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            }]
            : []),
        {
            label: 'Settings',
            submenu: [
                {
                    label: 'Carrot4 Folder',
                    click: () => {
                        dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] }).then(({ filePaths, canceled }) => {
                            if (filePaths && !canceled) {
                                config.gameDir = filePaths[0];
                                writeFile(CONFIG_PATH, JSON.stringify({
                                    ...config,
                                    gameDir: filePaths[0]
                                }, null, 4), { encoding: "utf-8" }, () => { });
                                readMaps(true);
                                getTekis(true);
                            }
                        });
                    }
                },
                {
                    label: 'Encoder Folder',
                    click: () => {
                        dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] }).then(({ filePaths, canceled }) => {
                            if (filePaths && !canceled) {
                                config.encoderDir = filePaths[0];
                                writeFile(CONFIG_PATH, JSON.stringify({
                                    ...config,
                                    encoderDir: filePaths[0]
                                }, null, 4), { encoding: "utf-8" }, () => { });
                                mainWindow.webContents.send('successNotify', 'Set encoder directory');
                            }
                        });
                    }
                },
                {
                    label: 'castoc Folder',
                    click: () => {
                        dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] }).then(({ filePaths, canceled }) => {
                            if (filePaths && !canceled) {
                                config.castocDir = filePaths[0];
                                writeFile(CONFIG_PATH, JSON.stringify({
                                    ...config,
                                    castocDir: filePaths[0]
                                }, null, 4), { encoding: "utf-8" }, () => { });
                                mainWindow.webContents.send('successNotify', 'Set castocDir directory');
                            }
                        });
                    }
                },
                {
                    label: 'Output Paks Folder',
                    click: () => {
                        dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] }).then(({ filePaths, canceled }) => {
                            if (filePaths && !canceled) {
                                config.outputDir = filePaths[0];
                                writeFile(CONFIG_PATH, JSON.stringify({
                                    ...config,
                                    outputDir: filePaths[0]
                                }, null, 4), { encoding: "utf-8" }, () => { });
                                mainWindow.webContents.send('successNotify', 'Set outputDir directory');
                            }
                        });
                    }
                },
                {
                    label: 'Set Emulator Executable',
                    enabled: false,
                    click: () => {
                        dialog.showOpenDialog(mainWindow, { properties: ['openFile'], filters: { extensions: '.exe' } }).then(({ filePaths, canceled }) => {
                            if (filePaths && !canceled) {
                                config.emulatorFile = filePaths[0];
                                writeFile(CONFIG_PATH, JSON.stringify({
                                    ...config,
                                    emulatorFile: filePaths[0]
                                }, null, 4), { encoding: "utf-8" }, () => { });
                                mainWindow.webContents.send('successNotify', 'Set emulator path');
                            }
                        });
                    }
                },
                {
                    label: 'Internal Names First',
                    type: 'checkbox',
                    checked: config.internalNames,
                    click: () => {
                        config.internalNames = !config.internalNames;
                        writeFile(CONFIG_PATH, JSON.stringify({
                            ...config,
                            internalNames: config.internalNames
                        }, null, 4), { encoding: "utf-8" }, () => { });
                        mainWindow.webContents.send('getConfig', config);
                    }
                }
            ]
        },
        {
            label: 'Tools',
            submenu: [
                {
                    label: 'Save Entities to JSON',
                    click: () => {
                        mainWindow.webContents.send('saveRequest');
                    }
                },
                {
                    label: 'Deploy to Emulator',
                    click: () => {
                        if (!config.castocDir || !config.encoderDir || !config.outputDir)
                            return mainWindow.webContents.send('errorNotify', 'Set encoder/castoc/output folder first');
                        mainWindow.webContents.send('successNotify', 'Encoding JSONs');

                        // The bat scripts have `pause`s in them, and for the life of me I couldn't programmatically get through it
                        let subprocess = spawn('python main.py encode', { shell: true, cwd: join(config.encoderDir, "P4UassetEditor") });
                        subprocess.on('close', (code) => {
                            if (code !== 0) {
                                return mainWindow.webContents.send('errorNotify', 'Failed encoding');
                            }
                            mainWindow.webContents.send('successNotify', 'Encoded JSONs');
                            // On Windows, there's no mkdir -p
                            const castocDir = join(config.castocDir, '_EDIT', 'Carrot4', 'Content');
                            const cmd = `robocopy "${join(config.encoderDir, '_OUTPUT')}" "${castocDir}" /is /it /E`;
                            subprocess = spawn(cmd, { shell: true });
                            subprocess.on('close', (code) => {
                                if (code > 7) { // https://ss64.com/nt/robocopy-exit.html
                                    return mainWindow.webContents.send('errorNotify', `Failed copying to ${join(config.castocDir, '_EDIT', 'Carrot4', 'Content')}`);
                                }
                                // castoc errors aren't returning - maybe because it pauses rather than erroring
                                mainWindow.webContents.send('successNotify', 'Copied outputs to castoc');
                                subprocess = spawn('main.exe pack ..\\..\\_EDIT ..\\..\\Manifest.json ..\\..\\_OUTPUT\\Mod_P None', { shell: true, cwd: join(config.castocDir, "Source", "UassetCreationTools") });
                                subprocess.on('close', (code) => {
                                    if (code !== 0) {
                                        return mainWindow.webContents.send('errorNotify', `Failed running castoc PACKFILES`);
                                    }
                                    mainWindow.webContents.send('successNotify', 'Packed to paks');
                                    subprocess = spawn(`robocopy "${join(config.castocDir, '_OUTPUT')}" "${config.outputDir}" /is /it`, { shell: true });
                                    subprocess.on('close', (code) => {
                                        if (code > 7) {
                                            return mainWindow.webContents.send('errorNotify', `Failed copying to ${config.outputDir}`);
                                        }
                                        return mainWindow.webContents.send('successNotify', `Paks copied to ${config.outputDir}`);
                                    });
                                });
                            });
                        });
                    }
                },
                {
                    label: 'Open Paks Output Folder',
                    click: () => {
                        shell.openPath(config.outputDir);
                    }
                },
                {
                    label: 'Open Emulator',
                    click: () => {
                        spawn(config.emulatorFile);
                    }
                },
                {
                    label: 'Open in IDE',
                    click: () => {
                        mainWindow.webContents.send('fileNameRequest');
                    }
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Repo',
                    click: () => {
                        shell.openExternal('https://github.com/Chagrilled/P4-DandoriDesktop');
                    }
                },
                {
                    label: `Version ${version}`,
                    enabled: false
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);
    mainWindow.webContents.openDevTools();
};

// Anything using path/Node modules has to be in the main process
const getMapPath = (mapId) => {
    const AREA_PATH = join(`${config.gameDir}`, "Maps", "Main", "Area");
    const CAVE_PATH = join(`${config.gameDir}`, "Maps", "Madori", "Cave");
    let mapPath;

    if (mapId.startsWith('Cave')) {
        const caveId = mapId.split('_')[0];
        mapPath = join(CAVE_PATH, caveId, mapId, "ActorPlacementInfo");
    }
    else mapPath = join(AREA_PATH, mapId, "ActorPlacementInfo");
    return mapPath;
};

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

    return mainWindow.webContents.send('successNotify', 'Saved all entities');
});

ipcMain.on('fileNameRequest', (event, fileName) => {
    let filePath = '';
    if (fileName.startsWith('G')) {
        // Teki
        filePath = join(config.gameDir, 'Placeables', 'Teki', `${fileName}.json`);
    } else {
        const mapPath = getMapPath(fileName);
        const day = fileName.startsWith('Cave') || fileName === 'Area011' ? '' : '_Day';
        filePath = join(mapPath, `AP_${fileName}_P_Teki${day}.json`);
    }

    if (process.platform === 'win32') {
        // Workround
        spawn('explorer.exe', [filePath]);
    } else {
        shell.openPath(filePath);
    }
});

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
    readMaps(false);
});

ipcMain.handle('getEntityData', async (event, entityId) => {
    const filePath = join(config.gameDir, 'Placeables', 'Teki', `G${entityId}.json`);
    let contents;

    try {
        contents = await promises.readFile(filePath, { encoding: 'utf-8' });
    } catch (err) {
        return mainWindow.webContents.send('errorNotify', `Failed to read from ${filePath}`);
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

ipcMain.handle('saveMaps', async (event, mapId, data) => {
    // console.log(rawData.teki.Content[0].ActorGeneratorList);
    const tekiAGL = data.creature.map(actor => {
        // console.log("creature array ddId:", actor.ddId);
        const aglData = rawData.teki.Content[0].ActorGeneratorList.find(gameActor => gameActor.ddId == actor.ddId);
        // Edited actor that exists in the AGL - update values
        if (aglData) {
            console.log("AGL ID:", aglData.ddId);
            // There are non-tekis in the teki AGL - leave them be
            // Tekis/G is because splines are Teki/Other/Spline/GSpline....
            const editables = ['Placeables/Teki/G', 'Gimmicks/ActorSpawner', 'Objects/Egg'];
            if (!editables.some(asset => aglData.SoftRefActorClass.AssetPathName.includes(asset))) {
                const newEntity = {
                    ...aglData
                };
                delete newEntity.ddId;
                return newEntity;
            }
            const transforms = {
                Rotation: setFloats(aglData.InitTransform.Rotation),
                Translation: setFloats(actor.transform.translation),
                Scale3D: setFloats(actor.transform.scale3D)
            };
            const originalAI = aglData.ActorSerializeParameter.AI.Static;
            const { parsed, inventoryEnd, ignoreList, groupingRadius } = getReadAIFunc(actor.creatureId)(originalAI);
            const isAIUnchanged = deepEqual(parsed, actor.drops.parsed);
            let newAI = {};
            if (!isAIUnchanged) {
                console.log(actor.creatureId, "constructing new AI");
                newAI = {
                    AI: {
                        Static: getConstructAIFunc(actor.creatureId)(actor.drops.parsed, originalAI, {
                            inventoryEnd,
                            groupingRadius,
                            ignoreList
                        }),
                        Dynamic: aglData.ActorSerializeParameter.AI.Dynamic
                    }
                };
            }
            else console.log(actor.creatureId, "AI is unchanged");

            const newEntity = {
                ...aglData,
                SoftRefActorClass: {
                    ...aglData.SoftRefActorClass,
                    AssetPathName: `/Game/Carrot4/Placeables/${getSubpath(actor.creatureId)}/G${actor.creatureId}.G${actor.creatureId}_C`,
                },
                InitTransform: transforms,
                Transform: transforms,
                GenerateInfo: {
                    ...aglData.GenerateInfo,
                    GenerateNum: parseInt(actor.generateNum),
                    GenerateRadius: parseFloat(actor.generateRadius),

                },
                RebirthInfo: {
                    ...aglData.RebirthInfo,
                    RebirthType: actor.rebirthType
                },
                ActorSerializeParameter: {
                    ...aglData.ActorSerializeParameter,
                    ...newAI
                }
            };
            delete newEntity.ddId;
            // console.log(newEntity);
            return newEntity;
        };
        // New actor not in the AGL - construct it
        return constructTeki(actor, mapId);
    });

    // Write to a new object - assigning back to the main cache strips the ddIds, so 
    // subsequent writes try to generate everything as new
    const newJson = {
        Content: [
            {
                ...rawData.teki.Content[0],
                ActorGeneratorList: tekiAGL
            }
        ],
        Extra: rawData.teki.Extra
    };
    const mapPath = getMapPath(mapId);
    const day = mapId.startsWith('Cave') || mapId === 'Area011' ? '' : '_Day';
    const floats = {};
    // JS truncates the .0 from a float as soon as it touches it 
    // Because there are no floats in JS, just "number", decimals included, so 4 == 4.0
    // However that means our data will get changed, and P4 _probably
    // wants its floats to still be floats, unlike JS. Therefore do some 
    // really janky string replacing to keep the precision on x.0 floats
    ["X", "Y", "Z", "W", "GenerateRadius", "OriginalPhysicsRadiusZ"].forEach(k => floats[k] = 'float');

    const stringData = unprotectNumbers(swf(floats)(newJson, null, 2));
    try {
        await promises.writeFile(join(mapPath, `AP_${mapId}_P_Teki${day}.json`), stringData);
        return 0; //idk return status codes or something
    } catch (e) {
        console.log(e);
        return e; // ??
    }
});

ipcMain.handle('readMapData', async (event, mapId) => {
    const mapPath = getMapPath(mapId);

    // if (mapId.startsWith('HeroStory')) {
    //     const areaId = 'Area' + mapId.slice(-3);
    //     mapPath = `/${areaId}/olimar.json`;
    // }
    // else {
    //     dataUrl += `/${mapId}/day.json`;
    // }
    const day = mapId.startsWith('Cave') || mapId === 'Area011' ? '' : '_Day';
    let tekiFile;
    try {
        tekiFile = await promises.readFile(join(mapPath, `AP_${mapId}_P_Teki${day}.json`), { encoding: 'utf-8' });
    } catch (e) {
        mainWindow.webContents.send('errorNotify', `Failed reading teki data from: ${join(mapPath, `AP_${mapId}_P_Teki${day}.json`)}`);
        return { creature: [] };
    }
    tekiFile = JSON.parse(protectNumbers(tekiFile));
    // console.log(tekiFile.Content[0].ActorGeneratorList);
    rawData.teki = tekiFile;

    const creature = rawData.teki.Content[0].ActorGeneratorList.map(teki => {
        // Unify our ID and the raw ID, so we can ensure we save back to the right one
        // In case array orders change (they shouldn't?)
        const ddId = randomBytes(16).toString('hex');
        teki.ddId = ddId;
        // if (teki.OutlineFolderPath !== 'Teki') return teki;
        const creatureId = teki.SoftRefActorClass?.AssetPathName?.split('.')[1].slice(1, -2);

        const { parsed, inventoryEnd, groupingRadius, ignoreList } = getReadAIFunc(creatureId)(teki.ActorSerializeParameter.AI.Static);
        return {
            type: 'creature',
            infoType: creatureId == 'GroupDropManager' ? 'gimmick' : 'creature',
            creatureId,
            ...(groupingRadius && { groupingRadius }),
            ...(ignoreList && { ignoreList }),
            transform: {
                translation: teki.InitTransform.Translation,
                scale3D: teki.InitTransform.Scale3D,
            },
            generateNum: parseInt(teki.GenerateInfo.GenerateNum),
            generateRadius: parseFloat(teki.GenerateInfo.GenerateRadius), // sometimes these decide to be strings. Persuade them not to be.
            rebirthType: teki.RebirthInfo.RebirthType,
            outlineFolderPath: teki.OutlineFolderPath, // Handle these better than including them then excluding them
            drops: {
                parsed,
                inventoryEnd,
            },
            ddId
        };
    }).filter(i => !!i);
    // return { creature: dummy.creature, creatureGenerate: creature };
    return { creature };
});

const getTekis = (force) => {
    const entities = [];
    readdir(`${join(config.gameDir, 'Placeables', 'Teki')}`, (err, files) => {
        if (err) {
            console.log(err);
            return mainWindow.webContents.send('errorNotify', `Failed to read from Placeaebles/Teki: ${err}`);
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

const readMaps = (force) => {
    if (!config.gameDir) return;
    if (config.gameDir == mapsCache.gameDir && !force) return mainWindow.webContents.send('getMaps', { maps: mapsCache.maps });

    console.log("Reading maps");
    const AREA_PATH = join(`${config.gameDir}`, "Maps", "Main", "Area");
    const CAVE_PATH = join(`${config.gameDir}`, "Maps", "Madori", "Cave");
    const maps = [];

    readdir(AREA_PATH, (err, areaMaps) => {
        if (err) {
            console.error(err);
            // TOOD: return error toast
            return mainWindow.webContents.send('errorNotify', `Failed to read maps from: ${AREA_PATH}`);
            // return mainWindow.webContents.send('getMaps', { maps: [] });
        }
        maps.push(...areaMaps);
        readdir(CAVE_PATH, async (err, caveMaps) => {
            if (err) {
                // TODO: return error toast and maps
                console.error(err);
                mapsCache = {
                    maps,
                    gameDir: config.gameDir
                };
                mainWindow.webContents.send('errorNotify', `Failed to read caves from: ${CAVE_PATH}`);
                return mainWindow.webContents.send('getMaps', { maps, caveError: `Failed to read from: ${CAVE_PATH}` });
            }
            const caves = await Promise.all([...caveMaps.map(path => promises.readdir(join(CAVE_PATH, path)))]);

            maps.push(...caves.flat());
            mapsCache = {
                maps,
                gameDir: config.gameDir
            };
            return mainWindow.webContents.send('getMaps', { maps });
        });
    });
};

try {
    accessSync(CONFIG_PATH, constants.F_OK);
    const data = readFileSync(CONFIG_PATH, { encoding: "utf-8" });
    // if (err) mainWindow.webContents.send('errorNotify', `Could not read from config: ${e}`);
    config = JSON.parse(data);
} catch (err) {
    console.error(`${CONFIG_PATH} does not exist, generating`);
    writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 4), { encoding: "utf-8" });
    config = DEFAULT_CONFIG;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);