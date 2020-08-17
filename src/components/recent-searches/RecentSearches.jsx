import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, getRecentSearches, clearRecentSearches, updateReadRecentSearch, updateQuery, getTracks } from '../../store/actions/appActions';


import RecentSearchList from './RecentSearchList'

import DeleteIcon from '@material-ui/icons/Delete';

export default function RecentSearches() {

    const dispatch = useDispatch();
    const recentSearches = useSelector(state => state.appStore.recentSearches);
    const query = useSelector(state => state.appStore.query);

    useEffect(() => {
        dispatch(getRecentSearches())
    }, [])

    const selectSearch = async (searchVal) => {

        let newQuery = { ...query };
        newQuery.searchBy = searchVal;
        newQuery.offset = 0;

        dispatch(updateQuery(newQuery));
        dispatch(setIsLoading(true));
        await dispatch(getTracks(newQuery));
        dispatch(setIsLoading(false));
        dispatch(updateReadRecentSearch(true))
    };

    return (
        <main className="recent-searches-container">
            <div className="header flex align-center justify-center">
                <h3>Recent Searches</h3>
            </div>
            {recentSearches.length > 0 && <RecentSearchList searches={recentSearches} selectSearch={selectSearch} />}
            <div className={`delete-icn-wrapper flex align-center justify-flex-end ${recentSearches.length > 0 ? 'unmute' : 'mute'}`}>
                <DeleteIcon onClick={() => {dispatch(clearRecentSearches())}}/>
            </div>
        </main>
    );
};