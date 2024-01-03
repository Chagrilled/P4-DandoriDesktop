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
                    'max-width': 'fit-content'
                }
            });
        });
        window.electron.ipcRenderer.on('successNotify', (something, message) => {
            toast(message, {
                duration: 5000,
                icon: '✅',
                style: {
                    color: '#62cc80',
                    'max-width': 'fit-content'
                }
            });
        });
        return () => {
            window.electron.ipcRenderer.removeAllListeners('errorNotify');
            window.electron.ipcRenderer.removeAllListeners('successNotify');
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