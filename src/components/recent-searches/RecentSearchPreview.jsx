import React from 'react';

export default function RecentSearchPreview({ searchItem, selectSearch }) {

    return (
        <div className="recent-search-preview">
            <button onClick={() => { selectSearch(searchItem) }}>{searchItem}</button>
        </div>
    );
};