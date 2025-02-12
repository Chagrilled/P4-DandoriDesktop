import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import { Map, View, Collection, Feature } from "ol";
import { defaults as defaultControls } from 'ol/control';
import { getCenter } from 'ol/extent';
import PointerInteraction from 'ol/interaction/Pointer';
import { Select, defaults as defaultInteractions, Modify } from 'ol/interaction';
import { Style, Icon } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { getMapData } from "../../api/MapAPI";
import { getImageLayersForMap, getProjectionForMap } from '../../api/getImageLayers';
import { useContextMenu } from 'react-contexify';
import { MapMenu } from './MapMenu';
import { getFeatureLayers } from './FeatureStyles';
// import { Style, Stroke, Fill, Circle } from 'ol/style';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
import { MapContext } from './MapContext';
import { quat, vec3 } from 'gl-matrix';

export const MapContainer = ({
    onSelect,
}) => {
    const [map, setMap] = useState(() => new Map());
    const [markerLayers, setMarkerLayers] = useState({});
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
        Object.values(markerLayers).forEach(layer => {
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

        map.setLayers([
            ...imageLayers,
            ...visibleLayers,
            ...getSplinePointLayer(markerRef.current)
        ]);
        setMarkerLayers(markerLayers);
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
    }, [mapMarkerData, config]);

    useEffect(() => {
        onSelect?.(undefined);
        markerRef.current = undefined;
    }, [mapId]);

    useEffect(() => {
        const filterKeys = Object.keys(filter);
        for (const key of filterKeys) {
            const layer = markerLayers[key];
            if (!layer) {
                continue;
            }

            if (!!filter[key] !== !!prevFilter.current[key]) {
                if (!filter[key]) {
                    map.removeLayer(layer);
                }
                else {
                    map.addLayer(layer);
                }
            }
        }

        prevFilter.current = filter;
    }, [filter]);

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
            ...getSplinePointLayer(data)
        ]);

        // Tried to add a circle to GDM/ASs and it just didn't show
        // console.log(data);
        // if (!data) return;
        // if (['GroupDropManager', "ActorSpawner"].includes(data.creatureId)) {
        //     const radius = data.groupingRadius || data.drops.parsed[0].sphereRadius;
        //     console.log(firstFeature.getGeometry().getCoordinates())
        //     const layer = new VectorLayer({
        //         source: new VectorSource({
        //             features: [
        //                 new Feature({
        //                     // geometry: new Circle(firstFeature.getGeometry().getCoordinates(), radius)
        //                 })
        //             ]
        //         }),
        //         style: [
        //             new Style({
        //                 image: new Circle({
        //                     radius,
        //                     fill: null,
        //                     stroke: new Stroke({
        //                         color: 'rgba(255,0,0,0.9)',
        //                         width: 2
        //                     })
        //                 }),
        //                 stroke: new Stroke({
        //                     color: 'blue',
        //                     width: 3
        //                 }),
        //                 fill: new Fill({
        //                     color: 'rgba(0, 0, 255, 0.1)'
        //                 })
        //             })
        //         ],
        //         zIndex: 10000
        //     });

        //     map.addLayer(layer);
        //     console.log("added layer")
        //     console.log(map.getLayers())
        // }
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
        const points = ent?.AIProperties?.splinePoints || ent?.ActorParameter?.splinePoints;

        if (!points) return [];
        const pointFeatures = [];

        const { translation, rotation } = ent.transform;
        console.log(translation);
        let previous = vec3.fromValues(translation.X, translation.Y, translation.Z);
        let parentVec = vec3.fromValues(translation.X, translation.Y, translation.Z);
        const parentQuat = quat.fromValues(rotation.X, rotation.Y, rotation.Z, rotation.W);

        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const child = vec3.fromValues(point.outVal.X, point.outVal.Y, point.outVal.Z);
            const relativeCoords = getGlobalPosition(previous, child, parentQuat);
            // AI splines like in MoveFloors are relative, but spline entities like SplineKumaChappy are absolute
            let absoluteCoords = rotateChildAroundParent(child, parentVec, parentQuat);

            const [x, y, z] = relativeCoords;
            const [x2, y2] = absoluteCoords;
            // Current belief is that AIProperties splines are relative to each other
            // This is based off MoveFloors who generally only have 2 points. Might be wrong.
            const pointCoords = ent.AIProperties?.splinePoints ? [y, x] : [y2, x2];

            previous = vec3.fromValues(x, y, z);
            const feature = new Feature({
                geometry: new Point(pointCoords),
                data: {
                    ddId: ent.ddId,
                    // infoType: ent.infoType,
                    point,
                    index: i,
                    // splineType
                }
            });
            feature.setStyle([
                new Style({
                    image: new Icon({
                        src: '../images/icons/spline-point.png',
                        scale: 0.3
                    })
                })
            ]);
            pointFeatures.push(feature);
        }

        const layer = new VectorLayer({
            source: new VectorSource({
                features: pointFeatures
            }),
            zIndex: 1001
        });

        // Tried adding modifiers to spline points - problematic because
        // the place you drag a spline point to on the map is not its coords
        // its position is a mix of rotation + parent so idk if OL can modify that with a drag 
        // const modifyFeature = new Modify({
        //     features: new Collection(layer.getSource().getFeatures())
        // });
        // modifyFeature.on('modifyend', evt => {
        //     const data = evt.features.array_[0].values_.data;
        //     const parentEntity = mapMarkerData[data.infoType].find(e => e.ddId === data.ddId);

        //     setMapData({
        //         ...mapMarkerData,
        //         [data.infoType]: mapMarkerData[data.infoType].map(marker => marker.ddId !== data.ddId ? marker : {
        //             ...parentEntity,
        //             [splineType]: {
        //                 ...parentEntity[splineType],
        //                 splinePoints: 
        //             }
        //             transform: {
        //                 ...data.transform,
        //                 translation: {
        //                     X: evt.mapBrowserEvent.coordinate[1],
        //                     Y: evt.mapBrowserEvent.coordinate[0],
        //                     Z: data.transform.translation.Z
        //                 }
        //             }
        //         }),
        //     });
        // });
        // map.addInteraction(modifyFeature);
        return [layer];
    };

    const getGlobalPosition = (parentPosition, childLocalPosition, parentQuaternion) => {
        let localVec = vec3.fromValues(...childLocalPosition);
        let rotatedVec = vec3.create();

        vec3.transformQuat(rotatedVec, localVec, parentQuaternion);

        return vec3.add(vec3.create(), parentPosition, rotatedVec);
    };

    const rotateChildAroundParent = (childPos, parentPos, parentRotation) => {
        let rotatedLocalPos = vec3.create();
        vec3.transformQuat(rotatedLocalPos, childPos, parentRotation);

        let finalPos = vec3.create();
        vec3.add(finalPos, rotatedLocalPos, parentPos);

        return finalPos;
    };

    return <div className='w-full h-full MapContainer__container'>
        <MapMenu />
        <div className="w-full h-full MapContainer__map" ref={mapContainerRef}></div>
    </div>;
};
