import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import './Dog.css';

class Dog extends React.Component {
  render() {
    return <FontAwesomeIcon icon={faDog} />;
  }
};

export default Dog;