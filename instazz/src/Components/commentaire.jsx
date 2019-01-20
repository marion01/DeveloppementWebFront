import React, { Component } from 'react';
import axios from 'axios';

import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


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
            <div>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" >R</Avatar>
                    }
                    title={this.state.nomDate}
                />
                <Typography>{this.state.commentaire.commentaire}</Typography>
                <Divider />
            </div>
        );
    }
}