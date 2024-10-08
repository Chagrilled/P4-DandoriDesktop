import React, { useEffect, useState } from 'react';

export const useConfig = () => {
    const [config, setConfig] = useState();

    if (config === undefined) {
        window.electron.ipcRenderer.getConfig();
    }
    useEffect(() => {
        window.electron.ipcRenderer.on('getConfig', (evt, message) => { setConfig(message); });
        return () => window.electron.ipcRenderer.removeAllListeners('getConfig');
    }, []);

    return config;
};