import { registerPlugins } from './registerPlugins';
import { readdirSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import logger from '../utils/logger';
import { app } from 'electron';

let plugins;
export const pluginsRoot = join(app.getPath('userData'), 'plugins');

export const readPlugins = () => {
    if (plugins) return plugins;

    if (!existsSync(pluginsRoot)) {
        logger.info("Making plugins folder");
        mkdirSync(pluginsRoot, { recursive: true });
    }

    const availablePlugins = readdirSync(pluginsRoot);
    return plugins = availablePlugins.map(d => {
        try {
            const pluginConfig = JSON.parse(readFileSync(join(pluginsRoot, d, 'ddt.json'), { encoding: 'utf-8' }));
            logger.info(`Read plugin: ${d}`);
            return pluginConfig;
        } catch (err) {
            logger.error(`Error reading plugin ${d}: ${err.stack}`);
            console.error(err);
        }
    }).filter(Boolean);
};

registerPlugins(readPlugins());
// const bundledPath = app.isPackaged ? join(appRoot, '.webpack', 'renderer', fileName) : join(appRoot, 'src', fileName);
// const override = !mapPath.includes("WaterBox") && existsSync(mapPath);