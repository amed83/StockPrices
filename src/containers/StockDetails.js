import React,{Component} from 'react'


class StockDetails extends Component {
    render(){
        
        return(
            <div>   
                <h4>Stock Selected : </h4>
                {this.props.stockDetail.stock_name}    
            </div>
        )
    }
    
}




export default StockDetails