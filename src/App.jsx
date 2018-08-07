import React, { Component } from 'react';
import './App.css';
import './js/components/Buttons.css';
import Header from './js/components/Header.jsx';
import UnamoApp from './js/components/UnamoApp.jsx';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <UnamoApp />
      </div>
    );
  }
}

export default App;
