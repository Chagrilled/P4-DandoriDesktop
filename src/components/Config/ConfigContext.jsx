
import React, { createContext, useState, useEffect } from 'react';

const ConfigContext = createContext();

const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState();
    const [configData, setConfigData] = useState({});
    const [selectedRow, setSelectedRow] = useState();
    const [appConfig, setAppConfig] = useState();

    useEffect(() => {
        window.electron.ipcRenderer.on('getConfig', (evt, message) => { setAppConfig(message); console.log("received context config message"); });
        return () => { window.electron.ipcRenderer.removeAllListeners('getConfig'); console.log("removed all listeners"); };
    }, []);

    if (appConfig === undefined) {
        window.electron.ipcRenderer.getConfig();
    }

    return (
        <ConfigContext.Provider value={{ config, configData, selectedRow, appConfig, setSelectedRow, setConfigData, setConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export { ConfigContext, ConfigProvider };