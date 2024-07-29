import { default as MapTransforms } from './map-transforms.json';
import { InfoType } from './types';
/*
TODO:
extents to check:
  030_F00
*/

export const getMapData = async (mapId) => {

    // TODO need to reorganize all this stuff
    mapId = mapId.replace('Night', 'Area').replace(/-\d/, '').replace('-VS', '');
    const mapTransform = MapTransforms[mapId];
    const data = getPregeneratedData(mapId);
    return {
        mapId,
        imageUrl: `../images/maps/${mapId}/T_ui_Map_${mapId}_D.png`,
        rotation: mapTransform.rotation,
        extentRadius: mapTransform.extentRadius,
        waterboxes: [
            ...(data[InfoType.WaterWater] || []),
            ...(data[InfoType.WaterSwamp] || [])
        ]
    };
};

const getPregeneratedData = (mapId) => {
    if (mapId === 'Area011') return {};
    mapId = mapId.replace('Night', 'Area').replace(/-\d/, '').replace('-VS', '');

    let dataUrl = '';
    if (mapId.startsWith('Cave')) {
        const caveId = mapId.split('_')[0];
        dataUrl += `${caveId}/${mapId}.json`;
    }
    else if (mapId.startsWith('DDB')) {
        dataUrl += `${mapId}/${mapId}.json`;
    }
    else if (mapId.startsWith('HeroStory')) {
        const areaId = 'Area' + mapId.slice(-3);
        dataUrl += `${areaId}/olimar.json`;
    }
    else {
        if (mapId.includes('Night')) dataUrl += `${mapId}/night.json`;
        else dataUrl += `${mapId}/day.json`;
    }

    const json = require(`../assets/mapData/${dataUrl}`);

    return json;
};

export const getMarkerData = async (mapId) => {

    const mapData = await window.electron.ipcRenderer.readMapData(mapId);

    const generatedData = getPregeneratedData(mapId);

    // TODO: need to think about water more
    return {
        ...mapData,
        water: [
            ...(generatedData[InfoType.WaterWater] || []),
            ...(generatedData[InfoType.WaterSwamp] || [])
        ]
    };
};

