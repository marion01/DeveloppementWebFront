import React, { Component } from 'react';
import logo from '../asset/logo.png'
import FormulaireInscription from './inscription.jsx'
import {BrowserRouter as Route, Link } from 'react-router-dom';
import Connexion from './connexion.jsx'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const PageInscription = () => <FormulaireInscription></FormulaireInscription>;
const PageConnexion = () => <Connexion></Connexion>;


export default class Menu extends Component{
  handleClick=()=>{
    alert('I am alert, nice to meet you');
  }

   
  render() {
      return <div>
          <div className="App-ban">
              <img src={logo} alt="logo" className="App-ban-img" />
              <p>InstaZZ</p>
               <p>l'Application pour partager des photos entre ZZ</p> 
          </div>
          <div className="App-corps-diapo">
          <Grid container spacing={10}>
              <Grid item xs={12} sm={6}>
                  <div className="App-corps-card">
                      <Card className="card">
                          <CardActionArea>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="h2">
                                      Connexion
                                  </Typography>
                                  <Typography component="p">
                                      Pour commencer à patager vos photos, connectez-vous !
                                      Si vous n'avez pas encore de compte, créez-en un.
                                  </Typography>
                              </CardContent>
                          </CardActionArea>
                          <CardActions>
                                <Link to="/connexion/"><button className="App-button">Se connecter</button> </Link>
                          </CardActions>
                      </Card>
                  </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <div className="App-corps-card">
                      <Card className="card">
                          <CardActionArea>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="h2">
                                      Inscription
                              </Typography>
                                  <Typography component="p">
                                      Pour commencer à patager vos photos, connectez-vous !
                                      Si vous n'avez pas encore de compte, créez-en un.
                  </Typography>
                              </CardContent>
                          </CardActionArea>
                          <CardActions>
                              <Link to="/inscription/"><button className="App-button">S'inscrire</button></Link>
                          </CardActions>
                      </Card>

                      
                  </div>
              </Grid>
              </Grid>
            </div>
          <Route path="/connexion/" exact component={PageConnexion} />
          <Route path="/inscription/" exact component={PageInscription} />
         </div>
      }
 }