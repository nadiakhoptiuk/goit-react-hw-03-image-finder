import React, { Component } from 'react';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import Section from 'components/Section';
import Modal from 'components/Modal';
import s from './App.module.css';

export default class App extends Component {
  state = { searchPhrase: '', showModal: false, openedImage: {} };

  handleFormSubmit = enteredPhrase => {
    this.setState({ searchPhrase: enteredPhrase });
  };

  createModal = selectedImage => {
    this.setState({ openedImage: selectedImage });
    this.toggleModal();
  };

  onBackdropClose = evt => {
    if (evt.target === evt.currentTarget) {
      this.toggleModal();
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { searchPhrase, showModal, openedImage } = this.state;

    return (
      <>
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        <main>
          <Section>
            <ImageGallery
              searchPhrase={searchPhrase}
              onImageClick={this.createModal}
            />
          </Section>
        </main>
        {showModal && (
          <Modal
            onEscClose={this.toggleModal}
            onBackdropClose={this.onBackdropClose}
          >
            <img
              className={s.modalImage}
              src={openedImage.largeImageURL}
              alt={openedImage.tags}
              width={1280}
            />
          </Modal>
        )}
      </>
    );
  }
}
