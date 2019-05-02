import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import {selectTimeOption} from '../actions/index'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

class MenuListComposition extends React.Component {
  state = {
    open: false,
    label:''
  };

  chooseOption = (key)=>{

    this.props.selectTimeOption(key)
    this.setState(state => ({ open: !state.open,label:key }));
  }
    
  handleToggle = () => { 
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const timeOptions = ['Daily','Weekly','Monthly']
    const list = timeOptions.map((option,key)=>{
        return(
            <MenuItem key={key} onClick={()=>this.chooseOption(option)} >
                {option}
            </MenuItem>
        )
    })
    
    
    return (
      <div className={classes.root}>
    
        <div>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            {this.state.label ? this.state.label :'Time Options'}
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  
                    <MenuList>
                        {list}
                    </MenuList>
                 
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps=state=>{
    return {
        timeOption:state.selectTimeOption
    }
}


export default connect (mapStateToProps,{selectTimeOption})(withStyles(styles)(MenuListComposition));
