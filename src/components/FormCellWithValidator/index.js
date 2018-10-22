/**
 *
 * FormCellWithValidator
 *
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import InputWithProps from '../InputWithProps';
import { FormattedMessage } from 'react-intl';
import {
  FormCell,
  CellHeader,
  CellBody,
  CellFooter,
  Label,
  Icon
} from 'react-weui';

const validatorMaker = validators => target =>
  _.reduce(
    validators,
    (result, validator) => {
      if (validator(target)) {
        return result;
      }
      return result.concat([validator.msg]);
    },
    []
  );

function FormCellWithValidator(props) {
  const {
    label,
    placeholder,
    onChangeFun,
    validators = [],
    value,
    isWarn: warn,
    footerIcon = null,
    type
  } = props;
  const validator = validatorMaker(validators);
  let warnIcon = footerIcon;
  const resultIsWarn = val => {
    let result = false;
    if (validator(val).length > 0 && val !== undefined) {
      result = true;
    }
    return result;
  };
  const isWarn = warn || resultIsWarn(value);
  if (isWarn) {
    warnIcon = <Icon value="warn" />;
  }
  const changeValue = e => onChangeFun(e, resultIsWarn(e.target.value));
  return (
    <FormCell warn={isWarn}>
      <CellHeader>
        <Label>
          <FormattedMessage {...label} />
        </Label>
      </CellHeader>
      <CellBody>
        <InputWithProps
          type={type}
          onChange={changeValue}
          placeholder={placeholder}
          value={value}
        />
      </CellBody>
      <CellFooter>{warnIcon}</CellFooter>
    </FormCell>
  );
}

FormCellWithValidator.propTypes = {
  label: PropTypes.object,
  placeholder: PropTypes.object,
  validators: PropTypes.array,
  value: PropTypes.string,
  onChangeFun: PropTypes.func,
  footerIcon: PropTypes.object,
  type: PropTypes.string,
  isWarn: PropTypes.bool
};

export default FormCellWithValidator;
