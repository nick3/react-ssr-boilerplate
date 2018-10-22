/**
 *
 * InteractInfoBar
 *
 */

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';

function InteractInfoBar(props) {
  const { value, total } = props;
  const percent = total !== 0 ? value / total : 1;
  const perimeter = Math.PI * 2 * 130;
  const strokeDasharray = `${(perimeter * percent) / 2} ${perimeter *
    (1 - percent)}`;
  return (
    <div className={styles.interactInfoBar}>
      <svg
        className={styles.arcSvg}
        width="300"
        height="200"
        viewBox="0 0 300 220"
      >
        <defs>
          <linearGradient id="linearGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: '#4bbea1', stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: '#327b5b', stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M20 180 C 20 0, 280 0, 280 180"
          stroke="#e5e5e5"
          strokeWidth="20"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M20 180 C 20 0, 280 0, 280 180"
          stroke="#4bbea1"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          fill="none"
        />
      </svg>
      <section className={styles.infoArea}>
        <span className={styles.infoTitle}>
          <FormattedMessage {...messages.todayNum} />
        </span>
        <span className={styles.infoNum}>{value}</span>
        <span className={styles.infoHighest}>
          <FormattedMessage {...messages.highest} />
          {total}
        </span>
      </section>
    </div>
  );
}

InteractInfoBar.propTypes = {
  value: PropTypes.number,
  total: PropTypes.number
};

export default InteractInfoBar;
