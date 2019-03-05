import{
    SELECT_STOCK
} from '../actions/types'


const initialState={
    stock_name:'',
    stock_symbol:''
}

const selectStock = (state=initialState,action)=>{
    switch(action.type){
        case SELECT_STOCK:
        return {...state,
            stock_name:action.payload.name,
            stock_symbol:action.payload.symbol
        }
        default:
        return state;
    }
}

export default selectStock