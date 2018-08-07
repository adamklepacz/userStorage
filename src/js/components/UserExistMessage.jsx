import * as React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faExclamationCircle);

const UserExistMessage = () => (
  <div className="user-message">
    <p className="user-message__error">
      <FontAwesomeIcon
        className="fa"
        icon={['fa', 'exclamation-circle']}
      />
        This user allready exists.
    </p>
  </div>
);

export default UserExistMessage;
