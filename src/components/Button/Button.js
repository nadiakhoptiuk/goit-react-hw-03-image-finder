import React, { Component } from 'react';
import s from './Button.module.css';

export default class Button extends Component {
  render() {
    const { onLoadMoreClick } = this.props;

    return (
      <button type="button" className={s.button} onClick={onLoadMoreClick}>
        {this.props.title}
      </button>
    );
  }
}
