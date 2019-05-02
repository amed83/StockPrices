import React,{Component} from 'react'
import Button from '@material-ui/core/Button';
import StocksSearchBar from './StocksSearchBar'
import { connect } from 'react-redux';
import {selectStock} from '../actions/index'
import StockDetails from './StockDetails'

class DashboardContainer extends Component {

    render(){
        return(
            <div style={mainContainer}>
                <div style={searchContainer}>
                    <StocksSearchBar/>
                </div>
                {
                    this.props.stockState.stock_name &&
                    <StockDetails
                    stockDetail={this.props.stockState}/>
                }
            </div>
        )
    }
    
}

const searchContainer={
    
    position:'absolute',
    top:'0',
    left:'0',
    width:'22rem'
}

const mainContainer={
    position:'relative'
}


const mapStateToProps=state=>{
    return {
        stockState:state.selectStock
    }
}

export default connect(mapStateToProps,{selectStock})(DashboardContainer)
