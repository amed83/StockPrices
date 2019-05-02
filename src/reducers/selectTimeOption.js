import{
    SELECT_TIME_OPTION
} from '../actions/types'

const initialState = {
    option:'Daily'
}


const selectTimeOption = (state=initialState,action)=>{
    switch(action.type){
        case SELECT_TIME_OPTION:
        return {...state,
            option:action.payload
        }
        default:
        return state;
    }
}

export default selectTimeOption