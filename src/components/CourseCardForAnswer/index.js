/**
 *
 * CourseCardForAnswer
 *
 */

import React from 'react';
import { Link } from 'react-router';
import InfoCard from '../InfoCard';
import defaultClass from 'images/default_class.png';
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

function renderCourseCardForAnswer(courseInfo, openId) {
  const list = courseInfo.map(value => (
    <Link
      to={`/student/answerlist?openid=${openId}&courseid=${value.courseId}`}
      key={value.courseId}
    >
      <InfoCard
        content={value.courseName}
        foot={
          <span className={styles.foot}>
            {`${value.questionNumber}${messages.answerOpening.defaultMessage}`}
          </span>
        }
        footRight={`${messages.undo.defaultMessage} ${
          value.unansweredQuestionNumber
        }`}
        imgSrc={value.cover || defaultClass}
        isArchived={0}
        style={infoCardStyle}
        title={`${value.collegeName}•${value.teacherName}`}
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
          alt={messages.noAnswerOpening.defaultMessage}
        />
        <div className={styles.noCoursesMessage}>
          {messages.noAnswerOpening.defaultMessage}
        </div>
      </div>
    );
  }

  return list;
}

function CourseCardForAnswer(props) {
  const { courseInfo = [], openId = '' } = props;
  return <div>{renderCourseCardForAnswer(courseInfo, openId)}</div>;
}

CourseCardForAnswer.propTypes = {
  courseInfo: React.PropTypes.array,
  openId: React.PropTypes.string
};

export default CourseCardForAnswer;
