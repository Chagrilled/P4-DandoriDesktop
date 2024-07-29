import { rotate } from "ol/coordinate";
import { Projection, addCoordinateTransforms, addProjection, get as getProjection } from "ol/proj";
import { Image } from "ol/layer";
import { ImageStatic } from "ol/source";

export const getProjectionForMap = (mapData) => {
    let mapProjection = getProjection(mapData.mapId);
    if (!mapProjection) {
        mapProjection = buildMapProjection(mapData);
    }
    return mapProjection;
};

export const getImageLayersForMap = (mapData, waterboxes) => {
    const mapProjection = getProjectionForMap(mapData);

    const mapLayer = new Image({
        source: new ImageStatic({
            url: mapData.imageUrl,
            projection: mapProjection,
            imageExtent: mapProjection.getExtent(),
        }),
    });

    // TODO: hacky way to get folderpath
    const folderpath = mapData.mapId !== 'HeroStory010'
        ? mapData.imageUrl.substring(0, mapData.imageUrl.lastIndexOf('/'))
        : '/images/maps/Area010';

    const waterLayers = waterboxes
        .filter(wb => wb.normal.image)
        .map((wb) => {
            let wbProjection = getProjection(wb.normal.image);
            if (!wbProjection) {
                wbProjection = buildWaterboxProjection(mapProjection, wb);
            }

            return new Image({
                source: new ImageStatic({
                    url: folderpath + '/' + wb.normal.image,
                    projection: wbProjection,
                    imageExtent: wbProjection.getExtent()
                })
            });
        });

    return [
        mapLayer,
        ...waterLayers
    ];
};

const buildMapProjection = (mapData) => {
    const mapProjection = new Projection({
        code: mapData.mapId,
        units: 'pixels',
        extent: [-mapData.extentRadius, -mapData.extentRadius, mapData.extentRadius, mapData.extentRadius]
    });
    addProjection(mapProjection);
    return mapProjection;
};

