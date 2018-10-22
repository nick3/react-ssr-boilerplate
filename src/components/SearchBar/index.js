/**
 *
 * SearchBar
 *
 */

import React from 'react';

import { injectIntl } from 'react-intl';
import messages from './messages';
import { SearchBar } from 'react-weui';

const MySearchBar = injectIntl(
  ({
    onChange,
    onSubmit,
    placeholder,
    intl,
    type,
    onCancel,
    cancelBtnText
  }) => {
    let text = intl.formatMessage(messages.cancelTitle);
    if (cancelBtnText) {
      text = intl.formatMessage(cancelBtnText);
    }
    return (
      <SearchBar
        lang={{
          cancel: text
        }}
        type={type}
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onClear={onCancel}
        placeholder={intl.formatMessage(placeholder)}
      />
    );
  }
);

export default MySearchBar;
