import { combineReducers } from 'redux'
import auth from './auth'
import loading from './loading'

export const rootReducer = combineReducers({ auth, loading })
