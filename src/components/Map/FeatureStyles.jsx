import { Style, Icon, Text, Fill, Stroke } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Categories, isCreature, isTreasure, GimmickNames, InfoType, iconOverrides, invisibleEntities } from '../../api/types';
import { getAngleRotation, getNameFromAsset, shouldIconRotate, isEntityOnNightMap } from '../../utils';

const { Gimmick, Hazard, Portal, Onion, Base, WorkObject, Pikmin } = InfoType;

const ROOT_ICON_URL = '../images/icons/radar';
const ROOT_GIMMICKS_URL = '../images/gimmicks';
const ROOT_TREASURE_URL = '../images/treasures';
const ROOT_CREATURE_URL = '../images/creatures';

//#region Overrides
const SCALE_OVERRIDES = {
    egg: 0.6,
    bigegg: 0.8,
    groupdropmanager: 0.9,
    pelplant1revive: 0.35,
    pelplant1ddb: 0.35,
    pelplant1reviveforhero: 0.35,
    pelplant5revive: 0.35,
    pelplant5ddb: 0.35,
    pelplant5reviveforhero: 0.35,
    pelplant10revive: 0.3,
    pelplant10ddb: 0.35,
    pelplant10reviveforhero: 0.3,
    pelplant1: 0.35,
    pelplant5: 0.35,
    pelplant10: 0.3,
    pellet1: 0.35,
    pellet5: 0.35,
    kinkaistation: 0.25,
    tsuyukusa: 0.3,
    hikarikinoko: 0.4,
    bikkurikinokoplant: 0.4,
    onyon: 0.45,
    dolphin: 0.45,
    komush: 1.4,
    mush: 1.2,
    poisonmush: 1.3,
    poisonkomush: 1.4,
    stickymush: 1.2,
    stickymushb: 1.2,
    stickymushc: 1.2,
    stickymushpoison: 1.3,
    ojamablockair: 0.45,
    ojamablock: 0.5,
    ojamablockroom: 0.5,
    ojamablockroom02: 0.5,
    ojamablockroomduo: 0.5,
    ojamablockwoodparts: 0.5,
    ojamablockwoodpartsb: 0.5,
    movefloorslowtrigger: 0.5,
    excavationl: 0.5,
    excavations: 0.5,
    excavationonyon: 0.5,
    excavationunders: 0.5,
    excavationm: 0.5,
    airwallbox: 0.5,
    airwallflick: 0.5,
    marigumonet: 0.5,
    pod: 0.5,
    airwalljump: 0.5,
    bookendslope: 0.5,
    bookendplane: 0.5,
    cushiona: 0.5,
    cushionb: 0.5,
    cushionc: 0.5,
    cushiond: 0.5,
    pelplanttable: 0.75,
    warptrigger: 0.5,
    burrow: 0.5,
    ropebranch: 0.5,
    ropebranchsmall: 0.5,
    navmeshtrigger: 0.5,
    navmeshtriggerlinkforsplash: 0.5,
    navmeshtriggerclear: 0.5,
    hikaristation: 0.7,
    happy: 0.6,
    spacebus: 0.6,
    bikkurigikuplant: 0.4,
    panmodokihidearea: 0.75
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
export const getFeatureLayers = (groupedData, config, mapId) => {
    const featureLayers = {};

    for (let i = 0; i < LayerOrder.length; i++) {
        const markerType = LayerOrder[i];
        if (!groupedData[markerType] || markerType === InfoType.WaterWater || markerType === InfoType.WaterSwamp) {
            continue;
        }

        // Categories are sorted by layer importance.
        const layerZIndex = MAX_MARKER_Z_INDEX - i;
        const features = getFeatures(markerType, groupedData[markerType], config, mapId);
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

const getFeatures = (markerType, markers, config, mapId) => {
    const globalMarkerStyle = MarkerStyles[markerType];

    return markers.map(marker => {
        if (config.hideInvisEntities && invisibleEntities.some(e => marker.creatureId.includes(e))) return;
        if (mapId.includes('Night') && !isEntityOnNightMap(marker, mapId)) return;

        const feature = new Feature({
            // Why are x and y flipped???
            // Capitalise them because the AGL has the capitalised, and cba to keep transforming the key cases
            geometry: new Point([marker.transform.translation.Y, marker.transform.translation.X]),
            data: marker
        });

        const styles = [
            getFeatureStyle(marker, globalMarkerStyle),
        ];
        if (config.showZDirection) styles.push(new Style({
            image: new Icon({
                src: '../images/icons/arrow.png',
                anchor: [0.5, 0.5],
                rotateWithView: true,
                scale: 0.03,
                rotation: getAngleRotation(marker.transform.rotation),
            })
        }));

        feature.setStyle(styles);
        return feature;
    }).filter(f => !!f);
};

const MarkerStyles = Object.fromEntries(
    Object.values(InfoType)
        .filter(type => type !== InfoType.WaterSwamp && type !== InfoType.WaterWater)
        .map(obj => [
            obj,
            new Style({
                image: new Icon(getIconOptions(obj)),
            })
        ])
);

//#region Styles
// TODO: Refactor this duplication - it's been through a lot 😪
const getFeatureStyle = (marker, globalMarkerStyle) => {
    if (isCreature(marker)) {
        const creatureId = marker.creatureId === 'ActorSpawner' ? getNameFromAsset(marker.drops.parsed[0].assetName) : marker.creatureId.toLowerCase().replace('night', '');
        const scale = SCALE_OVERRIDES[creatureId] || 0.35;

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
        const rotationProps = shouldIconRotate(marker.creatureId) ? {
            rotateWithView: true,
            rotation: getAngleRotation(marker.transform.rotation),
        } : {};

        globalMarkerStyle = new Style({
            image: new Icon({
                src: `../images/${infoType}s/${infoType}-${id || marker.creatureId.toLowerCase()}.png`,
                scale: scale,
                ...rotationProps
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
    return globalMarkerStyle.clone();
};

const LayerOrder = Categories.reduce((markerTypes, category) => [...markerTypes, ...category.markers], []);