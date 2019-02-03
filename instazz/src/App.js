import React, { Component } from 'react';
import './App.css';
import NavBarVisiteur from './Components/navBar.jsx'
import NavBarUtilisateur from './Components/navBarConnecte.jsx'



class App extends Component {

    handleConnexion = () => {
        console.log("handle connexion");
        this.forceUpdate()
    }

    isConnected = () => {
        let token = localStorage.getItem("token")
        //si un token est stocké
        if (token != null) {
            let tokenDecoded = atob(token.split(".")[1])
            console.log(tokenDecoded)
            return true
        }
        return false
    } 

    render() {
        let navBar;
        if (this.isConnected()) {
            console.log("navBarUtilisateur")
            navBar = <NavBarUtilisateur handleConnexion={this.handleConnexion}></NavBarUtilisateur>
        } else {
            console.log("navBarVisiteur")
            navBar = <NavBarVisiteur handleConnexion={this.handleConnexion}></NavBarVisiteur>
        }

      return (
      <div className="App">
              {navBar} 
      </div>
    );
  }
}

export default App;
