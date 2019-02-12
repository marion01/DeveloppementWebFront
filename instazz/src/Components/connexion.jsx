import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default class FormulaireInscription extends Component{
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    render() {
          return (
           <div>
                <div className="App-ban">
                    <h1>Connexion</h1>
                </div>
                  <div className="App-corps-card">
                      <Paper className="App-paper" elevation={1}>
                          <div className="App-text-title">
                                  <label className="inp">
                                  <input name="Pseudo" required={true} type="text" className="inp" placeholder="&nbsp;"/>
                                  <span className="label">Pseudo</span>
                                  <span className="border"></span>
                                  </label>
                              <label className="inp">
                                  <input name="mdp" type="password" required={true} className="inp" placeholder="&nbsp;"/>
                                  <span className="label">Mot de passe</span>
                                  <span className="border"></span>
                                  </label>
                          </div>
                          <Typography component="p">
                              <br></br>
                              <button onClick={this.props.handleSignIn} type="button" className="App-button">Se connecter</button>
                          </Typography>
                      </Paper>
                    </div>
           </div>

            );
      }
 }