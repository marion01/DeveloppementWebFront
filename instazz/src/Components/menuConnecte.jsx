﻿import React, { Component } from 'react';
import logo from '../asset/logo.png'
import Paper from '@material-ui/core/Paper';

/**
 * Component to handle menu page when user is connected
 */
export default class Menu extends Component{
  handleClick=()=>{
    alert('I am alert, nice to meet you');
    }
    state = {
        pseudo: '',
        firstLetterPseudo: ''
    };

    componentDidMount() {
        let pseudo = localStorage.getItem("pseudo")
        this.setState({ pseudo: pseudo })
        this.setState({ firstLetterPseudo: pseudo.charAt(0).toUpperCase() });
    }

    render() {
        return (
            <div>
            <div className="App-ban">
                <img src={logo} alt="logo" className="App-ban-img" />
                <p>InstaZZ</p>
            </div>
            <div className="App-corps-card">
                <Paper className="App-paper" elevation={1}>
                        <label className="App-h1">Bienvenue {this.state.pseudo} sur Instazz!</label>
                        <label className="App-p1">Vous êtes bien connecté !!</label>
                </Paper>
                </div>
            </div>
        );}
 }