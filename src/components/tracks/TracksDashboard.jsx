import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setIsLoading, getTracks, updateQuery, clearTracks, setCurrTrack, updateReadRecentSearch, updateRecentSearches } from '../../store/actions/appActions';

import localStorageService from '../../services/localstorageService.js'

import TracksList from './TracksList';
import ListControllers from './ListControllers';
import SearchBar from './SearchBar';

export default function TracksDashboard() {

    const dispatch = useDispatch();
    const tracks = useSelector(state => state.appStore.tracks);
    const currTrack = useSelector(state => state.appStore.currTrack);
    const query = useSelector(state => state.appStore.query);
    const recentSearches = useSelector(state => state.appStore.recentSearches);
    const readRecentSearch = useSelector(state => state.appStore.readRecentSearch);
    const centerImgPos = useSelector(state => state.appStore.centerImgPos);

    const [inputVal, setInputVal] = useState('');
    const [previewMode, setPreviewMode] = useState('list');
    const [imgTransition, setImgTransition] = useState(null);

    useEffect(() => {
        const userPreviewMode = localStorageService.loadFromStorage('user-preview-mode')
        if (userPreviewMode) setPreviewMode(userPreviewMode)
    }, [])

    useEffect(() => {
        if (readRecentSearch) setInputVal(query.searchBy)
    })

    const clearRecentSearch = () => {
        dispatch(updateReadRecentSearch(false));
    }

    const handleChange = (e) => {
        const input = e.target.value;
        setInputVal(input);
    };

    const submitSearch = async (e) => {
        e.preventDefault();

        let newQuery = { ...query };
        newQuery.searchBy = inputVal;
        newQuery.offset = 0;

        if (inputVal.trim() === '') {
            dispatch(clearTracks())
            newQuery.offset = 0
            dispatch(updateQuery(newQuery));
            return
        };

        dispatch(updateQuery(newQuery));
        dispatch(setIsLoading(true));
        await dispatch(getTracks(newQuery));
        dispatch(setIsLoading(false));

        const matchingSearches = recentSearches.filter(searchItem => searchItem === inputVal)

        if (matchingSearches.length > 0) return;

        let newRecentSearches = [...recentSearches];
        newRecentSearches.unshift(inputVal);
        dispatch(updateRecentSearches(newRecentSearches));
    };

    const changePage = async (changeTo) => {

        if (tracks.length === 0) return;

        let newPage;
        if (changeTo === 'next') {
            newPage = query.offset + query.tracksPerPage
        } else {
            if (query.offset === 0) return
            newPage = query.offset - query.tracksPerPage
        };

        let newQuery = { ...query };
        newQuery.offset = newPage;

        dispatch(updateQuery(newQuery));

        dispatch(setIsLoading(true));
        await dispatch(getTracks(newQuery));
        dispatch(setIsLoading(false));
    };

    const changePreviewMode = (mode) => {
        setPreviewMode(mode)
        localStorageService.saveToStorage('user-preview-mode', mode)
    };

    const chooseTrack = (trackId, imgUrl, startTransitionPos) => {

        if (currTrack) {
            if (trackId === currTrack.id) return
        }
        
        let transitionParams = {
            imgUrl,
            opacity: 1,
            startTransitionPos
        }
        setImgTransition(transitionParams)
        console.log(transitionParams)
        setTimeout(() => {
            transitionParams = {
                imgUrl,
                opacity: 0,
                startTransitionPos: centerImgPos
            }
            setImgTransition(transitionParams)
        }, 0)
        setTimeout(() => {
            setImgTransition(null)
            const trackIdx = tracks.findIndex(track => track.id === trackId);
            dispatch(setCurrTrack(tracks[trackIdx]))
        }, 500)
    };

    return (
        <main>
            <section className="tracks-dashboard-container">
                <SearchBar inputVal={inputVal}
                    handleChange={handleChange}
                    clearRecentSearch={clearRecentSearch}
                    submitSearch={submitSearch} />

                <section className="tracks-list-container">
                    {tracks.length > 0 && <TracksList tracks={tracks}
                        currPlayingId={currTrack ? currTrack.id : ''}
                        chooseTrack={chooseTrack}
                        previewMode={previewMode}
                    />}
                </section>

                <ListControllers
                    changePage={changePage}
                    changePreviewMode={changePreviewMode}
                    offset={query.offset}
                    previewMode={previewMode}
                    tracks={tracks}
                />
            </section>
            {imgTransition &&
                <div style={{
                    top: imgTransition.startTransitionPos.top,
                    left: imgTransition.startTransitionPos.left,
                }} className="img-transition">
                    <img style={{opacity: imgTransition.opacity}} className={previewMode} src={imgTransition.imgUrl} alt="" />
                </div>
            }
        </main>
    );
};