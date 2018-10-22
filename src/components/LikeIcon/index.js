/**
 *
 * LikeIcon
 *
 */

import React, { PropTypes } from 'react';
import makeAnimocon from 'utils/animocon';
import { throttle } from 'utils/format';
import mojs from 'mo-js';
import styles from './styles.css';

class LikeIcon extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: PropTypes.number,
    onLike: PropTypes.func,
    onUnLike: PropTypes.func,
    isLike: PropTypes.number,
    likeCount: PropTypes.number,
    ismine: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.getDom = dom => {
      const icon = dom && dom.querySelector('span');
      const CIRCLE_RADIUS = 20;
      const RADIUS = 32;
      this.animocon = makeAnimocon(dom, {
        checked: !!props.isLike,
        tweens: [
          // burst animation
          new mojs.Burst({
            parent: dom,
            left: '50%',
            top: '50%',
            radius: { 4: RADIUS },
            angle: 45,
            count: 14,
            timeline: { delay: 300 },
            children: {
              radius: 2.5,
              fill: '#4bbea1',
              scale: { 1: 0, easing: mojs.easing.quad.in },
              pathScale: [0.8, null],
              degreeShift: [13, null],
              duration: [500, 700],
              easing: mojs.easing.quint.out
            }
          }),
          // ring animation
          new mojs.Shape({
            parent: dom,
            left: '50%',
            top: '50%',
            stroke: '#4bbea1',
            strokeWidth: { [2 * CIRCLE_RADIUS]: 0 },
            fill: 'none',
            scale: { 0: 1 },
            radius: CIRCLE_RADIUS,
            duration: 400,
            easing: mojs.easing.cubic.out
          }),
          // icon scale animation
          new mojs.Tween({
            duration: 1100,
            onUpdate: progress => {
              if (progress > 0.3) {
                const elasticOutProgress = mojs.easing.elastic.out(
                  1.43 * progress - 0.43
                );
                icon.style.WebkitTransform = icon.style.transform = `scale3d(${elasticOutProgress},${elasticOutProgress},1)`;
              } else {
                icon.style.WebkitTransform = icon.style.transform =
                  'scale3d(0,0,1)';
              }
            }
          })
        ]
      });
    };

    this.onLikeClick = (id, likeCount, ismine, isLike) => {
      if (ismine) {
        return;
      }

      this.animocon.setChecked(1 - isLike);

      if (isLike) {
        props.onUnLike(id, likeCount);
      } else {
        props.onLike(id, likeCount);
      }
    };

    this.throttledClick = throttle(this.onLikeClick);
  }

  getIcon(isLike) {
    return isLike ? (
      <span className={styles.likeIcon} />
    ) : (
      <span className={styles.unlikeIcon} />
    );
  }

  getIconByIsMine(ismine, isLike) {
    return this.getIcon(ismine || isLike);
  }

  render() {
    const { id, isLike, likeCount, ismine } = this.props;
    const likeIcon = this.getIconByIsMine(ismine, isLike);
    const throttledClick = ismine
      ? null
      : this.throttledClick(id, likeCount, ismine, isLike);

    return (
      <button className={styles.likeArea} onClick={throttledClick}>
        <span className={styles.likeCount}>{likeCount}</span>
        <i className={styles.likeBtn} ref={this.getDom}>
          {likeIcon}
        </i>
      </button>
    );
  }
}

export default LikeIcon;
