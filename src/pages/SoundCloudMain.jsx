import React from 'react';

import TracksDashboard from '../components/tracks/TracksDashboard';
import TrackPlayer from '../components/track-player/TrackPlayer';
import RecentSearches from '../components/recent-searches/RecentSearches';

export default function FunctionComponent() {

    return (
        <main className="soundcloud-main-container">
            <section className="grid-container">
                <TracksDashboard />
                <TrackPlayer />
                <RecentSearches />
            </section>
        </main>
    )
}
