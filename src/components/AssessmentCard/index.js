import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import PropTypes from 'prop-types';
import RatioBar from './RatioBar';
// import { STATUS, Types } from './constants';
// import { map } from 'lodash';

function AssessmentCard({
  data = {},
  style,
  className,
  toolbar,
  isPreview,
  onClick
}) {
  const { name: title, openTime, types } = data;
  // const staObj = STATUS.fromStatusCode(status) || STATUS.Fresh;
  return (
    <button
      className={classNames(
        styles.wrapper,
        {
          [styles.isPreview]: isPreview
        },
        className
      )}
      style={style}
      onClick={onClick}
    >
      <div className={styles.body}>
        <RatioBar
          style={{
            height: 5
          }}
          value={types}
        />
        {/* <header className={styles.header}>
          <div className={styles[staObj.className]}>{staObj.title}</div>
          {isPreview || <div className={styles.typeBoxes}>
            {map(Types, (item, index) => {
              const val = types[item.key];
              return val &&
              <div
                key={`typeBox-${index}`}
                className={styles.typeBox}
                style={{
                  color: item.color,
                  borderColor: item.color,
                }}
              >{item.name}</div>;
            })}
          </div>}
        </header> */}
        <h3 className={styles.title}>{title}</h3>
      </div>
      {isPreview || (
        <footer className={styles.footer}>
          <div />
          <div className={styles.openTime}>{openTime}</div>
        </footer>
      )}
      {toolbar}
    </button>
  );
}

AssessmentCard.propTypes = {
  data: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  toolbar: PropTypes.element,
  isPreview: PropTypes.bool,
  onClick: PropTypes.func
};

export default AssessmentCard;
