import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { MarkerIcon } from '../components/Icon';
import { PikminNames } from '../api/types';
import '../Randomiser.css';

export const Randomiser = () => {

    const randInt = (max) => Math.floor(Math.random() * max);
    const pikminList = Object.keys(PikminNames);

    useEffect(() => {
        window.electron.ipcRenderer.on('getMaps', (evt, message) => { console.log(message); setState({ ...state, maps: message.maps }); });
        return () => {
            window.electron.ipcRenderer.removeAllListeners('getMaps');
        };
    }, []);

    const [state, setState] = useState({
        randCreatures: true, // ✅
        randEnemyDrops: true, // ✅
        allCreaturesDrop: true, // ✅
        randMaxDrops: 3, // ✅
        dropLimitMax: 2, // ✅
        randGenerateNumLimit: 4, // ✅
        randBossGenerateNumLimit: 2, // ✅
        randGenerateNums: true, // ✅
        randBossGenerateNums: true,
        objectsKeepGenerateNum: true, // ✅
        retainSpawners: true, // ✅
        creaturesLfL: true,
        retainNonBosses: false, // ✅
        retainBosses: true, // ✅
        allBosses: false, // ✅
        asInfiniteChance: 20, // ✅
        asLimit: 4, // ✅
        asIntervalLimit: 60, // ✅
        randTreasures: true, // ✅
        treasuresLfL: true,
        randPortals: true, // ✅
        randOverworldOnly: true, // ✅
        randPileAmounts: false,
        randDisabled: false, // ✅
        randObjects: true, // ✅
        hazardsLfL: false, // ✅
        // gatesLfL: false,
        excludeGates: true,
        allObjectsDrop: true, // ✅
        randStartingOnion: false, // ✅
        randAllOnions: false, // ✅
        retainMaterials: true,
        retainWildPikmin: true, // ✅
        randObjectDrops: true,
        objectsLfL: false, // ✅
        startingFlarlics: 3, // ✅
        bossesCanDrop: false, // ✅
        rebirthInterval: 5, // ✅
        randIntFunction: 'even', // ✅
        forceCaves: false, // ✅
        noOverworldSnowfake: true
    });

    if (!state.maps) {
        window.electron.ipcRenderer.readMaps();
    }

    const settings = {
        creatures: [
            {
                label: 'Randomise Enemies',
                tooltip: <><span>All creatures will get randomised into something else</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, randCreatures: e.target.checked }),
                id: 'randCreatures'
            },
            {
                label: 'Randomise Enemy Drops',
                tooltip: <><span>Creature drops will get randomised</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, randEnemyDrops: e.target.checked }),
                id: 'randEnemyDrops'
            },
            {
                label: 'All Creatures Have Drops',
                tooltip: <>
                    <span>Every creature will have a drop. New drops will get randomised. </span>
                    <span>Using this without Randomise Enemy Drops will retain the vanilla drops</span>
                </>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, allCreaturesDrop: e.target.checked }),
                id: 'allCreaturesDrop'
            },
            {
                label: 'Limit Per Drop',
                tooltip: <><span> Upper bound of how many of each entity can be dropped per drop - 4 will mean 1-4 bulborbs could drop</span></>,
                type: 'number',
                onChange: (e) => setState({ ...state, randMaxDrops: e.target.value }),
                id: 'randMaxDrops'
            },
            {
                label: 'Drop Limit',
                tooltip: <>
                    <span>Upper bound of how many types of things each entity can drop.</span>
                    <span>3 will mean an enemy can drop 1, 2 or 3 types of things (which may all be 1-Limit Per Drop)</span>
                </>,
                type: 'number',
                onChange: (e) => setState({ ...state, dropLimitMax: e.target.value }),
                id: 'dropLimitMax'
            },
            {
                break: true,
                id: 5
            },
            {
                label: 'Randomise GenerateNums',
                tooltip: <><span>Randomises the number of entities that will be generated for each actor in the game</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, randGenerateNums: e.target.checked }),
                id: 'randGenerateNums'
            },
            {
                label: 'GenerateNum Limit',
                tooltip: <>
                    <span>Upper bound of how many entities can spawn for each actor in the generator list</span>
                </>,
                type: 'number',
                onChange: (e) => setState({ ...state, randGenerateNumLimit: e.target.value }),
                id: 'randGenerateNumLimit'
            },
            {
                label: 'Randomise Boss GenerateNums',
                tooltip: <><span>Randomises the number of bosses that will spawn - this is to keep some spawns a bit tamer if you want</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, randBossGenerateNums: e.target.checked }),
                id: 'randBossGenerateNums'
            },
            {
                label: 'Boss GenerateNum Limit',
                tooltip: <><span>Upper bound of how many bosses can spawn for each boss in the generator list</span></>,
                type: 'number',
                onChange: (e) => setState({ ...state, randBossGenerateNumLimit: e.target.value }),
                id: 'randBossGenerateNumLimit'
            },
            {
                label: 'Rebirth Interval',
                tooltip: <><span>Upper bound of how many bosses can spawn for each boss in the generator list</span></>,
                type: 'number',
                onChange: (e) => setState({ ...state, rebirthInterval: e.target.value }),
                id: 'rebirthInterval'
            },
            {
                label: 'Random Function',
                tooltip: <><span>Function used to generate integers for GenerateNums</span></>,
                type: 'select',
                onChange: (e) => setState({ ...state, randIntFunction: e.target.value }),
                id: 'randIntFunction'
            },
            {
                break: true,
                id: 1
            },
            {
                label: 'Retain Spawners',
                tooltip: <><span>ActorSpawners and holes will be left as they are, with just their spawned entity being randomised</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, retainSpawners: e.target.checked }),
                id: 'retainSpawners'
            },
            // {
            //     label: 'Creatures Like-For-Like',
            //     tooltip: <><span>Creatures will only randomise into other creatures</span></>,
            //     type: 'checkbox',
            //     onChange: (e) => setState({ ...state, creaturesLfL: e.target.checked }),
            //     id: 'creaturesLfL'
            // },
            {
                label: 'Retain Non-Bosses',
                tooltip: <>
                    <span>Non-boss enemies will only randomise into other non-boss enemies</span>
                    <span>Game can very quickly become chaotic with this off.</span>
                </>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, retainNonBosses: e.target.checked }),
                id: 'retainNonBosses'
            },
            {
                label: 'Retain Bosses',
                tooltip: <><span>Bosses will only randomise into other bosses</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, retainBosses: e.target.checked }),
                id: 'retainBosses'
            },
            {
                label: 'All Bosses',
                tooltip: <><span>Everything is a boss. Mileage may vary.</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, allBosses: e.target.checked }),
                id: 'allBosses'
            },
            {
                label: 'Retain Wild Pikmin',
                tooltip: <><span>Wild pikmin are kept exactly as they are.</span> <span>Disabling this randomise their pikmin type, which may help with randomised gates.</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, retainWildPikmin: e.target.checked }),
                id: 'retainWildPikmin'
            },
            {
                label: 'Bosses Can Drop',
                tooltip: <><span>Adds bosses into the drop pool so bosses can also DROP from things</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, bossesCanDrop: e.target.checked }),
                id: 'bossesCanDrop'
            },
            {
                label: 'No Overworld Snowfake',
                tooltip: <><span>Snowfake Fluttertails will not spawn overground. The ice effect is annoying.</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, noOverworldSnowfake: e.target.checked }),
                id: 'noOverworldSnowfake'
            },
            {
                break: true,
                id: 2
            },
            {
                label: 'ActorSpawner Infinite Chance: ',
                tooltip: <><span>0-100% chance an ActorSpawner will infinitely spawn its entity</span></>,
                type: 'number',
                onChange: (e) => setState({ ...state, asInfiniteChance: e.target.value }),
                id: 'asInfiniteChance'
            },
            {
                label: 'ActorSpawner Limit:   ',
                tooltip: <>
                    <span>Upper bound for concurrent entities that an ActorSpawner can </span>
                    <span>spawn if it is infinitely spawning (or total spawns if not, unsure)</span>
                </>,
                type: 'number',
                onChange: (e) => setState({ ...state, asLimit: e.target.value }),
                id: 'asLimit'
            },
            {
                label: 'ActorSpawner Interval Limit: ',
                tooltip: <><span>Upper bound for number of seconds between each ActorSpawner spawn</span></>,
                type: 'number',
                onChange: (e) => setState({ ...state, asIntervalLimit: e.target.value }),
                id: 'asIntervalLimit'
            },
        ],
        treasures: [
            {
                label: 'Randomise Treasures',
                tooltip: <><span>Treasures will be randomised into other treasures</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, randTreasures: e.target.checked }),
                id: 'randTreasures'
            },
            // {
            //     label: 'Treasures Like-For-Like',
            //     tooltip: <><span>All treasures are only randomised into other treasures</span></>,
            //     type: 'checkbox',
            //     onChange: (e) => setState({ ...state, treasuresLfL: e.target.checked }),
            //     id: 'treasuresLfL'
            // },
        ],
        objects: [
            {
                label: 'Randomise Portals',
                tooltip: <>
                    <span>All portal entrances will lead to different levels</span>
                    <span>Dandori battles/challenges will still go to the same type.</span>
                    <span>No idea if the game will be completable or not</span>
                </>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, randPortals: e.target.checked }),
                id: 'randPortals'
            },
            {
                label: 'Randomise Overworld Portals Only',
                tooltip: <><span>Only overworld entrances will be randomised - this is a more sane option</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, randOverworldOnly: e.target.checked }),
                id: 'randOverworldOnly'
            },
            // {
            //     label: 'Randomise Pile Amounts',
            //     tooltip: <><span>Material/nugget amounts will have random numbers of pieces</span></>,
            //     type: 'checkbox',
            //     onChange: (e) => setState({ ...state, randPileAmounts: e.target.checked }),
            //     id: 'randPileAmounts'
            // },
            {
                label: 'Randomise Cave-Disabled Pikmin',
                tooltip: <>
                    <span>Randomise which pikmin are disabled for each overworld cave. </span>
                    <span>Recommended NOT to enable this without Randomise Overworld Portals Only as moving</span>
                    <span>between different disable flags will just remove the pikmin that violate the flags from your party.</span>
                </>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, randDisabled: e.target.checked }),
                id: 'randDisabled'
            },
            {
                break: true,
                id: 3
            },
            {
                label: 'Randomise Unnecessary Objects',
                tooltip: <>
                    <span>Objects that aren't essential to the critical path will be randomised into creatures.</span>
                    <span>Things like plants, straw, hazards. They can randomise into each other, or creatures</span>
                </>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, randObjects: e.target.checked }),
                id: 'randObjects'
            },
            {
                label: 'Force Cave Object Randomisation',
                tooltip: <><span>Forces cave objects to randomise. Likely to cause pathing problems</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, forceCaves: e.target.checked }),
                id: 'forceCaves'
            },
            {
                label: 'Objects Like-For-Like',
                tooltip: <>
                    <span>Trivial objects like pots and plants will only randomise into other objects</span>
                    <span>rather than including creatures in their rando list</span>
                </>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, objectsLfL: e.target.checked }),
                id: 'objectsLfL'
            },
            {
                label: 'Hazards Like-For-Like',
                tooltip: <><span>Floor hazards are only randomised into other floor hazards</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, hazardsLfL: e.target.checked }),
                id: 'hazardsLfL'
            },
            // {
            //     label: 'Gates Like-For-Like',
            //     tooltip: <><span>Gates are only randomised into other gates</span></>,
            //     type: 'checkbox',
            //     onChange: (e) => setState({ ...state, gatesLfL: e.target.checked }),
            //     id: 'gatesLfL'
            // },
            {
                label: 'Exclude Gates',
                tooltip: <><span>Gates are not randomised</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, excludeGates: e.target.checked }),
                id: 'excludeGates'
            },
            {
                label: 'Randomise Object Drops',
                tooltip: <><span>Randomise existing drops</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, randObjectDrops: e.target.checked }),
                id: 'randObjectDrops'
            },
            {
                label: 'All Objects Have Drops',
                tooltip: <><span>Every object is given a drop, and pads inventories from 1-Drop Limit</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, allObjectsDrop: e.target.checked }),
                id: 'allObjectsDrop'
            },
            {
                label: 'Keep Object GenerateNums',
                tooltip: <>
                    <span>When objects randomise into creatures, their generateNum will be retained</span>
                    <span>as there are a lot of objects in the game, this might help keep the creature count a bit more sane</span>
                </>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, objectsKeepGenerateNum: e.target.checked }),
                id: 'objectsKeepGenerateNum'
            },
            {
                break: true,
                id: 4
            },
            {
                label: 'Randomise starting onion',
                tooltip: <><span>Randomises which pikmin type you start with</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, randStartingOnion: e.target.checked }),
                id: 'randStartingOnion'
            },
            {
                label: 'Randomise other onions',
                tooltip: <><span>Attempts to randomise onions for other onions. They will still be in their original places</span></>,
                type: 'checkbox',
                onChange: (e) => setState({ ...state, randAllOnions: e.target.checked }),
                id: 'randAllOnions'
            },
            {
                label: 'Starting Flarlics',
                tooltip: <><span>How many flarlics you want to spawn in the hub at the start</span></>,
                type: 'number',
                onChange: (e) => setState({ ...state, startingFlarlics: e.target.value }),
                id: 'startingFlarlics'
            },
            // {
            //     label: 'Retain Material Piles',
            //     tooltip: <><span>Keeps material piles as they are, so store/obstacle progression doesn\'t break</span></>,
            //     type: 'checkbox',
            //     onChange: (e) => setState({ ...state, retainMaterials: e.target.checked }),
            //     id: 'retainMaterials'
            // },
        ]
    };

    const css = "ml-auto w-4 h-4 ml-2 self-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";
    const textCss = "ml-auto max-w-[3em] pl-2 bg-sky-1000 randoInput";

    const mapSettings = type => type.map(o =>
        o.break ?
            <hr className='my-1.5' key={o.id} /> :
            <div key={o.id} className='py-0.5'>
                <label className="flex" htmlFor={o.id} data-tooltip-id={o.id}>
                    <Tooltip id={o.id} place={"top"}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {o.tooltip}
                        </div>
                    </Tooltip>
                    <b className='text-md mr-2'>{o.label}</b>
                    {o.type === 'select' ?
                        <select value={state[o.id]} className="ml-auto bg-sky-1000 text-right" onChange={o.onChange} id={o.id}>
                            <option key="even" value="even">Even</option>
                            <option key="lowWeighted" value="lowWeighted">lowWeighted</option>
                        </select>
                        : <input
                            type={o.type}
                            className={o.type === 'checkbox' ? css : textCss}
                            onChange={o.onChange}
                            id={o.id}
                            checked={state[o.id]}
                            defaultValue={state[o.id]}
                        />}

                </label>
            </div>
    );

    return (
        <div className="container py-20 px-10 mx-0 min-w-full flex flex-col items-center">
            <h2 className="text-7xl mb-8 text-blue-200 font-[Pikmin]">
                <MarkerIcon type="pikmin" id={pikminList[randInt(pikminList.length)]} card={true} />
                Randomiser
                <MarkerIcon type="pikmin" id={pikminList[randInt(pikminList.length)]} card={true} />
            </h2>

            <div className='columns-3 flex'>
                {/* //#region Creatures */}
                <div className='mx-4'>
                    <h3 className="text-center text-3xl mb-5 text-blue-200 font-[Pikmin]">
                        <MarkerIcon type="creature" card={true} />
                        Creatures
                    </h3>
                    <div>
                        {mapSettings(settings.creatures)}
                    </div>
                </div>

                <div className='mx-6'>
                    <h3 className="text-center text-3xl mb-5 text-blue-200 font-[Pikmin]">
                        <MarkerIcon type="treasure" card={true} />
                        Treasures
                    </h3>
                    {mapSettings(settings.treasures)}
                </div>

                <div className='mx-4'>
                    <h3 className="text-center text-3xl mb-5 text-blue-200 font-[Pikmin]">
                        <MarkerIcon type="workobject" card={true} />
                        Objects
                    </h3>
                    {mapSettings(settings.objects)}
                </div>
            </div>
            <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mt-8 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => window.electron.ipcRenderer.randomise(state)}
            >
                Randomise
            </button>
        </div>
    );
};