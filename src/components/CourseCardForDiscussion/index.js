/**
 *
 * CourseCardForDiscussion
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import qrCode from '../../images/qrCode.png';
import styles from './styles.css';
import { isEmpty } from 'lodash';

function CourseCardForDiscussion(props) {
  const { name, code, cover, topic, avatar, title, count } = props;
  const backgroundImage = `url(${cover})`;
  return (
    <div className={styles.courseCardForDiscussion}>
      <div className={styles.nameAndStatus} style={{ backgroundImage }}>
        <div className={styles.cover} />
        <div className={styles.topic}>
          {!isEmpty(topic) && (
            <div className={styles.text}>
              <FormattedMessage {...messages.discussion} />
              {`“${topic}”`}
            </div>
          )}
        </div>
        <div className={styles.title}>
          <div className={styles.content}>{title}</div>
        </div>
        <div className={styles.teacherInfo}>
          <img src={avatar} alt="" className={styles.avatar} />
          <div className={styles.name}>{name}</div>
          <span className={styles.teacher}>
            <FormattedMessage {...messages.teacher} />
          </span>
        </div>
      </div>
      <div className={styles.classInfo}>
        <img src={qrCode} alt="" className={styles.qrCode} />
        <div className={styles.code}>{code}</div>
        <div className={styles.count}>{count}</div>
        <span className={styles.student}>
          <FormattedMessage {...messages.student} />
        </span>
      </div>
    </div>
  );
}

CourseCardForDiscussion.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.string,
  topic: PropTypes.string,
  count: PropTypes.number,
  avatar: PropTypes.string
};

export default CourseCardForDiscussion;
