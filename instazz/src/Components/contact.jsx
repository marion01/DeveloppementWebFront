import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

export default class Contact extends Component{

    render() {  

        return (
            <div>
                <div className="App-ban">
                    <h1>Contact</h1>
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