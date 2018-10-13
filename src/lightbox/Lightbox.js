import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import './lightbox.css';

class Lightbox extends Component {
  constructor(props) {
    super(props);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  // When the user clicks on the overlay we need to close the lightbox.
  handleOutsideClick(event) {
    const { onClose } = this.props;
    const overlayReceivedClick = (this.lightbox && !this.lightbox.contains(event.target)) &&
      (this.overlay && this.overlay.contains(event.target));

    if (overlayReceivedClick) {
      onClose();
    }
  }

  // When the escape key triggers a keyboard event we need to close the lightbox.
  handleKeyUp(event) {
    const { onClose } = this.props;
    const keys = {
      27: () => {
        onClose();
      }
    };

    if (keys[event.keyCode]) {
      keys[event.keyCode]();
    }
  }

  render() {
    const { onClose, show, children } = this.props;
    if (!show) {
      return null;
    }

    return (
      <div
        className="overlay"
        onClick={this.handleOutsideClick}
        onKeyUp={this.handleKeyUp}
        ref={node => (this.overlay = node) && node.focus()}
        tabIndex="0">
        <div
          className="lightbox"
          ref={node => (this.lightbox = node)}>
          {children}
          <button
            className="close-button"
            onClick={onClose}
            type="button"
          >
            &#10006;
          </button>
        </div>
      </div>
    );
  }
}

Lightbox.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Lightbox;
