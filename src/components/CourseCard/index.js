/**
 *
 * CourseCard
 *
 */

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import InfoCard from '../InfoCard';
import defaultClass from 'images/default_class.png';

import styles from './styles.css';

function CourseCard(props) {
  const { data } = props;
  const params = {
    checking: data.checking,
    answering: data.answering,
    isArchived: data.isArchived
  };
  const courseStatus = getCourseStatus(params);
  const isArchived = data.isArchived;
  let style = {};
  if (isArchived) {
    style = {
      opacity: '0.7'
    };
  }
  const src = data.imgSrc ? data.imgSrc : defaultClass;
  const orgId = data.orgId;
  return (
    <a className={styles.courseCard} href={data.courseUrl}>
      <InfoCard
        orgId={orgId}
        style={style}
        content={data.title}
        imgSrc={src}
        title={`${data.year}年 · ${data.term} (编码:${data.code})`}
        titleRight={courseStatus}
        foot={`签到 ${data.checkInNum} · 答题 ${data.answerNum} · 讨论 ${
          data.discussionNum
        }`}
        footRight={`${data.studentNum} 学生`}
        isArchived={isArchived}
      />
    </a>
  );
}

CourseCard.propTypes = {
  data: PropTypes.object
};

function getCourseStatus(args) {
  const { checking, answering, isArchived } = args;
  let icon;
  if (checking && !answering && !isArchived) {
    icon = (
      <span className={styles.stateWrapper}>
        <i className={styles.iconCheckIn} />
        <FormattedMessage {...messages.isOn} />
        <FormattedMessage {...messages.checkIn} />
      </span>
    );
  } else if (!checking && answering && !isArchived) {
    icon = (
      <span className={styles.stateWrapper}>
        <i className={styles.iconAnswer} />
        <FormattedMessage {...messages.isOn} />
        <FormattedMessage {...messages.answer} />
      </span>
    );
  } else if (checking && answering && !isArchived) {
    icon = (
      <span className={styles.stateWrapper}>
        <i className={styles.iconCheckIn} />
        <i className={styles.iconAnswer} />
        <FormattedMessage {...messages.isOn} />
        <FormattedMessage {...messages.checkIn} />
        <FormattedMessage {...messages.and} />
        <FormattedMessage {...messages.answer} />
      </span>
    );
  } else if (!checking && !answering && isArchived) {
    icon = (
      <span className={styles.stateWrapper}>
        <FormattedMessage {...messages.archived} />
      </span>
    );
  }
  return icon;
}

export default CourseCard;
