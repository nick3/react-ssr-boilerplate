/**
 *
 * FillSeletOption
 *
 */

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import { Cell, CellHeader, CellBody, Select, Label } from 'react-weui';
import messages from '../FillInArea/messages';
import styles from './styles.css';

function getData(origin = []) {
  const res = [];
  Object.keys(origin).forEach(id => {
    res.push({
      value: id,
      label: origin[id]
    });
  });
  return res;
}

const handleChange = (onChange, origin) => e => {
  const id = e.target.value;
  const value = origin[id];
  onChange({ id, value });
};

function FillSeletor(props) {
  const { value, type, onChange } = props;
  const selectData = getData(value.options);
  return (
    <Cell
      select
      selectPos="after"
      className={styles.selectCell}
      onChange={handleChange(onChange, value.options)}
    >
      <CellHeader>
        <Label>
          <FormattedMessage {...messages[type]} />
        </Label>
      </CellHeader>
      <CellBody>
        <Select defaultValue={value.id} data={selectData} />
      </CellBody>
    </Cell>
  );
}

FillSeletor.propTypes = {
  value: PropTypes.object,
  type: PropTypes.string,
  onChange: PropTypes.func
};

export default FillSeletor;
