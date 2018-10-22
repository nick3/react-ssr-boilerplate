/**
 *
 * RightFiltPage
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

class RightFiltPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.any,
    filtPageOpen: PropTypes.bool,
    resetOnClick: PropTypes.func,
    confirmOnClick: PropTypes.func
  };

  render() {
    const { children, filtPageOpen, resetOnClick, confirmOnClick } = this.props;
    return (
      <div
        className={classNames(styles.rightFiltPage, {
          [styles.rightFiltPageShow]: filtPageOpen
        })}
      >
        <div
          className={classNames(styles.filtPage, {
            [styles.filtPageShow]: filtPageOpen
          })}
        >
          <div className={styles.settingBox}>{children}</div>
          <div className={styles.bottomCard}>
            <button
              className={styles.bottomBtn}
              style={{ backgroundColor: '#95cb9b' }}
              onClick={resetOnClick}
            >
              <FormattedMessage {...messages.reset} />
            </button>
            <button
              className={styles.bottomBtn}
              style={{ backgroundColor: '#3b9e46' }}
              onClick={confirmOnClick}
            >
              <FormattedMessage {...messages.confirm} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RightFiltPage;
