import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LimitMessage from './LimitMessage.jsx';
import UserAddForm from './UserAddForm.jsx';
import MessageSuccess from './MessageSuccess.jsx';
import AddButton from './AddButton.jsx';
import './Messages.css';

class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddButtonVisible: true,
      isFormVisible: false,
      showSuccesMessage: false,
      currentUsers: [],
    };

    this.showForm = this.showForm.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.bind = this.renderAddButton.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUsers !== this.props.currentUsers) {
      this.updateUsers(this.props.currentUsers);
    }
  }

  hideSuccessMessage() {
    setTimeout(
      () => {
        this.setState({
          showSuccesMessage: false,
          isAddButtonVisible: true,
        });
      },
      2000,
    );
  }

  updateUsers(currentUsers) {
    this.setState({
      currentUsers,
    });
    this.props.onUsersUpdate(currentUsers);
  }

  handleFormSubmission(isMessageSuccess) {
    this.setState({
      showSuccesMessage: isMessageSuccess,
      isFormVisible: false,
    }, this.hideSuccessMessage);
  }

  showForm() {
    this.setState({
      isFormVisible: true,
      isAddButtonVisible: false,
    });
  }

  renderAddForm() {
    if (this.state.isFormVisible) {
      return (
        <UserAddForm
          onSubmit={this.handleFormSubmission}
          currentUsers={this.state.currentUsers}
          onNewUser={this.updateUsers}
        />
      );
    }
  }

  renderSuccessMessage() {
    if (this.state.showSuccesMessage) {
      return (
        <MessageSuccess />
      );
    }
  }

  renderLimitMessage() {
    if (this.state.currentUsers.length >= 10) {
      return (
        <LimitMessage />
      );
    }
  }

  renderAddButton() {
    const isAddButtonVisible = this.state.isAddButtonVisible;

    if (isAddButtonVisible) {
      return (
        <AddButton
          onClick={this.showForm}
          currentUsers={this.state.currentUsers}
        />
      );
    }
  }

  render() {
    const addButton = this.renderAddButton();
    return (
      <div className="unamo-app__header">
        <div className="user-app__add">
          {addButton}
          {this.renderLimitMessage()}
        </div>

        {this.renderAddForm()}

        {this.renderSuccessMessage()}
      </div>
    );
  }
}

AppHeader.propTypes = {
  currentUsers: PropTypes.array,
  onUsersUpdate: PropTypes.func,
};

export default AppHeader;
