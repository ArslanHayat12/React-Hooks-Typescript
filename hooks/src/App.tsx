import React, { Component } from 'react';
import Tweets from './components/Tweets';
import 'antd/dist/antd.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="container">
            <h1>Twitter Tweets</h1>
          </div>
        </header>
        <div className="container">
          <Tweets />
        </div>
      </div>
    );
  }
}

export default App;
