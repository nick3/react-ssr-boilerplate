/**
 *
 * CourseInfoHead
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import classNames from 'classnames';

function CourseInfoHead(props) {
  const {
    code,
    name,
    college,
    department,
    avatar,
    teacherName,
    current = 1,
    cover,
    currentOnChange,
    backBtnOnClick,
    isCoursewareList
  } = props;
  return (
    <div
      className={styles.courseInfoHead}
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className={styles.coverBg}>
        <div className={styles.title}>{`${code} ${name}`}</div>
        <div className={styles.location}>{`${college}·${department}`}</div>
        <div className={styles.teacher}>
          <img className={styles.avatar} alt="" src={avatar} />
          <div className={styles.teacherName}>{teacherName}</div>
        </div>
        {!isCoursewareList && (
          <div className={styles.tabBar}>
            <div
              className={classNames(styles.btn, {
                [styles.selected]: current === 1
              })}
            >
              <button
                className={styles.btnCover}
                onClick={() => currentOnChange && currentOnChange(1)}
              />
              <FormattedMessage {...messages.notAnswer} />
            </div>
            <div
              className={classNames(styles.btn, {
                [styles.selected]: current === 2
              })}
            >
              <button
                className={styles.btnCover}
                onClick={() => currentOnChange && currentOnChange(2)}
              />
              <FormattedMessage {...messages.answered} />
            </div>
            {/* <button
            className={classNames(styles.btn, { [styles.selected]: current === 3 })}
            onClick={() => currentOnChange && currentOnChange(3)}
          ><FormattedMessage {...messages.collection} /></button> */}
          </div>
        )}
        <div className={styles.closeBtn}>
          <button className={styles.cover} onClick={backBtnOnClick} />
          <i className={styles.closeIcon} />
        </div>
      </div>
    </div>
  );
}

CourseInfoHead.propTypes = {
  code: PropTypes.string,
  name: PropTypes.string,
  cover: PropTypes.string,
  avatar: PropTypes.string,
  college: PropTypes.string,
  current: PropTypes.number,
  department: PropTypes.string,
  teacherName: PropTypes.string,
  backBtnOnClick: PropTypes.func,
  currentOnChange: PropTypes.func,
  isCoursewareList: PropTypes.bool
};

export default CourseInfoHead;
