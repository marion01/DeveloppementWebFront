import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router";
import ErrorMessage from './errorMessage'

/*
 * Component to handle post element
 */
class Profil extends Component {

    // Variables of the component
    state = {
        // User pseudo
        pseudo: '',
        // First letter of the pseudo
        premiereLettrePseudo: '',
        // First name
        prenom: '',
        // Last name
        nom: '',
        // mail
        mail: '',
        // Default indication for password
        checkPwdDefault: "Doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et faire minimum 8 caractères",
        // If the different dialog box must be opened
        openDialogAlert: false,
        openDialogConfirm: false,
        openDialogModif: false,
        openDialogModifPwd: false,
        // Parameters for error message
        infoMessage: {
            open: false,
            type: '',
            message: '',
            handleClose: this.handleCloseMessage
        }
    };

    /*
     * Set up parameters before displaying the component
     */
    componentDidMount() {
        this.GetUserInformations();
    }

    /*
     * Get user informations by its id
     */
    GetUserInformations = async () => {
        try {
            // Get id
            let id = localStorage.getItem("id");

            // Get token
            const access_token = localStorage.getItem("token");

            // Utl to call
            let url = 'http://localhost:5000/api/v1/utilisateurs/' + id

            // Options for the call
            const options = {
                method: "get",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };

            // Call API and get results
            let res = (await axios(options)).data.doc;

            // Set up results
            this.setState({ nom: res.nom });
            this.setState({ prenom: res.prenom });
            this.setState({ mail: res.mail });
            var pseudo = res.pseudo
            this.setState({ pseudo: pseudo });
            this.setState({ premiereLettrePseudo: pseudo.charAt(0).toUpperCase() });

        } catch (err) {
            console.log(err);
        }
    }

    /*
     * Delete an user by its id
     */
    SupprimerUtilisateur = async () => {
        try {
            // Get Id
            let id = localStorage.getItem("id");

            // Get token
            const access_token = localStorage.getItem("token");

            // The url for the call
            let url = 'http://localhost:5000/api/v1/utilisateurs/' + id

            // Options for the call
            const options = {
                method: "delete",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };

            // Call API and get results
            await axios(options);
        } catch (err) {
            console.log(err);
        }
    }

    /*
     * Open alert dialog for desincription prevent 
     */
    OpenAlert = () => {
        this.setState({ openDialogAlert: true });
    };

    /*
     * Close alert dialog for desincription prevent 
     */
    CloseDialogAlert = () => {
        this.setState({ openDialogAlert: false });
    };

    /*
     * Handle a desincription
     */
    Desinscription = () => {
        this.setState({ openDialogAlert: false });
        this.setState({ openDialogConfirm: true });      
    }

    /*
     * Handle when a user confirm to want to delete its account
     */
    CloseDialogConfirm = () => {
        this.setState({ openDialogConfirm: false });
        this.SupprimerUtilisateur();
        localStorage.clear();
        localStorage.removeItem('token');
        this.props.history.push("/");
        window.location.reload();
    };

    /*
     * Check the password of user is not empty
     */
    CheckMdpOnChange(name) {
        // Get input password and its value
        var mdpInput = document.getElementById(name);
        var mdp = mdpInput.value;

        // Get password label and error label
        var checkLabel = document.getElementById('check-' + name);
        var mdpLabel = document.getElementById('label-' + name);

        // If empty password
        if (mdp.length === 0) {
            // Error label and change color to red
            checkLabel.innerHTML = "Veuillez entrer votre mot de passe pour confirmer";
            checkLabel.className = "check-wrong";
            mdpInput.style.borderColor = mdpLabel.style.color = "red";
        }
    }

    /*
     * Check that a password input is correct
     * Return true if it's the right password and false otherwise
     */
    CheckMdpValidity = async (name) => {
        // Get input password and its value
        var mdpInput = document.getElementById(name);
        var mdp = mdpInput.value;

        // Get password label and error label
        var checkLabel = document.getElementById('check-' + name);
        var mdpLabel = document.getElementById('label-' + name);

        // If password input is empty
        if (mdp.length === 0) {
            // Error label and change color to red
            checkLabel.innerHTML = "Veuillez entrer votre mot de passe pour confirmer";
            checkLabel.className = "check-wrong";
            mdpInput.style.borderColor = mdpLabel.style.color = "red";
        } else {

            // Body for the call
            let body = {
                pseudo: this.state.pseudo,
                password: mdp
            }

            // Get token
            const access_token = localStorage.getItem("token");

            // Url for the call
            let url = 'http://localhost:5000/api/v1/utilisateurs/getPasswordValidity/'

            // Options for the call
            const options = {
                method: "post",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url,
                data: body
            };

            // Call API and get results
            let res = await axios(options);

            // If successfull
            if (res.data.success) {
                return true;

                // If error
            } else {
                // Error label and change color to red
                checkLabel.innerHTML = "Mot de passe incorrect";
                checkLabel.className = "check-wrong";
                mdpInput.style.borderColor = mdpLabel.style.color = "red";
            }
        }
        return false;
    }

