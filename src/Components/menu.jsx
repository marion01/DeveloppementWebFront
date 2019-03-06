import React, { Component } from 'react';
import logo from '../asset/logo.png'
import FormulaireInscription from './inscription.jsx'
import { BrowserRouter as Route, Link } from 'react-router-dom';
import Connexion from './connexion.jsx'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const PageInscription = () => <FormulaireInscription></FormulaireInscription>;
const PageConnexion = () => <Connexion></Connexion>;

/*
 * Component to handle home page for visitor
 */
export default class Menu extends Component {

    /*
     * Display the component
     */
    render() {
        return <div>
            <div className="App-ban">
                <img src={logo} alt="logo" className="App-ban-img" />
                <p>InstaZZ</p>
                <p>L'Application pour partager des photos entre ZZ</p>
            </div>
            <div className="App-corps-card-list">
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Paper className="App-paper" elevation={1}>
                            <label className="App-h1">Connexion</label>
                            <label className="App-p1">Pour commencer à partager vos photos, connectez-vous !
                                      Si vous n'avez pas encore de compte, créez-en un.</label>
                            <Link to="/connexion/"><button className="App-button">Se connecter</button> </Link>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className="App-paper" elevation={1}>
                            <label className="App-h1">Inscription</label>
                            <label className="App-p1">Pour commencer à partager vos photos, connectez-vous !
                                      Si vous n'avez pas encore de compte, créez-en un.</label>
                            <Link to="/inscription/"><button className="App-button">S'inscrire</button></Link>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <Route path="/connexion/" exact component={PageConnexion} />
            <Route path="/inscription/" exact component={PageInscription} />
        </div>
    }
}