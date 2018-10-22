import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import PropTypes from 'prop-types';
import RatioBar from './RatioBar';

function AssessmentCardMini({ data = {}, style, className, onTouchTap }) {
  const { name: title, types } = data;
  return (
    <div
      className={classNames(styles.wrapper, styles.mini, className)}
      style={style}
      onTouchTap={onTouchTap}
    >
      <div className={styles.body}>
        <RatioBar
          style={{
            height: 5
          }}
          value={types}
        />
        <h3 className={styles.title}>{title}</h3>
      </div>
    </div>
  );
}

AssessmentCardMini.propTypes = {
  data: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  onTouchTap: PropTypes.func
};

export default AssessmentCardMini;
