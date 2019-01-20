import React, { Component } from 'react';
import axios from 'axios';

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

        //recupération des données du post
        var url = 'http://localhost:5000/api/v1/commentaires/' + this.props.idCommentaire
        axios.get(url)
            .then((res) => {
                const com = res.data;
                this.setState({ commentaire: com.doc });
                
                var nd = this.state.commentaire.auteur.pseudo + " - " + this.state.commentaire.date
                this.setState({ nomDate: nd })
            });
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