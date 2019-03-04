import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Menu from './menu.jsx'
import FormulaireInscription from './inscription.jsx'
import Connexion from './connexion.jsx'
import logo from '../asset/logo.png'
import Error from './error.jsx'

/*
 * Component to handle navBar element when user is disconnected
 */
class NavBar extends Component {
    static defaultProps = {
        handleSignIn: ''
    }

    // Constructor
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    // The slide drawer menu
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open
        });
    };

    // Variables of the component
    state = {
        top: false
    };

    // Display the component
    render() {
        // Get all page for the link
        const PageConnexion = () => <Connexion handleConnexion={this.props.handleConnexion} ></ Connexion>;
        const PageInscription = () => <FormulaireInscription></FormulaireInscription>;
        const PageMenu = () => <Menu></Menu>;
        const PageError = () => <Error></Error>;

        // Return the component
        return (
            <div>
                <Router>
                    <div className="App-hearder">
                        <nav>
                            <ul>
                                <div>
                                    <Link to="/"><img src={logo} onClick={this.toggleDrawer("left", true)} className="nav-logo" alt="logo" height="53" /></Link>
                                </div>
                                <div>
                                    <li><Link to="/">Accueil</Link></li>
                                    <li><Link to="/connexion/">Se connecter</Link></li>
                                    <li><Link to="/inscription/">S'inscrire</Link></li>
                                </div>
                            </ul>
                        </nav>
                        <Switch>
                            <Route path="/" exact component={PageMenu} />
                            <Route path="/inscription/" component={PageInscription} />
                            <Route path="/connexion/" component={PageConnexion} />
                            <Route path="*" component={PageError} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
export default NavBar;
