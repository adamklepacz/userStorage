import * as React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faExclamationCircle);

const MessageError = () => (
  <div className="user-message">
    <p className="user-message__error">
      <FontAwesomeIcon
        className="fa"
        icon={['fa', 'exclamation-circle']}
      />
        Please put correct data. Name: letters only. Email: example@index.com
    </p>
  </div>
);

export default MessageError;
