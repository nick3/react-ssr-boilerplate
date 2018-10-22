/**
 *
 * CheckTerm
 *
 */

import React, { PropTypes } from 'react';
import { Agreement } from 'react-weui';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

function CheckTerm(props) {
  const { hintColor, termColor, onChange, value, content, push } = props;
  return (
    <div className={styles.checkTerm} style={{ color: hintColor }}>
      <Agreement
        checked={value}
        className={styles.checkBox}
        onChange={onChange}
      />
      <FormattedMessage {...messages.hint} />
      <button
        className={styles.term}
        style={{ color: termColor }}
        onClick={() => push('/term/weizhujiao')}
      >
        {content || <FormattedMessage {...messages.term} />}
      </button>
    </div>
  );
}

CheckTerm.propTypes = {
  push: PropTypes.func,
  value: PropTypes.bool,
  content: PropTypes.string,
  onChange: PropTypes.func,
  hintColor: PropTypes.string,
  termColor: PropTypes.string
};

export default CheckTerm;
