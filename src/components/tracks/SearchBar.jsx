import React from 'react';
import { useSelector } from 'react-redux';

import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SearchBar({ clearRecentSearch, handleChange, inputVal, submitSearch }) {

    const isLoading = useSelector(state => state.appStore.isLoading);

    return (
        <form className="seach-bar flex align-center justify-between" onSubmit={submitSearch}>

            <input className="search-input"
                type="text"
                placeholder="Play something"
                value={inputVal}
                onChange={handleChange}
                onFocus={clearRecentSearch} />
            <div className="search-btn-wrapper flex align-center justify-center">
                {!isLoading && <SearchIcon onClick={submitSearch} className="search-icn" />}
                {isLoading && <CircularProgress color="primary" className="search-icn" />}
            </div>

            <button hidden></button>
        </form>
    );
}