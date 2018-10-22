/**
 *
 * InveractUsers
 *
 */

import React, { PropTypes } from 'react';
import UserItem from '../UserItem';
import { interactRankNumber as limit, interactTopNumber as top } from 'config';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { take, filter, map, curry, flowRight as compose } from 'lodash';
import styles from './styles.css';

const curryMap = curry((fn, data) => map(data, fn));
const curryTake = curry((range, data) => take(data, range));

// 只显示互动次数不为0的数据
function onlyShowIntered(interactedData, total, step) {
  return total - step <= interactedData.length;
}

// 加载按钮只显示加载全部
function onlyShowLoadAll(interactedData, total, step) {
  return (
    total - interactedData.length > 0 && total - interactedData.length <= step
  );
}

function multi(x, y) {
  return x * y;
}

export class InveractUsers extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    onLike: PropTypes.func,
    onUnLike: PropTypes.func,
    onLoadMore: PropTypes.func,
    onLoadMoreSuccess: PropTypes.func,
    loading: PropTypes.bool,
    page: PropTypes.number,
    type: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.getButton = msg => {
      const { onLoadMore, loading } = props;
      return (
        <button
          className={styles.moreBtn}
          onClick={loading ? null : onLoadMore}
        >
          <FormattedMessage {...messages[msg]} />
        </button>
      );
    };
  }

  componentDidUpdate() {
    this.props.onLoadMoreSuccess();
  }

  render() {
    const { data, onLike, onUnLike, page, type } = this.props;

    const interedData = filter(data, item => item.interactionCount);
    const total = multi(page, limit);

    const isOnlyShowIntered = onlyShowIntered(interedData, total, limit);
    const isOnlyShowLoadAll = onlyShowLoadAll(interedData, total, limit);

    const showData = isOnlyShowIntered ? interedData : data;
    const btnWithMessage = isOnlyShowLoadAll
      ? this.getButton('showAll')
      : this.getButton('showMore');

    const getItem = (item, i) => (
      <UserItem
        data={item}
        type={type}
        isTop={top > i && item.interactionCount !== 0}
        key={i}
        onLike={onLike}
        onUnLike={onUnLike}
      />
    );
    const userLists = compose(
      curryMap(getItem),
      curryTake(total)
    )(showData);

    return (
      <section>
        <ul className={styles.inveractUsers}>{userLists}</ul>
        {userLists.length >= data.length ? null : btnWithMessage}
      </section>
    );
  }
}

export default InveractUsers;
