/**
 *
 * CourseCardForCourseware
 *
 */

import React from 'react';
import { Link } from 'react-router';
import InfoCard from '../InfoCard';
import defaultClass from 'images/default_class.png';
import tvUrl from './images/television.png';
import noCourses from './images/noCourses.png';
import messages from './messages';
import styles from './styles.css';

const infoCardStyle = {
  marginTop: '8px',
  marginLeft: '10px',
  marginRight: '10px',
  borderRadius: '4px',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.2)'
};

function renderCourseList(courseInfo, openId) {
  const list = courseInfo.map(value => (
    <Link
      to={`/courses/${value.courseId}/assessments?openid=${openId}`}
      key={value.courseId}
    >
      <InfoCard
        key={value.id}
        content={value.name}
        foot={
          <span className={styles.foot}>
            <img className={styles.television} src={tvUrl} alt="" />
            {`${value.number}${messages.coursewareOpening.defaultMessage}`}
          </span>
        }
        footRight={`${messages.unread.defaultMessage} ${value.unread}`}
        imgSrc={value.coverImage || defaultClass}
        isArchived={0}
        style={infoCardStyle}
        title={`${value.college}•${value.teacher}`}
        titleRight={<span />}
      />
    </Link>
  ));

  if (list.length === 0) {
    return (
      <div className={styles.container}>
        <img
          className={styles.noCourses}
          src={noCourses}
          alt={messages.noCourses.defaultMessage}
        />
        <div className={styles.noCoursesMessage}>
          {messages.noCourses.defaultMessage}
        </div>
      </div>
    );
  }

  return list;
}

function CourseCardForCourseware(props) {
  const { courseInfo, openId } = props;
  return <div>{renderCourseList(courseInfo, openId)}</div>;
}

CourseCardForCourseware.propTypes = {
  courseInfo: React.PropTypes.array,
  openId: React.PropTypes.string
};

export default CourseCardForCourseware;
