import React from 'react';
import { ConfigInput } from '../Inputs/ConfigInput';

export const CaveOtakaraCollectRankTable = () => <div className='bg-sky-1200 w-full h-full p-8 flex flex-wrap flex-col'>
    <ConfigInput iconType="icon" iconId="copper" value="Copper" type="number" />
    <ConfigInput iconType="icon" iconId="silver" value="Silver" type="number" />
    <ConfigInput iconType="icon" iconId="gold" value="Gold" type="number" />
</div>;
