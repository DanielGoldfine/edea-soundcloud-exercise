import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateCenterImgPos } from '../../store/actions/appActions';

import Player from 'react-soundcloud-player'

export default function TrackPlayer() {

    const dispatch = useDispatch();
    const currTrack = useSelector(state => state.appStore.currTrack);
    const imgWrapper = useRef()
    const [initialMount, setInitialMount] = useState(false)
    const [playerReset, setPlayerReset] = useState(false)
    const [currTrackId, setCurrTrackId] = useState('')

    useEffect(() => {
        if (!initialMount) {
            setTransisionParams()
            setInitialMount(true)
        };
        if (currTrack && !currTrackId) {
            setCurrTrackId(currTrack.id)
        };
        if (currTrack && currTrackId) {
            if (currTrack.id !== currTrackId) {
                console.log('change')
                setCurrTrackId(currTrack.id)
                setPlayerReset(true)
                setTimeout(() => {
                    setPlayerReset(false)
                }, 0)
            }
        }
    })

    const setTransisionParams = () => {
        const top = imgWrapper.current.offsetTop + (imgWrapper.current.clientHeight / 2)
        const left = imgWrapper.current.offsetLeft + (imgWrapper.current.clientWidth / 2)
        const params = {
            top,
            left
        }
        dispatch(updateCenterImgPos(params))
    }


    return (
        <main className="track-player-container flex column align-center justify-between">
            <div ref={imgWrapper} className="img-wrapper flex align-center justify-center">
                {!currTrack && <img src="./record-player.png" alt="" />}
                {currTrack && <img className="track-img" src={currTrack.artwork_url} alt="" />}
            </div>

            {currTrack && <h2>{currTrack.title}</h2>}
            {currTrack && <p>By: {currTrack.user.username}</p>}
            {currTrack && !playerReset && <Player
                client_id="ggX0UomnLs0VmW7qZnCzw"
                audio_id={currTrack.id.toString()}
                auto_play={true}
                title={currTrack.title}
            />}
        </main>
    );
};
