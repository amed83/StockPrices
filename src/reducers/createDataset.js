import{
    CREATE_DATASET
} from '../actions/types'


const initialState={
    stocks_data:''
}

const createDataset = (state=initialState,action)=>{
        switch(action.type){
            case CREATE_DATASET:
            return{...state,
                stocks_data:action.payload
            }
            default:
            return state
        }
}


export default createDataset