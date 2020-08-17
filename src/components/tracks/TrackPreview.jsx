import React, { useRef } from 'react';

export default function TrackPreview({ track, chooseTrack, titleLimit, currPlayingId, previewMode }) {

    const elImg = useRef();

    const imgUrl = track.artwork_url ? track.artwork_url : '../../assets/missing-image.jpg'

    const titleToDisplay = (track.title.length < titleLimit) ? track.title : track.title.slice(0, titleLimit) + '...';
    const titleClassName = currPlayingId !== track.id ? '' : 'highlight';

    const onChooseTrack = () => {
        const startTransitionsPos = {
            top: elImg.current.y,
            left: elImg.current.x,
        }
        chooseTrack(track.id, track.artwork_url, startTransitionsPos)
    }

    return (
            <section onClick={onChooseTrack} className="track-list-item flex align-center">

                <div className="img-wrapper">
                    <img ref={elImg} src={imgUrl} alt="" />
                </div>

                <div className="details flex column align-flex-start justify-between">
                    <h4 className={titleClassName}>{titleToDisplay}</h4>
                    <p>{track.user.username}</p>
                </div>
                
            </section>
    );
}