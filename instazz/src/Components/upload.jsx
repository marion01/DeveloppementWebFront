import React, { Component } from 'react';
import axios from 'axios';


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
        file: ''
    }

    savePost = () => {
        console.log("savePost")
        let textPost = document.getElementById('description').value
        let date = new Date()
        let file = document.getElementById('file-input')

        let imageName = date.toDateString() + "-" + file.files[0].name;

        console.log("image: " + imageName)

        let data = {
            img: {
                rel: imageName,
                //href: String,
            },
            texte: textPost,
            date: date.toDateString(),
            auteur: {
                pseudo: "utilisateur conecté",
                //ref:
            }
        }

        console.log(data)
        let url = 'http://localhost:5000/api/v1/posts/post'

        axios.post(url, data)
            .then((res) => {
                console.log("post image");
            })
    }


    uploadSuccess = ({ data }) => {
        //faire qqch
        console.log("réussite")
}

    uploadFail = (error) => {
        //faire qqch
        console.log("echec")
    }


    saveImage= () => {
        console.log("saveImage")
        let file = document.getElementById('file-input').files[0];
        let data = new FormData();
        data.append('photo', file)
        let url = 'http://localhost:5000/api/v1/posts/postImage';
        axios.post(url, data)
            .then(response => this.uploadSuccess(response))
            .catch(error => this.uploadFail(error));
    }

    submitPost = () => {
        this.savePost()
        this.saveImage()
    }

    miseAJourPreview = () => {
        console.log("test")
        this.setState({previewClicked: true})

        let date = new Date()

        this.setState({ date: date.toDateString() })
        console.log(this.state.date)

        this.setState({ textPost: document.getElementById('description').value })

        let file = document.getElementById('file-input').files[0];
        this.setState({file: file})
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
                            <Avatar aria-label="Recipe" className={classes.avatar}>R</Avatar>
                        }
                        title="utilisateur connecté"
                        subheader={this.state.date}
                    />
                    <CardMedia
                        className={classes.media}
                        image={this.state.file}
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
              <h2>Charger un post</h2>
              <br></br>
              <div name="form">
                   <input id="file-input" type="file" name="photo" />
                  <br></br>
                  <br></br>
                  <label htmlFor="description">Entrez une description:  </label>
                  <textarea name="description" rows="4" cols="30" id="description" type="text" />
                  <br></br>
                  <br></br>
              <input onClick={this.submitPost} type="button" value="Valider" />
              <input onClick={this.miseAJourPreview} type="button" value="Visualisation" />
               </div>

          {message}
            </div>
      }
}


Upload.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Upload);