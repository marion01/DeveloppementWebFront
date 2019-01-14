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

    render() {
      const user = this.state.user;
      return (
      <div className="App">
          {user ? <NavBarUtilisateur handleSignOut={this.handleSignOut}></NavBarUtilisateur>
                      : <NavBarVisiteur handleSignIn={this.handleSignIn}></NavBarVisiteur>}
      </div>
    );
  }
}

export default App;
