import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormulaireInput extends Component{

      static defaultProps = {
            name: 'nom',
            required: false   
      }

      static propTypes = {
            name: PropTypes.string.isRequired,
            required: PropTypes.bool,
      }

      constructor(props){
            super(props);
            this.state = {value: ''};
      }

      handleChange = ({ target: {value } }) => {
            this.setState({value});
      }
      
      render() {
          const {name, required } = this.props;
          const {value } = this.state;
            return (
                <label>
                    {name}
                    <br></br>
                    <input  
                        name={name}
                        onChange={this.handleChange}
                        required={required}
                        type="text"
                        value={value} 
                    />  
                </label>   

            );
      }
 }