// These numbers are close to the magic numbers for waterbox scaling.
const WaterBoxRadii = {
    // Sun-Speckled Terrace
    'T_ui_Map_Area001_WaterBox00_D.png': 900,
    'T_ui_Map_Area001_WaterBox01_D.png': 625,
    // Sun-Speckled Terrace (Olimar)
    'T_ui_Map_HeroStory001_WaterBox00_Hero_D.png': 750,
    // Blossoming Arcadia
    'T_ui_Map_Area002_WaterBox00_D.png': 1350,
    // Blossoming Arcadia (Olimar)
    'T_ui_Map_HeroStory002_WaterBox00_Hero_D.png': 1400,
    // Serene Shores
    'T_ui_Map_Area003_WaterBox00_D.png': 500, // double check, this one gets drained
    'T_ui_Map_Area003_WaterBox01_D.png': 800,
    'T_ui_Map_Area003_WaterBox02_D.png': 350,
    'T_ui_Map_Area003_WaterBox03_D.png': 290,
    'T_ui_Map_Area003_WaterBox04_D.png': 550,
    'T_ui_Map_Area003_WaterBox05_D.png': 1600,
    'T_ui_Map_Area003_WaterBox06_D.png': 575, // maybe a tad too small
    'T_ui_Map_Area003_WaterBox07_D.png': 750,
    'T_ui_Map_Area003_WaterBox08_D.png': 650, // probably perfect, hard to tell
    'T_ui_Map_Area003_WaterBox09_D.png': 3250,
    // Serene Shores (Olimar)
    'T_ui_Map_HeroStory003_WaterBox00_Hero_D.png': 800,
    'T_ui_Map_HeroStory003_WaterBox01_Hero_D.png': 350,
    'T_ui_Map_HeroStory003_WaterBox02_Hero_D.png': 290,
    'T_ui_Map_HeroStory003_WaterBox03_Hero_D.png': 550,
    'T_ui_Map_HeroStory003_WaterBox04_Hero_D.png': 1600,
    'T_ui_Map_HeroStory003_WaterBox05_Hero_D.png': 575, // maybe a tad too small
    'T_ui_Map_HeroStory003_WaterBox06_Hero_D.png': 750,
    'T_ui_Map_HeroStory003_WaterBox07_Hero_D.png': 650, // probably perfect, hard to tell
    'T_ui_Map_HeroStory003_WaterBox08_Hero_D.png': 3250,
    // Giant's Hearth
    'T_ui_Map_Area004_WaterBox00_D.png': 450,
    'T_ui_Map_Area004_WaterBox01_D.png': 525, // double check, this one gets drained
    'T_ui_Map_Area004_WaterBox02_D.png': 550, // double check, this one gets drained
    'T_ui_Map_Area004_WaterBox03_D.png': 600, // double check, this one gets drained
    'T_ui_Map_Area004_WaterBox04_D.png': 400,
    'T_ui_Map_Area004_WaterBox05_D.png': 200,
    'T_ui_Map_Area004_WaterBox06_D.png': 500,
    // Primordial Thicket
    'T_ui_Map_Area006_WaterBox00_D.png': 425,
    'T_ui_Map_Area006_WaterBox01_D.png': 800,
    'T_ui_Map_Area006_WaterBox02_D.png': 600,
    'T_ui_Map_Area006_WaterBox03_D.png': 400,
    'T_ui_Map_Area006_WaterBox04_D.png': 625,
    'T_ui_Map_Area006_WaterBox05_D.png': 550,
    // Hero's Hideaway
    'T_ui_Map_Area010_WaterBox00_D.png': 425, // double check, this one gets drained
    // Hero's Hideaway (Olimar)
    'T_ui_Map_HeroStory010_WaterBox00_D.png': 425, // double check, this one gets drained
    // Rescue Command Post (no water boxes)
    // Burrow of Beginnings (no waterboxes)
    // Last-Frost Cavern (no waterboxes)
    // Crackling Cauldron (no waterboxes)
    // Dandori Day Care (no waterboxes)
    // Aquiferous Summit
    'T_ui_Map_Cave004_F00_WaterBox00_D.png': 275,
    'T_ui_Map_Cave004_F00_WaterBox01_D.png': 530,
    // Industrial Maze (no waterboxes)
    // Drafty Gallery (no waterboxes)
    // Secluded Courtyard
    'T_ui_Map_Cave007_F00_WaterBox00_D.png': 275,
    'T_ui_Map_Cave007_F00_WaterBox01_D.png': 250,
    'T_ui_Map_Cave007_F01_WaterBox00_D.png': 385,
    // Hotshock Canyon (no waterboxes)
    // Sightless Passage (no waterboxes)
    // Kingdom of Beasts
    'T_ui_Map_Cave010_F01_WaterBox00_D.png': 200,
    'T_ui_Map_Cave010_F03_WaterBox00_D.png': 335,
    'T_ui_Map_Cave010_F05_WaterBox00_D.png': 485,
    // Seafloor Resort
    'T_ui_Map_Cave011_F00_WaterBox00_D.png': 2200,
    'T_ui_Map_Cave011_F01_WaterBox00_D.png': 2200,
    'T_ui_Map_Cave011_F02_WaterBox00_D.png': 2250,
    'T_ui_Map_Cave011_F03_WaterBox00_D.png': 2200,
    // Subzero Sauna
    'T_ui_Map_Cave012_F01_WaterBox00_D.png': 400,
    'T_ui_Map_Cave012_F01_WaterBox01_D.png': 400,
    'T_ui_Map_Cave012_F01_WaterBox02_D.png': 250,
    // Below-Grade Discotheque (no waterboxes)
    // Engulfed Castle
    'T_ui_Map_Cave014_F00_WaterBox00_D.png': 160, // the lower one
    'T_ui_Map_Cave014_F00_WaterBox01_D.png': 225, // the lower one
    'T_ui_Map_Cave014_F00_WaterBox02_D.png': 260,
    'T_ui_Map_Cave014_F00_WaterBox03_D.png': 165, // the upper one
    'T_ui_Map_Cave014_F00_WaterBox04_D.png': 150, // the upper one
    'T_ui_Map_Cave014_F01_WaterBox00_D.png': 350,
    'T_ui_Map_Cave014_F01_WaterBox01_D.png': 475,
    'T_ui_Map_Cave014_F02_WaterBox00_D.png': 150,
    'T_ui_Map_Cave014_F02_WaterBox01_D.png': 525,
    'T_ui_Map_Cave014_F03_WaterBox00_D.png': 325,
    'T_ui_Map_Cave014_F03_WaterBox01_D.png': 350,
    'T_ui_Map_Cave014_F03_WaterBox02_D.png': 325,
    // Test Tubs
    'T_ui_Map_Cave015_F00_WaterBox00_D.png': 150,
    'T_ui_Map_Cave015_F00_WaterBox01_D.png': 550, // NOTE: waterbox is messed up in game too
    'T_ui_Map_Cave015_F00_WaterBox02_D.png': 275,
    'T_ui_Map_Cave015_F00_WaterBox03_D.png': 500, // NOTE: waterbox is messed up in game too
    // Cavern for a King
    'T_ui_Map_Cave016_F07_WaterBox00_D.png': 2250,
    'T_ui_Map_Cave016_F08_WaterBox00_D.png': 725,
    'T_ui_Map_Cave016_F09_WaterBox00_D.png': 2250,
    'T_ui_Map_Cave016_F10_WaterBox00_D.png': 400,
    'T_ui_Map_Cave016_F10_WaterBox01_D.png': 275,
    'T_ui_Map_Cave016_F14_WaterBox00_D.png': 300,
    'T_ui_Map_Cave016_F14_WaterBox01_D.png': 375,
    'T_ui_Map_Cave016_F18_WaterBox00_D.png': 460,
    // Toggle Training (no waterboxes)
    // The Mud Pit
    'T_ui_Map_Cave018_F00_WaterBox00_D.png': 2250,
    'T_ui_Map_Cave018_F01_WaterBox00_D.png': 2160,
    'T_ui_Map_Cave018_F02_WaterBox00_D.png': 700,
    // Subterranean Swarm (no waterboxes)
    // Cliff-hanger's Hold (no waterboxes)
    // Doppelganger's Den
    'T_ui_Map_Cave021_F00_WaterBox00_D.png': 375,
    'T_ui_Map_Cave021_F00_WaterBox01_D.png': 330,
    'T_ui_Map_Cave021_F01_WaterBox00_D.png': 380,
    'T_ui_Map_Cave021_F02_WaterBox00_D.png': 350,
    'T_ui_Map_Cave021_F02_WaterBox01_D.png': 225,
    // FI
    'T_ui_Map_Cave022_F02_WaterBox00_D.png': 275,
    // Plunder Palace (no waterboxes)
    // Ultimate Test Range (no waterboxes)
    // Dream Home (no waterboxes)
    // Cradle of the Beast (no waterboxes)
    // Aerial Incinerator (no waterboxes)
    // Strategic Freezeway (no waterboxes)
    // Rockaway Cellars (no waterboxes)
    // Planning Pools
    'T_ui_Map_Cave030_F00_WaterBox00_D.png': 2200,
    // Hefty Haulway
    'T_ui_Map_Cave031_F00_WaterBox00_D.png': 525,
    'T_ui_Map_Cave031_F00_WaterBox01_D.png': 550,
    // Oasis of Order
    'T_ui_Map_Cave032_F00_WaterBox00_D.png': 1000,
    'T_ui_Map_Cave032_F00_WaterBox01_D.png': 750,
    // Hectic Hollows
    'T_ui_Map_Cave033_F00_WaterBox00_D.png': 665,
    // Ice-Cross Course
    'T_ui_Map_Cave034_F00_WaterBox00_D.png': 425,
    'T_ui_Map_Cave034_F00_WaterBox01_D.png': 550,
    'T_ui_Map_Cave034_F00_WaterBox02_D.png': 260,
    'T_ui_Map_Cave034_F00_WaterBox03_D.png': 275,
    // Trial of the Sage Leaf
    'T_ui_Map_Cave035_F02_WaterBox00_D.png': 700,
    'T_ui_Map_Cave035_F02_WaterBox01_D.png': 1000,
    'T_ui_Map_Cave035_F03_WaterBox00_D.png': 2200,
    // idk maybe, just sort of made it fit the image
    'T_ui_Map_DDB_AI004_WaterBox00_D.png': 220
};

