/**
 *
 * AgreeTerm
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Agreement } from 'react-weui';

AgreeTerm.propTypes = {
  onChange: PropTypes.func
};

const handleChange = onChange => e => {
  const value = e.target.checked;
  onChange(value);
};

function AgreeTerm(props) {
  return (
    <div
      style={{
        fontSize: 13,
        color: '#aaa',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Agreement onChange={handleChange(props.onChange)}>
        <span style={{ paddingLeft: '10px' }}>
          <FormattedMessage {...messages.agreeTerm} />
        </span>
      </Agreement>
      <Link
        style={{
          color: '#576b95',
          outline: 'none',
          marginLeft: '-15px',
          marginTop: '3px'
        }}
        to="/term/weizhujiao"
      >
        《<FormattedMessage {...messages.weizhujiaoTermsOfUse} />》
      </Link>
    </div>
  );
}

export default AgreeTerm;
