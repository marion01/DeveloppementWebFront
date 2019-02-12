import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
  

export default class Profil extends Component{

    render() {  

        return (
            <div>
                <div className="App-ban">
                    <h1>Mon Profil</h1>
                </div>
                <div className="App-corps-card">
                    <Paper className="App-paper" elevation={1}>
                        <div className="App-text-title">

                        </div>

                    </Paper>
                </div>
            </div>
        );
    }
}