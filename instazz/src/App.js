import React, { Component } from 'react';
import './App.css';
import NavBarVisiteur from './Components/navBar.jsx'
import NavBarUtilisateur from './Components/navBarConnecte.jsx'



class App extends Component {

    constructor(props) {
        super(props);
        this.state = { user: false };
    }

    handleSignIn = () => {
        //test mdp
        this.setState({ user: true});
    }

    handleSignOut = () => {
        this.setState({ user: false });
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

    //pour savoir quel nav bar -> verification de la présence d'un token et de sa validité avec 1ère partie en base 64

    render() {
        let navBar;
        if (this.isConnected()) {
            console.log("navBarUtilisateur")
            navBar = <NavBarUtilisateur></NavBarUtilisateur>
        } else {
            console.log("navBarVisiteur")
            navBar = <NavBarVisiteur></NavBarVisiteur>
        }

      return (
      <div className="App">
              {navBar} 
      </div>
    );
  }
}

export default App;
