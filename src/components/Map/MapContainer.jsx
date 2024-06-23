import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import { Map, View, Collection } from "ol";
import { defaults as defaultControls } from 'ol/control';
import { getCenter } from 'ol/extent';
import PointerInteraction from 'ol/interaction/Pointer';
import { Select, defaults as defaultInteractions, Modify } from 'ol/interaction';
import { getMapData } from "../../api/MapAPI";
import { getImageLayersForMap, getProjectionForMap } from '../../api/getImageLayers';
import { useContextMenu } from 'react-contexify';
import { MapMenu } from './MapMenu';
import { useConfig } from '../../hooks/useConfig';
import { getFeatureLayers } from './FeatureStyles';
// import { Style, Stroke, Fill, Circle } from 'ol/style';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
import { MapContext } from './MapContext';

export const MapContainer = ({
    onSelect
}) => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(() => new Map());
    const [markerLayers, setMarkerLayers] = useState({});
    const { show } = useContextMenu({ id: 'MAP_MENU ' });
    const prevFilter = useRef({});
    const config = useConfig();
    const { mapMarkerData, setMapData, filter, mapId } = useContext(MapContext);

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
        if (!mapId) return;

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
                setMapData({
                    ...mapMarkerData,
                    [data.infoType]: mapMarkerData[data.infoType].map(marker => marker.ddId !== data.ddId ? marker : {
                        ...data,
                        transform: {
                            ...data.transform,
                            translation: {
                                X: evt.mapBrowserEvent.coordinate[1],
                                Y: evt.mapBrowserEvent.coordinate[0],
                                Z: data.transform.translation.Z
                            }
                        }
                    }),
                });
            });
            map.addInteraction(modifyFeature);
        });

        map.setLayers([
            ...imageLayers,
            ...visibleLayers
        ]);
        setMarkerLayers(markerLayers);
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

    useEffect(() => {
        (async () => await rebuildLayers())();
    }, [mapMarkerData, config]);

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
        if (evt.mapBrowserEvent.originalEvent.shiftKey) {
            // entity is being added.
            return;
        }
        const firstFeature = evt.selected[0];
        if (!firstFeature) {
            onSelect?.(undefined);
            return;
        }

        const data = firstFeature.getProperties().data;
        onSelect?.(data);
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
    }, [onSelect]);

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

    return <div className='w-full h-full MapContainer__container'>
        <MapMenu />
        <div className="w-full h-full MapContainer__map" ref={mapContainerRef}></div>
    </div>;
};
