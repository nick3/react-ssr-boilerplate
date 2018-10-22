/**
 *
 * ArchiveCard
 *
 */

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import { redirectUrl } from 'utils/redirect';
import messages from './messages';
import { Button } from 'react-weui';
import styles from './styles.css';

const lintToEdit = (archiveid, courseid, reference, router) => e => {
  e.stopPropagation();
  redirectUrl('student/archive', router, { courseid, archiveid, reference });
};

function ArchiveCard(props) {
  const {
    data,
    location,
    router,
    isEdit = true,
    match,
    onClick,
    reference
  } = props;

  const iconMatch = match && (
    <span className={styles.iconMatch}>
      <FormattedMessage {...messages.match} />
    </span>
  );
  const squenceNumber = data.comment && (
    <span>
      （<FormattedMessage {...messages.squenceNumber} /> {data.comment}）
    </span>
  );

  return (
    <button className={styles.archiveCard} onClick={onClick}>
      <div className={styles.cardContent}>
        <p className={styles.title}>
          {data.college_name} · {data.department_name}
          {iconMatch}
        </p>
        <p className={styles.content}>
          <FormattedMessage {...messages.class} />: {data.class_name}
        </p>
        <p className={styles.content}>
          <FormattedMessage {...messages.number} />: {data.student_number}{' '}
          {squenceNumber}
        </p>
      </div>
      {isEdit ? (
        <Button
          size="small"
          className={styles.link}
          onClick={lintToEdit(
            data.id,
            location.query.courseid,
            reference,
            router
          )}
        >
          <FormattedMessage {...messages.edit} />
        </Button>
      ) : null}
    </button>
  );
}

ArchiveCard.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  router: PropTypes.object,
  match: PropTypes.bool,
  isEdit: PropTypes.bool,
  onClick: PropTypes.func,
  reference: PropTypes.string
};

export default ArchiveCard;
