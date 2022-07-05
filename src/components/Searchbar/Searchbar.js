import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchForm from 'components/SearchForm';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  render() {
    const { onFormSubmit } = this.props;

    return (
      <header className={s.searchbar}>
        <SearchForm onFormSubmit={onFormSubmit} />
      </header>
    );
  }

  static propTypes = { onFormSubmit: PropTypes.func.isRequired };
}
