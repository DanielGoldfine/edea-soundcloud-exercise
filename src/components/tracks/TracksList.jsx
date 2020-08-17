import React from 'react';

import TrackPreview from './TrackPreview'

export default function TracksList({ tracks, chooseTrack, previewMode, currPlayingId }) {

    const titleLimit = previewMode === 'list' ? 60 : 75;

    return (
        <section className={`tracks-list ${previewMode}`}>
            {tracks.map(track => <TrackPreview
                key={track.id}
                chooseTrack={chooseTrack}
                track={track}
                currPlayingId={currPlayingId}
                titleLimit={titleLimit}
                previewMode={previewMode}
            />)}
        </section>
    );
}