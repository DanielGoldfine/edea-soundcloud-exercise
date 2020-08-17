import {combineReducers} from 'redux';
import appReducer from './appReducer'

const rootReducer = combineReducers({
    appStore: appReducer
    // Additional reducers can be added like so:
    // appStore: appReducer,
    // appReducer2: appReducer2
})

export default rootReducer;