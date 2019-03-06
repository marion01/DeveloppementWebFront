import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/*
 * Component to handle inscription page
 */
class Inscription extends Component {

    // Variables for this component
    state = {
        // Indications for the password
        CheckPwdDefault: "Doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère sprécial et faire minimum 8 caractères",
        // Indications for the pseudo
        CheckPseudoDefault: "Doit contenir des chiffres ou des lettres et faire entre 4 et 20 caractères",
        // Number of pseudo found
        NbPseudosFound: 1,
        // If the dialog to prevent successfull inscription must be display
        openDialog: false
    };

    /*
     * Check that password is set and corresponds to expected format
     * Return true if the password is correct and false otherwise
     */
    CheckMdp() {
        // Get the input password and its value
        var mdpInput = document.getElementById('mdp');
        var mdp = mdpInput.value;

        // Get the password label and the one for indications
        var checkLabel = document.getElementById('check-mdp');
        var mdpLabel = document.getElementById('label-mdp');

        // Password not set
        if (mdp.length === 0) {
            // Error label and change color to red
            checkLabel.innerHTML = "Veuillez entrer un mot de passe";
            checkLabel.className = "check-wrong";
            mdpInput.style.borderColor = mdpLabel.style.color = "red";

        } else {

            // Password corresponds to the expected format
            if (mdp.match("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-+!*$@%#;:&=_])") && mdp.length >= 8) {
                // Dismiss error label and change color to green
                checkLabel.innerHTML = "";
                mdpInput.style.borderColor = mdpLabel.style.color = "limegreen";
                return true;

                // Password does not correspond to the expected format
            } else {
                //Error label and change color to red
                checkLabel.innerHTML = "Doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et faire minimum 8 caractères";
                checkLabel.className = "check-wrong";
                mdpInput.style.borderColor = mdpLabel.style.color = "red";
            }
        }
        return false;
    }

    /*
     * Check that the second password is the same as the first one
     * Return true if the second password is correct and false otherwise
     * 
     */
    CheckMdpBis() {
        // Get the first password value
        var mdp = document.getElementById('mdp').value;

        // Get the input of the second password and its value
        var mdpInput = document.getElementById('mdp-bis');
        var mdpBis = mdpInput.value;

        // Get the password label and the one for indications
        var checkLabel = document.getElementById('check-mdp-bis');
        var mdpLabel = document.getElementById('label-mdp-bis');

        // If second password not set
        if (mdpBis.length === 0) {
            // Error label and change color to red
            checkLabel.innerHTML = "Veuillez re-entrer votre mot de passe";
            checkLabel.className = "check-wrong";
            mdpInput.style.borderColor = mdpLabel.style.color = "red";

        } else {

            // If second password is the same as the first one
            if (mdp === mdpBis) {
                // Dismiss error label and change color to green
                checkLabel.innerHTML = "";
                mdpInput.style.borderColor = mdpLabel.style.color = "limegreen";
                return true;

                // If second password is not the same as the first one
            } else {
                // Error label and change color to red
                checkLabel.innerHTML = "Les mots de passe ne sont pas identiques";
                checkLabel.className = "check-wrong";
                mdpInput.style.borderColor = mdpLabel.style.color = "red";
            }
        }
        return false;
    }

    /*
     * Check that an input is set to not null value
     * Return true if an input has been set and false otherwise
     */
    CheckInputText(id, name) {
        // Get the input text and its value
        var input = document.getElementById(id);
        var value = input.value;

        // Get the text label and the one for indications
        var checkLabel = document.getElementById("check-" + id);
        var label = document.getElementById("label-" + id);

        // If text not set
        if (value.length === 0) {
            // Error label and change color to red
            checkLabel.innerHTML = "Veuillez entrer votre " + name;
            checkLabel.className = "check-wrong";
            input.style.borderColor = label.style.color = "red";

            // If text set
        } else {
            // Dismiss error label and change color to green
            checkLabel.innerHTML = "";
            input.style.borderColor = label.style.color = "limegreen";
            return true;
        }
        return false;
    }

