/**
 *
 * CourseInfoHeader
 *
 */

import React, { PropTypes } from 'react';
import AvatarImg from '../AvatarImg';

import styles from './styles.css';
import defaultClassImage from 'images/default_class.png';

function CourseInfoHeader(props) {
  const { data = {}, show = true } = props;
  return (
    <header
      className={styles.courseInfoHeader}
      style={{
        backgroundImage: `url(${data.cover || defaultClassImage})`,
        display: `${show ? 'block' : 'none'}`
      }}
    >
      <div className={styles.userAvatar}>
        <AvatarImg
          size={50}
          src={data.teacheravatar || data.avatar}
          className={styles.avatar}
        />
        <span className={styles.font12}>{data.teachername}</span>
      </div>
      <div className={styles.courseInfo}>
        <p>{data.code}</p>
        <p className={styles.font22}>{data.name}</p>
        <p className={styles.font16}>
          {data.collegeName} • {data.departmentName}
        </p>
      </div>
    </header>
  );
}

CourseInfoHeader.propTypes = {
  data: PropTypes.object,
  show: PropTypes.bool
};

export default CourseInfoHeader;
