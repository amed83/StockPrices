import React,{Component} from 'react'
import Button from '@material-ui/core/Button';
import StocksSearchBar from './StocksSearchBar'

class DashboardContainer extends Component {

    render(){
        return(
            <div>
                <Button> Check Stocks </Button>
                <StocksSearchBar/>
                
            </div>
        )
    }
    
}

export default DashboardContainer