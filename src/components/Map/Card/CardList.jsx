import React from "react";

export const CardList = ({ children }) => {
    return <div className="flex flex-col CardList__container">
        {children}
    </div>;
};