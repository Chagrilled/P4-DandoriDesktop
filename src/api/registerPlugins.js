import { NameMap, EntityNames, InfoType } from "./types";
import { internalAssetNames } from "./assetList";

export const pluginEntities = {};
export const registerPlugins = (list = []) => {
    console.log(list);

    for (const p of list) {
        console.log(`Reading ${p.internalName} / ${p.englishName}`);
        if (!Object.values(InfoType).includes(p.infoType)) {
            console.error(`Plugin has defined an invalid infoType: ${p.infoType}`);
            continue;
        }
        const asset = `G${p.internalName}.G${p.internalName}_C`;
        if (!p.assetPath.includes(asset)) {
            console.error(`The asset path does not case-sensitively contain the internal name: ${asset}`);
            continue;
        }
        console.log(`Successfully registered ${p.internalName} / ${p.englishName}`);
        NameMap[p.infoType][p.internalName] = p.englishName;
        EntityNames[p.internalName] = p.englishName;
        internalAssetNames.push(p.assetPath);
        pluginEntities[p.internalName] = p;
    }
};