/**
 *
 * TopFilterBar
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

function TopFilterBar(props) {
  const { hasFilter, onClick } = props;
  const filterColor = hasFilter ? '#3b9e46' : '#666';
  return (
    <div className={styles.topBar}>
      <div style={{ minWidth: 56 }} />
      <button
        className={styles.classSelector}
        style={{ color: filterColor }}
        onClick={onClick}
      >
        <FormattedMessage {...messages.filt} />
        <i className={styles.filter} style={{ backgroundColor: filterColor }} />
      </button>
    </div>
  );
}

TopFilterBar.propTypes = {
  hasFilter: PropTypes.bool,
  onClick: PropTypes.func
};

export default TopFilterBar;