    /*
     * Check that an input text not empty
     * Return true if not empty and false otherwise
     */
    CheckInputText(id, name) {
        // Get input text and its value
        var input = document.getElementById(id);
        var value = input.value;

        // Get text label and error label
        var checkLabel = document.getElementById("check-" + id);
        var label = document.getElementById("label-" + id);

        // It text empty
        if (value.length === 0) {
            // Error label and change color to red
            checkLabel.innerHTML = "Veuillez entrer votre " + name;
            checkLabel.className = "check-wrong";
            input.style.borderColor = label.style.color = "red";

            // If not empty
        } else {
            // Dismiss error label and change color to green
            checkLabel.innerHTML = "";
            input.style.borderColor = label.style.color = "limegreen";
            return true;
        }
        return false;
    }

    /*
     * Check tha mail input has a correct format
     * Return true if mail is correct and false otherwise
     */
    CheckMail() {
        // Get mail input and its value
        var mailInput = document.getElementById('mail');
        var mail = mailInput.value;

        // Get mail label and error label
        var checkLabel = document.getElementById('check-mail');
        var mailLabel = document.getElementById('label-mail');

        // If mail empty
        if (mail.length === 0) {
            // Error label and change color to red
            checkLabel.innerHTML = "Veuillez entrer une adresse email";
            checkLabel.className = "check-wrong";
            mailInput.style.borderColor = mailLabel.style.color = "red";
        } else {

            // If mail format is correct
            if (mail.match("^[a-z0-9._-]+@[a-z0-9_.-]+\\.[a-z]{2,4}$")) {
                // Dismiss error label and change color to green
                checkLabel.innerHTML = "";
                mailInput.style.borderColor = mailLabel.style.color = "limegreen";
                return true;

                // If mail format is not correct
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
     * Update informations of user
     */
    ValidateModif = async () => {
        try {
            // Check password validity
            var checkMdp = await this.CheckMdpValidity('mdp');

            // Check inputs validities
            if (this.CheckInputText("last-name", "nom") & this.CheckInputText("first-name", "prénom")
                & this.CheckMail() & checkMdp) {

                // Get input values
                var nom = document.getElementById('last-name').value;
                var prenom = document.getElementById('first-name').value;
                var mail = document.getElementById('mail').value;
                var mdp = document.getElementById('mdp').value;

                // Set up values
                this.setState({ nom: nom });
                this.setState({ prenom: prenom });
                this.setState({ mail: mail });

                // Body of the call
                var body = {
                    id: localStorage.getItem("id"),
                    nom: nom,
                    prenom: prenom,
                    pseudo: this.state.pseudo,
                    mdp: mdp,
                    mail: mail
                }

                // Get token
                const access_token = localStorage.getItem("token");

                // Url of the call
                let url = 'http://localhost:5000/api/v1/utilisateurs/'

                // Options of the call
                const options = {
                    method: "put",
                    headers: {
                        Authorization: access_token,
                        "Content-Type": "application/json"
                    },
                    url: url,
                    data: body
                };

                // Call API and get results
                let res = await axios(options);

                // Successfull
                if (res.data.success) {
                    this.setState({ openDialogModif: false });
                    this.render();
                    this.setState({
                        infoMessage: {
                            open: true,
                            type: "success",
                            message: "Vos informations personnelles ont bien été modifiées.",
                            handleClose: this.handleCloseMessage
                        },
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    /*
     * Check the new password validity
     * Return true if it is valid and false otherwise
     */
    CheckMdpNewOnChange() {
        // Get old password value
        var mdp = document.getElementById('mdp-old').value;

        // Get new password input and its value
        var mdpInput = document.getElementById('mdp-new');
        var mdpNew = mdpInput.value;

        // Get new password label and error label
        var checkLabel = document.getElementById('check-mdp-new');
        var mdpLabel = document.getElementById('label-mdp-new');

        // If new password empty
        if (mdpNew.length === 0) {
            // Error label and set color to red
            checkLabel.innerHTML = "Veuillez entrer un nouveau mot de passe";
            checkLabel.className = "check-wrong";
            mdpInput.style.borderColor = mdpLabel.style.color = "red";

        } else {

            // If new password is the same as the old one
            if (mdp === mdpNew) {
                // Error label and set color to red
                checkLabel.innerHTML = "Les mots de passe sont identiques";
                checkLabel.className = "check-wrong";
                mdpInput.style.borderColor = mdpLabel.style.color = "red";

            } else {
                // If new password has a correct format
                if (mdpNew.match("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-+!*$@%#;:&=_])") && mdpNew.length >= 8) {
                    // Dismiss error label and change color to green
                    checkLabel.innerHTML = "";
                    mdpInput.style.borderColor = mdpLabel.style.color = "limegreen";
                    return true;

                    // If new password format is not correct
                } else {
                    // Error label and set color to red
                    checkLabel.innerHTML = "Doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et faire minimum 8 caractères";
                    checkLabel.className = "check-wrong";
                    mdpInput.style.borderColor = mdpLabel.style.color = "red";
                }
            }
        }
        return false;
    }

    /*
     * Close dialog of user informations modification
     */
    CloseModif = () => {
        this.setState({ openDialogModif: false });
    };

    /*
     * Open dialog of user informations modification
     */
    OpenModifDialog = () => {
        this.setState({ openDialogModif: true });
    };

    /*
     * Update error message
     */
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

    /*
     * Handle when the error message is closed
     */
    handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.updateInfoMessage(false, 'error', '');
    };

    /*
     * Open dialog box for password modification
     */
    OpenModifPwdDialog = () => {
        this.setState({ openDialogModifPwd: true });
    };

    /*
     * Close dialog box for password modification
     */
    CloseModifPwd = () => {
        this.setState({ openDialogModifPwd: false });
    };

    /*
     * Handle modification of user password
     */
    ValidateModifPwd = async () => {
        try {
            // Check password validity
            var checkMdp = await this.CheckMdpValidity('mdp-old');

            // Check input values
            if (this.CheckMdpNewOnChange() & checkMdp) {

                // Get new password
                var mdp = document.getElementById('mdp-new').value;

                // Body for the call
                var body = {
                    id: localStorage.getItem("id"),
                    mdp: mdp,
                    nom: this.state.nom,
                    prenom: this.state.prenom,
                    pseudo: this.state.pseudo,
                    mail: this.state.mail
                }

                // Get Token
                const access_token = localStorage.getItem("token");

                // Url for the call
                let url = 'http://localhost:5000/api/v1/utilisateurs/'

                // Options for the call
                const options = {
                    method: "put",
                    headers: {
                        Authorization: access_token,
                        "Content-Type": "application/json"
                    },
                    url: url,
                    data: body
                };

                // Call API and get results
                let res = await axios(options);

                // Successfull
                if (res.data.success) {
                    this.setState({ openDialogModifPwd: false });
                    this.render();
                    this.setState({
                        infoMessage: {
                            open: true,
                            type: "success",
                            message: "Votre mot de passe a bien été modifié.",
                            handleClose: this.handleCloseMessage
                        },
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    /*
     * Display the component
     */
    render() {
        return (
            <div>
                <div className="App-ban">
                    <h1>Mon Profil</h1>
                </div>
                <div className="App-corps-card">
                    <Paper className="App-paper" elevation={1}>
                        <Grid container className="App-grid-post" spacing={24}>
                            <Grid item xs={12} sm={6}>
                                <center><div className="App-Avatar-large"><div>{this.state.premiereLettrePseudo}</div></div></center>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <label className="App-h1">Mes Informations personnelles</label>
                                <br /> <br />
                                <label className="App-h3">Pseudo :&emsp;&emsp;</label>
                                <label className="App-p2">{this.state.pseudo}</label>
                                <br />
                                <label className="App-h3">Nom :&emsp;&emsp;&emsp; </label>
                                <label className="App-p2">{this.state.nom}</label>
                                <br />
                                <label className="App-h3">Prénom :&emsp;&nbsp;&nbsp;&nbsp;</label>
                                <label className="App-p2">{this.state.prenom}</label>
                                <br />
                                <label className="App-h3">Mail :&emsp;&emsp;&emsp;&nbsp;&nbsp;</label>
                                <label className="App-p2">{this.state.mail}</label>
                                <br /> <br />
                                <br /> <br />
                                <button onClick={this.OpenModifDialog} type="button" className="App-button">Modifier mes informations</button>
                                <button onClick={this.OpenModifPwdDialog} type="button" className="App-button">Changer mon mot de passe</button>
                                <div>
                                    <button onClick={this.OpenAlert} type="button" className="App-button">Se désinscrire</button>
                                    <Dialog open={this.state.openDialogAlert} onClose={this.CloseDialogAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                        <DialogTitle id="alert-dialog-title">{"Se désinscrire?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                En poursuivant, vous perdrez votre compte et toutes les données qui y sont associées. Voulez-vous vraiment vous désinscrire ?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.CloseDialogAlert} color="primary" autoFocus>
                                                Non
                                            </Button>
                                            <Button onClick={this.Desinscription} color="primary">
                                                Oui, se désincrire
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <Dialog open={this.state.openDialogConfirm} onClose={this.CloseDialogConfirm} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                        <DialogTitle id="alert-dialog-title">{"Désinscription"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Votre compte a bien été supprimé.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.CloseDialogConfirm} color="primary" autoFocus>
                                                Ok
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                    <Dialog open={this.state.openDialogModif} onClose={this.CloseModif} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Modifiez vos informations personnelles</DialogTitle>
                                        <DialogContent>
                                            <label className="inp">
                                                <input type="text" id="last-name" className="inp" placeholder="&nbsp;" defaultValue={this.state.nom} onChange={(id, name) => this.CheckInputText("last-name", "nom")} />
                                                <span className="label" id="label-last-name">Nom</span>
                                                <span className="border"></span>
                                            </label>
                                            <br></br>
                                            <label className="check-default" id="check-last-name"></label>
                                            <br></br>
                                            <label className="inp">
                                                <input type="text" id="first-name" className="inp" placeholder="&nbsp;" defaultValue={this.state.prenom} onChange={(id, name) => this.CheckInputText("first-name", "prénom")} />
                                                <span className="label" id="label-first-name">Prénom</span>
                                                <span className="border"></span>
                                            </label>
                                            <br></br>
                                            <label className="check-default" id="check-first-name"></label>
                                            <br></br>
                                            <label className="inp">
                                                <input type="text" id="mail" className="inp" placeholder="&nbsp;" defaultValue={this.state.mail} onChange={this.CheckMail} />
                                                <span className="label" id="label-mail">Mail</span>
                                                <span className="border"></span>
                                            </label>
                                            <br></br>
                                            <label className="check-default" id="check-mail"></label>
                                            <br></br>
                                            <hr />
                                            <DialogContentText>
                                                Veuillez entrer votre mot de passe pour confirmer vos modifications.
                                            </DialogContentText>
                                            <label className="inp">
                                                <input name="mdp" type="password" id="mdp" className="inp" placeholder="&nbsp;" onChange={(id) => this.CheckMdpOnChange('mdp')} />
                                                <span className="label" id="label-mdp">Mot de passe</span>
                                                <span className="border"></span>
                                            </label>
                                            <br></br>
                                            <label className="check-default" id="check-mdp"></label>
                                            <br></br>
                                        </DialogContent>
                                        <DialogActions>
                                            <button onClick={this.CloseModif} type="button" className="App-button">Annuler</button>
                                            <button onClick={this.ValidateModif} type="button" className="App-button">Valider</button>
                                        </DialogActions>
                                    </Dialog>

                                    <Dialog open={this.state.openDialogModifPwd} onClose={this.CloseModifPwd} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Modifiez votre mot de passe</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Veuillez entrer votre ancien mot de passe pour confirmer sa modification.
                                            </DialogContentText>
                                            <label className="inp">
                                                <input name="mdp" type="password" id="mdp-old" className="inp" placeholder="&nbsp;" onChange={(id) => this.CheckMdpOnChange('mdp-old')} />
                                                <span className="label" id="label-mdp-old">Ancien mot de passe</span>
                                                <span className="border"></span>
                                            </label>
                                            <br></br>
                                            <label className="check-default" id="check-mdp-old"></label>
                                            <hr />
                                            <DialogContentText>
                                                Veuillez entrer votre nouveau mot de passe.
                                            </DialogContentText>
                                            <label className="inp">
                                                <input name="mdp" type="password" id="mdp-new" className="inp" placeholder="&nbsp;" onChange={this.CheckMdpNewOnChange} />
                                                <span className="label" id="label-mdp-new">Ancien mot de passe</span>
                                                <span className="border"></span>
                                            </label>
                                            <br></br>
                                            <label className="check-default" id="check-mdp-new">{this.state.checkPwdDefault}</label>
                                        </DialogContent>
                                        <DialogActions>
                                            <button onClick={this.CloseModifPwd} type="button" className="App-button">Annuler</button>
                                            <button onClick={this.ValidateModifPwd} type="button" className="App-button">Valider</button>
                                        </DialogActions>
                                    </Dialog>
                                    <ErrorMessage attributes={this.state.infoMessage} onClose={this.handleCloseMessage} />
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
        );
    }
}
export default withRouter(Profil);