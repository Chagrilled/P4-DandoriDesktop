import { MarkerIcon } from '../../MarkerIcon';
import React, { useContext } from 'react';
import { ConfigContext } from '../ConfigContext';
import { Tooltip } from 'react-tooltip';

export const ConfigInput = ({ iconType, iconId, value, type, tooltip, customReducer, nested }) => {
    const { config, configData, selectedRow, setConfigData } = useContext(ConfigContext);
    let data = configData[config.name][selectedRow];
    if (nested) data = data[nested];

    const defaultOnChange = (newValue) => {
        setConfigData({
            ...configData,
            [config.name]: {
                ...configData[config.name],
                [selectedRow]: {
                    ...configData[config.name][selectedRow],
                    ...(nested ? {
                        [nested]: {
                            ...configData[config.name][selectedRow][nested],
                            [value]: type === 'checkbox' ? newValue.target.checked : type === 'number' ? parseFloat(newValue.target.value) : newValue.target.value
                        },
                    } : {
                        [value]: type === 'checkbox' ? newValue.target.checked : type === 'number' ? parseFloat(newValue.target.value) : newValue.target.value
                    }),
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
        <input onChange={defaultOnChange} checked={data[value]} value={data[value]} type={type} className={"max-w-[7em] bg-sky-1000 rounded-md px-3 py-0.5 text-[#e0e6ed] border border-[#3a4a5a] focus:ring-2 focus:ring-[#4da6ff] transition"} />
    </div>;
};