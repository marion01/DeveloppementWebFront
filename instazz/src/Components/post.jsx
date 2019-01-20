import React, { Component } from 'react';
import axios from 'axios';

import Commentaire from './commentaire.jsx'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },

    card: {
        display: 'block',
        width: '50vw',
        transitionDuration: '0.3s',
    }
});


class Post extends Component{
    state = {
        expanded: false,
        post: '',
        img: '',
        commentaires: [],
        pseudoAuteur: ''
    };

    componentDidMount() {

        //recupération des données du post
        var url = 'http://localhost:5000/api/v1/posts/' + this.props.idPost
        axios.get(url)
            .then((res) => {
                const post = res.data;
                this.setState({ post: post.doc });

                var pseudo = this.state.post.auteur.pseudo
                this.setState({ pseudoAuteur: pseudo })

                //récupération de la photo
                var imageName = this.state.post.img.rel
                var urlImage = 'http://localhost:5000/api/v1/posts/imageByName/' + imageName
                axios
                    .get(urlImage, {
                        responseType: 'arraybuffer'
                    })
                    .then(response => {
                        var buffer = new Buffer(response.data, 'binary').toString('base64')
                        buffer = 'data:image/jpg;base64,' + buffer
                        this.setState({img: buffer})
                    })
            });
    }



    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));

        //récupération des commentaires du post  => na marcge pas
        var urlCommentaire = 'http://localhost:5000/api/v1/commentaires/getCommentairesOfPost/' + this.state.post._id
        axios.get(urlCommentaire)
            .then((res) => {
                const commentaires = res.data;
                this.setState({ commentaires: commentaires.doc });
            })
    };

    render() {
        const { classes } = this.props;

        let commentaires;
        if (this.state.commentaires.length === 0) {
            commentaires = <Typography>Aucun commentaire</Typography>;
        } else {
            commentaires = <CardContent>
                {this.state.commentaires.map(
                    commentaire =>
                        <Commentaire key={commentaire._id} idCommentaire={commentaire._id}></Commentaire>
                )};
                 </CardContent>
        }

        return (
            <div>
                <br></br>
            <Card className={classes.card}>
                <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>R</Avatar>
                        }
                        title={this.state.pseudoAuteur}
                        subheader={this.state.post.date}
                    />
                <CardMedia
                        className={classes.media}
                        image={this.state.img}
                />
                <CardContent>
                    <Typography component="p">{this.state.post.texte}</Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>

                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            {commentaires}
                 </Collapse>

                </Card>
            </div>
        );
    }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);