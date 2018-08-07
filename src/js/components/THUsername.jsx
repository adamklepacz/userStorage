import React, { Component } from 'react';
import PropTypes from 'prop-types';


class THUsername extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onUsernameClick('username');
  }

  render() {
    return (
      <th data-id="username" onClick={this.handleClick}>User</th>
    );
  }
}

THUsername.propTypes = {
  onUsernameClick: PropTypes.func,
};

export default THUsername;
