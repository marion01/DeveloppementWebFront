import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Menu from './menu.jsx'
import logo from '../asset/logo.png'

const Inscription = () => <h2>Inscription</h2>;
const Connexion = () => <h2>Connexion</h2>;
const Contact = () => <h2>Contact</h2>;
const Menu2 = () => <Menu></Menu>;

function NavBar () {
    return (
        <div>
            <Router>
                <div className="App-hearder">
                    <nav>
                        <ul>
                            <li><Link to="/"><img src={logo}  alt="logo" height="50"/></Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/inscription/">S'inscrire</Link></li>
                            <li><Link to="/connexion/">Se connecter</Link></li>
                            <li><Link to="/contact/">Contact</Link></li>
                        </ul>
                    </nav>
                    <Route path="/" exact component={Menu2}/>
                    <Route path="/inscription/" component={Inscription}/>
                    <Route path="/connexion/" component={Connexion}/>
                    <Route path="/contact/" component={Contact}/>
                </div>
            </Router>
        </div>
    );
}

export default NavBar;




/*export default class NavBar extends 
  render() {
      return <div>
              <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Contact</a></li>
            </ul> 
            </div>
      }
 }
*/
