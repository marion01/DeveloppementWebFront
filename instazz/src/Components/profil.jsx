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


class Profil extends Component {
    // Stockage des informations de l'utilisateur
    state = {
        pseudo: '',
        premiereLettrePseudo: '',
        prenom: '',
        nom: '',
        mail: '',
        checkPwdDefault: "Doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et faire minimum 8 caractères",
        openDialogAlert: false,
        openDialogConfirm: false,
        openDialogModif: false,
        openDialogModifPwd: false,
        infoMessage: {
            open: false,
            type: '',
            message: '',
            handleClose: this.handleCloseMessage
        }
    };

    componentDidMount() {
        this.GetUserInformations();
    }

    // Récupération des informations de l'utilisateur par son Id
    GetUserInformations = async () => {
        try {
            let id = localStorage.getItem("id");

            // Appel à l'API
            const access_token = localStorage.getItem("token");
            let url = 'http://localhost:5000/api/v1/utilisateurs/' + id
            const options = {
                method: "get",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };
            let res = (await axios(options)).data.doc;

            // Récupération des resultats
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

    SupprimerUtilisateur = async () => {
        try {
            let id = localStorage.getItem("id");

            // Appel à l'API
            const access_token = localStorage.getItem("token");
            let url = 'http://localhost:5000/api/v1/utilisateurs/' + id
            const options = {
                method: "delete",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };
            let res = (await axios(options));
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    OpenAlert = () => {
        this.setState({ openDialogAlert: true });
    };

    CloseDialogAlert = () => {
        this.setState({ openDialogAlert: false });
    };
    Desinscription = () => {
        this.setState({ openDialogAlert: false });
        this.SupprimerUtilisateur();
        localStorage.clear();
        this.setState({ openDialogConfirm: true });
        
    }
    
    CloseDialogConfirm = () => {
        this.setState({ openDialogConfirm: false });
        //this.props.handleConnexion();
        localStorage.clear();
        localStorage.removeItem('token');
        this.props.history.push("/");        
    };

    CheckMdpOnChange(name) {
        var mdpInput = document.getElementById(name);
        var mdp = mdpInput.value;

        var checkLabel = document.getElementById('check-'+name);
        var mdpLabel = document.getElementById('label-'+name);

        if (mdp.length === 0) {
            checkLabel.innerHTML = "Veuillez entrer votre mot de passe pour confirmer";
            checkLabel.className = "check-wrong";
            mdpInput.style.borderColor = mdpLabel.style.color = "red";
        } 
    }


    CheckMdpValidity = async (name) =>{
        var mdpInput = document.getElementById(name);
        var mdp = mdpInput.value;

        var checkLabel = document.getElementById('check-' + name);
        var mdpLabel = document.getElementById('label-' + name);

        if (mdp.length === 0) {
            checkLabel.innerHTML = "Veuillez entrer votre mot de passe pour confirmer";
            checkLabel.className = "check-wrong";
            mdpInput.style.borderColor = mdpLabel.style.color = "red";
        } else {

            let body = {
                pseudo: this.state.pseudo,
                password: mdp
            }
            const access_token = localStorage.getItem("token");
            let url = 'http://localhost:5000/api/v1/utilisateurs/getPasswordValidity/'
            const options = {
                method: "post",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url,
                data: body
            };
            let res = await axios(options);
            console.log(res);
            if (res.data.success) {
                return true;
            } else {
                checkLabel.innerHTML = "Mot de passe incorrecte";
                checkLabel.className = "check-wrong";
                mdpInput.style.borderColor = mdpLabel.style.color = "red";
            }
        }
        return false;
    }

    
    CheckInputText(id, name) {
        var input = document.getElementById(id);
        var value = input.value;

        var checkLabel = document.getElementById("check-" + id);
        var label = document.getElementById("label-" + id);

        if (value.length === 0) {
            checkLabel.innerHTML = "Veuillez entrer votre " + name;
            checkLabel.className = "check-wrong";
            input.style.borderColor = label.style.color = "red";
        } else {
            checkLabel.innerHTML = "";
            input.style.borderColor = label.style.color = "limegreen";
            return true;
        }
        return false;
    }

    CheckMail() {
        var mailInput = document.getElementById('mail');
        var mail = mailInput.value;

        var checkLabel = document.getElementById('check-mail');
        var mailLabel = document.getElementById('label-mail');

        if (mail.length === 0) {
            checkLabel.innerHTML = "Veuillez entrer une adresse email";
            checkLabel.className = "check-wrong";
            mailInput.style.borderColor = mailLabel.style.color = "red";
        } else {

            if (mail.match("^[a-z0-9._-]+@[a-z0-9_.-]+\\.[a-z]{2,4}$")) {
                checkLabel.innerHTML = "";
                mailInput.style.borderColor = mailLabel.style.color = "limegreen";
                return true;
            } else {
                checkLabel.innerHTML = "Email invalide";
                checkLabel.className = "check-wrong";
                mailInput.style.borderColor = mailLabel.style.color = "red";
            }
        }
        return false;
    }

    ValidateModif = async () => {
        var checkMdp = await this.CheckMdpValidity('mdp');
        if (this.CheckInputText("last-name", "nom") & this.CheckInputText("first-name", "prénom")
            & this.CheckMail() & checkMdp) {

            var nom = document.getElementById('last-name').value;
            var prenom = document.getElementById('first-name').value;
            var mail = document.getElementById('mail').value;
            var mdp = document.getElementById('mdp').value;

            this.setState({ nom: nom });
            this.setState({ prenom: prenom });
            this.setState({ mail: mail });

            var body = {
                id: localStorage.getItem("id"),
                nom: nom,
                prenom: prenom,
                pseudo: this.state.pseudo,
                mdp: mdp,
                mail: mail
            }

            // Appel à l'API
            const access_token = localStorage.getItem("token");
            let url = 'http://localhost:5000/api/v1/utilisateurs/'
            const options = {
                method: "put",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url,
                data: body
            };
            let res = await axios(options);
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
    }

    
    CheckMdpNewOnChange() {
        var mdp = document.getElementById('mdp-old').value;
        var mdpInput = document.getElementById('mdp-new');
        var mdpNew = mdpInput.value;

        var checkLabel = document.getElementById('check-mdp-new');
        var mdpLabel = document.getElementById('label-mdp-new');

        if (mdpNew.length === 0) {
            checkLabel.innerHTML = "Veuillez entrer un nouveau mot de passe";
            checkLabel.className = "check-wrong";
            mdpInput.style.borderColor = mdpLabel.style.color = "red";
        } else {
            if (mdp === mdpNew) {
                checkLabel.innerHTML = "Les mots de passe sont identiques";
                checkLabel.className = "check-wrong";
                mdpInput.style.borderColor = mdpLabel.style.color = "red";
            } else {
                if (mdpNew.match("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-+!*$@%#;:&=_])") && mdpNew.length >= 8) {
                    checkLabel.innerHTML = "";
                    mdpInput.style.borderColor = mdpLabel.style.color = "limegreen";
                    return true;
                } else {
                    checkLabel.innerHTML = "Doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et faire minimum 8 caractères";
                    checkLabel.className = "check-wrong";
                    mdpInput.style.borderColor = mdpLabel.style.color = "red";
                }                
            }
        }
        return false;
    }


    CloseModif = () => {
        this.setState({ openDialogModif: false });
    };
    OpenModifDialog = () => {
        this.setState({ openDialogModif: true });
    };
    //handle when the error message is closed
    handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.updateInfoMessage(false, 'error', '');

    };

    OpenModifPwdDialog = () => {
        this.setState({ openDialogModifPwd: true });
    };

    CloseModifPwd = () => {
        this.setState({ openDialogModifPwd: false });
    };


    ValidateModifPwd = async () => {
        var checkMdp = await this.CheckMdpValidity('mdp-old');
        if (this.CheckMdpNewOnChange() & checkMdp) {

            var mdp = document.getElementById('mdp-new').value;

            var body = {
                id: localStorage.getItem("id"),
                mdp: mdp,
                nom: this.state.nom,
                prenom: this.state.prenom,
                pseudo: this.state.pseudo,
                mail: this.state.mail
            }

            // Appel à l'API
            const access_token = localStorage.getItem("token");
            let url = 'http://localhost:5000/api/v1/utilisateurs/'
            const options = {
                method: "put",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url,
                data: body
            };
            let res = await axios(options);
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
    }
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
                                        <DialogTitle id="form-dialog-title">Modifier vos informations personnelles</DialogTitle>
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
                                        <DialogTitle id="form-dialog-title">Modifier votre mot de passe</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Veuillez entrer votre ancien mot de passe pour confirmer sa modification.
                                            </DialogContentText>
                                            <label className="inp">
                                                <input name="mdp" type="password" id="mdp-old" className="inp" placeholder="&nbsp;" onChange={(id) =>this.CheckMdpOnChange('mdp-old')} />
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
                                    <ErrorMessage attributes={this.state.infoMessage} onClose={this.handleCloseMessage}/>
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