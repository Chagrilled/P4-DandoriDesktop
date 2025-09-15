import { MarkerIcon } from '../MarkerIcon';
import React, { useContext } from 'react';
import { ConfigContext } from './ConfigContext';
import { Tooltip } from 'react-tooltip';

export const ConfigInput = ({ iconType, iconId, value, type, tooltip }) => {
    const { config, configData, selectedRow, setConfigData } = useContext(ConfigContext);
    const data = configData[config.name][selectedRow];

    const onChange = (newValue) => {
        setConfigData({
            ...configData,
            [config.name]: {
                ...configData[config.name],
                [selectedRow]: {
                    ...configData[config.name][selectedRow],
                    [value]: parseFloat(newValue.target.value)
                }
            }
        });
    };

    return <div className='py-2' htmlFor={value} data-tooltip-id={value}>
        {tooltip ? <Tooltip id={value} place={"top"} noArrow={false}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {tooltip}
            </div>
        </Tooltip> : null}
        <MarkerIcon type={iconType} id={iconId} size="xs" />
        <b>{value}</b>:&nbsp;
        <input onChange={onChange} value={data[value]} type={type} className={"max-w-[7em] bg-sky-1000 rounded-md px-3 py-0.5 text-[#e0e6ed] border border-[#3a4a5a] focus:ring-2 focus:ring-[#4da6ff] transition"} />
    </div>;
};