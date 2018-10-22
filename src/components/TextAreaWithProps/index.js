/**
 *
 * TextAreaWithProps
 *
 */

import React from 'react';
import { TextArea } from 'react-weui';
import { injectIntl } from 'react-intl';

const TextAreaWithProps = injectIntl(({ placeholder, intl, ...others }) => (
  <TextArea placeholder={intl.formatMessage(placeholder)} {...others} />
));

export default TextAreaWithProps;
