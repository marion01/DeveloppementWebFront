import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Menu from './menu.jsx'
import Profil from './profil.jsx'
import Upload from './upload.jsx'
import MesPosts from './mesPosts.jsx'
import logo from '../asset/logo.png'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";


const PageContact = () => <h2>Contact</h2>;
const PageMenu = () => <Menu></Menu>;
const PageProfil = () => <Profil></Profil>;
const PageUpload = () => <Upload></Upload>;
const PageMesPosts = () => <MesPosts></MesPosts>;




const styles = {
    list: {
      width: 250
    }
  };

  

class NavBar extends Component{
    static defaultProps = {
        handleSignOut: ''
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
                    <Link to="/profil/">
                        {["Mon profil"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </Link>
                    <Link to="/upload/">
                        {["Charger un post"].map((text, index) => (
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
                        <ListItem onClick={this.props.handleSignOut} button key={text}>
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
                                <li><Link to="/">Acceuil</Link></li>
                                <li><Link to="/contact/">Contact</Link></li>
                            </ul>
                        </nav>
                        <Route path="/" exact component={PageMenu}/>
                        <Route path="/contact/" component={PageContact} />
                        <Route path="/profil/" component={PageProfil} />
                        <Route path="/upload/" component={PageUpload} />
                        <Route path="/mesPosts/" component={PageMesPosts} />
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