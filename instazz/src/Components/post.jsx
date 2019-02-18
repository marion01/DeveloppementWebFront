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
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
        color: '#26a5ce'
    },

    expandOpen: {
        transform: 'rotate(180deg)',
    },
    card: {
        display: 'block',
        align: 'center',
        transitionDuration: '0.3s',
    },

    commentaire: {
        resize: 'vertical',
        width: '30vw'
    },
});


class Post extends Component {
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
            console.log(err)
        }
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
        this.recoverComments();

    };

    displayDate = (dateISO) => {
        var mois = [
            "Janvier", "Février", "Mars",
            "Avril", "Mai", "Juin", "Juillet",
            "Août", "Sptembre", "Octobre",
            "Novembre", "Décembre"]
        let date = dateISO.split("T")[0].split("-")
        let dateHeure = dateISO.split("T")[1]
        if (dateHeure != null) {
            dateHeure = dateHeure.split(".")[0].split(":")
            dateHeure = " à " + dateHeure[0] + "h" + dateHeure[1] + ":" + dateHeure[2]
        }
        return "Le " + date[2] + " " + mois[parseInt(date[1])] + " " + date[0] + dateHeure
    }

    sendComment = async () => {
        try {
            var date = new Date()
            let idAuteur = localStorage.getItem("id")
            let pseudoAuteur = localStorage.getItem("pseudo")

            if (document.getElementById('comment').value !== '') {
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
                var url = 'http://localhost:5000/api/v1/commentaires/post/'
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
            }
        } catch (err) {
            console.log(err)
        }
    };

    deletePost = async () => {
        console.log("delete post")

        try {
            let idPost = this.state.post._id
            console.log(idPost)
            const access_token = localStorage.getItem("token");
            var url = 'http://localhost:5000/api/v1/posts/delete/' + idPost
            const options = {
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                }
            };
            await axios.delete(url, options);
            console.log("delete done")

            this.props.updateParent();
        } catch (err) {
            console.log(err)
        }

    }

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

        let deleteIcon ='';
        if (this.props.delete) {
            deleteIcon = <IconButton onClick={this.deletePost}>
                <DeleteIcon />
            </IconButton>
        } 

        let date = this.displayDate(this.state.date)

        return (
            <div>
                <br></br>
                <Card className="App-card-post">
                    <CardHeader
                        avatar={<div className="App-Avatar-medium">{this.state.firstLetter}</div>}
                        title={<label className="App-title-user">{this.state.pseudoAuteur}</label>}
                        subheader={<label className="App-title-date">{date}</label>}
                    />
                    <CardMedia
                        className="App-post-img"
                        image={img}
                    />
                    <CardContent>
                        <label component="p" className="App-post-text">{this.state.post.texte}</label>
                    </CardContent>
                    <CardActions className="App-card-action" disableActionSpacing>
                        <label className="App-subTitle">Commentaires</label>
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
                        {deleteIcon}
                    </CardActions>

                    <Collapse in={this.state.expanded} className="App-expand-list" timeout="auto" unmountOnExit>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            <Grid container spacing={0}>
                                                <Grid item xs={11}>
                                            <label className="inp-textarea">
                                                <textarea id="comment" type="text" required={true} className="inp-textarea" placeholder="&nbsp;" />
                                                <span className="label-textarea">Commenter</span>
                                                <span className="border-textarea"></span>
                                                    </label>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton onClick={this.sendComment} className="App-send-comment">
                                                        <SendIcon className="App-icon" />
                                                    </IconButton>
                                                </Grid>
                                                </Grid>
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