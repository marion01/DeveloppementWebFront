import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Menu from './menu.jsx'
import FormulaireInscription from './inscription.jsx'
import Connexion from './connexion.jsx'
import Contact from './contact.jsx'
import logo from '../asset/logo.png'

/**
 * Component to handle navBar element when user is disconnected
 */
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
        const PageConnexion = () => <Connexion handleConnexion={this.props.handleConnexion} ></ Connexion>;
        const PageInscription = () => <FormulaireInscription></FormulaireInscription>;
        const PageContact = () => <Contact></Contact>;
        const PageMenu = () => <Menu></Menu>;

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
                                        <li><Link to="/contact/">Contact</Link></li>
                                    </div>
                              
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
  
  export default NavBar;
