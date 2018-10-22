/**
 *
 * SelectCell
 *
 */

import React from 'react';
import { injectIntl } from 'react-intl';

const SelectCell = injectIntl(
  ({ placeholder, value, title, name, intl, isWarn, ...others }) => (
    <div placeholder={intl.formatMessage(placeholder)} {...others}>
      {value > 0 ? (
        <span>{title}</span>
      ) : (
        <span style={{ color: isWarn ? 'red' : '#999' }}>
          {intl.formatMessage(placeholder)}
        </span>
      )}
      <input type="hidden" name={name} value={value} />
    </div>
  )
);

export default SelectCell;
