


const { app, Menu, dialog, shell } = require('electron');

import { readdir, promises, writeFile, accessSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';
import { version } from '../../package.json';

const isMac = process.platform === 'darwin';

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
                    subprocess.stdout.on('data', data => console.log(data.toString('utf8')));
                    subprocess.stderr.on('data', data => console.log(data.toString('utf8')));
                    subprocess.on('close', (code) => {
                        if (code !== 0) {
                            return mainWindow.webContents.send('errorNotify', 'Failed encoding');
                        }
                        mainWindow.webContents.send('successNotify', 'Encoded JSONs');
                        // On Windows, there's no mkdir -p
                        const castocDir = join(config.castocDir, '_EDIT', 'Carrot4', 'Content');
                        const cmd = `robocopy "${join(config.encoderDir, '_OUTPUT')}" "${castocDir}" /is /it /E`;
                        subprocess = spawn(cmd, { shell: true });
                        subprocess.stdout.on('data', data => console.log(data.toString('utf8')));
                        subprocess.stderr.on('data', data => console.log(data.toString('utf8')));
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
                label: 'Open Emulator (Admin Startup Required)',
                click: () => {
                    spawn(config.emulatorFile);
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
                            const AREA_PATH = join(`${result.filePaths[0]}`, "Main", "Area");
                            const CAVE_PATH = join(`${result.filePaths[0]}`, "Madori", "Cave");
                            await promises.mkdir(join(result.filePaths[0], 'DandoriDesktop-Carrot4', 'Maps'), { recursive: true });
                            await promises.mkdir(join(result.filePaths[0], 'DandoriDesktop-Carrot4', 'Maps', 'Main', 'Area'), { recursive: true });
                            await promises.mkdir(join(result.filePaths[0], 'DandoriDesktop-Carrot4', 'Maps', 'Madori', 'Cave'), { recursive: true });
                            const exportAreaPath = join(result.filePaths[0], 'DandoriDesktop-Carrot4', 'Maps', 'Main', 'Area');
                            const exportCavePath = join(result.filePaths[0], 'DandoriDesktop-Carrot4', 'Maps', 'Madori', 'Cave');

                            console.log(AREA_PATH);
                            readdir(AREA_PATH, (err, areaMaps) => {
                                console.log("areaMap", areaMaps);
                                if (err) {
                                    return mainWindow.webContents.send('errorNotify', `Could not find any maps in ${AREA_PATH}`);
                                }
                                areaMaps.forEach(async map => {
                                    if (map === 'Area500') return;
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
                                        shell.openPath(result.filePaths[0]);
                                        mainWindow.webContents.send('errorNotify', 'Could not read cave maps');
                                        return mainWindow.webContents.send('successNotify', "Main area files copied - This is your Carrot4 folder. Put it in UassetEditor's _EDIT folder.");
                                    }
                                    const caves = await Promise.all([...caveMaps.map(path => promises.readdir(join(CAVE_PATH, path)))]);
                                    caves.flat().forEach(async subfloor => {
                                        console.log(subfloor);
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
                                    shell.openPath(result.filePaths[0]);
                                    return mainWindow.webContents.send('successNotify', "Files copied - This is your Carrot4 folder. Put it in UassetEditor's _EDIT folder.");
                                });
                            });
                        }
                    });
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
            },
            {
                label: 'Open Devtools',
                click: () => mainWindow.webContents.openDevTools()
            }
        ]
    }
]);