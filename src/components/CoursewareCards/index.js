/**
 *
 * CoursewareCards
 *
 */

import React from 'react';
import defaultClass from 'images/default_class.png';
import styles from './styles.css';

function renderCoursewareCards(coursewareList, onClick) {
  const list = coursewareList.map(value => (
    <button
      key={value.id}
      className={styles.container}
      style={value.style}
      onClick={() => {
        onClick(value.id);
      }}
    >
      <div
        className={styles.cover}
        style={{ backgroundImage: `url(${value.imgSrc || defaultClass})` }}
      />
      <div className={styles.title}>{value.title}</div>
      <div className={styles.titleRight} style={value.titleRightStyle}>
        {value.titleRight}
      </div>
      <div className={styles.content}>{value.content}</div>
    </button>
  ));

  if (list.length === 0) {
    return (
      <div style={{ textAlign: 'center', fontSize: '20px' }}>
        没有开启的课件可显示
      </div>
    );
  }

  return list;
}

function CoursewareCards(props) {
  const { coursewareList, onClick } = props;

  return (
    <div className={styles.card}>
      {renderCoursewareCards(coursewareList, onClick)}
    </div>
  );
}

CoursewareCards.propTypes = {
  coursewareList: React.PropTypes.array,
  onClick: React.PropTypes.func
};

export default CoursewareCards;
