import React from 'react';

import RecentSearchPreview from './RecentSearchPreview'

export default function RecentSearchList({ searches, selectSearch }) {


    return (
        <section className="recent-search-list flex column">
            {searches.map((searchItem, idx) => <RecentSearchPreview key={idx} searchItem={searchItem} selectSearch={selectSearch}/>)}
        </section>
    );
};