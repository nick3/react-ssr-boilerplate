/**
 *
 * CopyrightFooter
 *
 */

import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { FooterText } from 'react-weui';

function CopyrightFooter() {
  return (
    <FooterText style={{ display: 'flex', justifyContent: 'center' }}>
      <FormattedMessage
        {...messages.content}
        values={{ year: moment().year() }}
      />
    </FooterText>
  );
}

export default CopyrightFooter;
