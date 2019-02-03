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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';


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

    left: {
        align:'right'
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
    },

    commentaire: {
        resize: 'vertical',
        width: '40vw'
    },
});


class Post extends Component{
    state = {
        expanded: false,
        post: '',
        img: '',
        commentaires: [],
        pseudoAuteur: '',
        firstLetter: ''
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
                this.setState({ firstLetter: pseudo.charAt(0)})

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

    recoverComments = () => {
        //récupération des commentaires du post  => na marcge pas
        var urlCommentaire = 'http://localhost:5000/api/v1/commentaires/getCommentairesOfPost/' + this.state.post._id
        axios.get(urlCommentaire)
            .then((res) => {
                const commentaires = res.data;
                this.setState({ commentaires: commentaires.doc });
            })
    }


    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
        this.recoverComments();
       
    };

    sendComment = () => {
        var date = new Date()
        let idAuteur = localStorage.getItem("id")
        let pseudoAuteur = localStorage.getItem("pseudo")

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
      
        var body = {
            commentaire: document.getElementById('comment').value,
            auteur: {
                pseudo: pseudoAuteur,
                ref: idAuteur
            },
            post: this.state.post._id,
            date: date.toDateString() 
        };
        console.log(body)
        let url = 'http://localhost:5000/api/v1/commentaires/post'
        axios.post(url, body,{
            headers: headers
        })
            .then((res) => {
                this.recoverComments()
                document.getElementById('comment').value = ""
                console.log("post commentaire");
        })
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))



    }

    render() {
        const { classes } = this.props;

        let commentaires;
        if (this.state.commentaires.length === 0) {
        } else {
            commentaires = <div>
                {this.state.commentaires.map(
                    commentaire =>
                        <Commentaire key={commentaire._id} idCommentaire={commentaire._id}></Commentaire>
                )}
                 </div>
        }

        return (
            <div>
                <br></br>
            <Card className={classes.card}>
                <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>{this.state.firstLetter}</Avatar>
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
                        <Typography className={classes.left}>Afficher les commentaires</Typography>
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
                        <List>
                            {commentaires}
                            <ListItem>
                                <Avatar aria-label="Recipe" >R</Avatar>
                                <ListItemText
                                primary="Entrez un commentaire"
                                    secondary={
                                        <React.Fragment>
                                        <textarea className={classes.commentaire} name="comment" id="comment" >
                                        </textarea>
                                        <IconButton onClick={this.sendComment}>
                                            <SendIcon />
                                            </IconButton>
                                        </React.Fragment>
                                  
                                }/>
                            </ListItem>
                        </List>
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