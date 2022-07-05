import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import s from './SearchForm.module.css';

export default class SearchForm extends Component {
  state = {
    enteredPhrase: '',
  };

  handleInputChange = evt => {
    const enteredPhrase = evt.currentTarget.value;
    this.setState({ enteredPhrase: enteredPhrase });
  };

  handleSubmit = evt => {
    const { onFormSubmit } = this.props;
    const { enteredPhrase } = this.state;

    evt.preventDefault();
    onFormSubmit(enteredPhrase);
    this.formReset();
  };

  formReset = () => {
    this.setState({ enteredPhrase: '' });
  };

  render() {
    const { enteredPhrase } = this.state;

    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <button type="submit" className={s.button} aria-label="search button">
          <BsSearch size={20} />
        </button>

        <input
          className={s.input}
          type="text"
          value={enteredPhrase}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleInputChange}
        />
      </form>
    );
  }

  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };
}
