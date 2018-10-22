/**
 *
 * IdentifySwitchBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';

function IdentifySwitchBar(props) {
  const { type, isTeacher, onSwitch } = props;
  const barContent = getBarContent(type);
  const display = isTeacher ? 'flex' : 'none';
  const onSwitchIndentify = targetType => () => onSwitch(targetType);

  return (
    <div className={styles.identifySwitchBar} style={{ display }}>
      <button
        className={styles.switchBarContent}
        style={{ backgroundColor: barContent.bgColor }}
        onClick={onSwitchIndentify(barContent.target)}
      >
        <i className={styles[barContent.icon]} />
        {barContent.text}
      </button>
    </div>
  );
}

function getBarContent(type) {
  const barOptions = {
    student: {
      icon: 'iconToTeacher',
      text: <FormattedMessage {...messages.switchToTeacher} />,
      bgColor: '#009688',
      target: 'teacher'
    },
    teacher: {
      icon: 'iconToStudent',
      text: <FormattedMessage {...messages.switchToStudent} />,
      bgColor: '#61788f',
      target: 'student'
    }
  };

  return barOptions[type];
}

IdentifySwitchBar.propTypes = {
  type: PropTypes.string,
  isTeacher: PropTypes.bool,
  onSwitch: PropTypes.func
};

export default IdentifySwitchBar;
