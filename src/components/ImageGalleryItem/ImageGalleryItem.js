import React, { Component } from 'react';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { url, alt } = this.props;

    return <img className={s.galleryImage} src={url} alt={alt} />;
  }
}
