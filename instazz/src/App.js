import React, { Component } from 'react';
import './App.css';
import NavBarVisiteur from './Components/navBar.jsx'
import NavBarUtilisateur from './Components/navBarConnecte.jsx'
import axios from 'axios';



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
            //console.log(tokenJSON);
            var pseudo = tokenJSON.data.name;
            localStorage.setItem("pseudo", pseudo);
            //recover id of user and save it in local storage
            var url = 'http://localhost:5000/api/v1/utilisateurs/getIdFromPseudo/' + pseudo
            axios.get(url)
                .then((res) => {
                    var user = res.data;
                    localStorage.setItem("id", user.doc._id);
                })
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
