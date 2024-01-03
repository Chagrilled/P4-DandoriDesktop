import React, { useState } from "react";

export const Tab = (_props) => null;

const TabBarTab = ({ label, isSelected, onSelect }) => {
    return <div
        className={`ps-4 pe-4 hover:bg-slate-800`}
        style={{ 'borderBottom': isSelected ? '4px inset rgb(136, 67, 168)' : '', 'paddingBlock': '0.25rem' }}
        onClick={onSelect}
    >
        <span className="Tab__label">{label}</span>
    </div>;
};

export const Tabs = ({ children }) => {
    const [selectedId, setSelectedId] = useState();
    const selectedTab = children.find(tab => tab.props.id === selectedId) || children[0];

    const tabs = children.map(tab => {
        const onSelect = () => setSelectedId(tab.props.id);
        const isSelected = selectedTab === tab;
        const props = { ...tab.props, onSelect, isSelected };
        return <TabBarTab {...props} key={props.id} />;
    });

    return <div className="flex flex-col overflow-hidden flex-nowrap ps-4 pe-4 flex-auto w-full Tabs__container">
        <div className="flex flex-0 flex-nowrap items-center p-1 justify-center gap-2 Tabs__tab-bar">
            {tabs}
        </div>
        <div className="flex-auto p-1 overflow-auto Tabs__tab-content">
            {selectedTab.props.children}
        </div>
    </div>;
};
