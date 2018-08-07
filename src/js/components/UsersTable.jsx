import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import THEmail from './THEmail.jsx';
import THUsername from './THUsername.jsx';
import './UsersTable.css';

library.add(faTimes);

class UsersTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUsers: [],
      emailClickCount: 1,
      usernameClickCount: 1,
    };

    this.renderTableRecord = this.renderTableRecord.bind(this);
    this.sortCurrentUsers = this.sortCurrentUsers.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUsers.length !== this.props.currentUsers.length) {
      this.updateCurrentUsers();
    }
  }

  updateCurrentUsers() {
    const currentUsers = this.props.currentUsers;
    this.setState({
      currentUsers,
    });
  }

  removeUser(userid) {
    const currentUsers = this.state.currentUsers;
    currentUsers.map((user, index) => (user.id === userid ? currentUsers.splice(index, 1) : ''));

    this.setState({
      currentUsers,
    });

    // update props
    this.props.onUsersUpdate(this.state.currentUsers);
  }

  sortCurrentUsers(direction, column) {
    const currentUsers = this.state.currentUsers;

    currentUsers.sort((a, b) => {
      let userAProp;
      let userBProp;

      // set criteria
      if (column === 'email') {
        userAProp = a.email.toLowerCase();
        userBProp = b.email.toLowerCase();
      } else if (column === 'username') {
        userAProp = a.name.toLowerCase();
        userBProp = b.name.toLowerCase();
      }

      // set direction
      if (direction) {
        // sort from A to Z
        if (userAProp < userBProp) return -1;
        if (userAProp > userBProp) return 1;
        return 0;
      }
      // sort from Z to A
      if (userAProp > userBProp) return -1;
      if (userAProp < userBProp) return 1;
      return 0;
    });

    this.setState({
      currentUsers,
    });
  }

  handleSort(column) {
    let counter;

    // check if current column is clicked odd or even
    if (column === 'email') {
      this.setState({
        emailClickCount: this.state.emailClickCount + 1,
      });
      counter = this.state.emailClickCount;
    } else if (column === 'username') {
      this.setState({
        usernameClickCount: this.state.usernameClickCount + 1,
      });
      counter = this.state.usernameClickCount;
    }

    // call sort method, depens on click count and column name
    if (counter % 2 === 0) {
      switch (column) {
        case 'email':
          this.sortCurrentUsers(false, 'email');
          break;
        case 'username':
          this.sortCurrentUsers(false, 'username');
          break;
        default:
      }
    } else {
      switch (column) {
        case 'email':
          this.sortCurrentUsers(true, 'email');
          break;
        case 'username':
          this.sortCurrentUsers(true, 'username');
          break;
        default:
      }
    }
  }

  renderTableRecord() {
    const areNoUsers = this.state.currentUsers.length === 0;
    const currentUsers = this.state.currentUsers;

    if (areNoUsers) {
      return <tr><td>There are no users. Add some.</td></tr>;
    }
    return (
      currentUsers.map((user, index) =>
        (
          <tr key={index}>
            <td><span>{index + 1}</span></td>
              <td>{user.name}</td>
                <td>{user.email}</td>
                  <td>
                    <button className="button-delete" onClick={() => this.removeUser(user.id)}>
                      <FontAwesomeIcon className="fa" icon={['fa', 'times']} />
                    </button>
                  </td>
          </tr>
        ))
    );
  }

  render() {
    const tableRecord = this.renderTableRecord();

    return (
      <div className="user-table">
        <table className="table">
          <tbody>
            <tr className="table__header">
              <th>LP</th>
                <THUsername onUsernameClick={this.handleSort} />
                  <THEmail onEmailClick={this.handleSort} />
            </tr>

            { tableRecord }

          </tbody>
        </table>
      </div>
    );
  }
}

UsersTable.propTypes = {
  currentUsers: PropTypes.array,
  onUsersUpdate: PropTypes.func,
};

export default UsersTable;
