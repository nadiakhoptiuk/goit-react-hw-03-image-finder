import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  handleKeyDown = evt => {
    console.log(evt.code);

    if (evt.code === 'Escape') {
      this.props.onEscClose();
    }
  };

  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { children, onBackdropClose } = this.props;

    return createPortal(
      <div className={s.overlay} onClick={onBackdropClose}>
        <div className={s.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}
