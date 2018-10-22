/**
 *
 * AuthHeader
 *
 */

import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';

function AuthHeader({ bind }) {
  return (
    <header className={styles.authHeader}>
      <span>
        {bind ? (
          <FormattedMessage {...messages.bindTeacherInfo} />
        ) : (
          <FormattedMessage {...messages.teacherInfo} />
        )}
      </span>
      {/* <Link to={`teacher/signup?bind=${bind}`} className={styles.linkToSign} >
        <FormattedMessage {...messages.goSign} />
      </Link> */}
    </header>
  );
}

AuthHeader.propTypes = {
  bind: PropTypes.bool
};

export default AuthHeader;
