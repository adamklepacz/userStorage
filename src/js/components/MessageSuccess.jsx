import * as React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck);

const MessageSuccess = () => (
  <div className="user-message">
    <p className="user-message__success">
      <FontAwesomeIcon
        className="fa"
        icon={['fa', 'check']}
      />
        You have successfuly added an user.
    </p>
  </div>
);

export default MessageSuccess;
