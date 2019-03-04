import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ErrorMessage from './errorMessage'

/*
 * Component to handle connexion page
 */
class Connexion extends Component {

    // Variable for this component
    state = {
        // Infos for the error messages
        infoMessage: {
            // If error message must be displayed
            open: false,
            // Type of error
            type: '',
            // Message of the error
            message: '',
            // Handle close error
            handleClose: this.handleCloseMessage
        }
    }

    /*
     * Update error message
     */
    updateInfoMessage = (open, type, message) => {
        // Change the error info to display it
        this.setState({
            infoMessage: {
                open: open,
                type: type,
                message: message,
                handleClose: this.handleCloseMessage
            },
        });
    }

    /*
     * Handle when the error message is closed
     */
    handleCloseMessage = (event, reason) => {
        // Dismiss it
        if (reason === 'clickaway') {
            return;
        }
        this.updateInfoMessage(false, 'error', '');
    };

    /*
     * Handle the connexion of a user
     */
    connexion = () => {
        // Delete previous error
        if (this.state.infoMessage.open === "open") {
            this.handleCloseMessage();
        }

        // Get input user infos
        let pseudo = document.getElementById('pseudo').value
        let mdp = document.getElementById('MotDePasse').value

        // Set the body of the call
        let body = {
            pseudo: pseudo,
            password: mdp
        }

        // The url of the call
        let url = 'http://localhost:5000/api/v1/login'

        // Call the API
        axios.post(url, body)
            .then((res) => {

                // Successfull
                if (res.data.success) {

                    // Set token
                    localStorage.setItem("token", res.data.token);

                    // Go back to Home page
                    this.props.history.push("/")

                    // Handle connection to change navBar
                    this.props.handleConnexion();

                } else {
                    // Display error message
                    this.updateInfoMessage(true, "error", "mot de passe ou login incorrect")
                }
            })
            .catch((err) => {
                console.log(err.response)
                this.updateInfoMessage(true, "error", "mot de passe ou login incorrect")
            })
    }

    /*
     * Display component
     */
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