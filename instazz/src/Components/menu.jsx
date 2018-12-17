import React, { Component } from 'react';
import logo from '../asset/logo.png'

export default class Menu extends Component{
  handleClick=()=>{
    alert('I am alert, nice to meet you');
  }

  render() {
      return <div className="App-corps">
              <img src={logo}  alt="logo" />
              <p>Essayez InstaZZ</p> 
              <button onClick={this.handleClick} type="button">S'inscrire</button> 
              <button onClick={this.handleClick} type="button">Se connecter</button> 
            </div>
      }
 }