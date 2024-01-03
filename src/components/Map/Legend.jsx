import React from 'react';
// const FilterCategory = ({ category, filter, onFilterChange }) => {
//     const filterOptions = category.markers.map(markerType => {
//         const isChecked = !!filter && !!filter[markerType];

//         return <label key={markerType} className="FilterCategory__option">
//             <MarkerIcon type={markerType} />
//             <input
//                 type='checkbox'
//                 checked={isChecked}
//                 onChange={() => onFilterChange?.({ [markerType]: !isChecked })}
//             />
//         </label>
//     });

//     return <div className="FilterCategory__container">
//         <h3>{category.label}</h3>
//         <div className="FilterCategory__options">
//             {filterOptions}
//         </div>
//     </div>;
// };

export const Legend = (props) => {
    // const filterCategories = Categories.map(cat => <FilterCategory category={cat} {...props} />)

    return <div className="Legend__container">
        <p>Stuff can go here later. I haven't worked out non-teki files yet.</p>
    </div>;
};
