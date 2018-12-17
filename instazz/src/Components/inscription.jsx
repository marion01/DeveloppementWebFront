import React, { Component } from 'react';
import FormulaireInput from './formulaireInput.jsx'

export default class FormulaireInscription extends Component{

      handleSubmit=()=>{
            alert('Votre inscription a bien été prise en compte');
          }

      render() {
            return (
                  <div>
                        <h1>Inscription</h1>
                        <from>
                              <FormulaireInput name="Prenom" required={true}/>
                              <br></br>
                              <FormulaireInput name="Nom" required={true}/>
                              <br></br>
                              <FormulaireInput name="Mail" required={true}/>
                              <br></br>
                              <FormulaireInput name="Pseudo" required={true}/>
                              <br></br>
                              <FormulaireInput name="Mot de passe" required={true}/>
                              <br></br>
                              <FormulaireInput name="Confirmation de mot de passe" required={true}/>
                        </from> 
                        <br></br>  
                        <br></br>  
                        <button onClick={this.handleSubmit} type="button">S'inscrire</button>  
                  </div>
            );
      }
 }