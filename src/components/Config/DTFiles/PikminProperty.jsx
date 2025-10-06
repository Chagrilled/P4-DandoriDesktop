import { MarkerIcon } from '../../MarkerIcon';
import React from 'react';
import { PikminColorEnum } from '../../../api/types';
import { ConfigInput } from '../Inputs/ConfigInput';
import { ConfigSelect } from '../Inputs/ConfigSelect';

export const PikminProperty = () => <div className='bg-sky-1200 w-full h-full p-8 flex flex-wrap flex-col'>
    <ConfigSelect iconType="onion" iconId="onyon" value="PikminColor" optionEnum={PikminColorEnum} />
    <ConfigInput iconType="item" iconId="dashboots" value="LeafSpeed" type="number" />
    <ConfigInput iconType="item" iconId="dashboots" value="BudSpeed" type="number" />
    <ConfigInput iconType="item" iconId="dashboots" value="FlowerSpeed" type="number" />
    <ConfigInput iconType="item" iconId="gekikara" value="DopeSpeed" type="number" tooltip="Speed when spicy sprayed" />
</div>;