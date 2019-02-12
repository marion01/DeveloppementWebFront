import React, { Component } from 'react';
import logo from '../asset/logo.png'

export default class Menu extends Component{
  handleClick=()=>{
    alert('I am alert, nice to meet you');
  }

  render() {
      return <div className="App-corps">
              <img src={logo}  alt="logo" />
              <p>Bienvenue !!! Vous etes bien connecte !! </p> 
            </div>
      }
 }