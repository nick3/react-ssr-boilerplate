/**
 *
 * AlertTip
 *
 */

import React from 'react';
import { injectIntl } from 'react-intl';

import styles from './styles.css';

const AlertTip = injectIntl(({ tipMsg, show, intl }) => {
  const alertTip = show ? (
    <section className={styles.alertTip}>{intl.formatMessage(tipMsg)}</section>
  ) : null;
  return alertTip;
});

export default AlertTip;
