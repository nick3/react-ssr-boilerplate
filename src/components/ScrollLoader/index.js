/**
 *
 * ScrollLoader
 *
 */

import React, { Children, PropTypes, cloneElement } from 'react';
import { take } from 'lodash';
import { debounceTime } from 'utils/format';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import config from 'config';
import styles from './styles.css';

const { listLimit, scrollThreshold } = config;
const calMovingDistance = distance => distance / 3;

class ScrollLoader extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.object,
    data: PropTypes.array,
    onOverFlow: PropTypes.func,
    onRefresh: PropTypes.func,
    page: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      isOverRefreshPoint: false
    };

    this.win = window;
    this.isMoving = false;
    this.isRefreshing = false;
    this.scrollListener = this.scrollListener.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.scrollListenerWrapThrottle = debounceTime(this.scrollListener, 50)();
  }

  componentDidMount() {
    this.attachScrollListener();
    this.attachTouchListener();
  }

  setCss(targets, style) {
    const styleObj = {
      ...style
    };
    if ('transform' in style) {
      styleObj.webkitTransform = style.transform;
    }
    if ('transition' in style) {
      styleObj.webkitTransition = style.transition;
    }
    targets.forEach(target => Object.assign(target.style, styleObj));
  }

  overRefreshPointHandler() {
    this.isRefreshing = true;
    this.setState({ isOverRefreshPoint: true });
  }

  scrollListener() {
    if (this.isBottom()) {
      const { data, onOverFlow, page = 1 } = this.props;
      if (listLimit * page < data.length && typeof onOverFlow === 'function') {
        onOverFlow.call(this, page + 1);
      }
    }
  }

  refreshListener() {
    const { onRefresh } = this.props;
    if (typeof onRefresh === 'function') {
      onRefresh.call(this);
    }
  }

  touchStart(event) {
    this.startPageY = event.touches[0].pageY;
  }

  touchMove(event) {
    const currentPageY = event.touches[0].pageY;
    const pageYDiff = currentPageY - this.startPageY;
    const isMoveDown = pageYDiff > 0;

    if (this.isMoving) {
      this.distance = calMovingDistance(pageYDiff);
      this.movingHandler();
      event.preventDefault();
    } else if (this.isTop() && isMoveDown) {
      this.isMoving = true;
      event.preventDefault();
    }

    this.currentPageY = currentPageY;
  }

  touchEnd() {
    this.isMoving = false;
    this.setCss([this.wrapDom, this.loadBarDom], {
      transform: 'translate3d(0, 0, 0)',
      transition: 'all 300ms'
    });

    this.setState({ isOverRefreshPoint: false });

    if (this.isRefreshing) {
      this.isRefreshing = false;
      this.refreshListener();
    }
  }

  movingHandler() {
    this.setCss([this.wrapDom, this.loadBarDom], {
      transform: `translate3d(0, ${this.distance}px, 0)`,
      transition: 'none',
      display: 'block'
    });

    if (this.isOverRefreshPoint()) {
      this.overRefreshPointHandler();
    }
  }

  attachScrollListener() {
    this.scrollListener();
    this.win.addEventListener('scroll', this.scrollListenerWrapThrottle);
  }

  attachTouchListener() {
    this.wrapDom.addEventListener('touchstart', this.touchStart);
    this.wrapDom.addEventListener('touchmove', this.touchMove);
    this.wrapDom.addEventListener('touchend', this.touchEnd);
  }

  isBottom() {
    const windowHeight = this.win.innerHeight;
    const bottomDomTop =
      (this.bottomDom && this.bottomDom.getBoundingClientRect().top) || 0;

    return bottomDomTop - windowHeight <= scrollThreshold;
  }

  isTop() {
    return window.pageYOffset <= 0;
  }

  isOverRefreshPoint() {
    return this.distance >= 60;
  }

  render() {
    const { children, page = 1, data = [] } = this.props;
    const { isOverRefreshPoint } = this.state;
    const loadMsg = isOverRefreshPoint ? 'moveEndLoading' : 'moveDownLoading';
    const showData = take(data, listLimit * page);

    return (
      <div className={styles.scrollLoader}>
        <div
          className={styles.loadBar}
          ref={dom => {
            this.loadBarDom = dom;
          }}
        >
          <FormattedMessage {...messages[loadMsg]} />
        </div>
        <div
          ref={dom => {
            this.wrapDom = dom;
          }}
        >
          {Children.map(children, child =>
            cloneElement(child, {
              data: showData
            })
          )}
          <i
            ref={dom => {
              this.bottomDom = dom;
            }}
          />
        </div>
      </div>
    );
  }
}

export default ScrollLoader;
