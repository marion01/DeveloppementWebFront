import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router";

class Connexion extends Component{
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    connexion = () => {

        //gerer le cas de vide
        let pseudo = document.getElementById('pseudo').value
        let mdp = document.getElementById('MotDePasse').value

        let body = {
            pseudo: pseudo,
            password: mdp
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        let url = 'http://localhost:5000/api/v1/login'
        axios.post(url, body, {
            headers: headers
        })
        .then((res) => {
            console.log("post login");
            console.log(res);
            localStorage.setItem("token", res.data.token);
            if (res.data.success) {
                this.props.handleConnexion();
                //redirection vers home
                this.props.history.push("/")
                console.log("connection réussie")
            } else {
                //afficher message erreur
                console.log("erreur de connection")
            }
           
        })
    }

    ComponentDidUpdate() {
        console.log("app.js")
    }



      render() {
            return (
                <div className="App-corps">
                        <h1>Connexion</h1>
                    <div>
                        <label>pseuso</label>
                              <input name="pseudo" id="pseudo" required={true}/>
                              <br></br>
                        <br></br>
                        <label>mdp</label>
                              <input name="MotDePasse" id="MotDePasse" required={true}/>
                        </div> 
                        <br></br>  
                        <br></br>  
                        <br></br>
                    <button onClick={this.connexion} type="button">Se connecter</button>
                  </div>

            );
      }
}

export default withRouter(Connexion)