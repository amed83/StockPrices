import axios from 'axios'

import {
    SELECT_STOCK,
    CREATE_DATASET
}from './types'

const apikey = 'EFJP0CTPI85RATLO'

export const selectStock=(stock)=>{
    return dispatch =>{
        dispatch({type:SELECT_STOCK,
            payload:stock})
    const stockSymbol= stock.symbol
    return  axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apikey}`)   
        .then(response=>{
            console.log('response ', response)
            const arrData = Object.values(response.data["Time Series (Daily)"]).splice(0,10)  
            const dataSet = []
            arrData.forEach((el,key)=> {
                const dates = Object.keys(response.data["Time Series (Daily)"]).splice(key,1)
                dataSet.push({stock_close:el["4. close"],date:dates[0]})
            })
            dispatch({
                type:CREATE_DATASET,
                payload:dataSet
            })
        })    
    }
    
    
}
