import React, { Component } from 'react';
import AppHeader from './AppHeader.jsx';
import UsersTable from './UsersTable.jsx';
import './UnamoApp.css';

class UnamoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUsers: [],
    };
    this.updateUsersData = this.updateUsersData.bind(this);
  }

  componentDidMount() {
    this.getUsersData();
  }

  getUsersData() {
    // get users data from API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((json) => {
        const apiUsers = json;

        this.setState({
          currentUsers: apiUsers,
        });
      });
  }

  updateUsersData(updatedUsers) {
    this.setState({
      currentUsers: updatedUsers,
    });
  }

  render() {
    return (
      <div className="unamo-app" >
        <AppHeader currentUsers={this.state.currentUsers} onUsersUpdate={this.updateUsersData} />

          <UsersTable currentUsers={this.state.currentUsers} onUsersUpdate={this.updateUsersData} />
      </div>
    );
  }
}

export default UnamoApp;
