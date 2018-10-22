/**
 *
 * CourseCardForQuit
 *
 */

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import InfoCard from '../InfoCard';
import defaultClass from 'images/default_class.png';

import styles from './styles.css';

const infoCardStyle = {
  marginTop: '8px',
  marginLeft: '10px',
  marginRight: '10px',
  borderRadius: '4px',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.2)'
};

function CourseCardForQuit({ course, handleQuit }) {
  let footRight;
  if (course.id > 0 && !course.orgId) {
    footRight = (
      <button
        className={styles.btn}
        onClick={() => {
          if (handleQuit) {
            handleQuit(course);
          }
        }}
      >
        <FormattedMessage {...messages.quit} />
      </button>
    );
  } else {
    footRight = (
      <span>
        <FormattedMessage {...messages.unactive} />
      </span>
    );
  }
  return (
    <InfoCard
      content={course.name}
      foot={<span className={styles.foot}>课堂编码: {course.code}</span>}
      orgId={course.orgId}
      footRight={footRight}
      imgSrc={course.cover || defaultClass}
      isArchived={0}
      style={infoCardStyle}
      title={`${course.college}•${course.teacherName}`}
      titleRight={<span />}
    />
  );
}

CourseCardForQuit.propTypes = {
  course: PropTypes.object,
  handleQuit: PropTypes.func
};

export default CourseCardForQuit;
