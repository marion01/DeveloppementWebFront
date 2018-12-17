import React, { Component } from 'react';
import FormulaireInput from './formulaireInput.jsx'

export default class FormulaireInscription extends Component{

      handleSubmit=()=>{
            alert('connection en cours');
          }

      render() {
            return (
                  <div>
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
                        <button onClick={this.handleSubmit} type="button">Se connecter</button>  
                  </div>
            );
      }
 }