    /*
     * Check that mail input has a correct format
     * Return true if it's correct and false otherwise
     */
    CheckMail() {
        // Get input mail and its value
        var mailInput = document.getElementById('mail');
        var mail = mailInput.value;

        // Get the mail label and the one for indications
        var checkLabel = document.getElementById('check-mail');
        var mailLabel = document.getElementById('label-mail');

        // If mail empty
        if (mail.length === 0) {
            // Error label and change color to red
            checkLabel.innerHTML = "Veuillez entrer une adresse email";
            checkLabel.className = "check-wrong";
            mailInput.style.borderColor = mailLabel.style.color = "red";

        } else {

            // If mail has a correct format
            if (mail.match("^[a-z0-9._-]+@[a-z0-9_.-]+\\.[a-z]{2,4}$")) {
                // Dismiss error label and change color to green
                checkLabel.innerHTML = "";
                mailInput.style.borderColor = mailLabel.style.color = "limegreen";
                return true;

                // If mail has not a correct format
            } else {
                // Error label and change color to red
                checkLabel.innerHTML = "Email invalide";
                checkLabel.className = "check-wrong";
                mailInput.style.borderColor = mailLabel.style.color = "red";
            }
        }
        return false;
    }

    /*
     * Get the number of pseudo corresponding to a specific pseudo
     * Check that pseudo specified is not already taken
     * Return the number of pseudos
     */
    async getNbPseudo(pseudo) {
        try {
            // Url for the call
            var url = localStorage.getItem("baseRoute") + 'searchPseudo/' + pseudo;

            // Empty header
            let headers = new Headers();

            // Parameters for the call
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*');

            // Call API and get result
            await axios.get(url, { headers: headers })
                .then((res) => {
                    var numberOfPseudos = res.data.doc;
                    this.setState({ NbPseudosFound: numberOfPseudos });
                })
        } catch (err) {
            console.log(err);
        }
    }

    /*
     * Check that the input pseudo has a correct format
     * Return true if the pseudo has a correct format and false otherwise
     */
    CheckPseudo = async () => {
        // Get the pseudo input and its value
        var pseudoInput = document.getElementById('pseudo');
        let pseudo = pseudoInput.value;

        // Get the pseudo label and the one for indications
        var checkLabel = document.getElementById('check-pseudo');
        var pseudoLabel = document.getElementById('label-pseudo');

        // If pseudo is empty
        if (pseudo.length === 0) {
            // Error label and change color to red
            checkLabel.innerHTML = "Veuillez entrer un pseudo";
            checkLabel.className = "check-wrong";
            pseudoInput.style.borderColor = pseudoLabel.style.color = "red";

        } else {

            // If pseudo has a correct format
            if (pseudo.match("^[a-z0-9A-Z]{4,15}$")) {
                // Check pseudo has not been already taken
                await this.getNbPseudo(pseudo);

                // If pseudo already taken
                if (this.state.NbPseudosFound !== 0) {
                    // Error label and change color to red
                    checkLabel.innerHTML = "Ce pseudo est déjà pris";
                    checkLabel.className = "check-wrong";
                    pseudoInput.style.borderColor = pseudoLabel.style.color = "red";

                    // If pseudo not already taken
                } else {
                    // Dismiss error label and change color to green
                    checkLabel.innerHTML = "";
                    pseudoInput.style.borderColor = pseudoLabel.style.color = "limegreen";
                    return true;
                }

                // If pseudo has not a correct format
            } else {
                // Error label and change color to red
                checkLabel.innerHTML = "Doit contenir des chiffres ou des lettres et faire entre 4 et 20 caractères";
                checkLabel.className = "check-wrong";
                pseudoInput.style.borderColor = pseudoLabel.style.color = "red";
            }
        }
        return false;
    }


