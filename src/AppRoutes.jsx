import React, { useEffect } from 'react';

import { SplashScreen } from './pages/Splashscreen';
import { Maps } from './pages/Maps';
import { Editor } from './pages/Editor';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const AppRoutes = () => {
    useEffect(() => {
        window.electron.ipcRenderer.on('errorNotify', (something, message) => {
            toast(message, {
                duration: 7000,
                icon: '❌',
                style: {
                    color: '#bd2626',
                    maxWidth: 'fit-content'
                }
            });
        });
        window.electron.ipcRenderer.on('successNotify', (something, message) => {
            toast(message, {
                duration: 5000,
                icon: '✅',
                style: {
                    color: '#62cc80',
                    maxWidth: 'fit-content'
                }
            });
        });
        window.electron.ipcRenderer.on('progressNotify', (something, message) => {
            toast(message, {
                duration: 5000,
                icon: '⌛',
                style: {
                    color: '#e0a810',
                    maxWidth: 'fit-content'
                }
            });
        });
        window.electron.ipcRenderer.on('nonBlockingNotify', (something, message) => {
            toast(message, {
                duration: 5000,
                icon: '🤷‍♂️',
                style: {
                    color: '#e0a810',
                    maxWidth: 'fit-content'
                }
            });
        });

        return () => {
            window.electron.ipcRenderer.removeAllListeners('errorNotify');
            window.electron.ipcRenderer.removeAllListeners('successNotify');
            window.electron.ipcRenderer.removeAllListeners('progressNotify');
            window.electron.ipcRenderer.removeAllListeners('nonBlockingNotify');
        };
    }, []);

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/maps" element={<Maps />} />
                <Route path="/editor" element={<Editor />} />
            </Routes>
        </HashRouter>
    );
};