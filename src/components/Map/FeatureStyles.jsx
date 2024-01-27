import { Style, Icon, Text, Fill, Stroke } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

import { Categories, MarkerType, isCreature, isTreasure, GimmickNames, InfoType, iconOverrides } from '../../api/types';
import { getAngleRotation, getNameFromAsset } from '../../utils';

const { Gimmick, Hazard, Portal, Onion, Base, WorkObject, Pikmin } = InfoType;

const ROOT_ICON_URL = '../images/icons/radar';
const ROOT_GIMMICKS_URL = '../images/gimmicks';
const ROOT_TREASURE_URL = '../images/treasures';
const ROOT_CREATURE_URL = '../images/creatures';

const SCALE_OVERRIDES = {
    [MarkerType.BreakableMound]: 1.3,
    [MarkerType.BreakableCrystal]: 1.3,
    [MarkerType.BreakableEgg]: 3.3,
    [MarkerType.MiscHoney]: 1.3,
    [MarkerType.MiscStick]: 1.3,
    [MarkerType.MiscSpicy]: 1.3,
    [MarkerType.SwitchDrain]: 1.3,
    [MarkerType.MiscSpiderwort]: 0.25,
    "egg": "0.6",
    "bigegg": "0.8",
    "groupdropmanager": "0.9",
    "pelplant1revive": "0.35",
    "pelplant5revive": "0.35",
    "pelplant10revive": "0.35",
    "pelplant1reviveforhero": "0.35",
    "pelplant5reviveforhero": "0.35",
    "pelplant10reviveforhero": "0.35",
    "pelplant1": "0.35",
    "pelplant5": "0.35",
    "pelplant10": "0.35",
    "pellet1": "0.35",
    "pellet5": "0.35",
    "kinkaistation": "0.25",
    "tsuyukusa": "0.3",
    "hikarikinoko": "0.4",
    "bikkurikinokoplant": "0.4",
    onyon: 0.45,
    dolphin: 0.45,
    komush: 1.4,
    mush: 1.2,
    poisonmush: 1.3,
    poisonkomush: 1.4,
    stickymush: 1.2,
    stickymushpoison: 1.3
};

export const getIconOptions = (type) => {
    const imgUrl = iconOverrides[type] || (ROOT_ICON_URL + '/' + type + '.png');
    const scale = SCALE_OVERRIDES[type] || 0.9;
    return {
        src: imgUrl,
        scale
    };
};

const MAX_MARKER_Z_INDEX = 1000;
export const getFeatureLayers = (groupedData) => {
    const featureLayers = {};

    for (let i = 0; i < LayerOrder.length; i++) {
        const markerType = LayerOrder[i];
        if (!groupedData[markerType] || markerType === MarkerType.WaterWater || markerType === MarkerType.WaterSwamp) {
            continue;
        }

        // Categories are sorted by layer importance.
        const layerZIndex = MAX_MARKER_Z_INDEX - i;
        const features = getFeatures(markerType, groupedData[markerType]);
        const layer = new VectorLayer({
            source: new VectorSource({
                features
            }),
            zIndex: layerZIndex
        });

        featureLayers[markerType] = layer;
    }
    // console.log("featureLayers", featureLayers)
    return featureLayers;
};

const getFeatures = (markerType, markers) => {
    const globalMarkerStyle = MarkerStyles[markerType];
    return markers.map(marker => {
        const feature = new Feature({
            // Why are x and y flipped???
            // Capitalise them because the AGL has the capitalised, and cba to keep transforming the key cases
            geometry: new Point([marker.transform.translation.Y, marker.transform.translation.X]),
            data: marker
        });

        feature.setStyle(
            getFeatureStyle(marker, globalMarkerStyle)
        );
        return feature;
    });
};

const MarkerStyles = Object.fromEntries(
    Object.values(MarkerType)
        .filter(type => type !== MarkerType.WaterSwamp && type !== MarkerType.WaterWater)
        .map(obj => [
            obj,
            new Style({
                image: new Icon(getIconOptions(obj)),
            })
        ])
);

const TREASURE_TEXT_STYLE = new Text({
    fill: new Fill({ color: [255, 255, 255] }),
    stroke: new Stroke({ color: [0, 0, 0], width: 2 }),
    offsetY: 40,
    scale: 2
});

