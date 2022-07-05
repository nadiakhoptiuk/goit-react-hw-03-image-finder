import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { url, alt } = this.props;

    return <img className={s.galleryImage} src={url} alt={alt} />;
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };
}
