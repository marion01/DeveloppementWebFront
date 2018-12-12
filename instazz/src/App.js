import React, { Component } from 'react';
import './App.css';
import Menu from './Components/menu.jsx'
import Button from './Components/button.jsx'
import NavBar from './Components/navBar.jsx'
import logo from './asset/logo.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <body>
          <NavBar></NavBar>
        </body>
      </div>
    );
  }
}

export default App;
