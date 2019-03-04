import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

/*
 * Component to handle error page
 */
export default class Error extends Component {

    /*
     * Display component
     */
    render() {
        return (
            <div>
                <div className="App-ban">
                    <h1>Erreur</h1>
                </div>
                <div className="App-corps-card">
                    <Paper className="App-paper" elevation={1}>
                        <div className="App-text-title">
                            <label className="App-p1">Cette page n'existe pas</label>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}