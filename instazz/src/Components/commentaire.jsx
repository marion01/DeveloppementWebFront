import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


export default class Commentaire extends Component{
    state = {
        commentaire: '',
        nomDate: ''
    };

    componentDidMount() {
        let commentaire = this.props.Commentaire
        this.setState({ commentaire: commentaire })

        var nd = commentaire.auteur.pseudo + " - " + commentaire.date
        this.setState({ nomDate: nd })
    }

    render() {

        return (
            <ListItem alignItems="flex-start">

                <ListItemAvatar>
                    <Avatar aria-label="Recipe" >R</Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.nomDate} secondary={this.state.commentaire.commentaire} />
             </ListItem>
        );
    }
}