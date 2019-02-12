import React, { Component } from 'react';
import axios from 'axios';


import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
      return (
          <div>
          <div className="App-ban">
              <h1>Ecrire un post</h1>
          </div>
          <div className="App-corps-card">
              <Paper className="App-paper" elevation={1}>
                  <form name="form" method="post" action="">
                      <div className="App-text-title">

                          <label class="inp">
                              <input name="Image" required={true} type="text" class="inp" placeholder="&nbsp;" />
                              <span class="label">Image</span>
                              <span class="border"></span>
                          </label>
                          <label class="inp-textarea">
                                  <textarea name="mdp" type="text" required={true} class="inp-textarea" placeholder="&nbsp;" />
                              <span class="label-textarea">Description</span>
                              <span class="border-textarea"></span>
                          </label>
                      </div>
                      <Typography component="p">
                          <br></br>
                          <button onClick={submitPost(this.form)} type="button" value="Valider" className="App-button">Envoyer le post</button>
                      </Typography>
                 </form>

              </Paper>
          </div>
          </div>
        );
    }
}