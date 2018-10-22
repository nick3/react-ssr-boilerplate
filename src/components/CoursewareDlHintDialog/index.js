/**
 *
 * CoursewareDlHintDialog
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Dialog } from 'react-weui';
import styles from './styles.css';

function CoursewareDlHintDialog(props) {
  const { open, onConfirm } = props;
  return (
    <Dialog
      show={open}
      type="IOS"
      buttons={[
        {
          label: 'OK',
          onClick: onConfirm
        }
      ]}
      className={styles.coursewareDlHintDialog}
    >
      <FormattedMessage {...messages.copied} />
    </Dialog>
  );
}

CoursewareDlHintDialog.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func
};

export default CoursewareDlHintDialog;
