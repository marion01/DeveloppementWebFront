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


class Inscription extends Component {

    state = {
        CheckNameDefault: "Doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et faire minimum 8 caractères",
        CheckPseudoDefault: "Doit contenir des chiffres ou des lettres et faire entre 4 et 20 caractères",
        NbPseudosFound: 1,
        openDialog : false
    };

    CheckMdp() {
        var mdpInput = document.getElementById('mdp');
        var mdp = mdpInput.value;

        var checkLabel = document.getElementById('check-mdp');
        var mdpLabel = document.getElementById('label-mdp');

        if (mdp.length === 0 ) {
            checkLabel.innerHTML = "Veuillez entrer un mot de passe";
            checkLabel.className = "check-wrong";
            mdpInput.style.borderColor = mdpLabel.style.color = "red";
        } else {
            
            if (mdp.match("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-+!*$@%#;:&=_])") && mdp.length >= 8) {
                checkLabel.innerHTML = "";
                mdpInput.style.borderColor = mdpLabel.style.color = "limegreen";
                return true;
            } else {
                checkLabel.innerHTML = "Doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et faire minimum 8 caractères";
                checkLabel.className = "check-wrong";
                mdpInput.style.borderColor = mdpLabel.style.color = "red";
            }
        }
        return false;
    }
    CheckMdpBis() {
        var mdp = document.getElementById('mdp').value;

        var mdpInput = document.getElementById('mdp-bis');
        var mdpBis = mdpInput.value;

        var checkLabel = document.getElementById('check-mdp-bis');
        var mdpLabel = document.getElementById('label-mdp-bis');

        if (mdpBis.length === 0) {
            checkLabel.innerHTML = "Veuillez re-entrer votre mot de passe";
            checkLabel.className = "check-wrong";
            mdpInput.style.borderColor = mdpLabel.style.color = "red";
        } else {

            if (mdp === mdpBis) {
                checkLabel.innerHTML = "";
                mdpInput.style.borderColor = mdpLabel.style.color = "limegreen";
                return true;
            } else {
                checkLabel.innerHTML = "Les mots de passe ne sont pas identiques";
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

    //recover the image of the post
    async getNbPseudo(pseudo){
        var url = 'http://localhost:5000/api/v1/searchPseudo/' + pseudo;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        await axios.get(url, { headers: headers })
            .then((res) => {
                var test = res.data.doc;
                this.setState({ NbPseudosFound: test });
                }
            )
    }

    CheckPseudo =  async () =>{
        var pseudoInput = document.getElementById('pseudo');
        let pseudo = pseudoInput.value;

        var checkLabel = document.getElementById('check-pseudo');
        var pseudoLabel = document.getElementById('label-pseudo');

        if (pseudo.length === 0) {
            checkLabel.innerHTML = "Veuillez entrer un pseudo";
            checkLabel.className = "check-wrong";
            pseudoInput.style.borderColor = pseudoLabel.style.color = "red";
        } else {

            if (pseudo.match("^[a-z0-9A-Z]{4,15}$")) {
                await this.getNbPseudo(pseudo);
                if (this.state.NbPseudosFound !== 0) {
                    checkLabel.innerHTML = "Ce pseudo est déjà pris";
                    checkLabel.className = "check-wrong";
                    pseudoInput.style.borderColor = pseudoLabel.style.color = "red";
                } else {
                    checkLabel.innerHTML = "";
                    pseudoInput.style.borderColor = pseudoLabel.style.color = "limegreen";
                    return true;
                }
            } else {
                checkLabel.innerHTML = "Doit contenir des chiffres ou des lettres et faire entre 4 et 20 caractères";
                checkLabel.className = "check-wrong";
                pseudoInput.style.borderColor = pseudoLabel.style.color = "red";
            }
        }
        return false;
    }

    handleSubmit = async() => {
        var checkPseudo = await this.CheckPseudo();
        if (this.CheckInputText("last-name", "nom") & this.CheckInputText("first-name", "prénom")
            & this.CheckMail() & checkPseudo & this.CheckMdp() & this.CheckMdpBis()) {

            var nom = document.getElementById('last-name').value;
            var prenom = document.getElementById('first-name').value;
            var mail = document.getElementById('mail').value;
            var pseudo = document.getElementById('pseudo').value;
            var mdp = document.getElementById('mdp').value;

            var body = {
                nom: nom,
                prenom: prenom,
                pseudo: pseudo,
                mdp: mdp,
                mail: mail
            }
            var url = 'http://localhost:5000/api/v1/utilisateurs/post'
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*');

            axios.post(url, body, {
                headers: headers
            }).then((res) => {
                console.log("success ? : " + res.data.success);
                if (res.data.success) {
                    this.setState({ openDialog: true });
                }
            })
        }
    }
    Close = () => {
        // Redirection vers home
        this.props.history.push("/");
    };
    

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
                                <input type="text" id="first-name" className="inp" placeholder="&nbsp;" onChange={(id,name) => this.CheckInputText("first-name", "prénom")}/>
                                <span className="label" id="label-first-name">Prénom</span>
                                <span className="border"></span>
                            </label>
                            <br></br>
                            <label className="check-default" id="check-first-name"></label>
                            <br></br>
                            <label className="inp">
                                <input type="text" id="mail" className="inp" placeholder="&nbsp;" onChange={this.CheckMail}/>
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
                                <input name="mdp" type="password" id="mdp" className="inp" placeholder="&nbsp;" onChange={this.CheckMdp}  />
                                <span className="label" id="label-mdp">Mot de passe</span>
                                <span className="border"></span>
                            </label>
                            <br></br>
                            <label className="check-default" id="check-mdp">{this.state.CheckNameDefault}</label>
                            <br></br>
                            <label className="inp">
                                <input name="mdpConfirmation" type="password" id="mdp-bis" className="inp" placeholder="&nbsp;" onChange={this.CheckMdpBis}/>
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