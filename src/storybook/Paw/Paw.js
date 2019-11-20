import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import './Paw.css';

class Paw extends React.Component {
  render() {
    return <FontAwesomeIcon icon={faPaw} />;
  }
};

export default Paw;