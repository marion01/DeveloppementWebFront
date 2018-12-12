import React, { Component } from 'react';
import Popup from 'react-popup';

export default class Button extends Component{
  handleClick=()=>{
    console.log("test"); 
    alert('I am alert, nice to meet you');
  }

  render() {
      return <div>
              <button onClick={this.handleClick} type="button">We win!</button> 
            </div>
      }
 }