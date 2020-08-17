const initialState = {
    isLoading: false,
    centerImgPos: null,
    query: {
        searchBy: '',
        tracksPerPage: 6,
        offset: 0
    },
    tracks: [],
    recentSearches: [],
    readRecentSearch: false,
    currTrack: null
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET-IS-LOADING':
            return {
                ...state,
                isLoading: action.status
            }
        case 'UPDATE-CENTER-IMG-POS':
            return {
                ...state,
                centerImgPos: action.params
            }
        case 'UPDATE-QUERY':
            return {
                ...state,
                query: { ...action.updatedQuery }
            }
        case 'SET-TRACKS':
            return {
                ...state,
                tracks: [...action.data]
            }
        case 'CLEAR-TRACKS':
            return {
                ...state,
                tracks: []
            }
        case 'UPDATE-RECENT_SEARCHES':
            return {
                ...state,
                recentSearches: [...action.searches]
            }
        case 'CLEAR-RECENT-SEARCHES':
            return {
                ...state,
                recentSearches: []
            }
        case 'CLEAR-CURR-TRACK':
            return {
                ...state,
                currTrack: null
            }
        case 'SET-CURR-TRACK':
            return {
                ...state,
                currTrack: { ...action.trackToSet }
            }
        case 'UPDATE-IS-RECENT-SEARCH':
            return {
                ...state,
                readRecentSearch: action.val
            }
        default:
            return state;
    }
}