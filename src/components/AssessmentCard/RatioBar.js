import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import PropTypes from 'prop-types';
import { Types } from './constants';
import { map } from 'lodash';

function RatioBar({ value = {}, style, className }) {
  return (
    <div className={classNames(styles.ratioBar, className)} style={style}>
      {map(Types, (item, index) => {
        const val = value[item.key];
        return (
          val > 0 && (
            <div
              key={`rbItem-${index}`}
              className={styles.rbItem}
              style={{
                width: `${val}%`,
                backgroundColor: item.color
              }}
            />
          )
        );
      })}
    </div>
  );
}

RatioBar.propTypes = {
  value: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string
};

export default RatioBar;
