import React from 'react';
import { ConfigInput } from './ConfigInput';

export const HappyEquipParameter = () => <div className='bg-sky-1200 w-full h-full p-8 flex flex-wrap flex-col'>
    <ConfigInput iconType="icon" iconId="vitalsystem1happy" value="VitalSystem1" type="number" />
    <ConfigInput iconType="icon" iconId="vitalsystem2happy" value="VitalSystem2" type="number" />
    <ConfigInput iconType="icon" iconId="vitalsystem3happy" value="VitalSystem3" type="number" />
    <ConfigInput iconType="icon" iconId="metalsystem1happy" value="MetalSystem1" type="number" />
    <ConfigInput iconType="icon" iconId="metalsystem2happy" value="MetalSystem2" type="number" />
    <ConfigInput iconType="icon" iconId="metalsystem3happy" value="MetalSystem3" type="number" />
    <ConfigInput iconType="item" iconId="dashboots" value="DashBoots1" type="number" />
    <ConfigInput iconType="item" iconId="dashboots" value="DashBoots2" type="number" />
    <ConfigInput iconType="item" iconId="dashboots" value="DashBoots3" type="number" />
</div>;