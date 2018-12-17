import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Menu from './menu.jsx'
import FormulaireInscription from './inscription.jsx'
import Connexion from './connexion.jsx'
import logo from '../asset/logo.png'

const PageInscription = () => <FormulaireInscription></FormulaireInscription>;
const PageConnexion = () => <Connexion></Connexion>;
const PageContact = () => <h2>Contact</h2>;
const PageMenu = () => <Menu></Menu>;

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
                    <Route path="/" exact component={PageMenu}/>
                    <Route path="/inscription/" component={PageInscription}/>
                    <Route path="/connexion/" component={PageConnexion}/>
                    <Route path="/contact/" component={PageContact}/>
                </div>
            </Router>
        </div>
    );
}

export default NavBar;
