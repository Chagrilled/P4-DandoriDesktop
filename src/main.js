const { app, BrowserWindow, ipcMain, Menu, dialog, shell } = require('electron');
import { readdir, promises, constants, readFileSync, accessSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';
import swf from 'stringify-with-floats';
import { spawn } from 'child_process';
import { exposedGenVars, InfoType, Times } from './api/types';
import { regenerateAGLEntity } from './genEditing';
import { getReadAIFunc, getReadPortalFunc } from './genEditing/reading';
import { constructActor } from './genEditing/constructing';
import { protectNumbers, unprotectNumbers, getInfoType, getAvailableTimes } from './utils';
import { createMenu } from './utils/createMenu';
import { byteArrToInt } from './utils/bytes';

const CONFIG_PATH = join(`${app.getPath('userData')}`, "config.json");
const TEKI = 'Teki';
const OBJECTS = 'Objects';
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

// Anything using path/Node modules has to be in the main process - maybe could go into a nodeUtils file
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

const getFilePath = (mapId, type, baseFile = false) => {
    const specialMaps = mapId.startsWith('HeroStory') || mapId.startsWith('Cave') || mapId === 'Area011';
    if (specialMaps && baseFile) return false; // Otherwise caves/etc will read the same file twice and duplicate features

    const areaId = ["HeroStory", "Night"].some(p => mapId.startsWith(p)) ? `Area${mapId.slice(-3)}` : mapId;
    const hero = mapId.startsWith('HeroStory') ? '_Hero' : '';
    const mapPath = getMapPath(areaId);
    const day = specialMaps ? '' : mapId.includes('Night') ? '_Night' : '_Day';
    return join(mapPath, `AP_${areaId}_P${hero}_${type}${baseFile ? '' : day}.json`);
};

const getBaseFilePath = (mapId, type) => {
    const areaId = ["HeroStory", "Night"].some(p => mapId.startsWith(p)) ? `Area${mapId.slice(-3)}` : mapId;
    const mapPath = getMapPath(areaId);
    const hero = mapId.startsWith('HeroStory') ? '_Hero' : '';
    return join(mapPath, `AP_${areaId}_P${hero}_${type}.json`);
};

/*****************************
 * ***************************
 *   IPC Handlers
 * ***************************
 *****************************/

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
        filePath = getFilePath(fileName, TEKI);
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
        if (aglData) return regenerateAGLEntity(actor, aglData);

        // New actor not in the AGL - construct it
        return constructActor(actor, mapId);
    });

    const dayObjectAGL = [];
    const baseObjectAGL = [];
    Object.entries(data).forEach(([typeName, typeArray]) => {
        if (typeName === 'creature' || typeName === 'water') return;

        // Use regenerateAGLEntity later on to de-dupe this once AI is sorted across the board
        typeArray.forEach(actor => {
            const outputArray = actor.time == Times.DAY ? dayObjectAGL : baseObjectAGL;
            // Search both rawData arrays in case an actor is swapped from one to the other - we can still find its AGL entry
            let aglData = rawData.objectsPermanent.Content[0].ActorGeneratorList.find(gameActor => gameActor.ddId == actor.ddId);
            if (!aglData && rawData.objectsDay) aglData = rawData.objectsDay.Content[0].ActorGeneratorList.find(gameActor => gameActor.ddId == actor.ddId);
            if (aglData) outputArray.push(regenerateAGLEntity(actor, aglData));
            // New actor not in the AGL - construct it
            else outputArray.push(constructActor(actor, mapId));
        });
    });

    // Problems:
    // caves/hero?/prologue will be read as day because getFilePath will coerce them to the base file for the daytime read
    // That's needed to not duplicate, because we need to read/write to both files
    // but we only need to write back if there's something in the array?
    // We need to avoid writing net new files though because we don't have the extra data to reencode/pack it
    // So what is someone changes a permanent to a day?
    // and what about the default time for net new actors on the map

    // 1. we need to not coerce the special maps to the base file and just let them error when trying, and catch
    // 2.the editor needs to be aware of what files exist, so we don't let people try set objects at times that don't exist
    // maybe just restrict the dropdown on special maps since we know what caves don't have time-specific files
    // 3. if someone has deleted all the enemies, we still want that to be saveable, so length checks on the AGL aren't right
    // is that a problem? If we just have code that knows what files to read from
    // I sort of resolved this by just making getBaseFilePath as an easy override function instead of fucking
    // with conditions. It's not great.
    const mapTimes = getAvailableTimes(mapId);

    const aglPromises = [
        writeAGL(rawData.teki, tekiAGL, mapId, TEKI),
    ];
    mapTimes.forEach(time => {
        if (time === Times.DAY) aglPromises.push(writeAGL(rawData.objectsDay, dayObjectAGL, mapId, OBJECTS));
        else aglPromises.push(writeAGL(rawData.objectsPermanent, baseObjectAGL, mapId, OBJECTS, true));
    });

    await Promise.all(aglPromises);
    // Write to a new object - assigning back to the main cache strips the ddIds, so 
    // subsequent writes try to generate everything as new
});