// adapted from https://github.com/openlayers/openlayers/issues/4949#issuecomment-525272189
const buildWaterboxProjection = (mapProjection, waterbox) => {
    // Remember to swap x and y because they Ninten-do it that way.
    const wbLocation = [waterbox.transform.translation.y, waterbox.transform.translation.x];
    const wbRadius = WaterBoxRadii[waterbox.normal.image];
    if (!wbRadius) {
        throw new Error(`Unknown extent for waterbox ${waterbox.normal.image}.`);
    }
    const wbExtent = [-wbRadius, -wbRadius, wbRadius, wbRadius];
    // negate rotation
    const wbRotation = -waterbox.transform.rotation * Math.PI / 180;

    mapProjection = getProjection(mapProjection);
    if (!mapProjection) {
        throw new Error(`Could not get map projection for: ${mapProjection}`);
    }

    // honestly not sure why this scales correctly.
    const mapToWaterbox = (coord) => {
        return rotate(
            [coord[0] - wbLocation[0], coord[1] - wbLocation[1]],
            wbRotation
        );
    };
    const waterboxToMap = (coord) => {
        const unrotated = rotate(
            coord,
            -wbRotation
        );
        return [
            unrotated[0] + wbLocation[0],
            unrotated[1] + wbLocation[1]
        ];
    };
    const wbProjection = new Projection({
        code: waterbox.normal.image,
        units: mapProjection.getUnits(),
        extent: wbExtent,
    });
    addProjection(wbProjection);
    addCoordinateTransforms(
        mapProjection,
        wbProjection,
        mapToWaterbox,
        waterboxToMap
    );

    return wbProjection;
};
