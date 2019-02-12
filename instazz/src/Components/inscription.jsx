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
                                  <label class="inp">
                                      <input name="Nom" required={true} type="text" class="inp" placeholder="&nbsp;" />
                                      <span class="label">Nom</span>
                                      <span class="border"></span>
                              </label>
                              <br></br>
                                  <label class="inp">
                                      <input name="Prenom" required={true} type="text" class="inp" placeholder="&nbsp;" />
                                      <span class="label">Prénom</span>
                                      <span class="border"></span>
                              </label>
                              <br></br>
                              <label class="inp">
                                  <input name="Mail" required={true} type="text" class="inp" placeholder="&nbsp;" />
                                  <span class="label">Mail</span>
                                  <span class="border"></span>
                              </label>
                              <br></br>
                              <label class="inp">
                                  <input name="Pseudo" required={true} type="text" class="inp" placeholder="&nbsp;" />
                                  <span class="label">Pseudo</span>
                                  <span class="border"></span>
                              </label>
                              <br></br>
                              <label class="inp">
                                  <input name="mdp" type="password" required={true} class="inp" placeholder="&nbsp;" />
                                  <span class="label">Mot de passe</span>
                                  <span class="border"></span>
                              </label>
                              <br></br>
                              <label class="inp">
                                  <input name="mdpConfirmation" type="password" required={true} class="inp" placeholder="&nbsp;" />
                                  <span class="label">Confirmation du mot de passe</span>
                                  <span class="border"></span>
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