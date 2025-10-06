import React from 'react';
import { ConfigInput } from '../Inputs/ConfigInput';

export const OrimaEquipParameter = () => <div className='bg-sky-1200 w-full h-full p-8 flex flex-wrap flex-col'>
    <ConfigInput iconType="item" iconId="shugoflag" value="BoostAntenna1" type="number" />
    <ConfigInput iconType="item" iconId="shugoflag" value="BoostAntenna2" type="number" />
    <ConfigInput iconType="item" iconId="shugoflag" value="BoostAntenna3" type="number" />
    <ConfigInput iconType="item" iconId="dashboots" value="DashBoots1" type="number" />
    <ConfigInput iconType="item" iconId="dashboots" value="DashBoots2" type="number" />
    <ConfigInput iconType="item" iconId="dashboots" value="DashBoots3" type="number" />
    <ConfigInput iconType="object" iconId="default" value="HeadLampNoneIntensity" type="number" />
    <ConfigInput iconType="object" iconId="default" value="HeadLampNoneAttenuationRadius" type="number" />
    <ConfigInput iconType="object" iconId="default" value="HeadLampNoneLightFalloffExponent" type="number" />
    <ConfigInput iconType="item" iconId="headlamp1" value="HeadLamp1Intensity" type="number" />
    <ConfigInput iconType="item" iconId="headlamp1" value="HeadLamp1AttenuationRadius" type="number" />
    <ConfigInput iconType="item" iconId="headlamp1" value="HeadLamp1LightFalloffExponent" type="number" />
    <ConfigInput iconType="item" iconId="headlamp2" value="HeadLamp2Intensity" type="number" />
    <ConfigInput iconType="item" iconId="headlamp2" value="HeadLamp2AttenuationRadius" type="number" />
    <ConfigInput iconType="item" iconId="headlamp2" value="HeadLamp2LightFalloffExponent" type="number" />
    <ConfigInput iconType="item" iconId="metalsystem1" value="MetalSystem1" type="number" />
    <ConfigInput iconType="item" iconId="metalsystem2" value="MetalSystem2" type="number" />
    <ConfigInput iconType="item" iconId="metalsystem3" value="MetalSystem3" type="number" />
    <ConfigInput iconType="item" iconId="recoverykit" value="RecoveryKitRate" type="number" />
    <ConfigInput iconType="item" iconId="recoverykit" value="RecoveryKitInvincibleTime" type="number" />
    <ConfigInput iconType="item" iconId="shugoflag" value="SensorRadius1" type="number" />
    <ConfigInput iconType="item" iconId="shugoflag" value="SensorRadius2" type="number" />
    <ConfigInput iconType="item" iconId="shugoflag" value="SensorRadius3" type="number" />
    <ConfigInput iconType="item" iconId="vitalsystem1" value="VitalSystem1" type="number" />
    <ConfigInput iconType="item" iconId="vitalsystem2" value="VitalSystem2" type="number" />
    <ConfigInput iconType="item" iconId="vitalsystem3" value="VitalSystem3" type="number" />
</div>;