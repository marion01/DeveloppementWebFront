import React, { Component } from 'react';
import axios from 'axios';
import ErrorMessage from './errorMessage'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
        align: 'right'
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },

    card: {
        display: 'block',
        width: '30vw',
        transitionDuration: '0.3s',
    },

    commentaire: {
        resize: 'vertical',
        width: '40vw'
    },
});

/**
 * Component to handle upload page
 */
class Upload extends Component {
    state = {
        date: '',
        textPost: '',
        file: '',
        imageBase64: '',
        firstLetterPseudo: '',
        pseudo: '',
        id: '',
        infoMessage: {
            open: false,
            type: '',
            message: '',
            handleClose: this.handleCloseMessage
        },
        loading: true
    }

    //send a request to the API to save a post
    savePost = async () => {
        try {
            console.log("savePost")
            let textPost = document.getElementById('description').value
            let date = new Date()
            let file = document.getElementById('file-input')

            //the description or the image hasn't been selected
            if (file.files.length === 0 || textPost ==='') {
                return false;
            }

            let imageName = date.toDateString() + "-" + file.files[0].name;
            
            let body = {
                img: {
                    rel: imageName
                },
                texte: textPost,
                date: date.toISOString(),
                auteur: {
                    pseudo: this.state.pseudo,
                    ref: this.state.id
                }
            }

            let url = 'http://localhost:5000/api/v1/posts/post'


            const access_token = localStorage.getItem("token");
            const options = {
                method: "post",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url,
                data: body
            };
            //API call
            await axios(options);
            console.log("réussite");
            return true;
        } catch (err) {
            console.log("echec")
            console.log(err)
        }
    };

    //store the image of the post on server
    saveImage = async () => {
        try {
            console.log("saveImage")
            let file = document.getElementById('file-input').files[0];
            let body = new FormData();
            body.append('photo', file)
            let url = 'http://localhost:5000/api/v1/posts/postImage';

            const access_token = localStorage.getItem("token");
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
            console.log("réussite post image")
        } catch (err) {
            console.log("echec post image")
            console.log(err)
        }
    };

    //update the info message
    updateInfoMessage = (open, type, message) => {
        this.setState({
            infoMessage: {
                open: open,
                type: type,
                message: message,
                handleClose: this.handleCloseMessage
            },
        });
    }

    //submit a request to save the post
    submitPost = async () => {
        console.log("submit post")
        let postSucceed;

        //save in dataBase
        postSucceed = await this.savePost()
        if (postSucceed) {
            this.saveImage()

            //clear the uploadPage
            this.clearPage()

            this.updateInfoMessage(true, "success", "votre post a bien été enregistré")
        } else {
            //display an error message
            this.updateInfoMessage(true, "error", "l'image ou la description est manquante")
        }
    }

    //clear all the element of the page for a new post
    clearPage = () => {
        document.getElementById('description').value = ''
        document.getElementById('file-input').value = ''
        this.setState({ textPost: '' })
        this.setState({ imageBase64: "entrer une image" })
    }

    //get the right format for the date
    displayDate = (dateISO) => {
        let dateJour = dateISO.split("T")[0]
        let dateHeure = dateISO.split("T")[1]
        let dateWithoutMillisecond;
        if (dateHeure != null) {
            dateWithoutMillisecond = dateHeure.split(".")[0]
        }
        return dateJour + " " + dateWithoutMillisecond
    }

    //handle close message
    handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.updateInfoMessage(false, 'error', '');
       
    };

    componentDidMount() {
        //calcul date
        var date = new Date()
        date = this.displayDate(date.toISOString())
        this.setState({ date: date })

        //recup pseudo connecté
        const pseudo = localStorage.getItem("pseudo");
        this.setState({ pseudo: pseudo })

        //recup id connecté
        const id = localStorage.getItem("id");
        this.setState({ id: id })

        //recup firstLetter pseudo
        this.setState({ firstLetterPseudo: pseudo.charAt(0).toUpperCase() })

        //iniatialize image to not have an empty img attribute
        this.setState({ imageBase64: "entrer une image" });

        this.setState({loading: false})
    }

    //update description of the post in the visualisation
    UpdateCommentary = () => {
        this.setState({ textPost: document.getElementById('description').value })
        if (this.state.infoMessage.open === "open") {
            this.handleCloseMessage();
        }
    }

    //update image of the post in the visualisation
    UpdateImage = () => {
        this.setState({ imageBase64: URL.createObjectURL(document.getElementById('file-input').files[0]) });
        if (this.state.infoMessage.open === "open") {
            this.handleCloseMessage();
        }
    }

    render() {
        const { classes } = this.props;
        var card;

        if (this.state.loading) {
            card = <div>Loading...</div>;
        } else {
            card = <Card className="App-card-post">
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>{this.state.firstLetterPseudo}</Avatar>
                    }
                    title={this.state.pseudo}
                    subheader={this.state.date}
                />
                <CardMedia id="image-post"
                    className={classes.media}
                    image={this.state.imageBase64}
                />
                <CardContent>
                    <Typography component="p">{this.state.textPost}</Typography>
                </CardContent>
            </Card>
        }

        return (
            <div>
                <div className="App-ban">
                    <h1>Ecrire un post</h1>
                </div>
                <div className="App-corps">
                    <Paper className="App-paper" elevation={1}>
                        <Grid container className="App-grid-post" spacing={24}>
                            <Grid item xs={12} sm={6}>
                                <form>
                                    <div>
                                        <label htmlFor="file-input">Sélectionner une image à uploader</label>
                                        <input type="file" id="file-input" accept=".jpg, .jpeg, .png" name="photo" onChange={this.UpdateImage} />
                                    </div>
                                </form>
                                <br></br>
                                <br></br>
                                <label className="inp-textarea">
                                    <textarea id="description" name="mdp" type="text" required={true} className="inp-textarea" placeholder="&nbsp;" onChange={this.UpdateCommentary} />
                                    <span className="label-textarea">Description</span>
                                    <span className="border-textarea"></span>
                                </label>
                                <br></br>
                                <input onClick={this.submitPost} type="button" value="Valider" className="App-button" />
                             
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <br></br>
                                    {card}
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                </div>
                            </Grid>
                        </Grid>
                        <ErrorMessage attributes={this.state.infoMessage} />
                    </Paper>
                </div>

            </div>
        );
    }
}


Upload.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Upload);
