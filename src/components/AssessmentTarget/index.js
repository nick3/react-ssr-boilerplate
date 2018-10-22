/**
 *
 * AssessmentTarget
 *
 */

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';

function AssessmentTarget() {
  return (
    <div className={styles.assessmentTarget}>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

export default AssessmentTarget;
