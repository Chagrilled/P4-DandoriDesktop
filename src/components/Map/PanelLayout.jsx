import * as React from 'react';

const Panel = ({ auto, children, width = "20%" }) => {
    return children
        ? <div className={`${auto ? 'w-auto' : ''} w-20 h-full flex flex-initial flex-col`} style={{ minWidth: auto ? 0 : width }}>{children}</div>
        : null;
};

// panelAuto is solely for the config editor because only the right panel needs to be auto 
export const PanelLayout = ({ leftPanel, rightPanel, children, width, invert, panelAuto }) => {
    const panel = <Panel auto={panelAuto}>{rightPanel}</Panel>;
    const middle = <div className="h-full min-w-[20rem] bg-black flex-auto">{children}</div>;

    return <div className="flex h-full w-full">
        <Panel auto={true} width={width}>{leftPanel}</Panel>
        {invert ? panel : middle}
        {invert ? middle : panel}
    </div>;
};