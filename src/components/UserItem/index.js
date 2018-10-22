/**
 *
 * UserItem
 *
 */

import React, { PropTypes } from 'react';

import CircleImg from '../CircleImg';
import styles from './styles.css';
import { Link } from 'react-router';
import LikeIcon from '../LikeIcon';

function UserItem(props) {
  const {
    data: {
      id,
      avatar,
      name,
      coursename,
      ismine,
      islike,
      interactionCount,
      likeCount,
      rank
    },
    openid,
    isMine,
    isTop,
    onLike,
    onUnLike,
    type
  } = props;

  const isMineData = isMine || ismine;
  const likeLink = isMineData
    ? `interact/like?type=${type}&openid=${openid}`
    : null;
  const homeLink = isMineData
    ? `interact/home?type=${type}&openid=${openid}`
    : null;

  return (
    <div className={styles.userItem}>
      <Link className={styles.link} to={homeLink}>
        <span className={styles.rankGray}>{rank}</span>
        <CircleImg size={45} src={avatar} />
        <section className={styles.userInfo}>
          <span className={styles.teacherName}>{name}</span>
          <span className={styles.courseName}>{coursename}</span>
        </section>
        <section
          className={
            isTop ? styles.topInteractionCount : styles.interactionCount
          }
        >
          {interactionCount}
        </section>
      </Link>
      <Link className={styles.dark} to={likeLink}>
        <LikeIcon
          isLike={islike}
          onLike={onLike}
          onUnLike={onUnLike}
          id={id}
          ismine={isMineData}
          likeCount={likeCount}
        />
      </Link>
    </div>
  );
}

UserItem.propTypes = {
  data: PropTypes.object,
  onLike: PropTypes.func,
  onUnLike: PropTypes.func,
  isMine: PropTypes.number,
  openid: PropTypes.string,
  isTop: PropTypes.bool,
  type: PropTypes.number
};

export default UserItem;