    /*
     * Check validity of all input and creat a new user
     */
    handleSubmit = async () => {
        try {
            // Check pseudo validity
            var checkPseudo = await this.CheckPseudo();

            // If input are all correct
            if (this.CheckInputText("last-name", "nom") & this.CheckInputText("first-name", "prénom")
                & this.CheckMail() & checkPseudo & this.CheckMdp() & this.CheckMdpBis()) {

                // Get input values
                var nom = document.getElementById('last-name').value;
                var prenom = document.getElementById('first-name').value;
                var mail = document.getElementById('mail').value;
                var pseudo = document.getElementById('pseudo').value;
                var mdp = document.getElementById('mdp').value;

                // Body of the call
                var body = {
                    nom: nom,
                    prenom: prenom,
                    pseudo: pseudo,
                    mdp: mdp,
                    mail: mail
                }

                // Url of the call
                var url = localStorage.getItem("baseRoute") + 'utilisateurs/'

                // Empty header
                let headers = new Headers();

                // Parameters for the call
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/json');
                headers.append('Access-Control-Allow-Origin', '*');

                // Call API and get results
                axios.post(url, body, {
                    headers: headers
                }).then((res) => {
                    if (res.data.success) {
                        this.setState({ openDialog: true });
                    }
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    /*
     * Handle close dialog for succeed inscription
     */
    Close = () => {
        // Go back to Home page
        this.props.history.push("/");
    };

    /*
     * Display the component
     */
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
                                <input type="text" id="last-name" className="inp" placeholder="&nbsp;" onChange={(id, name) => this.CheckInputText("last-name", "nom")} />
                                <span className="label" id="label-last-name">Nom</span>
                                <span className="border"></span>
                            </label>
                            <br></br>
                            <label className="check-default" id="check-last-name"></label>
                            <br></br>
                            <label className="inp">
                                <input type="text" id="first-name" className="inp" placeholder="&nbsp;" onChange={(id, name) => this.CheckInputText("first-name", "prénom")} />
                                <span className="label" id="label-first-name">Prénom</span>
                                <span className="border"></span>
                            </label>
                            <br></br>
                            <label className="check-default" id="check-first-name"></label>
                            <br></br>
                            <label className="inp">
                                <input type="text" id="mail" className="inp" placeholder="&nbsp;" onChange={this.CheckMail} />
                                <span className="label" id="label-mail">Mail</span>
                                <span className="border"></span>
                            </label>
                            <br></br>
                            <label className="check-default" id="check-mail"></label>
                            <br></br>
                            <label className="inp">
                                <input type="text" id="pseudo" className="inp" placeholder="&nbsp;" onChange={this.CheckPseudo} />
                                <span className="label" id="label-pseudo">Pseudo</span>
                                <span className="border"></span>
                            </label>
                            <br></br>
                            <label className="check-default" id="check-pseudo">{this.state.CheckPseudoDefault}</label>
                            <br></br>
                            <label className="inp">
                                <input name="mdp" type="password" id="mdp" className="inp" placeholder="&nbsp;" onChange={this.CheckMdp} />
                                <span className="label" id="label-mdp">Mot de passe</span>
                                <span className="border"></span>
                            </label>
                            <br></br>
                            <label className="check-default" id="check-mdp">{this.state.CheckPwdDefault}</label>
                            <br></br>
                            <label className="inp">
                                <input name="mdpConfirmation" type="password" id="mdp-bis" className="inp" placeholder="&nbsp;" onChange={this.CheckMdpBis} />
                                <span className="label" id="label-mdp-bis">Confirmation du mot de passe</span>
                                <span className="border"></span>
                            </label>
                            <br></br>
                            <label className="check-default" id="check-mdp-bis"></label>
                            <br></br>
                        </div>
                        <Typography component="p">
                            <button onClick={this.handleSubmit} type="button" className="App-button">S'inscrire</button>
                        </Typography>
                    </Paper>

                    <Dialog open={this.state.openDialog} onClose={this.Close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Inscription"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Votre inscription a bien été prise en compte. Vous allez être redirigé vers l'accueil. Vous pourrez alors vous connecter.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.Close} color="primary" autoFocus>
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default withRouter(Inscription);