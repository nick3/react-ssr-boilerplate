/**
 *
 * MsgWithMultiLine
 *
 */

import React from 'react';
import { Icon, Button } from 'react-weui';
import { injectIntl } from 'react-intl';
import _ from 'lodash';

// import { FormattedMessage } from 'react-intl';

import styles from './styles.css';

const MsgWithMultiLine = injectIntl(
  ({ type, title, description, intl, buttons }) => {
    const descriptionArr = [];
    if (description) {
      _.forEach(description, (value, index) => {
        if (value.replaceWord) {
          descriptionArr.push(
            <p style={{ fontSize: 14, color: '#aaa' }} key={index}>
              {intl.formatMessage(value.content, { ...value.replaceWord })}
            </p>
          );
        } else {
          descriptionArr.push(
            <p key={index} style={{ fontSize: 14, color: '#aaa' }}>
              {intl.formatMessage(value.content)}
            </p>
          );
        }
      });
    }
    const buttonsArr = [];
    if (buttons) {
      _.forEach(buttons, (value, index) => {
        buttonsArr.push(
          <Button
            key={index}
            style={{ width: '90%' }}
            type={value.btnType}
            disabled={value.disabled}
            onClick={value.onClick}
          >
            {value.disabled
              ? value.btnLabel
              : intl.formatMessage(value.btnLabel)}
          </Button>
        );
      });
    }

    return (
      <div className={styles.msg}>
        <br />
        <Icon size="large" value={type} />
        <br />
        <h3 style={{ margin: '25px 0 15px 0', fontSize: 20 }}>
          {intl.formatMessage(title)}
        </h3>
        <div style={{ padding: '0 12px' }}>{descriptionArr}</div>
        <br />
        {buttonsArr}
      </div>
    );
  }
);

export default MsgWithMultiLine;
