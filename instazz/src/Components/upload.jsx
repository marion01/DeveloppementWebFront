import React, { Component } from 'react';
import axios from 'axios';


//ajouter l'auteur
//ne fonctionne pas
function submitPost(form) {
   /* axios.post('http://localhost:5000/api/v1/posts/post', {
        img: {
            rel: "form.url.value",
            href: String,
        },
        texte: "form.description.value"
    })
        .then((res) => {
            console.log("post image");
        })*/
}




export default class Upload extends Component{

    savePost = () => {
        console.log("savePost")
        let textPost = document.getElementById('description').value
        let date = new Date()
        var path = document.getElementById('file-input').value;
        if (path) {
            var startIndex = (path.indexOf('\\') >= 0 ? path.lastIndexOf('\\') : path.lastIndexOf('/'));
            var filename = path.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            console.log("nom du fichier" + filename);
        }


        let data = {
            img: {
                rel: filename,
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

    saveImage = () => {
        console.log("saveImage")
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
                    <input id="file-input" type="file" name="file" />
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