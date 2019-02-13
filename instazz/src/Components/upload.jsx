import React, { Component } from 'react';
import axios from 'axios';


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

class Upload extends Component {
    state = {
        date: '',
        textPost: '',
        previewClicked: false,
        file: '',
        imageBase64updated: '',
        imageBase64: '',
        firstLetterPseudo: '',
        pseudo: '',
        id: ''
    }

    savePost = async () => {
        try {
            console.log("savePost")
            let textPost = document.getElementById('description').value
            let date = new Date()
            let file = document.getElementById('file-input')

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
            await axios(options);
            console.log("post post réussit");
        } catch (err) {
            console.log("echec post post")
            console.log(err)
        }
    };

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

    submitPost = () => {
        //save in dataBase
        this.savePost()
        this.saveImage()

        //clear the uploadPage
        this.setState({ previewClicked: false })
        document.getElementById('description').value = ''
        document.getElementById('file-input').value = ''

    }

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
    }

    UpdateCommentary = () => {
        this.setState({ textPost: document.getElementById('description').value })
    }

    UpdateImage = () => {

        this.setState({ imageBase64: URL.createObjectURL(document.getElementById('file-input').files[0]) });
    }

    render() {
        const { classes } = this.props;

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
                                        <label for="file-input">Sélectionner une image à uploader</label>
                                        <input type="file" id="file-input" name="image_uploads" accept=".jpg, .jpeg, .png" name="photo" onChange={this.UpdateImage} one />
                                    </div>
                                </form>
                                <br></br>
                                <br></br>
                                <label class="inp-textarea">
                                    <textarea id="description" name="mdp" type="text" required={true} class="inp-textarea" placeholder="&nbsp;" onChange={this.UpdateCommentary} />
                                    <span class="label-textarea">Description</span>
                                    <span class="border-textarea"></span>
                                </label>
                                <br></br>
                                <input onClick={this.submitPost} type="button" value="Valider" className="App-button" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <br></br>
                                    <Card className="App-card-post">
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
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                </div>
                            </Grid>
                        </Grid>
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


//<input id="file-input" className="App-button" type="file" text="jlkjklj" accept=".jpg, .jpeg, .png" name="photo" onChange={(e) => this.handleImageChange(e)} />