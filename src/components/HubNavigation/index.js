/**
 *
 * HubNavigation
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import HubNavItem from '../HubNavItem';
import config from '../../config';
import styles from './styles.css';

import messages from './messages';

function HubNavigation(props) {
  const { type, openid, navData, version, query } = props;
  let component;
  if (version === 'migrating') {
    component = (
      <div className={styles.migrating}>
        <FormattedMessage {...messages.migrating} />
      </div>
    );
  } else {
    const hubNavItem = navData[type].map((item, i) => {
      const { showType } = item;
      return !showType || showType === version ? (
        <HubNavItem
          key={i}
          domain={config.domain}
          openid={openid}
          query={query}
          {...item}
        />
      ) : null;
    });
    const rowData = curryStep(4)(hubNavItem.filter(item => !!item)).map(
      (item, i) => (
        <div className={styles.navRow} key={i}>
          {item}
        </div>
      )
    );

    component = <div className={styles.hubNavigation}>{rowData}</div>;
  }
  return component;
}

function curryStep(n) {
  return function foo(ary) {
    return stepEach(ary, n);
  };
}

function stepEach(ary, n, res = []) {
  if (ary.length === 0) {
    return [...res];
  }
  if (ary.length < n) {
    return [...res, arrayFillWithJsx(ary, n - ary.length)];
  }
  return stepEach(ary.slice(n), n, [...res, ary.slice(0, n)]);
}

function arrayFillWithJsx(ary, n) {
  return [
    ...ary,
    ...new Array(n)
      .fill('')
      .map((item, i) => <div className={styles.blank} key={i} />)
  ];
}

HubNavigation.propTypes = {
  type: PropTypes.string,
  openid: PropTypes.string,
  navData: PropTypes.object,
  version: PropTypes.string,
  query: PropTypes.object
};

export default HubNavigation;
