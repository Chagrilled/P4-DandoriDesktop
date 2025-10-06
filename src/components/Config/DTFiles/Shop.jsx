import React, { useContext } from 'react';
import { ConfigInput } from '../Inputs/ConfigInput';
import { GenseiVSDifficulty, ItemTypeIDEditor } from '../../../api/types';
import { ConfigSelect } from '../Inputs/ConfigSelect';
import { ConfigContext } from '../ConfigContext';

export const Shop = () => {
    const { config, configData, selectedRow } = useContext(ConfigContext);
    let data = configData[config.name][selectedRow];

    return <div className='bg-sky-1200 w-full h-full p-8 flex flex-wrap flex-col'>
        <ConfigInput iconType="object" iconId="default" value="bEnable" type="checkbox" />
        <ConfigInput iconType="object" iconId="default" value="bUnlock" type="checkbox" />
        <ConfigInput iconType="object" iconId="default" value="Category" type="number" />
        <ConfigInput iconType="object" iconId="piecepick" value="Price" type="number" />
        <ConfigInput iconType="object" iconId="default" value="Stock" type="number" />
        <ConfigInput iconType="object" iconId="default" value="MaxStock" type="number" />
        <ConfigInput iconType="portal" iconId="madoripoko" value="ArriveTimer" type="number" />
        <ConfigSelect iconType="item" iconId={data.OverwriteItemTypeId.replace("EItemTypeIDEditor::", "")} value="OverwriteItemTypeId" optionEnum={ItemTypeIDEditor} tooltip="The item this one will override upon purchase (usually for upgrades)" />
        <ConfigInput iconType="object" iconId="default" value="UnlockTP" type="number" tooltip="Sparklium required to unlock in the shop" />
        <ConfigSelect iconType="item" iconId={data.UnlockItemTypeId.replace("EItemTypeIDEditor::", "")} value="UnlockItemTypeId" optionEnum={ItemTypeIDEditor} tooltip="This makes the selected item a purchase requirement to unlock this item" />
        <ConfigInput iconType="object" iconId="default" value="UnlockQuestName" type="text" />
        <ConfigInput iconType="object" iconId="default" value="ShopIndex" type="number" />
    </div>;
};