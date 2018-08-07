import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageError from './MessageError.jsx';
import UserExistMessage from './UserExistMessage.jsx';

class UserAddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMessageSuccess: false,
      isMessageError: false,
      userName: '',
      userEmail: '',
      currentUsers: this.props.currentUsers,
      showUserExistMessage: false,
      isFormSubmitted: false,
    };

    this.validateForm = this.validateForm.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.generateID = this.generateID.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
    this.checkIfUserExist = this.checkIfUserExist.bind(this);
    this.renderUserExisttMessage = this.renderUserExisttMessage.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isMessageSuccess !== prevState.isMessageSuccess) {
      this.props.onSubmit(this.state.isMessageSuccess);
    }
  }

  updateValue(e) {
    const currentInput = e.target.id;
    if (currentInput === 'userName') {
      this.setState({
        userName: e.target.value,
      });
    } else if (currentInput === 'userEmail') {
      this.setState({
        userEmail: e.target.value.trim(),
      });
    }
  }

  validateForm(e) {
    e.preventDefault();
    const userNameValue = this.state.userName.trim();
    const userEmailValue = this.state.userEmail.trim();

    // user name validation data
    const userNameRegExp = /^[a-zA-Z ]+$/;
    const isUserNameValueCorrect = userNameRegExp.test(userNameValue);

    // user email validation data
    const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const isEmailValueCorrect = emailRegExp.test(userEmailValue);

    if (isUserNameValueCorrect && isEmailValueCorrect) {
      this.setState({
        isFormSubmitted: true,
      }, this.addNewUser);
    } else {
      this.setState({
        isMessageError: true,
      });
    }
  }

  generateID() {
    const currentUsers = this.state.currentUsers;
    const newID = Math.floor(Math.random() * 999);

    currentUsers.map((currentUser) => {
      if (newID === currentUser.id) {
        this.generateID(currentUsers);
      }
      return newID;
    });

    return newID;
  }

  addNewUser() {
    const currentUsers = this.state.currentUsers;
    const newUser = {
      id: this.generateID(),
      name: this.state.userName,
      email: this.state.userEmail,
    };

    const ifUserExist = this.checkIfUserExist(newUser.email);

    if (ifUserExist) {
      currentUsers.push(newUser);
      this.setState({
        isMessageSuccess: true,
      });
    } else {
      this.setState({
        showUserExistMessage: true,
      });
    }

    this.props.onNewUser(this.state.currentUsers);
  }

  checkIfUserExist(newUserEmail) {
    const currentUsers = this.state.currentUsers;
    let ifUserExist = true;

    if (currentUsers.length !== 0) {
      currentUsers.map((user) => {
        if (user.email === newUserEmail) {
          ifUserExist = false;
        }
        return user;
      });
      return ifUserExist;
    }
    ifUserExist = true;
    return ifUserExist;
  }

  resetForm() {
    this.setState({
      userName: '',
      userEmail: '',
    });
  }

  renderResetInput() {
    const isNameFilled = this.state.userName.length !== 0;
    const isEmailFilled = this.state.userEmail.length !== 0;

    let resetField;
    if (isNameFilled || isEmailFilled) {
      resetField =
        (<input
          type="button"
          className="user-app__reset main-reset"
          value="Reset fields"
          onClick={this.resetForm}
        />);
      return resetField;
    }
    resetField = '';
    return resetField;
  }

  renderErrorMessage() {
    const showErrorMessage = this.state.isMessageError;

    if (showErrorMessage) {
      return <MessageError />;
    }
    return '';
  }

  renderUserExisttMessage() {
    const showUserExistMessage = this.state.showUserExistMessage;

    if (showUserExistMessage) {
      return <UserExistMessage />;
    }
    return '';
  }

  render() {
    const resetInput = this.renderResetInput();
    const errorMessage = this.renderErrorMessage();
    const showUserExistMessage = this.renderUserExisttMessage();
    return (
      <div>
        <form
          className="user-app__form"
          onSubmit={this.validateForm}
          ref={this.addNewUserForm}
        >
          <input
            autoFocus
            id="userName"
            type="text"
            className="user-app__input"
            placeholder="Name..."
            maxLength="20"
            value={this.state.userName}
            onChange={this.updateValue}
          />
            <input
              id="userEmail"
              type="text"
              className="user-app__input"
              placeholder="Email..."
              value={this.state.userEmail}
              onChange={this.updateValue}
            />
              <input
                type="submit"
                className="user-app__submit main-button main-button--large main-button--green"
                value="Submit"
              />
          { resetInput }
        </form>
        { errorMessage }
        { showUserExistMessage }
      </div>
    );
  }
}

UserAddForm.propTypes = {
  currentUsers: PropTypes.array,
  onNewUser: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default UserAddForm;
