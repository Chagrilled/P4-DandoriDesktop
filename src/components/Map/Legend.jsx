import React from 'react';
import { Legends, InfoType } from '../../api/types';
import { capitalise } from '../../utils';
import { MarkerIcon } from '../Icon';

const FilterCategory = ({ category, filter, onFilterChange }) => {
    const isChecked = !!filter && !!filter[category];
    const imgProps = {
        [InfoType.Creature]: { type: 'creature' },
        [InfoType.Treasure]: { type: 'treasure' },
        [InfoType.Gimmick]: { type: 'gimmick', id: 'circulator' },
        [InfoType.Object]: { type: 'object', id: 'piecepick' },
        [InfoType.WorkObject]: { type: 'workobject', id: 'downwall' },
        [InfoType.Pikmin]: { type: 'pikmin', id: 'pikminred' },
        [InfoType.Base]: { type: 'base', id: 'onyoncamp' },
        [InfoType.Onion]: { type: 'onion', id: 'onyoncarryred' },
        [InfoType.Hazard]: { type: 'hazard', id: 'charcoal' },
        [InfoType.Portal]: { type: 'portal', id: 'madoriruins' },
        [InfoType.Item]: { type: 'item', id: 'bomb' }
    };

    return <div className="pt-1 FilterCategory__container">
        <div className="flex flex-wrap items-center FilterCategory__options" onClick={() => onFilterChange?.({ [category]: !isChecked })}>
            <MarkerIcon {...imgProps[category]} card={true} />
            <h3 className="pr-4">{capitalise(category)}</h3>
            <label key={category} className="flex items-center FilterCategory__option">
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={() => onFilterChange?.({ [category]: !isChecked })}
                />
            </label>
        </div>
    </div>;
};

export const Legend = (props) => {
    const filterCategories = Legends.map(cat => <FilterCategory key={cat} category={cat} {...props} />);

    return <div className="w-100 Legend__container">
        {filterCategories}
    </div>;
};
