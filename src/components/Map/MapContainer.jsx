import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import { Map, View, Collection, Feature } from "ol";
import { defaults as defaultControls } from 'ol/control';
import { getCenter } from 'ol/extent';
import PointerInteraction from 'ol/interaction/Pointer';
import { Select, defaults as defaultInteractions, Modify } from 'ol/interaction';
import { Style, Icon, Stroke, Fill } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromCircle } from 'ol/geom/Polygon';
import { Point, LineString, Circle as geomCircle } from 'ol/geom';
import { getMapData } from "../../api/MapAPI";
import { getImageLayersForMap, getProjectionForMap } from '../../api/getImageLayers';
import { useContextMenu } from 'react-contexify';
import { MapMenu } from './MapMenu';
import { getFeatureLayers } from './FeatureStyles';
import { MapContext } from './MapContext';
import { quat, vec3 } from 'gl-matrix';
import { nonRepeatingSplines } from '../../api/types';

export const MapContainer = ({
    onSelect,
}) => {
    const [map, setMap] = useState(() => new Map());
    const [mapLayers, setMapLayers] = useState([]);
    const { show } = useContextMenu({ id: 'MAP_MENU ' });
    const { mapMarkerData, setMapData, filter, mapId, config } = useContext(MapContext);
    // This ref keeps track of the marker so rebuildLayers can keep track of the current one
    // to add in the spline layer it could probably be a useCallback with a dep of selectedMarker passed from the parent component
    const markerRef = useRef();
    const prevFilter = useRef({});
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (!mapContainerRef?.current) return;

        // Only initialise the map object once, and instead mutate the views
        setMap(new Map({
            target: mapContainerRef.current,
            controls: defaultControls({ rotate: false }),
            interactions: defaultInteractions(),
        }));
    }, []);

    //#region Rebuild Layers
    // This hook fires on data changes and mutates the map in situ by clearing and re-adding the layers
    // This could be further improved later by only editing the FEATURE that was changed, although
    // the gains there are minimal as the main issue was the map resetting.
    const rebuildLayers = async () => {
        if (!mapId || !mapMarkerData || !config) return;

        console.log(mapMarkerData);
        const mapData = await getMapData(mapId);
        const imageLayers = getImageLayersForMap(mapData, mapData.waterboxes);
        // Clear out existing images - clone because forEaching the actual layer array causes indexes to change while looping
        const layers = [...map.getLayers().getArray()];
        layers.forEach((layer) => map.removeLayer(layer));

        // Remove all Modify interactions otherwise they get leftover from other maps
        const interactions = [...map.getInteractions().getArray()];
        interactions.forEach(int => int instanceof Modify ? map.removeInteraction(int) : null);

        const markerLayers = await getFeatureLayers(mapMarkerData, config, mapId);
        const visibleLayers = Object.entries(markerLayers)
            .filter(([k, _v]) => !!filter[k])
            .map(([_k, v]) => v);

        // Drag and drop inteaction - updates the map data with new translation
        // you could just update the feature, but we also need the main context to know
        // to update the infopanel
        Object.values(visibleLayers).forEach(layer => {
            const modifyFeature = new Modify({
                features: new Collection(layer.getSource().getFeatures())
            });
            modifyFeature.on('modifyend', evt => {
                const data = evt.features.array_[0].values_.data;
                const newPos = {
                    X: evt.mapBrowserEvent.coordinate[1],
                    Y: evt.mapBrowserEvent.coordinate[0],
                    Z: data.transform.translation.Z
                };

                // Update the markerRef to the new pos so the spline points regen correctly
                if (markerRef.current?.ddId === data.ddId)
                    markerRef.current.transform.translation = newPos;

                setMapData({
                    ...mapMarkerData,
                    [data.infoType]: mapMarkerData[data.infoType].map(marker => marker.ddId !== data.ddId ? marker : {
                        ...data,
                        transform: {
                            ...data.transform,
                            translation: newPos
                        }
                    }),
                });
            });
            map.addInteraction(modifyFeature);
        });

        // update generateRadius on the selected marker when layers rebuild
        // this keeps the radius layer working if you modify it multiple times
        if (markerRef.current?.ddId) {
            const ent = mapMarkerData[markerRef.current?.infoType].find(e => e.ddId === markerRef.current?.ddId);
            if (ent) markerRef.current.generateRadius = ent.generateRadius;
        }

        map.setLayers([
            ...imageLayers,
            ...visibleLayers,
            ...getSplinePointLayer(markerRef.current),
            ...getRadiusLayer(markerRef.current)
        ]);
        setMapLayers([
            ...imageLayers,
            ...visibleLayers
        ]);
    };

    //#region Map Loader
    useEffect(() => {
        const load = async () => {
            const mapData = await getMapData(mapId);
            const projection = getProjectionForMap(mapData);

            // Overwrite the view rather than initialise new map objects
            const view = new View({
                projection: projection,
                center: getCenter(projection.getExtent()),
                zoom: 2,
                rotation: -mapData.rotation * Math.PI / 180,
                maxZoom: 8,
                minZoom: 1
            });
            map.setView(view);
        };
        if (mapId && map) load();
    }, [mapId, map]);

    // uwc-debug
    useEffect(() => {
        (async () => await rebuildLayers())();
    }, [mapMarkerData, config, filter]);

    useEffect(() => {
        onSelect?.(undefined);
        markerRef.current = undefined;
    }, [mapId]);

    //#region Interactions
    const handleSelect = useCallback((evt) => {
        const firstFeature = evt.selected[0];

        if (!firstFeature) {
            onSelect?.(undefined);
            markerRef.current = undefined;
            map.setLayers([
                ...mapLayers
            ]);
            return;
        }

        const data = firstFeature.getProperties().data;
        onSelect?.(data);
        markerRef.current = data;

        map.setLayers([
            ...mapLayers,
            ...getSplinePointLayer(data),
            ...getRadiusLayer(data)
        ]);

        console.log(data);
    }, [onSelect, mapLayers]);

    const handleAddEntity = useCallback((evt) => {
        if (evt.type === 'contextmenu') {
            show({
                event: evt.originalEvent,
                id: 'MAP_MENU',
                props: {
                    coords: {
                        x: evt.coordinate[1],
                        y: evt.coordinate[0]
                    }
                }
            });
            return false;
        }
        return true;
    }, [mapMarkerData]);

    useEffect(() => {
        const selectFeature = new Select({
            style: null
        });
        selectFeature.on('select', handleSelect);

        const clickFeature = new PointerInteraction({
            handleEvent: handleAddEntity
        });

        map.addInteraction(clickFeature);
        map.addInteraction(selectFeature);

        return () => {
            selectFeature.un('select', handleSelect);
            map.removeInteraction(selectFeature);
            map.removeInteraction(clickFeature);
        };
    }, [map, handleSelect]);

    //#region Spline Layer
    const getSplinePointLayer = (ent) => {
        const points = ent?.AIProperties?.splinePoints || ent?.ActorParameter?.splinePoints || [ent?.AIProperties?.navLinkRight].filter(i => !!i);
        if (!points?.length) return [];
        const pointFeatures = [];

        const { translation, rotation } = ent.transform;
        let parentVec = vec3.fromValues(translation.X, translation.Y, translation.Z);
        const parentQuat = quat.fromValues(rotation.X, rotation.Y, rotation.Z, rotation.W);

        for (let i = 0; i < points.length; i++) {
            const point = points[i]?.outVal || points[i];
            const child = vec3.fromValues(point.X, point.Y, point.Z);

            let absoluteCoords = rotateChildAroundParent(child, parentVec, parentQuat);

            const [x, y] = absoluteCoords;
            const splineObject = ent.creatureId.startsWith('Spline') ? "ActorParameter" : "AIProperties";
            const splineKey = ['Geyser', 'Branch_Long', 'Circulator'].some(e => ent.creatureId.includes(e)) ? "navLinkRight" : "splinePoints";

            const feature = new Feature({
                geometry: new Point([y, x]),
                data: {
                    ddId: ent.ddId,
                    infoType: ent.infoType,
                    index: i,
                    parentVec,
                    parentQuat,
                    splineKey,
                    splineObject
                }
            });

            const styles = [
                new Style({
                    image: new Icon({
                        src: '../images/icons/spline-point.png',
                        scale: 0.4
                    })
                })
            ];

            // This does work (at least for the bulbear in Kingdom of Beasts) but is hilariously
            // unhelpful everywhere else. It seems like some arrows are just backwards?
            // if (config.showRotation && splineKey === 'splinePoints') styles.push(new Style({
            //     image: new Icon({
            //         src: '../images/icons/arrow.png',
            //         rotateWithView: true,
            //         scale: 0.03,
            //         rotation: (points[i].rotation.roll),
            //     })
            // }));
            feature.setStyle(styles);

            pointFeatures.push(feature);
        }

        const layer = new VectorLayer({
            source: new VectorSource({
                features: pointFeatures
            }),
            zIndex: 1001
        });
        const layers = [layer];

        if (!['Geyser', 'Branch_Long', 'Circulator'].some(e => ent.creatureId.includes(e))) {
            // Draw the actual curve
            const curveStyle = new Style({
                stroke: new Stroke({
                    color: 'yellow',
                    width: 3
                })
            });
            const curveFeature = new Feature(bezierToLineString(points, parentVec, parentQuat, ent.creatureId));
            curveFeature.setStyle(curveStyle);
            const vectorLayer = new VectorLayer({
                source: new VectorSource({
                    features: [curveFeature]
                }),
                zIndex: 1002
            });
            layers.push(vectorLayer);
        }

        // Make each spline control point draggable
        const modifyFeature = new Modify({
            features: new Collection(layer.getSource().getFeatures())
        });
        modifyFeature.on('modifyend', splineModifyCallback);

        map.addInteraction(modifyFeature);
        return layers;
    };

    const globalToLocalPosition = (globalVec, parentVec, parentQuat) => {
        const translatedVec = vec3.create();
        vec3.subtract(translatedVec, globalVec, parentVec);

        const inverseRotation = quat.create();
        quat.invert(inverseRotation, parentQuat);

        const localVec = vec3.create();
        vec3.transformQuat(localVec, translatedVec, inverseRotation);
        return localVec;
    };

    const rotateChildAroundParent = (childPos, parentPos, parentRotation) => {
        let rotatedLocalPos = vec3.create();
        vec3.transformQuat(rotatedLocalPos, childPos, parentRotation);

        let finalPos = vec3.create();
        vec3.add(finalPos, rotatedLocalPos, parentPos);

        return finalPos;
    };

    const bezierPoint = (t, p0, p1, p2, p3) => ({
        X: (1 - t) ** 3 * p0.X + 3 * (1 - t) ** 2 * t * p1.X + 3 * (1 - t) * t ** 2 * p2.X + t ** 3 * p3.X,
        Y: (1 - t) ** 3 * p0.Y + 3 * (1 - t) ** 2 * t * p1.Y + 3 * (1 - t) * t ** 2 * p2.Y + t ** 3 * p3.Y,
        Z: (1 - t) ** 3 * p0.Z + 3 * (1 - t) ** 2 * t * p1.Z + 3 * (1 - t) * t ** 2 * p2.Z + t ** 3 * p3.Z
    });

    const bezierToLineString = (points, parentVec, parentQuat, creatureId) => {
        const allPoints = [];
        for (let i = 0; i < points.length; i++) {
            // We don't want to wrap around on some splines
            if (nonRepeatingSplines.includes(creatureId) && i == points.length - 1) continue;

            const p = points[i].outVal;
            const nextP = points[(i + 1) % points.length].outVal;

            const [x, y, z] = [p.X, p.Y, p.Z];
            const [x2, y2, z2] = [nextP.X, nextP.Y, nextP.Z];

            const p0 = { X: x, Y: y, Z: z };
            const p3 = { X: x2, Y: y2, Z: z2 };
            const p1 = {
                X: p0.X + points[i].leaveTangent.X,
                Y: p0.Y + points[i].leaveTangent.Y,
                Z: p0.Z + points[i].leaveTangent.Z
            };
            const p2 = {
                X: p3.X - points[(i + 1) % points.length].arriveTangent.X,
                Y: p3.Y - points[(i + 1) % points.length].arriveTangent.Y,
                Z: p3.Z - points[(i + 1) % points.length].arriveTangent.Z
            };

            for (let t = 0; t <= 1; t += 0.02) {
                allPoints.push(bezierPoint(t, p0, p1, p2, p3));
            }
        }
        return new LineString(allPoints.map(p => {
            const child = vec3.fromValues(p.X, p.Y, p.Z);
            const [x2, y2] = rotateChildAroundParent(child, parentVec, parentQuat);
            return [y2, x2];
        }));
    };

    const splineModifyCallback = (evt) => {
        const data = evt.features.array_[0].values_.data;
        const parentEntity = mapMarkerData[data.infoType].find(e => e.ddId === data.ddId);
        let splineOrVector = parentEntity[data.splineObject][data.splineKey];
        const globalVec = vec3.fromValues(evt.mapBrowserEvent.coordinate[1], evt.mapBrowserEvent.coordinate[0], parentEntity.transform.translation.Z);

        if (Array.isArray(splineOrVector)) {
            // We've got splinePoints, not the geyser
            const point = splineOrVector[data.index];
            const localVec = globalToLocalPosition(globalVec, data.parentVec, data.parentQuat);
            point.outVal = {
                X: localVec[0],
                Y: localVec[1],
                Z: point.outVal.Z
            };
        } else {
            const localVec = globalToLocalPosition(globalVec, data.parentVec, data.parentQuat);
            // Modify the object reference we've got - don't reassign the var to a new one
            splineOrVector = {
                X: localVec[0],
                Y: localVec[1],
                Z: splineOrVector.Z
            };
        };

        const newEnt = {
            ...parentEntity,
            [data.splineObject]: {
                ...parentEntity[data.splineObject],
                [data.splineKey]: splineOrVector
            }
        };
        // Makes sure the next layer rebuild passes the updated marker into the spline func again
        markerRef.current = newEnt;
        setMapData({
            ...mapMarkerData,
            [data.infoType]: mapMarkerData[data.infoType].map(marker => marker.ddId !== data.ddId ? marker : newEnt)
        });
    };

    const getRadiusLayer = data => {
        if (!data || (!['GroupDropManager', "ActorSpawner"].includes(data?.creatureId) && data?.generateNum < 2)) return [];

        const isGenerateRadius = !['GroupDropManager', "ActorSpawner"].includes(data?.creatureId);
        let radius = isGenerateRadius ? data.generateRadius : data.groupingRadius || data.drops.parsed[0].sphereRadius;
        const yx = [data.transform.translation.Y, data.transform.translation.X];

        const circleGeom = fromCircle(new geomCircle(yx, radius));
        const feature = new Feature({
            geometry: circleGeom
        });
        const style = new Style({
            stroke: new Stroke({
                color: isGenerateRadius ? 'white' : 'yellow',
                width: 3
            }),
            fill: new Fill({
                color: 'rgba(200, 200, 0, 0.2)'
            })
        });
        feature.setStyle(style);

        const layer = new VectorLayer({
            source: new VectorSource({
                features: [
                    feature
                ]
            }),
            zIndex: 10005
        });

        return [layer];
    };

    return <div className='w-full h-full MapContainer__container'>
        <MapMenu />
        <div className="w-full h-full MapContainer__map" ref={mapContainerRef}></div>
    </div>;
};
