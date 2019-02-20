import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default class FormulaireInscription extends Component {

    handleSubmit = () => {
        alert('Votre inscription a bien été prise en compte');
    }

    state = {
        CheckNameDefault: "Doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et faire minimum 8 caractères"
    };

    CheckMdp() {
        var mdpInput = document.getElementById('mdp');
        var mdp = mdpInput.value;

        var label = document.getElementById('check-mdp');
        var mdpLabel = document.getElementById('mdp-label');

        if (mdp.length == '' ) {
            label.innerHTML = "Veuillez entrer un mot de passe";
            label.className = "check-wrong";
            mdpInput.style.borderColor = "red";
            mdpLabel.style.color = "red";
        } else {
            
            if (mdp.match("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-+!*$@%#;:&=_])") && mdp.length >= 8) {
                label.innerHTML = "";
                mdpInput.style.borderColor = "limegreen";
                mdpLabel.style.color = "limegreen";
                console.log(mdp);
            } else {
                label.innerHTML = "Doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et faire minimum 8 caractères";
                label.className = "check-wrong";
                mdpInput.style.borderColor = "red";
                mdpLabel.style.color = "red";
            }
        }
    }
    CheckMdpBis() {
        var mdp = document.getElementById('mdp').value;

        var mdpInput = document.getElementById('mdp-bis');
        var mdpBis = mdpInput.value;

        var label = document.getElementById('check-mdp-bis');
        var mdpLabel = document.getElementById('mdp-bis-label');

        if (mdpBis.length == '') {
            label.innerHTML = "Veuillez re-entrer votre mot de passe";
            label.className = "check-wrong";
            mdpInput.style.borderColor = "red";
            mdpLabel.style.color = "red";
        } else {

            if (mdp == mdpBis) {
                label.innerHTML = "";
                mdpInput.style.borderColor = "limegreen";
                mdpLabel.style.color = "limegreen";
                console.log(mdpBis);
            } else {
                label.innerHTML = "Les mots de passe ne sont pas identiques";
                label.className = "check-wrong";
                mdpInput.style.borderColor = "red";
                mdpLabel.style.color = "red";
            }
        }
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
                                <input name="Nom" type="text" class="inp" placeholder="&nbsp;" />
                                <span class="label">Nom</span>
                                <span class="border"></span>
                            </label>
                            <br></br>
                            <label class="inp">
                                <input name="Prenom" required type="text" class="inp" placeholder="&nbsp;" />
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
                                <input name="mdp" type="password" id="mdp" className="inp" placeholder="&nbsp;" onChange={this.CheckMdp}  />
                                <span class="label" id="mdp-label">Mot de passe</span>
                                <span class="border"></span>
                            </label>
                            <br></br>
                            <label className="check-default" id="check-mdp">{this.state.CheckNameDefault}</label>
                            <br></br>
                            <label class="inp">
                                <input name="mdpConfirmation" type="password" id="mdp-bis" class="inp" placeholder="&nbsp;" onChange={this.CheckMdpBis}/>
                                <span class="label" id="mdp-bis-label">Confirmation du mot de passe</span>
                                <span class="border"></span>
                            </label>
                            <br></br>
                            <label className="check-default" id="check-mdp-bis"></label>
                            <br></br>
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