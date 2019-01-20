import React, { Component } from 'react';
import axios from 'axios';


//ajouter l'auteur
//ne fonctionne pas
function submitPost(form) {
    axios.post('http://localhost:5000/api/v1/posts/post', {
        img: {
            rel: "form.url.value",
            href: String,
        },
        texte: "form.description.value"
    })
        .then((res) => {
            console.log("post image");
        })
}


export default class Upload extends Component{
  handleClick=()=>{
    alert('upload a file');
    }




  render() {
      return <div className="App-corps">
              <h2>Charger un post</h2>
              <br></br>
              <form name="form" method="post" action="">
                  <label for="url">url de l'image:   </label>
                  <input name="url" id="url"/>
                  <br></br>
                  <br></br>
                  <label for="description">Entrez une description:  </label>
                  <textarea name="description" rows="4" cols="30" id="description" type="text" />
                  <br></br>
                  <br></br>
              <input onClick={submitPost(this.form)} type="button" value="Valider"/>
               </form>
            </div>
      }
 }