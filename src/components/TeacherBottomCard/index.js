/**
 *
 * TeacherBottomCard
 *
 */

import React, { PropTypes } from 'react';
import { forEach } from 'lodash';
import { FormattedMessage } from 'react-intl';
import styles from './styles.css';

const otherStyles = {
  iconStyle: {
    backgroundColor: '#575b63',
    width: 30,
    height: 30
  },
  signInStyle: {
    width: 56,
    height: 80,
    color: '#3b9e46',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 3
  },
  whiteCircle: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    backgroundColor: '#fff',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  }
};

function TeacherBottomCard(props) {
  const { btns } = props;
  const button = [];
  forEach(btns, btn => {
    const { iconName, text, isSelected } = btn;
    if (isSelected) {
      button.push(
        <div style={{ width: 56, height: 80 }} key={iconName}>
          <button className={styles.btnStyle} style={otherStyles.signInStyle}>
            <div style={otherStyles.whiteCircle}>
              <div className={styles.greenCircle}>
                <i className={styles[iconName]} />
                <i className={styles.plus} />
              </div>
            </div>
            <FormattedMessage {...text} />
          </button>
        </div>
      );
    } else {
      button.push(
        <button className={styles.btnStyle} key={iconName}>
          <i style={otherStyles.iconStyle} className={styles[iconName]} />
          <FormattedMessage {...text} />
        </button>
      );
    }
  });
  return <div className={styles.teacherBottomCard}>{button}</div>;
}

TeacherBottomCard.propTypes = {
  btns: PropTypes.array
};

export default TeacherBottomCard;
