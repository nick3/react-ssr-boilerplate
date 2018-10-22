/**
 *
 * FillOption
 *
 */

import React, { PropTypes } from 'react';
import { Form, FormCell, CellBody, CellFooter, Radio } from 'react-weui';

const handleChange = (onChange, origin) => e => {
  const id = e.target.value;
  const value = origin[id];
  onChange({ id, value });
};

function getCell(origin, value, handle) {
  return Object.keys(origin).map((item, i) => (
    <FormCell key={i} radio>
      <CellBody>{origin[item]}</CellBody>
      <CellFooter>
        <Radio
          name="radio"
          value={item}
          onChange={handle}
          checked={Number(value) === Number(item)}
        />
      </CellFooter>
    </FormCell>
  ));
}

function FillOption(props) {
  const { value, onChange } = props;
  const cellItems = getCell(
    value.options,
    value.id,
    handleChange(onChange, value.options)
  );
  return (
    <Form radio value={value.id} style={{ marginTop: 0 }}>
      {cellItems}
    </Form>
  );
}

FillOption.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
};

export default FillOption;
