
import React,{Component} from 'react'

import axios from 'axios'
import { connect } from 'react-redux';

import '../styles/stocksSearchBar.css'
import {selectStock} from '../actions/index'
import StockDetails from './StockDetails'
const apikey = 'EFJP0CTPI85RATLO'



class StocksSearchBar extends Component {
    constructor(props){
        super(props)        
        this.state={
            results:[''],
            input:'',
            showDetails:false
        }
    }
    
    handleSearch=e=>{
        const newInput=e.target.value
        this.setState((state,next)=>{
            return{...state,input:newInput}
        },()=> this.incrementalSearch() )
    }
    
    incrementalSearch= async()=>{
        const input = this.state.input
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${apikey}`
         await axios.get(url)
            .then(stocks=>{
                const results = stocks.data.bestMatches
                let listOfMatches=[]
                if(results){
                    results.map(stock=>{
                        const stockObj = {name:stock['2. name'],symbol:stock['1. symbol']}
                        listOfMatches.push(stockObj)
                    })    
                }
                this.setState((state)=>{
                    return{...state,results:listOfMatches}
                })
            })
    }
    stockSelected(index){
        if(index){
            this.props.selectStock(this.state.results[index])
            this.setState({
                showDetails:true
            })
        }        
    }
    
    render(){
        return(
            <div >
                <form>
                    <input value={this.state.input}
                        onChange={this.handleSearch}/>
                </form>
                <div className="resultsContainer">
                    { this.state.results && !this.state.showDetails &&
                        <ul className="matchesList">
                            {this.state.results.map((item,index)=>{
                                return(
                                    <li key={index} onClick={()=>this.stockSelected(index)}  > 
                                        {item.name}
                                    </li> 
                                )                         
                            })}
                        </ul>
                        
                    }
                    {
                        this.state.results.length<1 &&
                        <h4 style={messageStyle}>
                            "Sorry, no matches for this name"
                        </h4>
                    }
                    {
                        this.props.stockState.stock_name &&
                        <StockDetails stockDetail={this.props.stockState}/>
                    }
                    
                </div>
            </div>
        )
    }    
}

const messageStyle={
    color:'rgb(98, 101, 99)'
}

const  mapStateToProps=state=>{
    return {
        stockState:state.selectStock
    }
}





export default connect(mapStateToProps,{selectStock})(StocksSearchBar)
