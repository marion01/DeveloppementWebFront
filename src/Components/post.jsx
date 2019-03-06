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

/*
 * Set up the theme for posts 
 */
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
    }
});

/*
 * Component to handle post element
 */
class Post extends Component {
    // Variables for the component
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

    /*
     * Recover the image of the post
     */
    getImage = async (post) => {
        try {
            // Get token
            const access_token = localStorage.getItem("token");

            // Get image
            var imageName = post.img.rel

            // Parameters for the api call
            var url = localStorage.getItem("baseRoute") + 'posts/imageByName/' + imageName
            const options = {
                method: "get",
                responseType: 'arraybuffer',
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };

            // Call to the api
            let res = await axios(options);

            // Transform the data of the image in base64 to be displayed
            var buffer = 'data:image/jpg;base64,' + new Buffer(res.data, 'binary').toString('base64');
            this.setState({
                img: buffer,
                imgLoading: false
            })
        } catch (err) {
            console.log(err)
        }
    };

    /*
     * Compare two element by a key
     */
    compareBy(key) {
        return function (a, b) {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        };
    }

    /*
     * Sort the commentary by key
     */
    sortCommentairesBy = (key) => {
        let arrayCopy = this.state.commentaires;
        arrayCopy.sort(this.compareBy(key));
        this.setState({ commentaires: arrayCopy });
    }

    /*
     * Set up parameters before displaying the component
     */
    componentDidMount() {
        let post = this.props.Post;
        var pseudo = post.auteur.pseudo;
        this.setState({
            post: post,
            pseudoAuteur: pseudo,
            firstLetter: pseudo.charAt(0).toUpperCase(),
            date: post.date
        })
        this.getImage(post);
    }

    /*
     * Recover the comments of the post
     */
    recoverComments = async () => {
        try {
            this.setState({ commentaireLoading: true });

            // Get token
            const access_token = localStorage.getItem("token");

            // The url for the call
            var url = localStorage.getItem("baseRoute") + 'commentaires/getCommentairesOfPost/' + this.state.post._id

            // Options for the call
            const options = {
                method: "get",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url
            };

            // Call API and get resuts
            let res = await axios(options);
            const commentaires = res.data;
            this.setState({ commentaires: commentaires.doc });
            this.sortCommentairesBy('date')
            this.setState({ commentaireLoading: false })
        } catch (err) {
            console.log(err)
        }
    };

    /*
     * Handle when the expand button is clicked
     */
    handleExpandClick = () => {
        let expand = !this.state.expanded
        this.setState({ expanded: expand });
        if (expand === true) {
            this.recoverComments();
        }
    };

    /*
     * Make the correct format for the date to display
     */
    displayDate = (dateISO) => {
        // Month name
        var mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Sptembre", "Octobre", "Novembre", "Décembre"]

        // Split date infos
        let date = dateISO.split("T")[0].split("-")

        // Get hour date
        let dateHeure = dateISO.split("T")[1]
        if (dateHeure != null) {
            dateHeure = dateHeure.split(".")[0].split(":")
            dateHeure = " à " + dateHeure[0] + "h" + dateHeure[1] + ":" + dateHeure[2]
        }

        // Return the date sentence
        return "Le " + date[2] + " " + mois[parseInt(date[1])] + " " + date[0] + dateHeure
    }

    /*
     * Get the correct date and time
     */
    newISODate = () => {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19)
        return localISOTime
    }

    /*
     * Save a comment
     */
    sendComment = async () => {
        try {
            // Get infos
            var date = this.newISODate()
            let idAuteur = localStorage.getItem("id")
            let pseudoAuteur = localStorage.getItem("pseudo")
            // Save the comment if only it is not empty
            if (document.getElementById('comment').value !== '') {
                // Body of the request
                var body = {
                    commentaire: document.getElementById('comment').value,
                    auteur: {
                        pseudo: pseudoAuteur,
                        ref: idAuteur
                    },
                    post: this.state.post._id,
                    date: date
                };
                // Get token
                const access_token = localStorage.getItem("token");

                // Url of the call
                var url = localStorage.getItem("baseRoute") + 'commentaires/post/'

                // Options of the request
                const options = {
                    method: "post",
                    headers: {
                        Authorization: access_token,
                        "Content-Type": "application/json"
                    },
                    url: url,
                    data: body
                };
                // Call the API
                await axios(options);

                // Clear the comment textarea
                document.getElementById('comment').value = ""
                // Update the comments
                this.recoverComments()
            }
        } catch (err) {
            console.log(err)
        }
    };

    /*
     * Delete a post and all the comment associated
     */
    deletePost = async () => {
        try {
            // Get token
            const access_token = localStorage.getItem("token");

            // Get image
            let imageName = this.state.post.img.rel;

            // Url of the call
            let urlDeleteImg = localStorage.getItem("baseRoute") + 'posts/deleteImg/' + imageName

            // Option for the call
            const options1 = {
                method: "post",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: urlDeleteImg
            };

            // Call API
            await axios(options1);

            // Option for the second call
            const options2 = {
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                }
            };

            // Get id posts
            let idPost = this.state.post._id

            // Url of the call
            var url = localStorage.getItem("baseRoute") + 'posts/delete/' + idPost

            // Delete request to the API
            await axios.delete(url, options2);
            this.props.updateParent();
        } catch (err) {
            console.log(err)
        }
    }

    /*
     * Display the component
     */
    render() {
        const { classes } = this.props;

        // Set up commentary
        let commentaires;
        if (this.state.commentaireLoading) {
            commentaires = <div>Loading ...</div>
        } else {
            if (this.state.commentaires.length !== 0) {
                commentaires = <div>
                    {this.state.commentaires.map(
                        commentaire =>
                            <Commentaire key={commentaire._id} Commentaire={commentaire}></Commentaire>
                    )}
                </div>
            } else {
                commentaires = <div></div>
            }
        }

        // Get image
        var img;
        if (this.state.imgLoading) {
            img = "Loading ...";
        } else {
            img = this.state.img;
        }

        let deleteIcon = '';
        if (this.props.delete) {
            deleteIcon = <IconButton onClick={this.deletePost}>
                <DeleteIcon />
            </IconButton>
        }

        // Get Date
        let date = this.displayDate(this.state.date)

        /*
         * Return the component
         */
        return (
            <div>
                <br></br>
                <Card className="App-card-post">
                    <CardHeader
                        avatar={<div className="App-Avatar-xl"><div>{this.state.firstLetter}</div></div>}
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