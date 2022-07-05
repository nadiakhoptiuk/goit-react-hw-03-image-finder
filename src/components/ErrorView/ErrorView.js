import React, { Component } from 'react';
import s from './ErrorView.module.css';

export default class ErrorView extends Component {
  render() {
    return (
      <p className={s.errorMessage}>No images were found for your request...</p>
    );
  }
}
