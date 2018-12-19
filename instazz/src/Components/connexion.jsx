import React, { Component } from 'react';
import FormulaireInput from './formulaireInput.jsx'
import App from './../App.js'

export default class FormulaireInscription extends Component{
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }


      render() {
            return (
                <div className="App-corps">
                        <h1>Connexion</h1>
                        <from>
                              <FormulaireInput name="Pseudo" required={true}/>
                              <br></br>
                              <br></br>
                              <FormulaireInput name="Mot de passe" required={true}/>
                        </from> 
                        <br></br>  
                        <br></br>  
                        <br></br>
                    <button onClick={this.props.handleSignIn} type="button">Se connecter</button>  
                  </div>
            );
      }
 }