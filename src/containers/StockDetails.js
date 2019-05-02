import React,{Component} from 'react'
import StockChart from './StockChart'
import { connect } from 'react-redux';
import {createDataset} from '../actions/index'


class StockDetails extends Component {
    render(){
        let stocks= []
        if(this.props.stockDetails.stocks_data){
            this.props.stockDetails.stocks_data.map(stock=>{
                stocks.push(stock.stock_close)
            })
        }
        return(
            <div>   
                <h4>Stock Selected : </h4>
                {this.props.stockDetail.stock_name} 
                {stocks}
                <StockChart data={stocks}/>   
            </div>
        )
    }
    
}


const mapStateToProps=state=>{
    return{
        stockDetails:state.createDataset
    }
}

export default connect(mapStateToProps)(StockChart)