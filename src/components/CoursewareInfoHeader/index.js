/**
 *
 * CoursewareInfoHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const defaultClass = '/images/default_class.png';
const defaultAvatar = '/images/default_avatar.png';

function CoursewareInfoHeader(props) {
  const { courseId, courseInfo } = props;

  if (!courseInfo[courseId]) {
    return null;
  }

  const {
    cover,
    avatar,
    teacherName,
    code,
    name,
    college,
    department
  } = courseInfo[courseId];

  return (
    <div
      className={styles.header}
      style={{ backgroundImage: `url(${cover || defaultClass})` }}
    >
      <div className={styles.background} />
      <div
        className={styles.avatar}
        style={{ backgroundImage: `url(${avatar || defaultAvatar})` }}
      />
      <div className={styles.teacherName}>{teacherName}</div>
      <div className={styles.courseId}>{code}</div>
      <div className={styles.courseName}>{name}</div>
      <div className={styles.collegeAndDepartment}>
        {college}•{department}
      </div>
    </div>
  );
}

CoursewareInfoHeader.propTypes = {
  courseId: PropTypes.number,
  courseInfo: PropTypes.object
};

export default CoursewareInfoHeader;
