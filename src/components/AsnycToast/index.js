/**
 *
 * AsnycToast
 *
 */

import React, { PropTypes } from 'react';
import { Toast } from 'react-weui';
import { FormattedMessage } from 'react-intl';
import { formatMsg } from 'utils/format';
import messages from './messages';

function AsnycToast({ show, error }) {
  const errorInfo = formatMsg(error);
  const errorMsg = messages[errorInfo] || messages.notFound;
  return (
    <div>
      <Toast icon={error ? 'warn' : 'loading'} show={show || !!error}>
        {error ? (
          <span style={{ display: 'block', marginTop: '10px' }}>
            <FormattedMessage {...errorMsg} />
          </span>
        ) : (
          <FormattedMessage {...messages.loading} />
        )}
      </Toast>
    </div>
  );
}

AsnycToast.propTypes = {
  show: PropTypes.bool,
  error: PropTypes.string
};

export default AsnycToast;
