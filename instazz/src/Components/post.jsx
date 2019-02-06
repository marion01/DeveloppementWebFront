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
        width: '30vw'
    },
});


class Post extends Component{
    state = {
        expanded: false,
        post: '',
        img: '',
        commentaires: [],
        pseudoAuteur: '',
        firstLetter: '',
        date: '',
        imgLoading: true,
        commentaireLoading: true
    };

    //recover the image of the post
    getImage = async (post) => {
        try {
            const access_token = localStorage.getItem("token");
            var imageName = post.img.rel
            var url = 'http://localhost:5000/api/v1/posts/imageByName/' + imageName
            const options = {
                method: "get",
                responseType: 'arraybuffer',
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };
            let res = await axios(options);
            var buffer = new Buffer(res.data, 'binary').toString('base64')
            buffer = 'data:image/jpg;base64,' + buffer
            this.setState({ img: buffer })
            this.setState({ imgLoading: false })
        } catch (err) {
            alert("erreur");
            console.log(err)
        }
    };

    compareBy(key) {
        return function (a, b) {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        };
    }

    sortCommentairesBy = (key) => {
        let arrayCopy = this.state.commentaires;
        arrayCopy.sort(this.compareBy(key));
        this.setState({ commentaires: arrayCopy });
    }

    componentDidMount() {

        let post = this.props.Post;
        this.setState({ post: post });
        var pseudo = post.auteur.pseudo;
        this.setState({ pseudoAuteur: pseudo })
        this.setState({ firstLetter: pseudo.charAt(0).toUpperCase() })
        this.setState({ date: post.date })

        this.getImage(post);        
    }

    //recover the comments of the post
    recoverComments = async () => {
        try {
            this.setState({ commentaireLoading: true })
            const access_token = localStorage.getItem("token");
            var url = 'http://localhost:5000/api/v1/commentaires/getCommentairesOfPost/' + this.state.post._id
            const options = {
                method: "get",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };
            let res = await axios(options);
            const commentaires = res.data;
            this.setState({ commentaires: commentaires.doc });
            this.sortCommentairesBy('date')
            this.setState({ commentaireLoading: false })
        } catch (err) {
            alert("erreur");
            console.log(err)
        }
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
        this.recoverComments();
       
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

    sendComment = async () => {
        try {
            var date = new Date()
            console.log(date)
            let idAuteur = localStorage.getItem("id")
            let pseudoAuteur = localStorage.getItem("pseudo")

            var body = {
                commentaire: document.getElementById('comment').value,
                auteur: {
                    pseudo: pseudoAuteur,
                    ref: idAuteur
                },
                post: this.state.post._id,
                date: date.toISOString()
            };

            const access_token = localStorage.getItem("token");
            var url = 'http://localhost:5000/api/v1/commentaires/post'
            const options = {
                method: "post",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url,
                data: body
            };
            await axios(options);
            document.getElementById('comment').value = ""
            this.recoverComments()
            console.log("post commentaire");
        } catch (err) {
            alert("erreur");
            console.log(err)
        }
    };

    render() {
        const { classes } = this.props;

        let commentaires;
        if (this.state.commentaireLoading) {
            //s'affiche mais en blanc donc ne se voit pas -> voir css
            commentaires = <div>Loading ...</div>
        } else {
            if (this.state.commentaires.length === 0) {
            } else {
                commentaires = <div>
                    {this.state.commentaires.map(
                        commentaire =>
                            <Commentaire key={commentaire._id} Commentaire={commentaire}></Commentaire>
                    )}
                </div>
            }
        }
        

        var img;
        if (this.state.imgLoading) {
            img = "Loading ...";
        } else {
            img = this.state.img;
        }

        let date = this.displayDate(this.state.date)

        return (
            <div>
                <br></br>
            <Card className={classes.card}>
                <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>{this.state.firstLetter}</Avatar>
                        }
                        title={this.state.pseudoAuteur}
                        subheader={date}
                    />
                <CardMedia
                        className={classes.media}
                        image={img}
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
                            <ListItem>
                                <Avatar aria-label="Recipe" >{this.state.firstLetter}</Avatar>
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

                                    } />
                            </ListItem>
                            {commentaires}
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