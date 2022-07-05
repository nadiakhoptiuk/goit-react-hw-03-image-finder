import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PendingView from 'components/PendingView';
import ImageGalleryItem from 'components/ImageGalleryItem';
import ErrorView from 'components/ErrorView';
import Button from 'components/Button';
import s from './ImageGallery.module.css';

const STATUS_OPTIONS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '27979980-56564682deb2f4cc3aa0cce1c';
const PER_PAGE = 12;
let PAGE = 1;

const searchParams = (value, page) =>
  new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: value.trim(),
    per_page: PER_PAGE,
    page: page,
  });

export default class ImageGallery extends Component {
  state = { status: 'idle', images: [], countOfPages: null };

  fetchImages = async (searchPhrase, page) => {
    const res = await fetch(`${API_URL}?&${searchParams(searchPhrase, page)}`);
    const parsedRes = await res.json();
    const arrayOfImages = await parsedRes.hits;
    const totalImages = await parsedRes.totalHits;
    const countOfPages = Math.ceil(totalImages / PER_PAGE);
    this.setState({ countOfPages: countOfPages });
    return arrayOfImages;
  };

  handleFetchResult = result => {
    if (result.length === 0) {
      this.setState({ status: STATUS_OPTIONS.REJECTED });
      return;
    }

    this.setState({ status: STATUS_OPTIONS.RESOLVED });
    const newImages = result.map(
      ({ id, webformatURL, largeImageURL, tags }) => {
        return { id, webformatURL, largeImageURL, tags };
      }
    );
    return newImages;
  };

  handleLoadMoreClick = async evt => {
    PAGE += 1;
    const { searchPhrase } = this.props;
    const { images } = this.state;

    this.setState({ status: STATUS_OPTIONS.PENDING });
    const result = await this.fetchImages(searchPhrase, PAGE);
    const newImages = this.handleFetchResult(result);
    this.setState({ images: [...images, ...newImages] });
  };

  handleImageClick = evt => {
    const { images } = this.state;
    const { onImageClick } = this.props;

    const selectedImage = images.find(
      image => image.id === Number(evt.currentTarget.id)
    );
    onImageClick(selectedImage);
  };

  componentDidMount() {
    this.setState({ status: STATUS_OPTIONS.IDLE });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchPhrase } = this.props;

    if (prevProps.searchPhrase !== searchPhrase) {
      this.setState({ status: STATUS_OPTIONS.PENDING, images: [] });

      PAGE = 1;
      const result = await this.fetchImages(searchPhrase, PAGE);
      const newImages = this.handleFetchResult(result);
      this.setState({ images: newImages });
    }
  }

  render() {
    const { status, images, countOfPages } = this.state;

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.gallery}>
            {images.map(image => (
              <li
                key={image.id}
                id={image.id}
                onClick={this.handleImageClick}
                className={s.galleryItem}
              >
                <ImageGalleryItem url={image.webformatURL} alt={image.tags} />
              </li>
            ))}
          </ul>
          {countOfPages > PAGE ? (
            <Button
              title="Load more"
              onLoadMoreClick={this.handleLoadMoreClick}
            ></Button>
          ) : null}
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <ul className={s.gallery}>
            {images?.map(image => (
              <li
                key={image.id}
                id={image.id}
                onClick={this.handleImageClick}
                className={s.galleryItem}
              >
                <ImageGalleryItem url={image.webformatURL} alt={image.tags} />
              </li>
            ))}
          </ul>
          <PendingView />
        </>
      );
    }

    if (status === 'rejected') {
      return <ErrorView />;
    }
  }

  static propTypes = {
    searchPhrase: PropTypes.string,
    onImageClick: PropTypes.func.isRequired,
  };
}
