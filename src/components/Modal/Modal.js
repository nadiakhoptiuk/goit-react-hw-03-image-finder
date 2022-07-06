import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  onBackdropClose = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onModalClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.classList.add('modal-is-open');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.classList.remove('modal-is-open');
  }

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={s.overlay} onClick={this.onBackdropClose}>
        <div className={s.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }

  static propTypes = { onModalClose: PropTypes.func.isRequired };
}
