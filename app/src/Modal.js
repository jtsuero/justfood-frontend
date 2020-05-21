import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

export default class Modal extends Component {
  constructor() {
    super();
    this.state = {
      photo: null,
    };
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal-container">
        <div className="modal-background" onClick={this.props.closeModal}></div>
        <img
          className="modal-food-image"
          src={this.props.photoLink}
          alt={'new'}
        />
        <FontAwesomeIcon
          className="modal-close-button"
          icon={faTimes}
          onClick={this.props.closeModal}
        />
      </div>,
      document.getElementById('modal-root'),
    );
  }
}
