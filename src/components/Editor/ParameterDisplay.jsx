import React from "react";
import { JsonTree } from 'react-editable-json-tree';
import { exposedGenVars } from "../../api/types";

const updateEntityData = (data, entityId, setEntityData, entityData) => {
    const param = exposedGenVars.find(param => data.Name.includes(`${param}_GEN_VARIABLE`));

    setEntityData({
        ...entityData,
        [entityId]: {
            ...entityData[entityId],
            [param]: data
        }
    });
};

const saveButton = <button>✅</button>;
const cancelButton = <button>❌</button>;
const inputElement = <input className="input input-bordered bg-sky-800" />;

export const ParameterDisplay = ({ entityData, entityId, setEntityData }) => {
    if (!entityData[entityId]) return;
    const entParams = entityData[entityId];

    return <div className='w-full h-full container grid auto-cols-auto overflow-scroll'>
        <div className="flex flex-wrap m-10">
            {Object.entries(entParams).map(([label, genVar]) => {
                return (
                    <div className="block max-w-m p-6 m-4 bg-sky-1000 rounded-lg shadow" key={label}>
                        <h5 className="mb-2 text-2xl text-white-100 font-bold tracking-tight">{label}</h5>
                        {/* <p class="font-normal text-white-200">My big fat parameters go here.</p>; */}
                        <JsonTree
                            data={genVar}
                            isCollapsed={(keyPath, deep) => deep > 4}
                            onFullyUpdate={data => updateEntityData(data, entityId, setEntityData, entityData)}
                            minusMenuElement={<></>}
                            editButtonElement={saveButton}
                            cancelButtonElement={cancelButton}
                            inputElement={inputElement}
                        />
                    </div>);
            })}
        </div>
        {/* generate cards */}
    </div>;
};