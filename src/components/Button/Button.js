import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  static propTypes = {
    onLoadMoreClick: PropTypes.func.isRequired,
  };
}
