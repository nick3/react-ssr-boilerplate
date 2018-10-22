/**
 *
 * InputWithProps
 *
 */
import React from 'react';
import { Input } from 'react-weui';
import { injectIntl } from 'react-intl';

const InputWithProps = injectIntl(({ placeholder, intl, value, ...others }) => (
  <Input
    placeholder={intl.formatMessage(placeholder)}
    value={value || ''}
    {...others}
  />
));

export default InputWithProps;
