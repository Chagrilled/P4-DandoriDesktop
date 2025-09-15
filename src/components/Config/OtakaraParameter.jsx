import React from 'react';
import { ConfigInput } from './ConfigInput';

export const OtakaraParameter = ({ }) => <div className='bg-sky-1200 w-full h-full p-8 flex flex-wrap flex-col'>
    <ConfigInput iconType="icon" iconId="weight" value="CarryWeightMin" type="number" tooltip="The minimum carry strength of the combined carriers required to carry an object." />
    <ConfigInput iconType="icon" iconId="weight" value="CarryWeightMax" type="number" tooltip="The maximum number of individual carriers on an object, including captains, dogs and (Giant) Breadbugs Each entity only counts as 1 regardless of its carry strength." />
    <ConfigInput iconType="icon" iconId="weight" value="CarryWeightMaxVs" type="number" tooltip="The maximum number of individual carriers on an object during Dandori Battles. This is also used when a Breadbug or Giant Breadbug is carrying the object." />
    <ConfigInput iconType="icon" iconId="weight" value="CarryWeightMinVs" type="number" tooltip="The minimum carry strength of the combined carriers required to carry an object while in a Dandori Battle." />
    <ConfigInput iconType="icon" iconId="sparklium" value="Kira" type="number" tooltip="Sparklium" />
    <ConfigInput iconType="icon" iconId="dandoripoints" value="Poko" type="number" tooltip="Dandori points during Dandori Challenges" />
</div>;