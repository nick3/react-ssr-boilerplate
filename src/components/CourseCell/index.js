/**
 *
 * CourseCell
 *
 */

import React, { PropTypes } from 'react';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import styles from './styles.css';

function CourseCell(props) {
  const {
    id,
    code,
    name,
    count,
    countType,
    teacherName,
    cover,
    toQuestionList
  } = props;
  const backgroundImage = `url(${cover})`;
  return (
    <div className={styles.courseCell}>
      <button
        className={styles.btn}
        onClick={() => toQuestionList && toQuestionList(id)}
      />
      <div className={styles.imgDiv} style={{ backgroundImage }} />
      <div className={styles.infoDiv}>
        <div className={styles.nameAndTeacher}>
          <div className={styles.courseName}>{`${code} ${name}`}</div>
          <div className={styles.teacherName}>{`教师 ${teacherName}`}</div>
        </div>
        <div className={styles.countDiv}>
          {`${count} ${countType}`}
          <div className={styles.right} />
        </div>
      </div>
    </div>
  );
}

CourseCell.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  code: PropTypes.string,
  cover: PropTypes.string,
  count: PropTypes.number,
  countType: PropTypes.string,
  teacherName: PropTypes.string,
  toQuestionList: PropTypes.func
};

export default CourseCell;
