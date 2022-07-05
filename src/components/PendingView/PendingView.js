import React, { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { MutatingDots } from 'react-loader-spinner';
import s from './PendingView.module.css';

export default class PendingView extends Component {
  render() {
    return (
      <div className={s.loaderWrapper}>
        <MutatingDots aria-label="loading indicator" />
      </div>
    );
  }
}
