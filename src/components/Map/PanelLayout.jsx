import * as React from 'react';

const Panel = ({ auto, children, width = "20%" }) => {
    return children
        ? <div className={`${auto ? 'w-auto' : ''} w-20 h-full flex flex-initial flex-col`} style={{ minWidth: auto ? 0 : width }}>{children}</div>
        : null;
};

export const PanelLayout = ({ leftPanel, rightPanel, children, width }) => {
    return <div className="flex h-full w-full">
        <Panel auto={true} width={width}>{leftPanel}</Panel>
        <div className="h-full min-w-[20rem] bg-black flex-auto">{children}</div>
        <Panel>{rightPanel}</Panel>
    </div>;
};