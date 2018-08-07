import React, { Component } from 'react';
import PropTypes from 'prop-types';

class THEmail extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onEmailClick('email');
  }

  render() {
    return (
      <th colSpan="2" data-id="email" onClick={this.handleClick}>E-mail</th>
    );
  }
}

THEmail.propTypes = {
  onEmailClick: PropTypes.func,
};

export default THEmail;
