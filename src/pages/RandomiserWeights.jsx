import React, { useState, useEffect, useContext } from 'react';
import { RandomiserContext } from '../components/RandomiserContext';
import { CreatureNames, randCreatures } from '../api/types';
import { MarkerIcon } from '../components/MarkerIcon';
import { findObjectKeyByValue } from '../utils';
import { useNavigate } from 'react-router-dom';

export const RandomiserWeights = () => {

    const { state, setState, appConfig } = useContext(RandomiserContext);
    const navigate = useNavigate();

    if (!appConfig) return;

    console.log("Weights page: ", state);
    const englishNames = randCreatures.map(c => CreatureNames[c]).sort();

    return (
        <div className='bg-sky-1200 w-full h-full p-8 flex flex-wrap flex-row gap-4 items-center'>
            <button
                className="absolute left-0 top-0 ml-4 mt-4 bg-cyan-800 rounded-xl p-2"
                onClick={() => navigate('/randomiser')}
            >
                Back
            </button>
            <button
                className="absolute left-0 top-0 ml-20 mt-4 bg-red-600 rounded-xl p-2 z-10"
                onClick={() => setState({
                    ...state,
                    weights: Object.fromEntries(randCreatures.map(c => [c, 0]))
                })}
            >
                Zero
            </button>
            <button
                className="absolute left-0 top-0 ml-36 mt-4 bg-green-600 rounded-xl p-2 z-10"
                onClick={() => setState({
                    ...state,
                    weights: Object.fromEntries(randCreatures.map(c => [c, 1]))
                })}
            >
                Reset
            </button>

            {(appConfig?.internalNames ? randCreatures : englishNames).map(creature => {

                const internalName = appConfig?.internalNames ? creature : findObjectKeyByValue(CreatureNames, creature);

                return <div key={creature} className="flex flex-1 flex-col items-start">
                    <MarkerIcon type="creature" id={creature.includes('Spawner') ? 'default' : internalName} size="large" />
                    <label className='text-center self-center pb-1'>{creature}</label>
                    <input
                        onChange={e => setState({
                            ...state,
                            weights: {
                                ...state.weights,
                                [internalName]: parseInt(e.target.value)
                            }
                        })}
                        type="number"
                        step="1"
                        min="0"
                        value={state.weights[internalName]}
                        className={"text-center self-center max-w-[7em] bg-sky-1000 rounded-md px-3 py-0.5 text-[#e0e6ed] border border-[#3a4a5a] focus:ring-2 focus:ring-[#4da6ff] transition"}
                    />
                </div>;
            })}
        </div>
    );
};
