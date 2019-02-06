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
        width: '50vw',
        transitionDuration: '0.3s',
    },

    commentaire: {
        resize: 'vertical',
        width: '40vw'
    },
});

class Upload extends Component{
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

            console.log("image: " + imageName)

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

            console.log(body)
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
            alert("erreur");
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
            alert("erreur");
            console.log("echec post image")
            console.log(err)
        }
    };

    submitPost = () => {
        this.savePost()
        this.saveImage()
    }

    miseAJourPreview = () => {
        this.setState({previewClicked: true})

        this.setState({ textPost: document.getElementById('description').value })

        //calcul image base 64 a afficher
        var buffer = this.state.imageBase64updated
        buffer = 'data:image/jpg;base64,' + buffer
        this.setState({ imageBase64: buffer })
    }

    handleImageChange = () => {
        var f = document.getElementById('file-input').files[0]; // FileList object
        var reader = new FileReader();

        const scope = this
        reader.onload = (function (theFile) {
            return function (e) {
                var binaryData = e.target.result;
                //Converting Binary Data to base 64
                var base64String = window.btoa(binaryData);
                //saving base64
                scope.setState({ imageBase64updated: base64String });
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsBinaryString(f);
        
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
        this.setState({ date: date})

        //recup pseudo connecté
        const pseudo = localStorage.getItem("pseudo");
        this.setState({ pseudo: pseudo })

        //recup id connecté
        const id = localStorage.getItem("id");
        this.setState({ id: id })

        //recup firstLetter pseudo
        this.setState({ firstLetterPseudo: pseudo.charAt(0).toUpperCase() })
    }



    render() {
        const { classes } = this.props;
        var message;

        if (this.state.previewClicked) {
            message = <div>
                <br></br>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>{this.state.firstLetterPseudo}</Avatar>
                        }
                        title={this.state.pseudo}
                        subheader={this.state.date}
                    />
                    <CardMedia
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
        } else {
            message = <div></div>
        }
        
        return <div className="App-corps">
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <h2>Charger un post</h2>
                  <br></br>
                  <div name="form">
                  <input id="file-input" type="file" name="photo" onChange={(e) => this.handleImageChange(e)}/>
                      <br></br>
                      <br></br>
                      <label htmlFor="description">Entrez une description:  </label>
                      <textarea name="description" rows="4" cols="30" id="description" type="text" />
                      <br></br>
                      <br></br>
                  <input onClick={this.submitPost} type="button" value="Valider" />
                  <input onClick={this.miseAJourPreview} type="button" value="Visualisation" />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {message}
                </Grid>
            </Grid>
            </div>
      }
}


Upload.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Upload);