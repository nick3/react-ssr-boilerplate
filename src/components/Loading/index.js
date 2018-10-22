/**
 *
 * Loading
 *
 */

import React from 'react';
import { Toast } from 'react-weui';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';

function Loading() {
  return (
    <div className={styles.loading}>
      <Toast show icon="loading">
        <FormattedMessage {...messages.loading} />
      </Toast>
    </div>
  );
}

export default Loading;
