import soundCloudService from '../../services/soundCloudService.js'
import localstorageService from '../../services/localstorageService.js'


export function setIsLoading(status) {
    return (dispatch) => {
        dispatch({ type: 'SET-IS-LOADING', status });
    };
}

export function updateCenterImgPos(params) {
    return (dispatch) => {
        dispatch({ type: 'UPDATE-CENTER-IMG-POS', params });
    };
}

export function updateQuery(updatedQuery) {
    return (dispatch) => {
        dispatch({ type: 'UPDATE-QUERY', updatedQuery });
        return Promise.resolve();
    };
}

export function clearTracks() {
    return (dispatch) => {
        dispatch({ type: 'CLEAR-TRACKS' });
        return Promise.resolve();
    };
}

export function setCurrTrack(trackToSet) {
    return (dispatch) => {
        dispatch({ type: 'SET-CURR-TRACK', trackToSet });
        return Promise.resolve();
    };
}

export function clearCurrTrack() {
    return (dispatch) => {
        dispatch({ type: 'CLEAR-CURR-TRACK' });
        return Promise.resolve();
    };
}

export function getRecentSearches() {
    return (dispatch) => {
        const searches = localstorageService.loadFromStorage('user-searches')
        if (!searches) return;
        dispatch({ type: 'UPDATE-RECENT_SEARCHES', searches });
        return Promise.resolve(searches);
    };
}

export function updateRecentSearches(searches) {
    return (dispatch) => {
        if (searches.length > 5) searches.pop();
        localstorageService.saveToStorage('user-searches', searches);
        dispatch({ type: 'UPDATE-RECENT_SEARCHES', searches });
        return Promise.resolve();
    };
}

export function clearRecentSearches() {
    return (dispatch) => {
        localstorageService.saveToStorage('user-searches', []);
        dispatch({ type: 'CLEAR-RECENT-SEARCHES' });
        return Promise.resolve();
    };
}

export function updateReadRecentSearch(val) {
    return (dispatch) => {
        dispatch({ type: 'UPDATE-IS-RECENT-SEARCH', val });
        return Promise.resolve();
    };
}

// async actions


export function getTracks(query) {

    return async dispatch => {
        try {
            const data = await soundCloudService.getTracks(query);
            dispatch(_setTracks(data));
        }
        catch (err) {
            console.log('Could not retrieve Soundcloud data:', err)
        }
    }
}


// Action Creators

function _setTracks(data) {
    return {
        type: 'SET-TRACKS',
        data
    }
}