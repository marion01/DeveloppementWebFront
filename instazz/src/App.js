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
            let tokenJSON = JSON.parse(tokenDecoded);
            console.log(tokenJSON);
            var pseudo = tokenJSON.data.pseudo;
            localStorage.setItem("pseudo", pseudo);
            var id = tokenJSON.data.id;
            localStorage.setItem("id", id);
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
      <div>
              {navBar} 
      </div>
    );
  }
}

export default App;