const writeAGL = async (originalRaw, newAGL, mapId, mapType, baseFile) => {
    if (['Cave004_F00', 'Cave013_F02'].some(m => mapId === m) && mapType === TEKI) return; // Cave004_F00 doesn't have a teki file. We can't construct them from scratch

    const newJson = {
        Content: [
            {
                ...originalRaw.Content[0],
                ActorGeneratorList: newAGL
            }
        ],
        Extra: originalRaw.Extra
    };

    const mapPath = baseFile ? getBaseFilePath(mapId, mapType) : getFilePath(mapId, mapType);
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
        console.log(e);
        mainWindow.webContents.send('errorNotify', `Couldn't write to file: ${e}`);
        return e; // ??
    }
};

ipcMain.handle('readMapData', async (event, mapId) => {
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
        [InfoType.Item]: []
    };

    let tekiFile;
    try {
        tekiFile = await promises.readFile(mapPath, { encoding: 'utf-8' });
        tekiFile = JSON.parse(protectNumbers(tekiFile));
        // console.log(tekiFile.Content[0].ActorGeneratorList);
        rawData.teki = tekiFile;

        // Catch people with weird teki files. I think this is when they export raw JSON rather than decode a uasset
        // Later on we can work around that to support both, but that's not important now
        if (!Array.isArray(rawData.teki.Content)) {
            mainWindow.webContents.send('errorNotify', 'Couldn\'t read JSON - Map is missing the Content array. Export the raw uasset and decode it');
            // return features;
        }

        features.creature = rawData.teki.Content[0].ActorGeneratorList.map(teki => {
            // Unify our ID and the raw ID, so we can ensure we save back to the right one
            // In case array orders change (they shouldn't?)
            const ddId = randomBytes(16).toString('hex');
            teki.ddId = ddId;
            // if (teki.OutlineFolderPath !== 'Teki') return teki;
            const creatureId = teki.SoftRefActorClass?.AssetPathName?.split('.')[1].slice(1, -2);
            const infoType = creatureId == 'GroupDropManager' ? 'gimmick' : 'creature';
            // Return an AIProperties from this and spread it into the editor's object - NoraSpawners actual entity
            // is meaningfully affected by AI, like ActorSpawner, so we need it on hand, not as a drop
            const { parsed, inventoryEnd, groupingRadius, ignoreList } = getReadAIFunc(creatureId, infoType)(teki.ActorSerializeParameter.AI.Static);
            // Sadly, changing Life.Dynamic seems not to do anything to tekis
            // const Life = teki.ActorSerializeParameter.Life.Dynamic.length ? parseFloat(new Float32Array(new Uint8Array(teki.ActorSerializeParameter.Life.Dynamic.slice(0, 4)).buffer)[0]) : null;

            return {
                type: 'creature',
                infoType,
                creatureId,
                ...(groupingRadius && { groupingRadius }),
                ...(ignoreList && { ignoreList }),
                // ...(Life && { Life }),
                transform: {
                    rotation: teki.InitTransform.Rotation,
                    translation: teki.InitTransform.Translation,
                    scale3D: teki.InitTransform.Scale3D,
                },
                generateNum: parseInt(teki.GenerateInfo.GenerateNum),
                generateRadius: parseFloat(teki.GenerateInfo.GenerateRadius), // sometimes these decide to be strings. Persuade them not to be.
                rebirthType: teki.RebirthInfo.RebirthType,
                rebirthInterval: teki.RebirthInfo.RebirthInterval,
                birthDay: teki.RebirthInfo.BirthDay,
                deadDay: teki.RebirthInfo.DeadDay,
                outlineFolderPath: teki.OutlineFolderPath, // Handle these better than including them then excluding them
                drops: {
                    parsed,
                    inventoryEnd
                },
                ddId
            };
        }).filter(i => !!i);
    } catch (e) {
        if (!["Cave004_F00", "Cave013_F02"].some(m => mapId === m)) mainWindow.webContents.send('errorNotify', `Failed reading teki data from: ${mapPath}`);
    }

    const objectProcessor = (object, fileType) => {
        const ddId = randomBytes(16).toString('hex');
        object.ddId = ddId;
        const entityId = object.SoftRefActorClass?.AssetPathName?.split('.')[1].slice(1, -2);

        const subPath = object.SoftRefActorClass?.AssetPathName?.match(/Placeables\/(.+)\/G/)[1];

        const infoType = getInfoType(subPath);
        const { parsed, AIProperties, rareDrops, spareBytes } = getReadAIFunc(entityId, infoType)(object.ActorSerializeParameter.AI.Static);
        const { PortalTrigger } = getReadPortalFunc(infoType)(object.ActorSerializeParameter.PortalTrigger.Static);
        const Life = entityId.includes('Gate') ? parseFloat(new Float32Array(new Uint8Array(object.ActorSerializeParameter.Life.Dynamic.slice(0, 4)).buffer)[0]) : null;
        const weight = entityId.includes('DownWall') ? byteArrToInt(object.ActorSerializeParameter.Affordance.Static.slice(-4).reverse()) : null;
        console.log("AIProperties", AIProperties);
        features[infoType].push({
            type: 'object',
            infoType,
            creatureId: entityId, // rename later
            ...(AIProperties && { AIProperties }),
            ...(PortalTrigger && { PortalTrigger }),
            ...(Life && { Life }),
            ...(weight && { weight }),
            transform: {
                rotation: object.InitTransform.Rotation,
                translation: object.InitTransform.Translation,
                scale3D: object.InitTransform.Scale3D
            },
            generateNum: parseInt(object.GenerateInfo.GenerateNum),
            generateRadius: parseFloat(object.GenerateInfo.GenerateRadius), // sometimes these decide to be strings. Persuade them not to be.
            rebirthType: object.RebirthInfo.RebirthType,
            rebirthInterval: object.RebirthInfo.RebirthInterval,
            outlineFolderPath: object.OutlineFolderPath, // Handle these better than including them then excluding them
            drops: {
                parsed,
                rareDrops,
                spareBytes
            },
            ddId,
            time: fileType
        });
    };

    let baseObjectFile;
    try {
        const baseObjectPath = getBaseFilePath(mapId, OBJECTS);
        baseObjectFile = await getFileData(baseObjectPath);
    } catch (e) { }
    if (baseObjectFile) {
        rawData.objectsPermanent = baseObjectFile;
        rawData.objectsPermanent.Content[0].ActorGeneratorList.forEach(actor => objectProcessor(actor, Times.PERM));
    }

    // This is getting really dumb.
    if (!['HeroStory', 'Cave', 'Area011'].some(area => mapId.includes(area))) {
        let objectFile;
        try {
            const objectPath = getFilePath(mapId, OBJECTS);
            objectFile = await getFileData(objectPath);
            if (!objectFile) return features;
        } catch (e) { }
        rawData.objectsDay = objectFile;
        rawData.objectsDay.Content[0].ActorGeneratorList.forEach(actor => objectProcessor(actor, Times.DAY));
    }

    return features;
});

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
        mainWindow.webContents.send('errorNotify', `Failed reading data from: ${fileName}`);
        return undefined;
    }
};

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
            mainWindow.webContents.send('nonBlockingNotify', `Failed to read main area maps from: ${AREA_PATH}`);
            // return mainWindow.webContents.send('getMaps', { maps: [] });
        }
        // maps.push(...areaMaps);
        areaMaps.forEach(map => {
            const files = readdirSync(join(AREA_PATH, map, 'ActorPlacementInfo'));
            files.forEach(file => {
                if (file.includes('Hero') && !maps.includes(`HeroStory${map.slice(-3)}`)) {
                    maps.push(`HeroStory${map.slice(-3)}`);
                }
                else if (file.match(/_P_(?:Teki|Objects)/) && !maps.includes(map)) {
                    maps.push(map);
                }
                // if (file.includes('Night') && !maps.includes(`Night${map.slice(-3)}`) {
                //     maps.push(`Night${map.slice(-3)}`);
                // }
            });
        });
        readdir(CAVE_PATH, async (err, caveMaps) => {
            if (err) {
                // TODO: return error toast and maps
                console.error(err);
                mapsCache = {
                    maps,
                    gameDir: config.gameDir
                };
                mainWindow.webContents.send('nonBlockingNotify', `Failed to read caves from: ${CAVE_PATH}`);
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


/*****************************
 * ***************************
 *   Config Reading
 * ***************************
 *****************************/
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