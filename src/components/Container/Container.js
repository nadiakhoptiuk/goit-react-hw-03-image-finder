import React, { Component } from 'react';
import s from './Container.module.css';

export default class Container extends Component {
  render() {
    const { children } = this.props;

    return <div className={s.container}>{children}</div>;
  }
}
