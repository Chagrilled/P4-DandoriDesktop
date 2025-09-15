// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    ipcRenderer: {
        ...ipcRenderer,
        once: ipcRenderer.once.bind(ipcRenderer),
        on: ipcRenderer.on.bind(ipcRenderer),
        removeListener: ipcRenderer.removeListener.bind(ipcRenderer),
        removeAllListeners: ipcRenderer.removeAllListeners.bind(ipcRenderer),
        getConfig: () => ipcRenderer.send('getConfig'),
        readMaps: () => ipcRenderer.send('readMaps'),
        readMapData: (mapId) => ipcRenderer.invoke('readMapData', mapId),
        saveMaps: (mapId, entities) => ipcRenderer.invoke('saveMaps', mapId, entities),
        saveEntities: (entityData) => ipcRenderer.send('saveEntities', entityData),
        getTekis: () => ipcRenderer.send('getTekis'),
        getEntityData: (entity) => ipcRenderer.invoke('getEntityData', entity),
        sendFileName: (fileName) => ipcRenderer.send('fileNameRequest', fileName),
        randomise: (state) => ipcRenderer.send('randomise', state),
        getConfigData: (config) => ipcRenderer.invoke('getConfigData', config),
        getConfigs: () => ipcRenderer.send('getConfigs'),
        saveConfig: (config, configData) => ipcRenderer.invoke('saveConfig', config, configData),
    }
});