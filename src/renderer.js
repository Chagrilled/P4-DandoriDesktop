import './index.css';
import { registerPlugins } from './api/registerPlugins.js';
registerPlugins(await window.electron.ipcRenderer.readPlugins());
await import('./app.jsx');