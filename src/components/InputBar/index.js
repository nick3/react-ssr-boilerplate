/**
 *
 * InputBar
 *
 */

import React, { PropTypes } from 'react';
import messages from '../SearchList/message';
import { injectIntl } from 'react-intl';

import styles from './styles.css';

class InputBar extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    placeholder: PropTypes.object,
    intl: PropTypes.object,
    type: PropTypes.string
  };

  focus() {
    this.input.focus();
  }

  render() {
    const { onChange, onSubmit, placeholder, intl, type } = this.props;
    return (
      <form className={styles.inputBar} onSubmit={onSubmit}>
        <input
          className={styles.input}
          ref={c => {
            this.input = c;
          }}
          type={type}
          autoFocus
          onChange={onChange}
          placeholder={intl.formatMessage(placeholder)}
        />
        <button className={styles.searchBtn} onClick={onSubmit}>
          {intl.formatMessage(messages.search)}
        </button>
      </form>
    );
  }
}

// const InputBar = injectIntl(
//   ({ onChange, onSubmit, placeholder, intl, type }) => , { withRef: true });

export default injectIntl(InputBar, { withRef: true });
