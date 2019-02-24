import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Menu from './menuConnecte.jsx'
import Profil from './profil.jsx'
import Upload from './upload.jsx'
import MesPosts from './mesPosts.jsx'
import Actu from './actu.jsx'
import menu from '../asset/menu.png'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Contact from './contact.jsx'


const PageContact = () => <Contact></Contact>;
const PageMenu = () => <Menu></Menu>;
const PageProfil = () => <Profil></Profil>;
const PageUpload = () => <Upload></Upload>;
const PageMesPosts = () => <MesPosts></MesPosts>;
const PageActu = () => <Actu></Actu>;



const styles = {
    list: {
      width: 250
    }
  };

  
/**
 * Component to handle navBar element when user is connected
 */
class NavBar extends Component{

    state = {
        pseudo:'',
        firstLetterPseudo: ''
    };


    componentDidMount() {
        let pseudo = localStorage.getItem("pseudo")
        this.setState({
            pseudo: pseudo,
            firstLetterPseudo: pseudo.charAt(0).toUpperCase()
        })
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open
        });
    };

    state = {
        top: false
    };

    //handle deconnexion of a user
    deconnexion = () => {
        localStorage.clear();
        this.props.handleConnexion();
    }

    render() {
        let text = "Vous êtes connecté en tant que " + this.state.pseudo

        const sideList = (
            <div className="App-sideList">
                <List>
                    <center>
                        <div className="App-Avatar-medium">{this.state.firstLetterPseudo}</div>
                    </center>
                    {[text].map((text, index) => (
                        <ListItem key={text}>
                            <ListItemText primary={text} align="center" />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <Link to="/profil/">
                        {["Mon profil"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </Link>
                    <Link to="/actu/">
                        {["Fil d'actualité"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </Link>
                    <Link to="/upload/">
                        {["Ecrire un post"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </Link>

                    <Link to="/mesPosts/">
                        {["Mes posts"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </Link>

                    {["Se déconnecter"].map((text, index) => (
                        <ListItem onClick={this.props.handleDeconnexion} button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            <div>
                <Router>
                    <div className="App-hearder">
                        <nav>
                            <ul>
                                <div>
                                    <img src={menu} alt="menu" height="50" onClick={this.toggleDrawer("left", true)} className="nav-logo" />
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
                                <li><Link to="/">Accueil</Link></li>
                                <li><Link to="/contact/">Contact</Link></li>
                            </ul>
                        </nav>
                        <Route path="/" exact component={PageMenu} />
                        <Route path="/contact/" component={PageContact} />
                        <Route path="/profil/" component={PageProfil} />
                        <Route path="/upload/" component={PageUpload} />
                        <Route path="/mesPosts/" component={PageMesPosts} />
                        <Route path="/actu/" component={PageActu} />
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