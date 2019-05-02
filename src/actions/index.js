import axios from 'axios'
// @flow

import {
    SELECT_STOCK,
    CREATE_DATASET,
    SELECT_TIME_OPTION
}from './types'

const apikey:number = 'EFJP0CTPI85RATLO'


const availableTimes = {
    Daily:{function:"function=TIME_SERIES_DAILY",response:"Time Series (Daily)"},
    Weekly:{function:"function=TIME_SERIES_WEEKLY",response:"Time Series (Weekly)"},
    Monthly:{function:"function=TIME_SERIES_MONTHLY",response:"Time Series (Monthly)"},
}


export const selectStock=(stock)=>{
    return ((dispatch,getState) =>{
        const timing = getState().selectTimeOption.option
        const timeFunction  = availableTimes[`${timing}`].function
        const responseData=  availableTimes[`${timing}`].response
        dispatch({type:SELECT_STOCK,
            payload:stock})
        const stockSymbol= stock.symbol
        dispatch(createDataSet(stockSymbol,timeFunction,responseData))
    })   
}

export const createDataSet =(stockSymbol,timeFunction,responseData)=>{
    return dispatch=>{
        return axios.get(`https://www.alphavantage.co/query?${timeFunction}&symbol=${stockSymbol}&apikey=${apikey}`)   
            .then(response=>{
                
                if(!response.data[`${responseData}`]){
                    return
                }
                const arrData = Object.values(response.data[`${responseData}`]).splice(0,5)  
                // console.log('arrData ',arrData)
                const stockDetails = []
                
                arrData.forEach((el,key)=> {
                    const dates = Object.keys(response.data[`${responseData}`]).splice(key,1)
                    stockDetails.push({stock_close:el["4. close"],date:dates[0]})
                })
                return stockDetails    
            })
            .then(stockDetails=>{
                dispatch({
                    type:CREATE_DATASET,
                    payload:stockDetails
                })
                 
            })    
    }
}


export const selectTimeOption = (option)=>{
        return ((dispatch,getState)=>{
            dispatch({
                type:SELECT_TIME_OPTION,
                payload:option
            })
            const stockSymbol= getState().selectStock.stock_symbol
            const timeFunction  = availableTimes[`${option}`].function
            const responseData=  availableTimes[`${option}`].response
            dispatch(createDataSet(stockSymbol,timeFunction,responseData))
        })
    
}
    
    
    
      

