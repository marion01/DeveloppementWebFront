import React, { Component } from 'react';
import './App.css';
import NavBarVisiteur from './Components/navBar.jsx'
import NavBarUtilisateur from './Components/navBarConnecte.jsx'

class App extends Component {
    handleConnexion = () => {
        console.log("handle connexion");
        this.forceUpdate()
    }

    handleDeconnexion = () => {
        console.log("handle deconnexion");
        localStorage.removeItem('token');
        localStorage.removeItem('pseudo');
        localStorage.removeItem('id');
        this.forceUpdate()
    }

    isConnected = () => {
        let token = localStorage.getItem("token")
        console.log("isConnected ");
        //si un token est stocké
        if (token != null) {
            let tokenDecoded = atob(token.split(".")[1])
            let tokenJSON = JSON.parse(tokenDecoded);
            if (tokenJSON.exp < Date.now() / 1000) {
                console.log("token invalide")
                localStorage.removeItem('token');
                return false;
            } else {
                console.log("token valide")
                var pseudo = tokenJSON.data.pseudo;
                localStorage.setItem("pseudo", pseudo);
                var id = tokenJSON.data.id;
                localStorage.setItem("id", id);
                return true
            }
        }
        return false
    } 

    render() {      
        var selectRender = () => {
            if (this.isConnected()) {
                return <NavBarUtilisateur handleDeconnexion={this.handleDeconnexion}></NavBarUtilisateur>
            } else {
                return <NavBarVisiteur handleConnexion={this.handleConnexion}></NavBarVisiteur>
            }
        }
      return (
      <div>
              {selectRender()} 
      </div>
    );
  }
}

export default App;
