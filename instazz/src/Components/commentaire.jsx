import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


export default class Commentaire extends Component{
    state = {
        commentaire: '',
        nomDate: '',
        firstLetterPseudo: ''
    };

    displayDate = (dateISO) => {
        let dateJour = dateISO.split("T")[0]
        let dateHeure = dateISO.split("T")[1]
        let dateWithoutMillisecond;
        if (dateHeure != null) {
            dateWithoutMillisecond = dateHeure.split(".")[0]
        }
        return dateJour + " " + dateWithoutMillisecond
    }

    componentDidMount() {
        let commentaire = this.props.Commentaire
        this.setState({ commentaire: commentaire })

        let date = this.displayDate(commentaire.date)
        let pseudo = commentaire.auteur.pseudo
        var nd = pseudo + " - " + date
        this.setState({ nomDate: nd })
        this.setState({ firstLetterPseudo: pseudo.charAt(0).toUpperCase() });
    }

    render() {
       

        return (
            <ListItem alignItems="flex-start">

                <ListItemAvatar>
                    <Avatar aria-label="Recipe" >{this.state.firstLetterPseudo}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.nomDate} secondary={this.state.commentaire.commentaire} />
             </ListItem>
        );
    }
}