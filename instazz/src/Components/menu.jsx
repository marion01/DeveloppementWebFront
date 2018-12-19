import React, { Component } from 'react';
import logo from '../asset/logo.png'
import FormulaireInscription from './inscription.jsx'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Connexion from './connexion.jsx'

const PageInscription = () => <FormulaireInscription></FormulaireInscription>;
const PageConnexion = () => <Connexion></Connexion>;

export default class Menu extends Component{
  handleClick=()=>{
    alert('I am alert, nice to meet you');
  }

  render() {
      return <div className="App-corps">
              <img src={logo}  alt="logo" />
              <p>Essayez InstaZZ</p> 
              <Link to="/inscription/"><button type="button">S'inscrire</button></Link> 
              <Link to="/connexion/"><button type="button">Se connecter</button> </Link>

              <Route path="/inscription/" exact component={PageInscription}/>
              <Route path="/connexion/" exact component={PageConnexion}/>
            </div>
      }
 }