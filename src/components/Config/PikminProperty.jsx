import { MarkerIcon } from '../MarkerIcon';
import React, { useContext } from 'react';
import { PikminColorEnum } from '../../api/types';
import { ConfigContext } from './ConfigContext';
import { ConfigInput } from './ConfigInput';

export const PikminProperty = () => {
    const { config, configData, selectedRow, setConfigData } = useContext(ConfigContext);
    const data = configData[config.name][selectedRow];

    // I think I should make a version of ConfigInput that has a <select> in since this is 
    // duplicated a couple times now
    const onChange = (newValue, key) => {
        setConfigData({
            ...configData,
            [config.name]: {
                ...configData[config.name],
                [selectedRow]: {
                    ...configData[config.name][selectedRow],
                    [key]: newValue
                }
            }
        });
    };

    return <div className='bg-sky-1200 w-full h-full p-8 flex flex-wrap flex-col'>
        <div className='py-2' htmlFor={"PikminColor"} data-tooltip-id={"PikminColor"}>
            <MarkerIcon type="onion" id="onyon" size="xs" tooltip="" />
            <b>PikminColor</b>:&nbsp;
            <select
                className="bg-sky-1000 rounded-md px-3 py-0.5 text-[#e0e6ed] border border-[#3a4a5a] focus:ring-2 focus:ring-[#4da6ff] transition"
                value={data.PikminColor}
                onChange={e => onChange(e.target.value, "PikminColor")}
            >
                {Object.entries(PikminColorEnum).map(([k, v]) =>
                    <option key={k} value={v}>{k}</option>
                )}
            </select>
        </div>
        <ConfigInput iconType="item" iconId="dashboots" value="LeafSpeed" type="number" />
        <ConfigInput iconType="item" iconId="dashboots" value="BudSpeed" type="number" />
        <ConfigInput iconType="item" iconId="dashboots" value="FlowerSpeed" type="number" />
        <ConfigInput iconType="item" iconId="hotextract" value="DopeSpeed" type="number" />
    </div>;
};