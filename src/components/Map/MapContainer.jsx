import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Map, View, Collection } from "ol";
import { defaults as defaultControls } from 'ol/control';
import { getCenter } from 'ol/extent';
import PointerInteraction from 'ol/interaction/Pointer';
import { Select, defaults as defaultInteractions, Modify } from 'ol/interaction';
import { getMapData, getMarkerLayers } from "../../api/MapAPI";
import { getImageLayersForMap, getProjectionForMap } from '../../api/getImageLayers';
import { useContextMenu } from 'react-contexify';
import { MapMenu } from './MapMenu';
// import { Style, Stroke, Fill, Circle } from 'ol/style';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';

export const MapContainer = ({
    mapId,
    onSelect,
    mapMarkerData,
    setMapData
}) => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(() => new Map({}));
    const { show } = useContextMenu({ id: 'MAP_MENU ' });

    useEffect(() => {
        const load = async () => {
            // load map data
            const mapData = await getMapData(mapId);
            const imageLayers = getImageLayersForMap(mapData, mapData.waterboxes);
            const projection = getProjectionForMap(mapData);

            const view = new View({
                projection: projection,
                center: getCenter(projection.getExtent()),
                zoom: 2,
                rotation: -mapData.rotation * Math.PI / 180,
                maxZoom: 4,
                minZoom: 1,
            });
            // add markers
            const markerLayers = await getMarkerLayers(mapMarkerData);
            const visibleLayers = Object.entries(markerLayers)
                // .filter(([k, _v]) => !!filter[k])
                .map(([_k, v]) => v);

            // TODO figure out why map.setLayers and map.setView aren't working
            const map = new Map({
                layers: [
                    ...imageLayers,
                    ...visibleLayers
                ],
                target: 'map',
                view,
                // disable rotation
                interactions: defaultInteractions(),
                // disable "resetNorth" button; TODO: see if rotateOptions.resetNorth can reset to original rotation
                controls: defaultControls({ rotate: false })
            });

            const modifyFeature = new Modify({
                features: new Collection(markerLayers.creature.getSource().getFeatures())
            });
            modifyFeature.on('modifyend', evt => {
                setMapData({
                    ...mapMarkerData,
                    // TODO: yes this will be annoying later if things are in different arrays
                    creature: mapMarkerData.creature.map(marker => {
                        const data = evt.features.array_[0].values_.data;
                        return marker.ddId !== data.ddId ? marker : {
                            ...data,
                            transform: {
                                ...data.transform,
                                translation: {
                                    X: evt.mapBrowserEvent.coordinate[1],
                                    Y: evt.mapBrowserEvent.coordinate[0],
                                    Z: data.transform.translation.Z
                                }
                            }
                        };
                    }),

                });
            });
            map.addInteraction(modifyFeature);

            setMap(map);
        };
        if (mapMarkerData) {
            load();
        };
    }, [mapId, mapMarkerData]);

    // useEffect(() => {
    //     const filterKeys = Object.keys(filter);
    //     for (const key of filterKeys) {
    //         const layer = markerLayers[key];
    //         if (!layer) {
    //             continue;
    //         }

    //         if (!!filter[key] !== !!prevFilter.current[key]) {
    //             if (!filter[key]) {
    //                 map.removeLayer(layer);
    //             }
    //             else {
    //                 map.addLayer(layer);
    //             }
    //         }
    //     }

    //     prevFilter.current = filter;
    // }, [filter]);

    // useEffect(() => {
    //     const pinsLayer = getMapPins(pins);
    //     map.addLayer(pinsLayer);

    //     return () => {
    //         map.removeLayer(pinsLayer);
    //     };
    // }, [pins, map]);

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
        if (!mapMarkerData) return false;

        if (evt.type === 'contextmenu') {
            show({
                event: evt.originalEvent,
                id: 'MAP_MENU',
                props: {
                    mapMarkerData,
                    setMapData,
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

    useEffect(() => {
        if (mapContainerRef.current) {
            map.setTarget(mapContainerRef.current);
        }

        return () => {
            map.dispose();
        };
    }, [map, mapMarkerData]);

    return <div className='w-full h-full MapContainer__container'>
        <MapMenu />
        <div className="w-full h-full MapContainer__map" ref={mapContainerRef}></div>
    </div>;
};
