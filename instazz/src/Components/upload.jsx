import React, { Component } from 'react';
import axios from 'axios';

export default class Upload extends Component{

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


  render() {
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
              <input onClick={this.submitPost} type="button" value="Valider"/>
               </div>
            </div>
      }
 }