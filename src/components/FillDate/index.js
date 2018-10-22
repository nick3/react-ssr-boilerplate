/**
 *
 * FillDate
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, CellHeader, CellBody, Label, Input } from 'react-weui';
import messages from '../FillInArea/messages';

const handleChange = onChange => e => {
  const value = e.target.value;
  onChange(value);
};

function FillDate(props) {
  const { value, type, onChange } = props;
  return (
    <Cell
      style={{
        backgroundColor: '#fff',
        margin: '0 16px',
        borderBottom: '1px solid #E5E5E5'
      }}
    >
      <CellHeader>
        <Label>
          <FormattedMessage {...messages[type]} />
        </Label>
      </CellHeader>
      <CellBody>
        <Input
          type="date"
          defaultValue={value}
          onChange={handleChange(onChange)}
        />
      </CellBody>
    </Cell>
  );
}

FillDate.propTypes = {
  value: PropTypes.object,
  type: PropTypes.string,
  onChange: PropTypes.func
};

export default FillDate;
