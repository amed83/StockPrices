import React,{Component} from 'react'
import {XYPlot, XAxis, YAxis, VerticalGridLines, 
    HorizontalGridLines, LineSeries} from 'react-vis';
import {timeFormatDefaultLocale} from 'd3-time-format';

import { connect } from 'react-redux';
import {selectTimeOption} from '../actions/index'
import '../styles/stockChart.css'
import * as moment from 'moment'
import TimeDropdwon from './TimeDropdown'

class StockChart extends Component {
    
    state={
        stocksPrices:'',
        showDropdown:false
    }
    
    componentDidUpdate(prevProps){
        let stocks;
        if(this.props.stockDetails.stocks_data){
            console.log('props on component' , this.props)
            //when more than one day data is showed
            if(this.props.stockDetails.stocks_data.length>1){
                stocks = this.props.stockDetails.stocks_data.map((d,index)=>{
                    let dateinSeconds = new Date(moment(d.date).toString()).getTime()
                    return {x: dateinSeconds, y:Number(d.stock_close)}
                }).sort((a,b)=>{
                    return a.x - b.x
                })

            }
            if(!stocks){
                stocks=this.props.stockDetails.stocks_data
            }
            if(prevProps.stockDetails.stocks_data !== this.props.stockDetails.stocks_data){
                const stockMax= Math.max.apply(Math, stocks.map(function(o) { return o.y; }));
                const stockMin= Math.min.apply(Math, stocks.map(function(o) { return o.y; }));
                this.setState(prevState=>({
                    stockPrices:stocks,
                    showDropDown:true,
                    stockMax,
                    stockMin
                    
                }))
                
            }
            
            // xRange={[domainStart]}
        }
        
    }
    
    render(){
        const stocks = this.state.stockPrices
        console.log('render props ', stocks)
        return(
            <div className="main-container">
            {this.state.showDropDown ? <TimeDropdwon className="menu-items"/>: ''}
        
                <XYPlot
                    xType={'time'}
                    width={850}    
                    height={500}
                    xType="time"
                    yDomain={[this.state.stockMin-2,this.state.stockMax+1]}
                    >
                    <VerticalGridLines top={15}/>
                    <HorizontalGridLines width={830} />
                    <XAxis
                        tickTotal={5}/>
                    <YAxis/>
                    <LineSeries
                        data={stocks} />
                </XYPlot>
            </div>
        )
    }
    
}

// 
// var domainStart = stocks[0].x
// var domainEnd= stocks[4].x
// tickTotal={1}
const mapStateToProps =state =>{
    return{
        timeOption:state.selectTimeOption
    }
}

export default connect(mapStateToProps,{selectTimeOption}) (StockChart)



