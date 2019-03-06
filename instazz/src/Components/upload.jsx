import React, { Component } from 'react';
import axios from 'axios';
import ErrorMessage from './errorMessage'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

/*
 * Component to handle upload page
 */
class Upload extends Component {

    // Variables for the component
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
        },
        loading: true
    }

    /*
     * Send a request to the API to save a post
     */
    savePost = async () => {
        try {

            // Get infos
            let textPost = document.getElementById('description').value
            let date = new Date()
            let dateISO = this.newISODate()
            let file = document.getElementById('file-input')

            // The description or the image hasn't been selected
            if (file.files.length === 0 || textPost === '') {
                return false;
            }

            let imageName = date.toDateString() + "-" + file.files[0].name;

            // Body for the call
            let body = {
                img: {
                    rel: imageName
                },
                texte: textPost,
                date: dateISO,
                auteur: {
                    pseudo: this.state.pseudo,
                    ref: this.state.id
                }
            }

            // Url for the call
            let url = localStorage.getItem("baseRoute") + 'posts/post'

            // Get token
            const access_token = localStorage.getItem("token");

            // Options for the call
            const options = {
                method: "post",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url,
                data: body
            };

            // API call
            await axios(options);
            return true;

        } catch (err) {
            console.log(err)
        }
    };

    /*
     * Store the image of the post on server
     */
    saveImage = async () => {
        try {

            // Get infos
            let file = document.getElementById('file-input').files[0];
            let body = new FormData();
            body.append('photo', file);

            // Url for the call
            let url = localStorage.getItem("baseRoute") + 'posts/postImage';

            // Get token
            const access_token = localStorage.getItem("token");

            // Options for the call
            const options = {
                method: "post",
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json"
                },
                url: url,
                data: body
            };

            // Call API
            await axios(options);

        } catch (err) {
            console.log(err)
        }
    };

    /*
     * Update the info message
     */
    updateInfoMessage = (open, type, message) => {
        this.setState({
            infoMessage: {
                open: open,
                type: type,
                message: message
            },
        });
    }

    /*
     * Submit a request to save the post
     */
    submitPost = async () => {
        let postSucceed;

        // Save in dataBase
        postSucceed = await this.savePost()
        if (postSucceed) {
            this.saveImage()

            // Clear the uploadPage
            this.clearPage()

            this.updateInfoMessage(true, "success", "votre post a bien été enregistré")
        } else {
            // Display an error message
            this.updateInfoMessage(true, "error", "l'image ou la description est manquante")
        }
    }

    /*
     * Clear all the element of the page for a new post
     */
    clearPage = () => {
        document.getElementById('description').value = ''
        document.getElementById('file-input').value = ''
        this.setState({ textPost: '' })
        this.setState({ imageBase64: "entrer une image" })
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
     * Get the right format for the date
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
     * Set up parameters before displaying the component
     */
    componentDidMount() {
        // Calcul date
        var date = this.newISODate()
        date = this.displayDate(date)
        this.setState({ date: date })

        // Get pseudo connected
        const pseudo = localStorage.getItem("pseudo");
        this.setState({ pseudo: pseudo })

        // Get user Id
        const id = localStorage.getItem("id");
        this.setState({ id: id })

        // Get First Letter of user pseudo
        this.setState({ firstLetterPseudo: pseudo.charAt(0).toUpperCase() })

        // Iniatialize image to not have an empty img attribute
        this.setState({ imageBase64: "entrer une image" });

        this.setState({ loading: false })
    }

    /*
     * Update description of the post in the visualisation
     */
    UpdateCommentary = () => {
        this.setState({ textPost: document.getElementById('description').value })
    }

    /*
     * Update image of the post in the visualisation
     */
    UpdateImage = () => {
        if (document.getElementById('file-input').files.length !== 0) {
            this.setState({ imageBase64: URL.createObjectURL(document.getElementById('file-input').files[0]) });
        }
    }

    /*
     * Display the component
     */
    render() {
        var card;

        // Get content
        if (this.state.loading) {
            card = <div>Loading...</div>;
        } else {
            card = <Card className="App-card-post">
                <CardHeader
                    avatar={
                        <div className="App-Avatar-xl"><div>{this.state.firstLetterPseudo}</div></div>
                    }
                    title={this.state.pseudo}
                    subheader={this.state.date}
                />
                <CardMedia id="image-post"
                    className="App-upload-media"
                    image={this.state.imageBase64}
                />
                <CardContent>
                    <Typography component="p">{this.state.textPost}</Typography>
                </CardContent>
            </Card>
        }

        // Return the component
        return (
            <div>
                <div className="App-ban">
                    <h1>Ecrire un post</h1>
                </div>
                <div className="App-corps-card">
                    <Paper className="App-paper" elevation={1}>
                        <Grid container className="App-grid-post" spacing={24}>
                            <Grid item xs={12} sm={6}>
                                <label className="App-h2">Votre post</label>
                                <br></br>
                                <br></br>
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
                                    <label className="App-h2">Prévisualisation du post</label>
                                    <br></br>
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

export default Upload;
