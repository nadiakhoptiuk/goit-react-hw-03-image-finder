import React, { Component } from 'react';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import Section from 'components/Section';
// import s from './App.module.css';

export default class App extends Component {
  state = { searchPhrase: '' };

  handleFormSubmit = enteredPhrase => {
    this.setState({ searchPhrase: enteredPhrase });
  };

  render() {
    const { searchPhrase } = this.state;

    return (
      <>
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        <main>
          <Section>
            <ImageGallery searchPhrase={searchPhrase} />
          </Section>
        </main>
      </>
    );
  }
}
