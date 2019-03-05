import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import selectStock from './selectStock'

const rootReducer = combineReducers({
    selectStock
})



export default rootReducer