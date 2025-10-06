import React from 'react';
import { ConfigInput } from '../Inputs/ConfigInput';
import { GenseiVSDifficulty } from '../../../api/types';
import { ConfigSelect } from '../Inputs/ConfigSelect';

export const DDBHandicapTable = () => <div className='bg-sky-1200 w-full h-full p-8 flex flex-wrap flex-col'>
    <ConfigInput iconType="object" iconId="default" value="CandyNum" type="number" />
    <ConfigInput iconType="object" iconId="happy" value="HappyCarryLevel" type="number" />
    <ConfigInput iconType="pikmin" iconId="pikminred" value="PikminNum" type="number" />
    <ConfigInput iconType="object" iconId="default" value="IsTotugeki" type="checkbox" />
    <ConfigSelect iconType="object" iconId="survivora" value="CpuDifficulty" optionEnum={GenseiVSDifficulty} />
</div>;
