import React, { Component } from 'react';
import './App.css';
import DashboardContainer from './containers/DashboardContainer'


class App extends Component {
  render() {
    return (
      <div className="App">
            <h4>Stock App</h4>
            <DashboardContainer/>
      </div>
    );
  }
}

export default App;