// TODO: Refactor this duplication - it's been through a lot 😪
const getFeatureStyle = (marker, globalMarkerStyle) => {
    // console.log("getFeatureStyle", marker, globalMarkerStyle)
    if (isCreature(marker)) {
        // console.log(marker);
        const creatureId = marker.creatureId === 'ActorSpawner' ? getNameFromAsset(marker.drops.parsed[0].assetName) : marker.creatureId.toLowerCase().replace('night', '');
        const scale = SCALE_OVERRIDES[creatureId] || 0.35;
        // console.log("scale", scale, creatureId)
        globalMarkerStyle = new Style({
            image: new Icon({
                src: `${ROOT_CREATURE_URL}/creature-${creatureId.toLowerCase()}.png`,
                scale: scale
            }),
        });
    }
    else if ([InfoType.Object, WorkObject, Gimmick, Portal, Onion, Hazard, Base, Pikmin].includes(marker.infoType)) {
        const creatureId = marker.creatureId.toLowerCase();
        let id = iconOverrides[marker.creatureId.toLowerCase()];
        const scale = SCALE_OVERRIDES[creatureId] || 0.9;
        let infoType = marker.infoType;

        // NoraSpawner icons are drawn from the PikminColor enum within their AI
        if (marker.creatureId === 'NoraSpawnerPongashiLock')
            id = `candypop-${marker.AIProperties.pikminType.substr(6).toLowerCase()}`;
        else if (marker.creatureId.includes('NoraSpawner')) {
            infoType = InfoType.Pikmin;
            id = `${marker.AIProperties.pikminType.toLowerCase()}`;
        }
        globalMarkerStyle = new Style({
            image: new Icon({
                src: `../images/${infoType}s/${infoType}-${id || marker.creatureId.toLowerCase()}.png`,
                scale: scale,
                // I have no idea what combination makes the right angle - none seems to match to DDB
                // Also I think only gates/bridges/caves want rotating otherwise it looks weird
                // rotateWithView: true,
                // rotation: -getAngleRotation(marker.transform.rotation),
            }),
        });
    }
    // TODO: Refactor between this and the isX calls above
    else if (GimmickNames[marker.creatureId]) {
        const creatureId = marker.creatureId.toLowerCase();
        const scale = SCALE_OVERRIDES[creatureId] || 0.35;
        globalMarkerStyle = new Style({
            image: new Icon({
                src: `${ROOT_GIMMICKS_URL}/gimmick-${creatureId.toLowerCase()}.png`,
                scale: scale
            }),
        });
    }
    else if (isTreasure(marker)) {
        // include Gold Nugget amount as total weight
        const totalWeight = marker.weight * (marker.amount || 1);
        const totalValue = marker.value * (marker.amount || 1);
        // total value can be 0 for OST ship parts
        // TODO: remove value for challenge caves somehow
        const label = totalValue ? `${totalWeight} / ${totalValue}` : totalWeight + "";

        // TODO: Read treasure weights from the core/DT_OtakaraParemeter file
        // const textStyle = TREASURE_TEXT_STYLE.clone();
        // textStyle.setText(label);

        return new Style({
            image: new Icon({
                src: `${ROOT_TREASURE_URL}/treasure-${marker.creatureId.toLowerCase()}.png`,
                scale: 0.35
            }),
            // text: textStyle,
        });
    }

    if (marker.transform.rotation === undefined && !marker.drops) {
        return globalMarkerStyle;
    }

    // must copy any icons that need to be edited.
    const markerStyle = globalMarkerStyle.clone();
    // if (marker.transform.rotation !== undefined) {
    //     markerStyle.getImage().setRotateWithView(true);
    //     markerStyle.getImage().setRotation(-(marker.transform.rotation) * Math.PI / 180);
    // }

    // const [totalWeight, totalValue] = (marker.drops || [])
    //     .reduce((sums, drop) => {
    //         if (!isTreasure(drop)) {
    //             return sums;
    //         }

    //         return [
    //             sums[0] + drop.weight * (drop.amount || 1),
    //             sums[1] + drop.value * (drop.amount || 1)
    //         ];
    //     }, [0, 0]);
    // if (totalWeight || totalValue > 0) {
    //     // TODO: remove value for challenge caves somehow
    //     const label = totalValue ? `${totalWeight} / ${totalValue}` : totalWeight + "";

    //     const textStyle = TREASURE_TEXT_STYLE.clone();
    //     textStyle.setText(label);
    //     markerStyle.setText(textStyle);
    // }
    return markerStyle;
};

const LayerOrder = Categories.reduce((markerTypes, category) => [...markerTypes, ...category.markers], []);