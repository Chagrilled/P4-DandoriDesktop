import { MarkerIcon } from '../../MarkerIcon';
import React, { useContext } from 'react';
import { ConfigContext } from '../ConfigContext';
import { Tooltip } from 'react-tooltip';

export const ConfigSelect = ({ iconType, iconId, value, tooltip, optionEnum, customReducer, nested }) => {
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
                            [value]: newValue.target.value
                        },
                    } : {
                        [value]: newValue.target.value
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
        <select
            className="bg-sky-1000 rounded-md px-3 py-0.5 text-[#e0e6ed] border border-[#3a4a5a] focus:ring-2 focus:ring-[#4da6ff] transition"
            value={data[value]}
            onChange={defaultOnChange}
        >
            {Object.entries(optionEnum).map(([k, v]) =>
                <option key={k} value={v}>{k}</option>
            )}
        </select>
    </div>;
};