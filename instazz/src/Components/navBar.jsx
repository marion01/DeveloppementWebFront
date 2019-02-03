import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Menu from './menu.jsx'
import FormulaireInscription from './inscription.jsx'
import Connexion from './connexion.jsx'
import Contact from './contact.jsx'
import logo from '../asset/logo.png'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";


const styles = {
    list: {
      width: 250
    }
  };

  

class NavBar extends Component{
    

    static defaultProps = {
        handleSignIn: ''
    }

    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open
        });
    };

    state = {
        top: false
      };
    


    render() {
        const { classes } = this.props;
        const PageConnexion = () => <Connexion handleConnexion={this.props.handleConnexion} ></ Connexion>;
        const PageInscription = () => <FormulaireInscription></FormulaireInscription>;
        const PageContact = () => <Contact></Contact>;
        const PageMenu = () => <Menu></Menu>;

        const sideList = (
            <div className={classes.list}>
            <List>
                    {["test1", "test2"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                            ))}
            </List>
            </div>
        );

        const isMobile = window.innerWidth <= 500;

        return (
            <div>
                <Router>
                    <div className="App-hearder">
                        <nav>
                            <ul>
                                {isMobile ?
                                    <div>
                                        <Button onClick={this.toggleDrawer("left", true)} className="nav-item"><img src={logo} alt="logo" height="50" /></Button>
                                        <Drawer
                                            open={this.state.left}
                                            onClose={this.toggleDrawer("left", false)}
                                        >
                                            <div
                                                tabIndex={0}
                                                role="button"
                                                onClick={this.toggleDrawer("left", false)}
                                                onKeyDown={this.toggleDrawer("left", false)}
                                            >
                                                {sideList}
                                            </div>
                                        </Drawer>

                                    </div>
                                    :
                                    <div>
                                        <li><Link to="/">Acceuil</Link></li>
                                        <li><Link to="/inscription/">S'inscrire</Link></li>
                                        <li><Link to="/connexion/">Se connecter</Link></li>
                                        <li><Link to="/contact/">Contact</Link></li>
                                    </div>}
                              
                            </ul>
                        </nav>
                        <Route path="/" exact component={PageMenu}/>
                        <Route path="/inscription/" component={PageInscription}/>
                        <Route path="/connexion/" component={PageConnexion}/>
                        <Route path="/contact/" component={PageContact} />
                    </div>
                </Router>
            </div>
        );
    }
}


NavBar.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(NavBar);


/*

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class TemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {["Vous êtes connecté en tant que X"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Mon profil", "Se déconnecter"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer("left", true)}>Open Left</Button>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
*/
