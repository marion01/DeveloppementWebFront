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


class Profil extends Component {
    // Stockage des informations de l'utilisateur
    state = {
        pseudo: '',
        premiereLettrePseudo: '',
        prenom: '',
        nom: '',
        mail: '',
        openDialogAlert: false,
        openDialogConfirm : false
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
                                <button onClick="" type="button" className="App-button">Changer mes informations</button>
                                <div>
                                    <button onClick={this.OpenAlert} type="button" className="App-button">Se désinscire</button>
                                    <Dialog open={this.state.openDialogAlert} onClose={this.CloseDialogAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                        <DialogTitle id="alert-dialog-title">{"Se désinscrire?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                En cliquant sur se désincrire, vous perdrez votre compte et toutes les données qui y sont associées. Voulez-vous vraiment vous désinscrire ?
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