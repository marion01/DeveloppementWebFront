import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Menu from './menuConnecte.jsx'
import Profil from './profil.jsx'
import Upload from './upload.jsx'
import MesPosts from './mesPosts.jsx'
import Actu from './actu.jsx'
import menu from '../asset/menu.png'

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Error from './error.jsx'

const PageMenu = () => <Menu></Menu>;
const PageProfil = () => <Profil></Profil>;
const PageUpload = () => <Upload></Upload>;
const PageMesPosts = () => <MesPosts></MesPosts>;
const PageActu = () => <Actu></Actu>;
const PageError = () => <Error></Error>;


/*
 * Component to handle navBar element when user is connected
 */
class NavBar extends Component {
    // Variable for the component
    state = {
        // User pseudo
        pseudo: '',
        // Firest lette of the pseudo
        firstLetterPseudo: '',
        top: false
    };

    /*
     * Set up parameters before displaying the component
     */
    componentDidMount() {
        let pseudo = localStorage.getItem("pseudo")
        this.setState({
            pseudo: pseudo,
            firstLetterPseudo: pseudo.charAt(0).toUpperCase()
        })
    }

    // Slide drawer menu
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open
        });
    };

    /*
     * Handle deconnexion of a user
     */
    deconnexion = () => {
        this.props.handleDeconnexion();
    }

    /*
     * Display the component
     */
    render() {
        // text of slide drawer
        let text = "Vous êtes connecté en tant que " + this.state.pseudo

        // Slide drawer content
        const sideList = (
            <div className="App-sideList">
                <List>
                    <center>
                        <div className="App-Avatar-small"><div>{this.state.firstLetterPseudo}</div></div>
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
                    <Link to="/">
                        {["Se déconnecter"].map((text, index) => (
                            <ListItem button onClick={this.deconnexion} key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                    </Link>
                </List>
            </div>
        );

        // Return the component
        return (
            <div>
                <Router>
                    <div className="App-hearder">
                        <nav>
                            <ul>
                                <div>
                                    <img src={menu} alt="menu" height="53" onClick={this.toggleDrawer("left", true)} className="nav-logo" />
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
                            </ul>
                        </nav>
                        <Switch>
                            <Route path="/" exact component={PageMenu} />
                            <Route path="/profil/" component={PageProfil} />
                            <Route path="/upload/" component={PageUpload} />
                            <Route path="/mesPosts/" component={PageMesPosts} />
                            <Route path="/actu/" component={PageActu} />
                            <Route path="*" component={PageError} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default NavBar
