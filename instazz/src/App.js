import React, { Component } from 'react';
import './App.css';
import NavBarVisiteur from './Components/navBar.jsx'
import NavBarUtilisateur from './Components/navBarConnecte.jsx'

/*
 * Component to handle App
 */
class App extends Component {

    /*
     * Refresh component on connection
     */
    handleConnexion = () => {
        this.forceUpdate()
    }

    /*
     * Handle deconnection
     */
    handleDeconnexion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('pseudo');
        localStorage.removeItem('id');
        this.forceUpdate()
    }

    /*
   * Set up parameters before displaying the component
   */
    componentDidMount() {
        localStorage.setItem("baseRoute", "https://instazz-api.herokuapp.com/api/v1/");
    }

    /*
     * Handle component when user is connected
     */
    isConnected = () => {
        let token = localStorage.getItem("token")

        // If there is a token
        if (token != null) {
            let tokenDecoded = atob(token.split(".")[1])
            let tokenJSON = JSON.parse(tokenDecoded);
            if (tokenJSON.exp < Date.now() / 1000) {
                localStorage.removeItem('token');
                return false;
            } else {
                var pseudo = tokenJSON.data.pseudo;
                localStorage.setItem("pseudo", pseudo);
                var id = tokenJSON.data.id;
                localStorage.setItem("id", id);
                return true
            }
        }
        return false
    }

    /*
     * Display the component
     */
    render() {

        // Set content
        let navBar;
        if (this.isConnected()) {
            navBar = <NavBarUtilisateur handleDeconnexion={this.handleDeconnexion}></NavBarUtilisateur>
        } else {
            navBar = <NavBarVisiteur handleConnexion={this.handleConnexion}></NavBarVisiteur>
        }

        // Return the component
        return (
            <div>
                {navBar}
            </div>
        );
    }
}

export default App;
