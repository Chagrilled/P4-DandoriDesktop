import { Style, Icon, Text, Fill, Stroke } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

import { Categories, MarkerType, isCreature, isTreasure, GimmickNames } from '../../api/types';
import { getNameFromAsset } from '../../utils/utils';

const ROOT_ICON_URL = '../images/icons/radar';
const ROOT_GIMMICKS_URL = '../images/gimmicks';
const ROOT_TREASURE_URL = '../images/treasures';
const ROOT_CREATURE_URL = '../images/creatures';

const URL_OVERRIDES = {
    // [MarkerType.BreakableMound]: 'https://www.pikminwiki.com/images/9/95/Dirt_mound_icon.png',
    // [MarkerType.BreakableCrystal]: 'https://www.pikminwiki.com/images/8/81/Small_crystal_icon.png',
    // [MarkerType.BreakableEgg]: 'https://www.pikminwiki.com/images/9/95/Egg_P3_icon.png',
    // [MarkerType.MiscHoney]: 'https://www.pikminwiki.com/images/1/1f/Nectar_icon.png',
    // [MarkerType.MiscIcicle]: 'https://www.pikminwiki.com/images/9/94/Icicle-like_crystal_icon.png',
    // [MarkerType.MiscStick]: 'https://www.pikminwiki.com/images/b/b5/Climbing_stick_icon.png',
    // [MarkerType.MiscSpicy]: 'https://www.pikminwiki.com/images/7/7a/Ultra-spicy_nectar_icon.png',
    // [MarkerType.SwitchDrain]: 'https://www.pikminwiki.com/images/d/d1/Clog_icon.png',
};
const SCALE_OVERRIDES = {
    [MarkerType.BreakableMound]: 1.3,
    [MarkerType.BreakableCrystal]: 1.3,
    [MarkerType.BreakableEgg]: 3.3,
    [MarkerType.MiscHoney]: 1.3,
    [MarkerType.MiscStick]: 1.3,
    [MarkerType.MiscSpicy]: 1.3,
    [MarkerType.SwitchDrain]: 1.3,
    [MarkerType.MiscSpiderwort]: 0.25,
    "egg": "0.9",
    "bigegg": "0.9",
    "groupdropmanager": "0.9"
};

export const getIconOptions = (type) => {
    // console.log("getting options", type)
    const imgUrl = URL_OVERRIDES[type] || (ROOT_ICON_URL + '/' + type + '.png');
    const scale = SCALE_OVERRIDES[type];
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

const getFeatureStyle = (marker, globalMarkerStyle) => {
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

        const textStyle = TREASURE_TEXT_STYLE.clone();
        textStyle.setText(label);

        return new Style({
            image: new Icon({
                src: `${ROOT_TREASURE_URL}/treasure-${marker.treasureId.toLowerCase()}.png`,
                scale: 0.35
            }),
            text: textStyle,
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