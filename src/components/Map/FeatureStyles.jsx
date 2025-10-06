import { Style, Icon } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Categories, isCreature, isTreasure, GimmickNames, InfoType, iconOverrides, invisibleEntities } from '../../api/types';
import { getAngleRotation, getNameFromAsset, shouldIconRotate, isEntityOnNightMap, getSubpathFromAsset, getInfoType } from '../../utils';

const { Gimmick, Hazard, Portal, Onion, Base, WorkObject, Pikmin, Item, Creature, Treasure, WaterWater, WaterSwamp } = InfoType;

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
    pellet10: 0.35,
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
    ojamablock: 0.2,
    ojamablockroom: 0.4,
    ojamablockroom02: 0.4,
    ojamablockroomduo: 0.4,
    ojamablockwoodparts: 0.4,
    ojamablockwoodpartsb: 0.4,
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
    navmeshtrigger: 0.5,
    navmeshtriggerlinkforsplash: 0.5,
    navmeshtriggerclear: 0.5,
    hikaristation: 0.7,
    happy: 0.6,
    spacebus: 0.6,
    bikkurigikuplant: 0.4,
    panmodokihidearea: 0.75,
    photonball: 0.2,
    shugoflag: 0.25,
    searchbomb: 0.2,
    yuudouesa: 0.2,
    dogfood: 0.2,
    homingbomb: 0.2,
    bomb: 0.7,
    icebomb: 0.7,
    waterbox: 0.4,
    waterboxcircle: 0.4,
    waterboxdeep: 0.4,
    waterboxfluctuation: 0.4,
    waterboxfluctuationdeep: 0.4,
    waterboxnav: 0.4,
    waterboxreduction: 0.4,
    waterboxvs: 0.4,
    swampbox: 0.4,
    swampboxdark: 0.4,
    neji: 0.2,
    spline: 0.5,
    rockball: 0.2,
    lucky: 0.6,
    fuurosoua: 0.15,
    fuurosoub: 0.15,
    ooinu: 0.4,
    survivorleaf: 0.2,
    survivorolimarleaf: 0.2
};

export const getIconOptions = (type) => {
    const imgUrl = iconOverrides[type] || (ROOT_ICON_URL + '/' + type + '.png');
    const scale = imgUrl.includes('default') ? 0.5 : SCALE_OVERRIDES[type] || 0.9;
    return {
        src: imgUrl,
        scale
    };
};

const MAX_MARKER_Z_INDEX = 1000;
export const getFeatureLayers = async (groupedData, config, mapId) => {
    const featureLayers = {};

    for (let i = 0; i < LayerOrder.length; i++) {
        const markerType = LayerOrder[i];
        if (!groupedData[markerType] || markerType === WaterWater || markerType === WaterSwamp) {
            continue;
        }
        const features = await getFeatures(markerType, groupedData[markerType], config, mapId);
        // Categories are sorted by layer importance.
        const layerZIndex = MAX_MARKER_Z_INDEX - i;
        const layer = new VectorLayer({
            source: new VectorSource({
                features: features.flat().filter(f => !!f)
            }),
            zIndex: layerZIndex
        });

        featureLayers[markerType] = layer;
    }
    return featureLayers;
};

const getFeatures = async (markerType, markers, config, mapId) => {
    const globalMarkerStyle = MarkerStyles[markerType];

    return Promise.all(markers.map(async marker => {
        if (config.hideInvisEntities && invisibleEntities.some(e => marker.creatureId.includes(e))) return;
        if (mapId.includes('Night') && !isEntityOnNightMap(marker, mapId)) return;

        const feature = new Feature({
            // Why are x and y flipped???
            // Capitalise them because the AGL has the capitalised, and cba to keep transforming the key cases
            geometry: new Point([marker.transform.translation.Y, marker.transform.translation.X]),
            data: marker
        });

        const styles = [
            await getFeatureStyle(marker, globalMarkerStyle),
        ];
        if (config.showRotation) styles.push(new Style({
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
    }));
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
const getFeatureStyle = async (marker, globalMarkerStyle) => {
    if (isCreature(marker)) {
        const [drop] = marker.drops.parsed;
        const creatureId = marker.creatureId === 'ActorSpawner' ? getNameFromAsset(drop.assetName) : marker.creatureId.toLowerCase().replace('night', '');
        let id = iconOverrides[marker.creatureId.toLowerCase()] || creatureId.toLowerCase();
        let scale = SCALE_OVERRIDES[id] || 0.35;
        let src = `${ROOT_CREATURE_URL}/creature-${id}.png`;

        let infoType = Creature;
        if (marker.creatureId === 'ActorSpawner') {
            infoType = getInfoType(getSubpathFromAsset(drop.assetName));
            scale = SCALE_OVERRIDES[getNameFromAsset(drop.assetName).toLowerCase()] || [Creature, Treasure].includes(infoType) ? 0.35 : 0.9;
            src = `../images/${infoType}s/${infoType}-${creatureId.toLowerCase()}.png`;
        }
        globalMarkerStyle = new Style({
            image: new Icon({
                src: await getIcon(src, infoType),
                scale
            }),
        });
    }
    else if ([InfoType.Object, WorkObject, Gimmick, Portal, Onion, Hazard, Base, Pikmin, Item].includes(marker.infoType)) {
        const creatureId = marker.creatureId.toLowerCase();
        let id = iconOverrides[marker.creatureId.toLowerCase()];
        const scale = id === 'default' ? 0.5 : SCALE_OVERRIDES[creatureId] || 0.9;
        let infoType = marker.infoType;

        // NoraSpawner icons are drawn from the PikminColor enum within their AI
        if (marker.creatureId === 'NoraSpawnerPongashiLock')
            id = `candypop-${marker.AIProperties.pikminType.substr(6).toLowerCase()}`;
        else if (marker.creatureId.includes('NoraSpawner')) {
            infoType = Pikmin;
            id = `${marker.AIProperties.pikminType.toLowerCase()}`;
        }
        const rotationProps = shouldIconRotate(marker.creatureId) ? {
            rotateWithView: true,
            rotation: getAngleRotation(marker.transform.rotation),
        } : {};

        globalMarkerStyle = new Style({
            image: new Icon({
                src: await getIcon(`../images/${infoType}s/${infoType}-${id || marker.creatureId.toLowerCase()}.png`, infoType),
                scale,
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
                src: await getIcon(`${ROOT_GIMMICKS_URL}/gimmick-${creatureId.toLowerCase()}.png`, Gimmick),
                scale: scale
            }),
        });
    }
    else if (isTreasure(marker)) {

        // TODO: Read treasure weights from the core/DT_OtakaraParemeter file
        // const textStyle = TREASURE_TEXT_STYLE.clone();
        // textStyle.setText(label);
        return new Style({
            image: new Icon({
                src: await getIcon(`${ROOT_TREASURE_URL}/treasure-${marker.creatureId.toLowerCase()}.png`, Treasure),
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

const getIcon = (icon, dropInfotype) => {
    const img = new Image();
    img.src = icon;

    return new Promise((resolve) => {
        img.onload = () => resolve(icon);
        img.onerror = () => resolve(`../images/${dropInfotype}s/${dropInfotype}-default.png`);
    });
};

const LayerOrder = Categories.reduce((markerTypes, category) => [...markerTypes, ...category.markers], []);