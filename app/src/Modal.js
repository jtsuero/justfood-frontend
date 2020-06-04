import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
const photoKey = `AIzaSyC3qAdwyGSoamVwR7DIS5VdmhVZlg1NBic`;

export default class Modal extends Component {
  constructor() {
    super();
    this.state = {
      photoIndex: null,
      photoLink: null,
    };
  }

  componentDidMount() {
    this.setState({photoIndex: this.props.photoIndex});
    window.addEventListener('keydown', this.handleKeyPress);
    this.getPhoto();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.keyCode === 39) {
      //right arrow key
      this.changePhoto(this.state.photoIndex + 1);
    }
    if (event.keyCode === 37) {
      //left arrow key
      this.changePhoto(this.state.photoIndex - 1);
    }
    if (event.keyCode === 27) {
      //escape key
      this.props.closeModal();
    }
  };

  changePhoto = photoIndex => {
    if (photoIndex === -1 || photoIndex > this.props.photos.length) return null;
    this.getPhoto(photoIndex);
  };

  getPhoto = (photoIndex = this.props.photoIndex) => {
    if (photoIndex === -1 || photoIndex >= this.props.photos.length)
      return null;
    let photoLink = this.props.photos[photoIndex];
    this.setState({photoLink, photoIndex});
  };

  render() {
    let leftButton = (
      <FontAwesomeIcon
        icon={faArrowCircleLeft}
        className="modal-photo-change-button-left"
        onClick={() => {
          this.changePhoto(this.state.photoIndex - 1);
        }}
      />
    );
    let rightButton = (
      <FontAwesomeIcon
        icon={faArrowCircleRight}
        className="modal-photo-change-button-right"
        onClick={() => {
          this.changePhoto(this.state.photoIndex + 1);
        }}
      />
    );
    if (this.state.photoIndex === 0) {
      leftButton = null;
    }
    if (this.state.photoIndex === this.props.photos.length - 1) {
      rightButton = null;
    }
    return ReactDOM.createPortal(
      <div className="modal-container">
        <div className="modal-background" onClick={this.props.closeModal}></div>
        <img
          className="modal-food-image"
          src={this.state.photoLink}
          alt={'new'}
        />
        <FontAwesomeIcon
          className="modal-close-button"
          icon={faTimes}
          onClick={this.props.closeModal}
        />
        {leftButton}
        {rightButton}
      </div>,
      document.getElementById('modal-root'),
    );
  }
}
