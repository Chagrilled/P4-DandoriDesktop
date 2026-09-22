import React, { useEffect, useRef } from 'react';

import { SplashScreen } from './pages/Splashscreen';
import { Maps } from './pages/Maps';
import { Editor } from './pages/Editor';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { MapProvider } from './components/Map/MapContext';
import { Randomiser } from './pages/Randomiser';
import { Messages } from './api/types';
import { Config } from './pages/Config';
import { ConfigProvider } from './components/Config/ConfigContext';
import { RandomiserProvider } from './components/RandomiserContext';
import { RandomiserWeights } from './pages/RandomiserWeights';

const RandomiserLayout = () => {
    return <Outlet />;
};

const AUDIO_SOURCES = [
    '../audio/pluck6.mp3',
    '../audio/pikmin-y-woo.mp3',
    '../audio/pluck7.mp3',
    '../audio/pluck10.mp3',
    '../audio/louie.mp3'
];

export const AppRoutes = () => {

    const audioPoolRef = useRef([]);

    useEffect(() => {
        audioPoolRef.current = AUDIO_SOURCES.map((src) => {
            const audio = new Audio(src);
            audio.preload = 'auto';
            return audio;
        });

        return () => {
            audioPoolRef.current.forEach((audio) => {
                audio.pause();
                audio.src = '';
            });
            audioPoolRef.current = [];
        };
    }, []);

    useEffect(() => {
        window.electron.ipcRenderer.on(Messages.ERROR, (something, message, e) => {
            toast(message, {
                duration: 7000,
                icon: '❌',
                style: {
                    color: '#bd2626',
                    maxWidth: 'fit-content'
                }
            });
            if (e) console.error(e);
        });
        window.electron.ipcRenderer.on(Messages.SUCCESS, (something, message) => {
            if (message.includes('Paks copied to')) {
                const pool = audioPoolRef.current;
                const audio = pool[Math.random() * pool.length | 0];
                audio.play();
            }

            toast(message, {
                duration: 5000,
                icon: '✅',
                style: {
                    color: '#62cc80',
                    maxWidth: 'fit-content'
                }
            });
        });

        window.electron.ipcRenderer.on(Messages.PROGRESS, (something, message) => {
            toast(message, {
                duration: 5000,
                icon: '⌛',
                style: {
                    color: '#e0a810',
                    maxWidth: 'fit-content'
                }
            });
        });
        window.electron.ipcRenderer.on(Messages.NONBLOCKING, (something, message) => {
            toast(message, {
                duration: 7000,
                icon: '🤷‍♂️',
                style: {
                    color: '#e0a810',
                    maxWidth: 'fit-content'
                }
            });
        });

        return () => {
            window.electron.ipcRenderer.removeAllListeners(Messages.ERROR);
            window.electron.ipcRenderer.removeAllListeners(Messages.SUCCESS);
            window.electron.ipcRenderer.removeAllListeners(Messages.PROGRESS);
            window.electron.ipcRenderer.removeAllListeners(Messages.NONBLOCKING);
        };
    }, []);

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/maps" element={
                    <MapProvider>
                        <Maps />
                    </MapProvider>
                } />
                <Route path="/randomiser" element={
                    <RandomiserProvider>
                        <RandomiserLayout />
                    </RandomiserProvider>
                }
                >
                    <Route index element={<Randomiser />} />
                    <Route path="weights" element={<RandomiserWeights />} />
                </Route>
                <Route path="/editor" element={<Editor />} />
                <Route path="/config" element={
                    <ConfigProvider>
                        <Config />
                    </ConfigProvider>
                } />
            </Routes>
        </HashRouter>
    );
};