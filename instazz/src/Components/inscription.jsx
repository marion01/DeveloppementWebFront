import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default class FormulaireInscription extends Component{

      handleSubmit=()=>{
            alert('Votre inscription a bien été prise en compte');
          }

      render() {
          return (
              <div>
                  <div className="App-ban">
                      <h1>Inscription</h1>
                  </div>
                  <div className="App-corps-card">
                      <Paper className="App-paper" elevation={1}>
                              <div className="App-text-title">
                              <label className="inp">
                                      <input name="Nom" required={true} type="text" className="inp" placeholder="&nbsp;" />
                                      <span className="label">Nom</span>
                                      <span className="border"></span>
                              </label>
                              <br></br>
                              <label className="inp">
                                      <input name="Prenom" required={true} type="text" className="inp" placeholder="&nbsp;" />
                                  <span className="label">Prénom</span>
                                  <span className="border"></span>
                              </label>
                              <br></br>
                              <label className="inp">
                                  <input name="Mail" required={true} type="text" className="inp" placeholder="&nbsp;" />
                                  <span className="label">Mail</span>
                                  <span className="border"></span>
                              </label>
                              <br></br>
                              <label className="inp">
                                  <input name="Pseudo" required={true} type="text" className="inp" placeholder="&nbsp;" />
                                  <span className="label">Pseudo</span>
                                  <span className="border"></span>
                              </label>
                              <br></br>
                              <label className="inp">
                                  <input name="mdp" type="password" required={true} className="inp" placeholder="&nbsp;" />
                                  <span className="label">Mot de passe</span>
                                  <span className="border"></span>
                              </label>
                              <br></br>
                              <label className="inp">
                                  <input name="mdpConfirmation" type="password" required={true} className="inp" placeholder="&nbsp;" />
                                  <span className="label">Confirmation du mot de passe</span>
                                  <span className="border"></span>
                              </label>
                              </div>
                                  <Typography component="p">
                                      <br></br>
                                      <button onClick={this.handleSubmit} type="button" className="App-button">S'inscrire</button>
                                  </Typography>
                          </Paper>
                    </div>
                  </div>
            );
      }
 }