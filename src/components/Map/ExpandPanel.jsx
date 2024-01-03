import React, { useState } from "react";

export const ExpandPanel = ({ label, children, addDrop, isActorSpawner }) => {
    const [expanded, setExpanded] = useState(true);

    return <div className="ExpandPanel__container">
        <h2 className="text-xl font-bold inline-flex my-4 ExpandPanel__label">
            <button className="bg-neutral-50 hover:bg-neutral-200 px-2 mr-2 text-black" onClick={() => setExpanded(prev => !prev)}>
                {expanded ? '-' : '+'}
            </button>
            {label}
            {!isActorSpawner && <svg onClick={addDrop} className="ml-1 w-6 h-6 hover:text-green-400 self-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>}

        </h2>
        {
            expanded && <div className="ExpandPanel__content">
                {children}
            </div>
        }
    </div>;
};
