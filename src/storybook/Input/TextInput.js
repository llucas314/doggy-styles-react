import React from 'react';
import './TextInput.css';

class TextInput extends React.Component {
  render() {
    return (
      <input 
        type='text' 
        name={this.props.name}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
      />
    );
  }
};

export default TextInput;