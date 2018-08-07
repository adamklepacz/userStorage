import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle);

class AddButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUsers: this.props.currentUsers,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUsers.length !== this.props.currentUsers.length) {
      this.updateUsers(this.props.currentUsers);
    }
  }

  updateUsers(currentUsers) {
    this.setState({
      currentUsers,
    });
  }

  render() {
    const isButtonDisabled = this.state.currentUsers.length > 9;
    return (
      <button
        className="main-button main-button__add"
        onClick={this.props.onClick}
        disabled={isButtonDisabled}
      >
        <FontAwesomeIcon
          className="fa"
          icon={['fa', 'plus-circle']}
        />
          <span>Add a user</span>
      </button>
    );
  }
}

AddButton.propTypes = {
  currentUsers: PropTypes.array,
  onClick: PropTypes.func,
};

export default AddButton;
