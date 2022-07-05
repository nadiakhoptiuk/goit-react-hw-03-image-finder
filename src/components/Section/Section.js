import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../Container';
import s from './Section.module.css';

export default class Section extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <section className={s.section}>
        <Container>
          <h1 className={title ? s.title : s.hidden}>{title}</h1>
          {children}
        </Container>
      </section>
    );
  }

  static propTypes = {
    title: PropTypes.string,
  };
}
