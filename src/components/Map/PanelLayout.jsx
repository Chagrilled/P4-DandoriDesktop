import * as React from 'react';

const Panel = ({ children, width = "20%" }) => {
    return children
        ? <div className={`w-20 h-full flex flex-initial flex-col`} style={{ minWidth: width }}>{children}</div>
        : null;
};

export const PanelLayout = ({ leftPanel, rightPanel, children, width }) => {
    return <div className="flex h-full w-full">
        <Panel width={width}>{leftPanel}</Panel>
        <div className="h-full min-w-[20rem] bg-black flex-auto">{children}</div>
        <Panel>{rightPanel}</Panel>
    </div>;
};