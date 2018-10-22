/**
 *
 * RegistTopBtns
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

function RegistTopBtns(props) {
  const { isRegist, push, openid } = props;
  return (
    <div className={styles.registTopBtns}>
      <button
        disabled={isRegist}
        className={styles.btn}
        style={{ backgroundColor: isRegist ? '#EAEAEA' : '#FAFAFA' }}
        onClick={() => {
          const url = `teacher/signup?bind=false&openid=${openid}`;
          push(url);
        }}
      >
        <FormattedMessage {...messages.regist} />
      </button>
      <button
        disabled={!isRegist}
        className={styles.btn}
        style={{ backgroundColor: !isRegist ? '#EAEAEA' : '#FAFAFA' }}
        onClick={() => {
          push(`/teacher/auth?openid=${openid}`);
        }}
      >
        <FormattedMessage {...messages.login} />
      </button>
    </div>
  );
}

RegistTopBtns.propTypes = {
  push: PropTypes.func,
  openid: PropTypes.string,
  isRegist: PropTypes.bool
};

export default RegistTopBtns;
