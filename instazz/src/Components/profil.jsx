import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
  
/**
 * Component to handle profil page
 */
export default class Profil extends Component{
    state = {
        pseudo: '',
        firstLetterPseudo: ''
    };

    componentDidMount() {
        let pseudo = localStorage.getItem("pseudo")
        this.setState({ pseudo: pseudo })
        this.setState({ firstLetterPseudo: pseudo.charAt(0).toUpperCase() });
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
                                <center><div className="App-Avatar-big">{this.state.firstLetterPseudo}</div></center>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <label className="App-title-user">Mes Informations personnelles</label>
                                <br /> <br />
                                <label className="App-corps-title">Pseudo</label>
                                <br/>
                                <label className="App-corps-text">{this.state.pseudo}</label>
                                <br />
                                <label className="App-corps-title">Nom</label>
                                <br />
                                <label className="App-corps-text">MonNom</label>
                                <br />
                                <label className="App-corps-title">Prénom</label>
                                <br />
                                <label className="App-corps-text">MonPrenom</label>
                                <br />
                                <label className="App-corps-title">Mail</label>
                                <br />
                                <label className="App-corps-text">MonMail</label>
                                
                            </Grid>
                        </Grid>
                        
                    </Paper>
                </div>
            </div>
        );
    }
}