import * as React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

library.add(faBan);

const LimitMessage = () => (
  <div className="user-message">
    <FontAwesomeIcon
      className="fa"
      icon={['fa', 'ban']}
    />
        You have reached the limit of users.
  </div>
);

export default LimitMessage;
