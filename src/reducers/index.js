import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import selectStock from './selectStock'
import createDataset from './createDataset'
import selectTimeOption from './selectTimeOption'

const rootReducer = combineReducers({
    selectStock,
    createDataset,
    selectTimeOption
})



export default rootReducer