import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ErrorMessage from './errorMessage'

/**
 * Component to handle connexion page
 */
class Connexion extends Component{
    state = {
        infoMessage: {
            open: false,
            type: '',
            message: '',
            handleClose: this.handleCloseMessage
        }
    }

    //update error message
    updateInfoMessage = (open, type, message) => {
        this.setState({
            infoMessage: {
                open: open,
                type: type,
                message: message,
                handleClose: this.handleCloseMessage
            },
        });
    }

    //handle when the error message is closed
    handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.updateInfoMessage(false, 'error', '');
    };

    //handle the connexion of a user
    connexion = () => {

        //delete  previous error
        if (this.state.infoMessage.open === "open") {
            this.handleCloseMessage();
        }

        //gerer le cas de vide
        let pseudo = document.getElementById('pseudo').value
        let mdp = document.getElementById('MotDePasse').value

        let body = {
            pseudo: pseudo,
            password: mdp
        }

        let url = 'http://localhost:5000/api/v1/login'
        axios.post(url, body)
        .then((res) => {
            if (res.data.success) {
                console.log("post login");
                localStorage.setItem("token", res.data.token);
                //redirection vers home
                this.props.history.push("/")
                //change navbar in app.js
                this.props.handleConnexion();                
                console.log("connection réussie")
            } else {
                //afficher message erreur
                console.log("erreur de connection")
                this.updateInfoMessage(true, "error", "mot de passe ou login incorrect")
            }
        })
        .catch((err) => {
            console.log(err.response)
            this.updateInfoMessage(true, "error", "mot de passe ou login incorrect")
        })
    }

    ComponentDidUpdate() {
        console.log("app.js")
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
                                  <input id="pseudo" required={true} type="text" className="inp" placeholder="&nbsp;" />
                                  <span className="label">Pseudo</span>
                                  <span className="border"></span>
                              </label>
                              <label className="inp">
                                  <input id="MotDePasse" type="password" required={true} className="inp" placeholder="&nbsp;" />
                                  <span className="label">Mot de passe</span>
                                  <span className="border"></span>
                              </label>
                          </div>
                          <Typography component="p">
                              <br></br>
                              <button onClick={this.connexion} type="button" className="App-button">Se connecter</button>
                          </Typography>
                      </Paper>
                      <ErrorMessage attributes={this.state.infoMessage} />
                  </div>
              </div>

          );
      }
}

export default withRouter(Connexion)