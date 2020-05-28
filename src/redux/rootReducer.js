import {combineReducers} from 'redux'
import wlReducer from './WatchList/wlReducer'

const rootReducer = combineReducers({wl:wlReducer})

export default rootReducer