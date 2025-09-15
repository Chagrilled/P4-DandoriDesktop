


const { app, Menu, dialog, shell } = require('electron');
import { BrowserWindow } from 'electron';
import { readdir, promises, writeFile, accessSync, createWriteStream, existsSync, rmSync, cpSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';
import { version } from '../../package.json';
import AdmZip from "adm-zip";
import axios from 'axios';
import { Messages } from '../api/types';

const isMac = process.platform === 'darwin';
const LOG_PATH = join(`${app.getPath('userData')}`, 'logs');

const defaultLogger = (data, logStream) => {
    console.log(data.toString('utf8'));
    logStream.write(data.toString('utf8'));
};

//#region Extract Files
const extractFiles = async (filePath, mainWindow, destination, resetMessage) => {
    const AREA_PATH = join(`${filePath}`, "Main", "Area");
    const CAVE_PATH = join(`${filePath}`, "Madori", "Cave");
    const basePath = destination || join(filePath, 'DandoriDesktop-Carrot4');
    await promises.mkdir(join(basePath, 'Maps'), { recursive: true });
    await promises.mkdir(join(basePath, 'Maps', 'Main', 'Area'), { recursive: true });
    await promises.mkdir(join(basePath, 'Maps', 'Madori', 'Cave'), { recursive: true });
    const exportAreaPath = join(basePath, 'Maps', 'Main', 'Area');
    const exportCavePath = join(basePath, 'Maps', 'Madori', 'Cave');

    readdir(AREA_PATH, (err, areaMaps) => {
        console.log("areaMap", areaMaps);
        if (err) {
            logger.error(err);
            return mainWindow.webContents.send(Messages.ERROR, `Could not find any maps in ${AREA_PATH}`);
        }
        areaMaps.forEach(async map => {
            // if (map === 'Area500') return;
            const fileNames = [
                "Teki_Day",
                "Teki_Night",
                "Objects_Day",
                "Objects_Night",
                "Hero_Teki",
                "Hero_Objects",
                "Teki",
                "Objects"
            ];
            await promises.mkdir(join(exportAreaPath, map, 'ActorPlacementInfo'), { recursive: true });

            fileNames.forEach(async file => {
                try {
                    const mapPath = join(map, 'ActorPlacementInfo', `AP_${map}_P_${file}.json`);
                    accessSync(join(AREA_PATH, mapPath));
                    await promises.cp(join(AREA_PATH, mapPath), join(exportAreaPath, mapPath));
                } catch (e) { }
            });
        });
        readdir(CAVE_PATH, async (err, caveMaps) => {
            console.log("caveMaps", caveMaps);
            if (err) {
                logger.error(err);
                shell.openPath(filePath);
                mainWindow.webContents.send(Messages.NONBLOCKING, 'Could not read cave maps');
                return mainWindow.webContents.send(Messages.SUCCESS, "Main area files copied - This is your Carrot4 folder. Put it in UassetEditor's _EDIT folder.");
            }
            const caves = await Promise.all([...caveMaps.map(path => promises.readdir(join(CAVE_PATH, path)))]);
            caves.flat().forEach(async subfloor => {
                const [cave] = subfloor.split('_');
                const fileNames = [
                    "Teki",
                    "Objects"
                ];
                await promises.mkdir(join(exportCavePath, cave, subfloor, 'ActorPlacementInfo'), { recursive: true });
                fileNames.forEach(async file => {
                    const mapPath = join(cave, subfloor, 'ActorPlacementInfo', `AP_${subfloor}_P_${file}.json`);
                    try {
                        accessSync(join(CAVE_PATH, mapPath));
                    } catch (e) { }
                    await promises.cp(join(CAVE_PATH, mapPath), join(exportCavePath, mapPath));
                });
            });
            if (!destination) shell.openPath(filePath);
            let message = "Files copied - This is your Carrot4 folder. Put it in UassetEditor's _EDIT folder.";
            if (resetMessage) message = "Reset all maps files";
            return mainWindow.webContents.send(Messages.SUCCESS, message);
        });
    });
};

export const createMenu = (config, CONFIG_PATH, readMaps, getTekis, mainWindow) => Menu.buildFromTemplate([
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
    //#region Settings
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
                            readMaps(true, mainWindow);
                            getTekis();
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
                            mainWindow.webContents.send(Messages.SUCCESS, 'Set encoder directory');
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
                            mainWindow.webContents.send(Messages.SUCCESS, 'Set castocDir directory');
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
                            mainWindow.webContents.send(Messages.SUCCESS, 'Set outputDir directory');
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
                            mainWindow.webContents.send(Messages.SUCCESS, 'Set emulator path');
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
            },
            {
                label: 'Hide Invisible Entities',
                type: 'checkbox',
                checked: config.hideInvisEntities,
                click: () => {
                    config.hideInvisEntities = !config.hideInvisEntities;
                    writeFile(CONFIG_PATH, JSON.stringify({
                        ...config,
                        hideInvisEntities: config.hideInvisEntities
                    }, null, 4), { encoding: "utf-8" }, () => { });
                    mainWindow.webContents.send('getConfig', config);
                }
            },
            {
                label: 'Show Rotation',
                type: 'checkbox',
                checked: config.showRotation,
                click: () => {
                    config.showRotation = !config.showRotation;
                    writeFile(CONFIG_PATH, JSON.stringify({
                        ...config,
                        showRotation: config.showRotation
                    }, null, 4), { encoding: "utf-8" }, () => { });
                    mainWindow.webContents.send('getConfig', config);
                }
            },
            {
                label: 'Disable Auto Update',
                type: 'checkbox',
                checked: config.disableAutoUpdate,
                click: () => {
                    config.disableAutoUpdate = !config.disableAutoUpdate;
                    writeFile(CONFIG_PATH, JSON.stringify({
                        ...config,
                        disableAutoUpdate: config.disableAutoUpdate
                    }, null, 4), { encoding: "utf-8" }, () => { });
                }
            }
        ]
    },
    //#region Tools
    {
        label: 'Tools',
        submenu: [
            {
                label: 'Save to JSON',
                click: () => {
                    mainWindow.webContents.send('saveRequest');
                }
            },
            {
                label: 'Deploy to Emulator',
                click: () => {
                    if (!config.encoderDir)
                        return mainWindow.webContents.send(Messages.ERROR, 'Set encoder folder first');

                    if (!config.castocDir)
                        return mainWindow.webContents.send(Messages.ERROR, 'Set castoc folder first');

                    if (!config.outputDir)
                        return mainWindow.webContents.send(Messages.ERROR, 'Set output paks folder first');

                    rmSync(join(config.encoderDir, "_OUTPUT", "Carrot4"), { recursive: true, force: true });
                    rmSync(join(config.castocDir, "_EDIT", "Carrot4"), { recursive: true, force: true });

                    mainWindow.webContents.send(Messages.PROGRESS, 'Encoding JSONs');
                    let errorFlag = false;
                    const logStream = createWriteStream(join(LOG_PATH, 'deploy-log.txt'), { flags: 'w' });

                    // The bat scripts have `pause`s in them, and for the life of me I couldn't programmatically get through it
                    let subprocess = spawn('main.exe encode', { shell: true, cwd: join(config.encoderDir, "P4UassetEditor") });
                    subprocess.on('error', e => { });
                    subprocess.stdout.on('data', data => defaultLogger(data, logStream));
                    subprocess.stderr.on('data', data => {
                        defaultLogger(data, logStream);
                        if (data.includes('global.json'))
                            errorFlag = true;
                    });
                    subprocess.on('close', (code) => {
                        if (errorFlag) return mainWindow.webContents.send(Messages.ERROR, '_GLOBAL_UCAS/global.json is missing - follow UassetEditor\'s readme to generate it, or get Noodl\'s from the pinned message in #pikmin-4-help of Hocotate Hacker');
                        if (code !== 0) {
                            console.log(code);
                            // ENOENT in libuv is this
                            if (code === -4058) return mainWindow.webContents.send(Messages.ERROR, 'Failed to run encoder. Make sure that P4UassetEditor/main.exe exists in your encoder folder.');
                            return mainWindow.webContents.send(Messages.ERROR, 'Failed encoding - check the log file');
                        }
                        mainWindow.webContents.send(Messages.SUCCESS, 'Encoded JSONs');

                        // Copy encoder outputs to castoc folder -  On Windows, there's no mkdir -p
                        const castocDir = join(config.castocDir, '_EDIT', 'Carrot4', 'Content');
                        const cmd = `robocopy "${join(config.encoderDir, '_OUTPUT')}" "${castocDir}" /is /it /E`;
                        subprocess = spawn(cmd, { shell: true });
                        subprocess.stdout.on('data', data => defaultLogger(data, logStream));
                        subprocess.stderr.on('data', data => defaultLogger(data, logStream));
                        subprocess.on('close', (code) => {
                            if (code > 7) { // https://ss64.com/nt/robocopy-exit.html
                                return mainWindow.webContents.send(Messages.ERROR, `Failed copying to ${join(config.castocDir, '_EDIT', 'Carrot4', 'Content')}`);
                            }
                            // castoc errors aren't returning - maybe because it pauses rather than erroring
                            mainWindow.webContents.send(Messages.SUCCESS, 'Copied outputs to castoc');

                            // Castoc Packing
                            subprocess = spawn('main.exe pack ..\\..\\_EDIT ..\\..\\Manifest.json ..\\..\\_OUTPUT\\Mod_P None', { shell: true, cwd: join(config.castocDir, "Source", "UassetCreationTools") });
                            subprocess.on('error', e => { });
                            let errorFlag = false;
                            subprocess.stdout.on('data', data => {
                                defaultLogger(data, logStream);
                                if (data.includes('Did you use the correct manifest file')) errorFlag = true;
                            });
                            subprocess.on('close', (code) => {
                                if (code !== 0) {
                                    if (code === -4058) return mainWindow.webContents.send(Messages.ERROR, 'Failed to run castoc. Make sure that Source/UassetCreationTools/main.exe exists in your castoc folder.');
                                    return mainWindow.webContents.send(Messages.ERROR, `Failed running castoc PACKFILES`);
                                }
                                if (errorFlag) return mainWindow.webContents.send(Messages.ERROR, `castoc didn't pack the files correctly - something is wrong with them, or manifest.json is missing/incorrect`);
                                mainWindow.webContents.send(Messages.SUCCESS, 'Compiled to paks');

                                // Emulator copying
                                subprocess = spawn(`robocopy "${join(config.castocDir, '_OUTPUT')}" "${config.outputDir}" /is /it`, { shell: true });
                                subprocess.on('close', (code) => {
                                    if (code > 7) {
                                        return mainWindow.webContents.send(Messages.ERROR, `Failed copying to ${config.outputDir}`);
                                    }
                                    return mainWindow.webContents.send(Messages.SUCCESS, `Paks copied to ${config.outputDir}`);
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
                label: 'Open Emulator (Admin Startup Required)',
                click: () => {
                    if (!config.emulatorFile) return mainWindow.webContents.send(Messages.ERROR, "Set your emulator path first");
                    const subprocess = spawn(config.emulatorFile);
                    subprocess.on('error', () => mainWindow.webContents.send(Messages.ERROR, "Dandori Desktop must be run as administrator to do this."));
                }
            },
            {
                label: 'Open in IDE',
                click: () => {
                    mainWindow.webContents.send('fileNameRequest');
                }
            },
            {
                label: 'Extract Teki/Object Files from Maps',
                click: () => {
                    dialog.showOpenDialog(mainWindow, {
                        properties: ['openDirectory'],
                        title: 'Select your Maps folder',
                        multiSelections: false,
                        buttonLabel: "This is my Maps/ folder"
                    }).then(async result => {
                        if (result.filePaths && !result.canceled) {
                            await extractFiles(result.filePaths[0], mainWindow);
                        }
                    });
                }
            },
            //#region Setup Files
            {
                label: 'Setup Files',
                click: () => {
                    dialog.showOpenDialog(mainWindow, {
                        properties: ['openDirectory'],
                        title: 'Select your destination folder',
                        multiSelections: false,
                        buttonLabel: "Put stuff here"
                    }).then(async result => {
                        if (result.filePaths && !result.canceled) {
                            mainWindow.webContents.send(Messages.PROGRESS, 'Downloading contents, hold tight');
                            const [maps, castoc, uasseteditor, dtFiles] = await Promise.all([
                                axios.get('https://github.com/Chagrilled/P4-Utils/raw/master/Maps.zip', { responseType: 'arraybuffer' }),
                                axios.get('https://github.com/Chagrilled/P4-Utils/raw/master/tooling/castoc.zip', { responseType: 'arraybuffer' }),
                                axios.get('https://github.com/Chagrilled/P4-Utils/raw/master/tooling/P4UassetEditor.zip', { responseType: 'arraybuffer' }),
                                axios.get('https://github.com/Chagrilled/P4-Utils/raw/master/DT.zip', { responseType: 'arraybuffer' })
                            ]);
                            const dest = result.filePaths[0];

                            new AdmZip(Buffer.from(uasseteditor.data, 'binary')).extractAllTo(dest);
                            new AdmZip(Buffer.from(castoc.data, 'binary')).extractAllTo(dest);
                            new AdmZip(Buffer.from(maps.data, 'binary')).extractAllTo(join(dest, 'MapArchive'));
                            new AdmZip(Buffer.from(dtFiles.data, 'binary')).extractAllTo(dest);

                            const carrot4Folder = join(dest, 'P4UassetEditor', '_EDIT', 'Carrot4');
                            await extractFiles(join(dest, 'MapArchive', 'Maps'), mainWindow, carrot4Folder);
                            // Should really refactor this map/file copying as it's very map centric right now
                            cpSync(join(dest, "Core"), join(carrot4Folder, "Core"), {
                                recursive: true
                            });

                            config.castocDir = join(dest, 'castoc');
                            config.encoderDir = join(dest, 'P4UassetEditor');
                            config.gameDir = carrot4Folder;

                            shell.openPath(join(dest));

                            writeFile(CONFIG_PATH, JSON.stringify({
                                ...config,
                                castocDir: config.castocDir,
                                encoderDir: config.encoderDir,
                                gameDir: config.gameDir
                            }, null, 4), { encoding: "utf-8" }, () => { });
                            mainWindow.webContents.send(Messages.SUCCESS, 'Setup files. Set emulator output path and off you go.');
                        }
                    });
                }
            },
            {
                label: 'Reset All Files',
                click: () => {
                    const dest = join(`${app.getPath('userData')}`, 'maps');
                    if (existsSync(join(`${app.getPath('userData')}`, 'maps', 'Maps'))) {
                        extractFiles(join(dest, 'Maps'), mainWindow, join(config.gameDir), true);
                    }
                    else {
                        mainWindow.webContents.send(Messages.PROGRESS, 'Downloading contents, hold tight');

                        axios.get('https://github.com/Chagrilled/P4-Utils/raw/master/Maps.zip', { responseType: 'arraybuffer' }).then(async (maps) => {
                            new AdmZip(Buffer.from(maps.data, 'binary')).extractAllTo(dest);
                            await extractFiles(join(dest, 'Maps'), mainWindow, join(config.gameDir), true);
                        });
                    }
                }
            }
        ]
    },
    {
        label: 'Randomiser',
        click: () => {
            const randoWindow = new BrowserWindow({
                width: 1400,
                height: 1600,
                icon: 'src/images/icons/icon.png',
                webPreferences: {
                    preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
                    nodeIntegration: true
                },
            });

            // and load the index.html of the app.
            if (!app.isPackaged) randoWindow.openDevTools();
            randoWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + '#randomiser');
        }
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Repo',
                click: () => shell.openExternal('https://github.com/Chagrilled/P4-DandoriDesktop')

            },
            {
                label: 'Randomiser Docs',
                click: () => shell.openExternal('https://github.com/Chagrilled/P4-DandoriDesktop/blob/master/docs/randomiser.md')
            },
            {
                label: 'Support Dandori Desktop',
                click: () => shell.openExternal('https://ko-fi.com/noodl32')
            },
            {
                label: 'Open Devtools',
                click: () => mainWindow.webContents.openDevTools()
            },
            {
                label: 'Open Log Folder',
                click: () => {
                    if (process.platform === 'win32') {
                        // Workround
                        spawn('explorer.exe', [LOG_PATH]);
                    } else {
                        shell.openPath(LOG_PATH);
                    }
                }
            },
            {
                label: `Version ${version}`,
                enabled: false
            }
        ]
    }
]);